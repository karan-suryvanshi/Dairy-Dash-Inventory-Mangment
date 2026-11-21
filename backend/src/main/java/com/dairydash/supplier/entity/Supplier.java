package com.dairydash.supplier.entity;

import java.time.LocalDateTime;
import java.util.*;
import java.util.HashSet;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

import com.dairydash.product.entity.*;

@Entity
@Table(name = "suppliers")
public class Supplier {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "supplier_code", nullable = false, unique = true, length = 50)
	private String supplierCode;
	
	@Column(name = "company_name", nullable = false, length = 150)
	private String companyName;
	
	@Column(name = "contact_person", length = 100)
	private String contactPerson;
	
	@Column(length = 100)
	private String email;
	
	@Column(nullable = false, length = 20)
	private String phone;
	
	@Column(name = "gst_number", unique = true, length = 15)
	private String gstNumber;
	
	@Column(length = 500)
	private String address;
	
	@Column(length = 100)
	private String city;
	
	@Column(length = 100)
	private String state;
	
	@Column(length = 10)
	private String pincode;
	
	@Column(nullable = false)
	private boolean active = true;
	
	@Column(name = "created_at", insertable = false, updatable = false)
	private LocalDateTime createdAt;
	
	@ManyToMany
	@JoinTable(
		name = "supplier_products",
		joinColumns = @JoinColumn(name = "supplier_id"),
		inverseJoinColumns = @JoinColumn(name = "product_id")
	)
	private Set<Product> products = new HashSet<>();

	public Supplier() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSupplierCode() {
		return supplierCode;
	}

	public void setSupplierCode(String supplierCode) {
		this.supplierCode = supplierCode;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getGstNumber() {
		return gstNumber;
	}

	public void setGstNumber(String gstNumber) {
		this.gstNumber = gstNumber;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public Set<Product> getProducts() {
		return products;
	}

	public void setProducts(Set<Product> products) {
		this.products = products;
	}
}
