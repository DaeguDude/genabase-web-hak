data "terraform_remote_state" "infra" {
  backend = "s3"
  config = {
    bucket = "gena-terraform-state-bucket"
    key    = "gena-infra/${var.environment}/terraform.tfstate"
    region = "ap-northeast-2"
  }
}

locals {
  vpc_id                      = data.terraform_remote_state.infra.outputs.vpc_id
  alb_https_listener_arn      = data.terraform_remote_state.infra.outputs.genabase_alb_https_listener_arn
  private_subnet_ids          = data.terraform_remote_state.infra.outputs.private_subnet_ids
  ecs_cluster_id              = data.terraform_remote_state.infra.outputs.ecs_cluster_id
  ecs_task_execution_role_arn = data.terraform_remote_state.infra.outputs.ecs_task_execution_role_arn
  ecs_tasks_sg_id             = data.terraform_remote_state.infra.outputs.ecs_tasks_sg_id
}

resource "aws_lb_target_group" "app" {
  name        = "${var.app_name}-${var.environment}-tg"
  port        = var.container_port
  protocol    = "HTTP"
  vpc_id      = local.vpc_id
  target_type = "ip"

  health_check {
    path                = "/api/health"
    healthy_threshold   = 2
    unhealthy_threshold = 3
  }
}

resource "aws_iam_role" "ecs_task_role" {
  name = "${var.app_name}-${var.environment}-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_cloudwatch_log_group" "app" {
  name              = "/ecs/${var.app_name}-frontend-${var.environment}"
  retention_in_days = 30

  tags = {
    Name        = "${var.app_name}-frontend-${var.environment}-logs"
    Environment = var.environment
  }
}

resource "aws_ecs_task_definition" "app" {
  family                   = "${var.app_name}-${var.environment}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.cpu
  memory                   = var.memory
  execution_role_arn       = local.ecs_task_execution_role_arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn

  container_definitions = jsonencode([
    {
      name  = var.app_name
      image = var.ecr_image
      environment = [
        {
          name  = "ENVIRONMENT"
          value = var.environment
        }
      ],
      essential = true
      portMappings = [
        {
          containerPort = var.container_port
          protocol      = "tcp"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/${var.app_name}-frontend-${var.environment}"
          "awslogs-region"        = "ap-northeast-2"
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])

  runtime_platform {
    cpu_architecture = var.cpu_architecture
  }
}

resource "aws_ecs_service" "app" {
  name            = "${var.app_name}-${var.environment}-service"
  cluster         = local.ecs_cluster_id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.desired_count
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = local.private_subnet_ids
    security_groups  = [local.ecs_tasks_sg_id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.app.arn
    container_name   = var.app_name
    container_port   = var.container_port
  }
}

resource "aws_lb_listener_rule" "https" {
  listener_arn = local.alb_https_listener_arn

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }

  condition {
    host_header {
      values = [var.host_header]
    }
  }
}
