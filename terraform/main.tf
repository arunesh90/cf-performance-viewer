resource "azurerm_resource_group" "main_group" {
  name     = "cf-performance-viewer"
  location = "West Europe"
}

resource "azurerm_app_service_plan" "main_plan" {
  name                = "cf-performance-viewer-plan"
  resource_group_name = azurerm_resource_group.main_group.name
  location            = azurerm_resource_group.main_group.location
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Standard"
    size = "S1"
  }
}
