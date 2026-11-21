package com.dairydash.purchase.entity;
import java.time.LocalDateTime;
import com.dairydash.product.entity.Product;
import com.dairydash.supplier.entity.Supplier;
import jakarta.persistence.*;
@Entity @Table(name="purchase_orders")
public class PurchaseOrder {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(name="order_number",nullable=false,unique=true,length=40) private String orderNumber;
 @ManyToOne(fetch=FetchType.LAZY,optional=false) @JoinColumn(name="supplier_id",nullable=false) private Supplier supplier;
 @ManyToOne(fetch=FetchType.LAZY,optional=false) @JoinColumn(name="product_id",nullable=false) private Product product;
 @Column(nullable=false) private Integer quantity;
 @Column(nullable=false,length=20) private String status="Draft";
 @Column(name="created_at",nullable=false,updatable=false) private LocalDateTime createdAt=LocalDateTime.now();
 protected PurchaseOrder(){}
 public PurchaseOrder(String orderNumber,Supplier supplier,Product product,Integer quantity){this.orderNumber=orderNumber;this.supplier=supplier;this.product=product;this.quantity=quantity;}
 public Long getId(){return id;} public String getOrderNumber(){return orderNumber;} public Supplier getSupplier(){return supplier;} public Product getProduct(){return product;} public Integer getQuantity(){return quantity;} public String getStatus(){return status;} public LocalDateTime getCreatedAt(){return createdAt;} public void setStatus(String status){this.status=status;}
}
