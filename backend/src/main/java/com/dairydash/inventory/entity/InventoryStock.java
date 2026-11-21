package com.dairydash.inventory.entity;

import com.dairydash.product.entity.Product;
import jakarta.persistence.*;

@Entity
@Table(name = "inventory_stock")
public class InventoryStock {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false, unique = true)
    private Product product;
    @Column(nullable = false)
    private Integer quantity;
    protected InventoryStock() {}
    public InventoryStock(Product product, Integer quantity) { this.product = product; this.quantity = quantity; }
    public Long getId() { return id; }
    public Product getProduct() { return product; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
