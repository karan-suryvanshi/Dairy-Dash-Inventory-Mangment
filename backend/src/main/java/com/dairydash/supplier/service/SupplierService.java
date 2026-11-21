package com.dairydash.supplier.service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.data.domain.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dairydash.product.entity.Product;
import com.dairydash.product.repository.ProductRepository;
import com.dairydash.supplier.dto.SupplierPageResponse;
import com.dairydash.supplier.dto.SupplierRequest;
import com.dairydash.supplier.dto.SupplierResponse;
import com.dairydash.supplier.entity.Supplier;
import com.dairydash.supplier.repository.SupplierRepository;

@Service
@Transactional
public class SupplierService {
	private final SupplierRepository supplierRepository;
	private final ProductRepository productRepository;
	
	public SupplierService(SupplierRepository supplierRepository, ProductRepository productRepository) {
		super();
		this.supplierRepository = supplierRepository;
		this.productRepository = productRepository;
	}
	
	//Create Supplier
	public SupplierResponse create(SupplierRequest request) {
		String code = request.supplierCode().trim();
		
		if(supplierRepository.existsBySupplierCodeIgnoreCase(code)) {
			throw new IllegalArgumentException("Supplier code already exists");
		}
		
		String gst = normalizeGst(request.gstNumber());
		validateGst(gst, null);
		
		Supplier supplier = new Supplier();
		
		applyRequest(supplier, request, code, gst);
		
		return toResponse(supplierRepository.save(supplier));
	}
	
	//Get suppliers with search, filter, and pagination
	@Transactional(readOnly = true)
	public SupplierPageResponse getAll(
		String search,
		Boolean active,
		int page,
		int size
	) {
		if(page < 0) {
			throw new IllegalArgumentException("Page can not be negative!");
		}
		
		if(size < 1 || size > 100) {
			throw new IllegalArgumentException("Size must be between 1 and 100!");
		}
		
		Pageable pageable = (Pageable) PageRequest.of(
			page,
			size,
			Sort.by(Sort.Direction.DESC, "id")
		);
		
		Specification<Supplier> specification = (root, query, cb) -> cb.conjunction();
		
		if(search != null && !search.isBlank()) {
			String pattern = "%" + search.trim().toLowerCase() + "%";
			
			Specification<Supplier> searchSpec = (root, query, cb) -> cb.or(
				cb.like(cb.lower(root.get("companyName")), pattern
			),
				cb.like(cb.lower(root.get("supplierCode")), pattern
			),
				cb.like(cb.lower(root.get("contactPerson")), pattern
			),
				cb.like(cb.lower(root.get("city")), pattern
			)
		  );
			specification = specification.and(searchSpec);
		}
		
		Page<Supplier> result = supplierRepository.findAll(specification, pageable);

	        List<SupplierResponse> content =
	            result.getContent()
	                .stream()
	                .map(this::toResponse)
	                .toList();

	        return new SupplierPageResponse(
	            content,
	            result.getNumber(),
	            result.getSize(),
	            result.getTotalElements(),
	            result.getTotalPages(),
	            result.isFirst(),
	            result.isLast()
	        );
	}
	
	// Get supplierby ID
	@Transactional(readOnly = true)
	public SupplierResponse getById(Long id) {
		return toResponse(findSupplier(id));
	}
	
	// Update Supplier
	public SupplierResponse update(Long id, SupplierRequest request) {
		Supplier supplier = findSupplier(id);
		
		String code = request.supplierCode().trim();
		
		if(!supplier.getSupplierCode().equalsIgnoreCase(code) && 
				supplierRepository.existsByGstNumberIgnoreCase(code)) {
			throw new IllegalArgumentException("Supplier code already exists!");
		}
		
		String gst = normalizeGst(request.gstNumber());
		validateGst(gst, id);
		
		applyRequest(supplier, request, code, gst);
		
		return toResponse(supplierRepository.save(supplier));
	}
	
	// Delete Supplier
	public void delete(Long id) {
		Supplier supplier = findSupplier(id);
		supplierRepository.delete(supplier);
	}
	
	// Assign products and update supplier details
	private void applyRequest(
		Supplier supplier,
		SupplierRequest request,
		String code,
		String gst
	) {
		supplier.setSupplierCode(code);
		supplier.setCompanyName(request.companyName().trim());
		supplier.setContactPerson(request.contactPerson());
		supplier.setEmail(request.email());
		supplier.setPhone(request.phone().trim());
		supplier.setGstNumber(gst);
		supplier.setAddress(request.address());
		supplier.setCity(request.city());
		supplier.setState(request.state());
		supplier.setPincode(request.pincode());
		
		if(request.active() != null) {
			supplier.setActive(request.active());
		}
		else if(supplier.getId() == null) {
			supplier.setActive(true);
		}
		
		Set<Long> ids = request.productIds() == null 
				? Set.of()
				: request.productIds();
		
		Set<Product> products = ids.stream()
				.map(productId -> productRepository.findById(productId)
						.orElseThrow(() -> new IllegalArgumentException("Product not found: " + productId
						)
					)
				)
				.collect(Collectors.toSet());
		supplier.setProducts(products);
	}
	
	private void validateGst(String gst, Long currentId) {
		if(gst == null) {
			return;
		}
		
		boolean exists = supplierRepository.existsByGstNumberIgnoreCase(gst);
		
//		if(exists) {
//			boolean belongsToCurrentSupplier = currentId != null &&
//					supplierRepository
//					.findAll()
//					.stream()
//					.anyMatch(s -> s.getId().equals(currentId) && 
//							gst.equalsIgnoreCase(s.getGstNumber()));
//			
//			if(!belongsToCurrentSupplier) {
//				throw new IllegalArgumentException("GST number already exists!");
//			}
//		}
		
		supplierRepository.findByGstNumberIgnoreCase(gst)
		.ifPresent(existing -> {
			if(!existing.getId().equals(currentId)) {
				throw new IllegalArgumentException("GST number already exists!");
			}
		});
	}
	
	private String normalizeGst(String gst) {
		if(gst == null || gst.isBlank()) {
			return null;
		}
		return gst.trim().toUpperCase();
	}
	
	private Supplier findSupplier(Long id) {
		return supplierRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException(
							"Supplier not found: " + id
						));
	}
	
	private SupplierResponse toResponse(Supplier supplier) {
		List<Long> productIds = supplier.getProducts()
				.stream()
				.map(Product::getId)
				.toList();
		
		List<String> productNames = supplier.getProducts()
				.stream()
				.map(Product::getName)
				.toList();
		
		return new SupplierResponse(
			supplier.getId(),
			supplier.getSupplierCode(),
			supplier.getCompanyName(),
			supplier.getContactPerson(),
			supplier.getEmail(),
			supplier.getPhone(),
			supplier.getGstNumber(),
			supplier.getAddress(),
			supplier.getCity(),
			supplier.getState(),
			supplier.getPincode(),
			supplier.isActive(),
			productIds,
			productNames,
			supplier.getCreatedAt()
		);
	}
}

