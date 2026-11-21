package com.dairydash.inventory.dto;
import jakarta.validation.constraints.Min;
public record InventoryRequest(@Min(0) Integer quantity) {}
