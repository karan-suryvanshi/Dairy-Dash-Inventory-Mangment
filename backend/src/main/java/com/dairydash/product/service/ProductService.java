package com.dairydash.product.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.*;

import com.dairydash.category.entity.Category;
import com.dairydash.category.repository.CategoryRepository;
import com.dairydash.product.dto.ProductRequest;
import com.dairydash.product.dto.ProductResponse;
import com.dairydash.product.entity.Product;
import com.dairydash.product.repository.ProductRepository;
import com.dairydash.product.dto.ProductPageResponse;
 

@Service
@Transactional
public class ProductService {
	private final ProductRepository productRepository;
	private final CategoryRepository categoryRepository;
	
	public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
		super();
		this.productRepository = productRepository;
		this.categoryRepository = categoryRepository;
	}
	
	//Method to create product
	public ProductResponse create(ProductRequest request) {
		String sku = request.sku().trim();
		
		if(productRepository.existsBySkuIgnoreCase(sku)) {
			throw new IllegalArgumentException("A product with this SKU already exists!");
		}
		
		Product product = new Product();
		applyRequest(product, request, sku);
		
		return toResponse(productRepository.save(product));
	}
	
	//Get All Product
	
	@Transactional(readOnly = true)
	public ProductPageResponse searchProducts(
			String search,
			Long categoryId,
			Boolean active,
			int page,
			int size,
			String sortBy,
			String direction
	) {
		//Validate pagination
		if(page < 0) {
			throw new IllegalArgumentException("Page number can not be negative");
		}
		
		if(size < 1 || size > 100) {
			throw new IllegalArgumentException("Page size must be between 1 and 100");
		}
		
		//List supported sort fields
		List<String> allowedSortFields = List.of(
				"id","name","sku","price","createdAt"
		);
		
		if(!allowedSortFields.contains(sortBy)) {
			throw new IllegalArgumentException("Invalid sort field. Allowed: " + allowedSortFields);
		}
		
		Sort.Direction sortDirection;
		
		try {
			sortDirection = Sort.Direction.fromString(direction);
		} catch (IllegalArgumentException exception) {
			throw new IllegalArgumentException("Direction must be 'asc' or 'desc'");
		}
		
		Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
		
		Specification<Product> specification = (root, query, criteriaBuilder) -> criteriaBuilder.conjunction();
		
		//Search product name or sku
		if(search != null && !search.isBlank()) {
			String pattern = "%" + search.trim().toLowerCase() + "%";
			
			Specification<Product> searchSpec = (root, query, cb) -> cb.or(
					cb.like(cb.lower(root.get("name")), pattern),
					cb.like(cb.lower(root.get("sku")), pattern)
			);
			
			specification = specification.and(searchSpec);
		}
		
		//Filter by category
		if(categoryId != null) {
			Specification<Product> categorySpec = (root, query, cb) -> cb.equal(root.get("category").get("id"), categoryId);
			specification = specification.and(categorySpec);
		}
		
		//Filter by active status
		if(active != null) {
			Specification<Product> activeSpec = (root, query, cb) -> cb.equal(root.get("active"), active);
			specification = specification.and(activeSpec);
		}
		
		Page<Product> result = productRepository.findAll(
				specification,
				pageable
		);
		
		List<ProductResponse> products = result.getContent()
										.stream()
										.map(this::toResponse)
										.toList();
		
		return new ProductPageResponse(
				products,
				result.getNumber(),
				result.getSize(),
				result.getTotalElements(),
				result.getTotalPages(),
				result.isFirst(),
				result.isLast()
		);
	}
	
//	public List<ProductResponse> getAll(Long categoryId){
//		List<Product> products = categoryId == null 
//								 ? productRepository.findAll() 
//								 : productRepository.findByCategory_Id(categoryId);
//		
//		return products.stream()
//				.map(this::toResponse)
//				.toList();
//	}
	
	//Get Product By ID
	public ProductResponse getById(Long id) {
		return toResponse(findProduct(id));
	}
	
	
	//Update the existing product
	public ProductResponse update(Long id, ProductRequest request) {
        Product product = findProduct(id);
        String sku = request.sku().trim();

        boolean skuChanged =
            !product.getSku().equalsIgnoreCase(sku);

        if (skuChanged && productRepository.existsBySkuIgnoreCase(sku)) {
            throw new IllegalArgumentException(
                "A product with this SKU already exists"
            );
        }

        applyRequest(product, request, sku);

        return toResponse(productRepository.save(product));
    }

	//Delete the product
    public void delete(Long id) {
        Product product = findProduct(id);
        productRepository.delete(product);
    }

    private void applyRequest(
            Product product,
            ProductRequest request,
            String sku) {

        Category category = categoryRepository
            .findById(request.categoryId())
            .orElseThrow(() ->
                new IllegalArgumentException(
                    "Category not found: " + request.categoryId()
                )
            );

        if (!category.isActive()) {
            throw new IllegalArgumentException(
                "Cannot assign a product to an inactive category"
            );
        }

        product.setSku(sku);
        product.setName(request.name().trim());
        product.setDescription(request.description());
        product.setBrand(request.brand());
        product.setImageUrl(request.imageUrl());
        product.setPrice(request.price());
        
        String barcode = request.barcode();
        if(barcode != null && !barcode.isBlank()) {
        	barcode = barcode.trim();
        	
        	boolean barcodeChanged = product.getBarcode() == null 
        			|| !product.getBarcode().equalsIgnoreCase(barcode);
        	
        	if(barcodeChanged && productRepository.existsByBarcodeIgnoreCase(barcode)) {
        		throw new IllegalArgumentException(
        			"A product with this barcode already exists"
        		);
        	}
        }
        product.setBarcode(barcode == null || barcode.isBlank() ? null : barcode);
        
        product.setUnit(request.unit().trim());
        product.setCategory(category);

        if (request.active() != null) {
            product.setActive(request.active());
        } else if (product.getId() == null) {
            product.setActive(true);
        }
    }

    private Product findProduct(Long id) {
        return productRepository.findById(id)
            .orElseThrow(() ->
                new IllegalArgumentException(
                    "Product not found: " + id
                )
            );
    }

    private ProductResponse toResponse(Product product) {
        return new ProductResponse(
            product.getId(),
            product.getSku(),
            product.getName(),
            product.getDescription(),
            product.getPrice(),
            product.getUnit(),
            product.isActive(),
            product.getCategory().getId(),
            product.getCategory().getName(),
            product.getBrand(),
            product.getBarcode(),
            product.getImageUrl(),
            product.getCreatedAt()
        );
    }
    
    @Transactional(readOnly = true)
    public ProductPageResponse getCustomerCatalog(
    		String search,
    		Long categoryId,
    		int page,
    		int size,
    		String sortBy,
    		String direction
    ) {
    	return searchProducts(
    			search, 
    			categoryId, 
    			true, 
    			page, 
    			size, 
    			sortBy, 
    			direction
    	);
    }
}
