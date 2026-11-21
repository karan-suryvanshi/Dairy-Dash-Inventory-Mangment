package com.dairydash.category.dto;

import java.time.LocalDateTime;

public record CategoryResponse(
		Long id,
		String name,
		String description,
		boolean active,
		LocalDateTime createdAt
		) {
	
}
