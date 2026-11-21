package com.dairydash.product;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.dairydash.product.dto.ProductRequest;
import com.dairydash.product.dto.ProductResponse;
import com.dairydash.product.service.ProductService;
import com.dairydash.product.dto.ProductPageResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
	private final ProductService productService;

	public ProductController(ProductService productService) {
		super();
		this.productService = productService;
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ProductResponse create(@Valid @RequestBody ProductRequest request) {
		return productService.create(request);
	}
	
	@GetMapping
	public ProductPageResponse getAll(
			@RequestParam(required = false) String search, 
			@RequestParam(required = false) Long categoryId,
			@RequestParam(required = false) Boolean active,
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int size,
			@RequestParam(defaultValue = "createdAt") String sortBy,
			@RequestParam(defaultValue = "desc") String direction
	){
		return productService.searchProducts(
				search, 
				categoryId, 
				active, 
				page, 
				size, 
				sortBy, 
				direction
		);
	}
	
	@GetMapping("/{id}")
	public ProductResponse getById(@PathVariable Long id) {
		return productService.getById(id);
	}
	
	@PutMapping("/{id}")
	public ProductResponse update(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
		return productService.update(id, request);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		productService.delete(id);
	}
	
	@GetMapping("/catalog")
	public ProductPageResponse getCustomerCatalog(
			@RequestParam(required = false) String search,
			@RequestParam(required = false) Long categoryId,
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(defaultValue = "name") String sortBy,
			@RequestParam(defaultValue = "asc") String direction
	) {
		return productService.getCustomerCatalog(
				search, 
				categoryId, 
				page, 
				size, 
				sortBy, 
				direction
		);
	}
}
