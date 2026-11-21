package com.dairydash.inventory.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.dairydash.inventory.entity.InventoryStock;
public interface InventoryRepository extends JpaRepository<InventoryStock, Long> { Optional<InventoryStock> findByProductId(Long productId); long countByQuantityLessThanEqual(Integer quantity); }
