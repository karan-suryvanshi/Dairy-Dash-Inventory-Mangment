package com.dairydash.purchase.dto;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
public record PurchaseOrderRequest(@NotNull Long supplierId,@NotNull Long productId,@NotNull @Min(1) Integer quantity) {}
