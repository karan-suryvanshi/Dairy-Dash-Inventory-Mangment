package com.dairydash.supplier.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.*;

public record SupplierRequest(
		
	@NotBlank(message = "Supplier code is required!")
	@Size(max = 50)
	String supplierCode,
	
	@NotBlank(message = "Company name is required!")
	@Size(max = 150)
	String companyName,
	
	@Size(max = 100)
	String contactPerson,
	
	@Email(message = "Enter a valid email address!")
	@Size(max = 150)
	String email,
	
	@NotBlank(message = "Phone number is required!")
	@Pattern(
		regexp = "^[0-9+() -]{7,20}$",
		message = "Enter a valid phone number!"
	)
	String phone,
	
	@Pattern(
		regexp = "^(|[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z])$",
		message = "Enter a valid GST Number!"
	)
	String gstNumber,
	
	@Size(max = 500)
	String address,
	
	@Size(max = 100)
	String city,
	
	@Size(max = 100)
	String state,
	
	@Pattern(
		regexp = "^[0-9]{6}$",
		message = "Enter a valid pin code!"
	)
	String pincode,
	
	Boolean active,
	
	Set<Long> productIds
) {

}
