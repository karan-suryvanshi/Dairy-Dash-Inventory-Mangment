package com.dairydash.supplier.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.util.Optional;

import com.dairydash.supplier.entity.*;

public interface SupplierRepository extends JpaRepository<Supplier, Long>,JpaSpecificationExecutor<Supplier>{
	boolean existsBySupplierCodeIgnoreCase(String supplierCode);
	boolean existsByGstNumberIgnoreCase(String gstNumber);
	Optional<Supplier> findByGstNumberIgnoreCase(String gstNumber);
}
