resource "azurerm_resource_group" "main_group" {
  name     = "cf-performance-viewer"
  location = "West Europe"
}

resource "azurerm_app_service_plan" "main_plan" {
  name                = "cf-performance-viewer-plan"
  resource_group_name = azurerm_resource_group.main_group.name
  location            = azurerm_resource_group.main_group.location
  kind                = "FunctionApp"
  reserved            = true

  sku {
    tier = "Dynamic"
    size = "Y1"
  }
}

resource "azurerm_storage_account" "main_storage" {
  name                     = "cfperformanceviewer"
  resource_group_name      = azurerm_resource_group.main_group.name
  location                 = azurerm_resource_group.main_group.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_application_insights" "app_insights" {
  name                = "cf-performance-viewer-insights"
  resource_group_name = azurerm_resource_group.main_group.name
  location            = azurerm_resource_group.main_group.location
  application_type    = "Node.JS"
}

resource "azurerm_function_app" "lighthouse_app" {
  name                       = "cf-performance-viewer-lighthouse"
  resource_group_name        = azurerm_resource_group.main_group.name
  location                   = azurerm_resource_group.main_group.location
  app_service_plan_id        = azurerm_app_service_plan.main_plan.id
  storage_account_name       = azurerm_storage_account.main_storage.name
  storage_account_access_key = azurerm_storage_account.main_storage.primary_access_key
  os_type                    = "linux"
  version                    = "~3"

  site_config {
    linux_fx_version          = "node|12"
    use_32_bit_worker_process = false
  }

  app_settings = {
    "WEBSITE_RUN_FROM_PACKAGE"       = ""
    "FUNCTIONS_WORKER_RUNTIME"       = "node"
    "APPINSIGHTS_INSTRUMENTATIONKEY" = azurerm_application_insights.app_insights.instrumentation_key
  }

  lifecycle {
    ignore_changes = [
      app_settings["WEBSITE_RUN_FROM_PACKAGE"],
    ]
  }
}
