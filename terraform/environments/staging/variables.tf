variable "region" {
  description = "AWS region"
  type        = string
}

variable "base_ecr_image" {
  description = "Base image from ECR"
  type        = string
}

variable "image_tag" {
  description = "Image tag"
  type        = string
}
