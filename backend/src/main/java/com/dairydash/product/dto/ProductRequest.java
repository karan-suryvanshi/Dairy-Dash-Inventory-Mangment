package com.dairydash.product.dto;

import java.math.BigDecimal;

import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ProductRequest(
		@NotBlank(message= "SKU is required!")
		@Size(max = 50, message = "SKU can not exceed 50 characters!")
		String sku,
		
		@NotBlank(message= "Product name is required!")
		@Size(max = 150, message = "Name can not exceed 150 characters!")
		String name,
		
		@Size(max = 500, message = "Description can not exceed 500 characters!")
		String description,
		
		@NotNull(message = "Price is required!")
		@DecimalMin(value = "0.00", message = "Price cannot be negative!")
		BigDecimal price,
		
		@NotBlank(message= "Unit is required!")
		@Size(max = 30, message = "Unit can not exceed 30 characters!")
		String unit,
		
		Boolean active,
		
		@NotNull(message = "Category ID is required!")
		Long categoryId,
		
		@Size(max = 100)
		String brand,
		
		@Size(max = 100)
		String barcode,
		
		@Size(max = 1000)
		@Pattern(
				regexp = "^(https?://).+",
				message = "Image URL must start with http:// or https://"
		)
		String imageUrl
) {
}
