package com.dairydash.supplier;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.dairydash.supplier.dto.SupplierPageResponse;
import com.dairydash.supplier.dto.SupplierRequest;
import com.dairydash.supplier.dto.SupplierResponse;
import com.dairydash.supplier.service.SupplierService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/suppliers")
public class SupplierController {
	private final SupplierService service;

	public SupplierController(SupplierService service) {
		super();
		this.service = service;
	}
	
	//Create
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public SupplierResponse create(@Valid @RequestBody SupplierRequest request) {
		return service.create(request);
	}
	
	//Search, Filter, and Pagination
	@GetMapping
	public SupplierPageResponse getAll(
		@RequestParam(required = false) String search,
		@RequestParam(required = false) Boolean active,
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size
	) {
		return service.getAll(search, active, page, size);
	}
	
	//Get By ID
	@GetMapping("/{id}")
	public SupplierResponse getById(@PathVariable Long id) {
		return service.getById(id);
	}
	
	//Update
	@PutMapping("/{id}")
	public SupplierResponse update(@PathVariable Long id, @Valid @RequestBody SupplierRequest request) {
		return service.update(id, request);
	}
	
	//Delete
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
