variable "app_name" {
  description = "App name"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "container_port" {
  description = "Container port"
  type        = number
}

variable "ecr_image" {
  description = "Image from ECR"
  type        = string
}

variable "cpu" {
  description = "Fargate instance CPU units"
  type        = number
  default     = 256
}

variable "memory" {
  description = "Fargate instance memory"
  type        = number
  default     = 512
}

variable "desired_count" {
  description = "Number of tasks to run"
  type        = number
  default     = 1
}

variable "cpu_architecture" {
  description = "Fargate cpu architecture (X86_64 or ARM64), must match image"
  type        = string
}

variable "host_header" {
  description = "Host header"
  type        = string
}
