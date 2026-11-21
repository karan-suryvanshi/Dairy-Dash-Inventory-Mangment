package com.dairydash.warehouse.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.dairydash.warehouse.entity.Warehouse;
public interface WarehouseRepository extends JpaRepository<Warehouse,Long> {}
