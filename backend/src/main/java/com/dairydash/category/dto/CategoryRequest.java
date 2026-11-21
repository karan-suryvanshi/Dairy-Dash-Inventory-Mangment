package com.dairydash.category.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoryRequest(
		@NotBlank(message = "Category name is required!")
		@Size(max = 100, message = "Name can not exceed 100 characters!")
		String name, 
		
		@Size(max = 500, message = "Name can not exceed 500 characters!")
		String description, 
		
		Boolean active
		) {
	
}
