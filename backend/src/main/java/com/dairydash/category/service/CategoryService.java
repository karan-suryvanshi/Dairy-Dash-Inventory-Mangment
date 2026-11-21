package com.dairydash.category.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dairydash.category.dto.CategoryRequest;
import com.dairydash.category.dto.CategoryResponse;
import com.dairydash.category.entity.Category;
import com.dairydash.category.repository.CategoryRepository;

@Service
@Transactional
public class CategoryService {
	private final CategoryRepository repository;

	public CategoryService(CategoryRepository repository) {
		super();
		this.repository = repository;
	}
	
	public CategoryResponse create(CategoryRequest request) {
		String name = request.name().trim();
		
		if(repository.existsByNameIgnoreCase(name)) {
			throw new IllegalArgumentException("A category with this name already exists!");
		}
		
		Category category = new Category();
		category.setName(name);
		category.setDescription(request.description());
		category.setActive(request.active() == null || request.active());
		
		return toResponse(repository.save(category));
	}
	
	@Transactional(readOnly = true)
	public List<CategoryResponse> getAll(){
		return repository.findAll()
				.stream()
				.map(this::toResponse)
				.toList();
	}
	
	@Transactional(readOnly = true)
	public CategoryResponse getById(Long id) {
		return toResponse(findCategory(id));
	}
	
	public CategoryResponse update(Long id, CategoryRequest request) {
		Category category = findCategory(id);
		String name = request.name().trim();
		
		boolean nameChanged = !category.getName().equalsIgnoreCase(name);
		
		if(nameChanged && repository.existsByNameIgnoreCase(name)) {
			throw new IllegalArgumentException("A category with this name already exists!");
		}
		
		category.setName(name);
		category.setDescription(request.description());
		
		if(request.active() != null) {
			category.setActive(request.active());
		}
		
		return toResponse(repository.save(category));
	}
	
	public void delete(Long id) {
		Category category = findCategory(id);
		repository.delete(category);
	}
	
	private Category findCategory(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Category not found: " + id));
	}
	
	private CategoryResponse toResponse(Category category) {
		return new CategoryResponse(
				category.getId(),
				category.getName(),
				category.getDescription(),
				category.isActive(),
				category.getCreatedAt()
		);
	}
}
