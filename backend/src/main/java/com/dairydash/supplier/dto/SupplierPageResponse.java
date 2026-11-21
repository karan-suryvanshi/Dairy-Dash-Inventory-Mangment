package com.dairydash.supplier.dto;
import java.util.*;

public record SupplierPageResponse(
	List<SupplierResponse> content,
	int page,
	int size,
	long totalElements,
	int totalPages,
	boolean first,
	boolean last
) {
	
}
