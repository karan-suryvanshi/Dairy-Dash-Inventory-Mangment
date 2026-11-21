package com.dairydash.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dairydash.category.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	boolean existsByNameIgnoreCase(String name);
}
