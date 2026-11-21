package com.dairydash.inventory.dto;
public record InventoryResponse(Long productId, String productName, String sku, String categoryName, Integer quantity) {}
