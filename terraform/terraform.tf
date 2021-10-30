terraform {
  backend "remote" {
    organization = "arunesh"
    workspaces {
      name = "cf-performance-viewer"
    }
  }

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.46.0"
    }
  }
}

provider "azurerm" {
  subscription_id = var.azure_subscriptionid
  client_id       = var.azure_appid
  tenant_id       = var.azure_tenant
  client_secret   = var.azure_password

  features {}
}
