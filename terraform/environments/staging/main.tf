provider "aws" {
  profile = "default"
  region  = var.region
}

terraform {
  backend "s3" {
    bucket         = "gena-terraform-state-bucket"
    key            = "genabase-web/staging/terraform.tfstate"
    region         = "ap-northeast-2"
    encrypt        = true
    dynamodb_table = "gena-terraform-lock-table"
  }
}

module "deploy" {
  source           = "../../modules/deploy"
  app_name         = "genabase-web"
  environment      = "staging"
  desired_count    = 1
  container_port   = 3000
  ecr_image        = "${var.base_ecr_image}:${var.image_tag}"
  cpu_architecture = "X86_64"
  host_header      = "staging.genabase.com"
}
