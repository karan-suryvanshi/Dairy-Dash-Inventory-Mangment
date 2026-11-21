package com.dairydash.purchase.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.dairydash.purchase.entity.PurchaseOrder;
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder,Long> {}
