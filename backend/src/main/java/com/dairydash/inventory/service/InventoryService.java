package com.dairydash.inventory.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.dairydash.inventory.dto.*;
import com.dairydash.inventory.entity.InventoryStock;
import com.dairydash.inventory.repository.InventoryRepository;
import com.dairydash.product.repository.ProductRepository;

@Service @Transactional
public class InventoryService {
    private final InventoryRepository inventory;
    private final ProductRepository products;
    public InventoryService(InventoryRepository inventory, ProductRepository products) { this.inventory = inventory; this.products = products; }
    @Transactional(readOnly = true)
    public List<InventoryResponse> getAll() {
        return inventory.findAll().stream().map(stock -> new InventoryResponse(stock.getProduct().getId(), stock.getProduct().getName(), stock.getProduct().getSku(), stock.getProduct().getCategory().getName(), stock.getQuantity())).toList();
    }
    public InventoryResponse set(Long productId, InventoryRequest request) {
        if (request.quantity() == null || request.quantity() < 0) throw new IllegalArgumentException("Quantity must be zero or greater.");
        var product = products.findById(productId).orElseThrow(() -> new IllegalArgumentException("Product not found: " + productId));
        var stock = inventory.findByProductId(productId).orElseGet(() -> new InventoryStock(product, request.quantity()));
        stock.setQuantity(request.quantity());
        var saved = inventory.save(stock);
        return new InventoryResponse(productId, product.getName(), product.getSku(), product.getCategory().getName(), saved.getQuantity());
    }
}
