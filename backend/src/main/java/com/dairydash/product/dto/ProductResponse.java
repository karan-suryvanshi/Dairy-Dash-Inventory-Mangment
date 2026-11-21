package com.dairydash.product.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ProductResponse(
		Long id,
		String sku,
		String name,
		String description,
		BigDecimal price,
		String unit,
		boolean active,
		Long categoryId,
		String categoryName,
		String brand,
		String barcode,
		String imageUrl,
		LocalDateTime createdAt
) {

}
