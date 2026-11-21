package com.dairydash.product.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.dairydash.product.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
	long countByActiveTrue();
	boolean existsBySkuIgnoreCase(String sku);
	List<Product> findByCategory_Id(Long categoryid);
	boolean existsByBarcodeIgnoreCase(String barcode);
}
