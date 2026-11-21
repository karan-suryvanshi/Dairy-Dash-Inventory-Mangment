package com.dairydash.product.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import com.dairydash.category.entity.Category;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, unique = true, length = 50)
	private String sku;
	
	@Column(nullable = false, length = 150)
	private String name;
	
	@Column(length = 500)
	private String description;
	
	@Column(nullable = false, precision = 12, scale = 2)
	private BigDecimal price;
	
	@Column(nullable = false, length = 30)
	private String unit = "piece";
	
	@Column(nullable = false)
	private boolean active = true;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "category_id", nullable = false)
	private Category category;
	
	@Column(length = 100)
	private String brand;
	
	@Column(length = 100, unique = true)
	private String barcode;
	
	@Column(name = "image_url", length = 1000)
	private String imageUrl;
	
	@Column(name = "created_at", insertable = false, updatable = false)
	private LocalDateTime createdAt;

	public Product() {
		super();
	}

	public Product(String sku, String name, String description, BigDecimal price, String unit, boolean active,
			Category category) {
		super();
		this.sku = sku;
		this.name = name;
		this.description = description;
		this.price = price;
		this.unit = unit;
		this.active = active;
		this.category = category;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getBarcode() {
		return barcode;
	}

	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
}
