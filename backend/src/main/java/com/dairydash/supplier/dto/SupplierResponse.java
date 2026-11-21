package com.dairydash.supplier.dto;

import java.util.*;
import java.time.LocalDateTime;

public record SupplierResponse(
	Long id,
	String supplierCode,
	String companyName,
	String contactPerson,
	String email,
	String phone,
	String gstNumber,
	String address,
	String city,
	String state,
	String pincode,
	boolean active,
	List<Long> productIds,
	List<String> productNames,
	LocalDateTime createdAt
) {

}
