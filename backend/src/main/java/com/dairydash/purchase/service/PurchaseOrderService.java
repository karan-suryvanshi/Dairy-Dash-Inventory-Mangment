package com.dairydash.purchase.service;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.dairydash.product.repository.ProductRepository;
import com.dairydash.supplier.repository.SupplierRepository;
import com.dairydash.inventory.entity.InventoryStock;
import com.dairydash.inventory.repository.InventoryRepository;
import com.dairydash.purchase.dto.*;
import com.dairydash.purchase.entity.PurchaseOrder;
import com.dairydash.purchase.repository.PurchaseOrderRepository;
@Service @Transactional
public class PurchaseOrderService {
 private final PurchaseOrderRepository orders; private final ProductRepository products; private final SupplierRepository suppliers; private final InventoryRepository inventory;
 public PurchaseOrderService(PurchaseOrderRepository orders,ProductRepository products,SupplierRepository suppliers,InventoryRepository inventory){this.orders=orders;this.products=products;this.suppliers=suppliers;this.inventory=inventory;}
 public PurchaseOrderResponse create(PurchaseOrderRequest request){var supplier=suppliers.findById(request.supplierId()).orElseThrow(()->new IllegalArgumentException("Supplier not found: "+request.supplierId()));var product=products.findById(request.productId()).orElseThrow(()->new IllegalArgumentException("Product not found: "+request.productId()));return response(orders.save(new PurchaseOrder("PO-"+java.util.UUID.randomUUID().toString().substring(0,8).toUpperCase(),supplier,product,request.quantity())));}
 @Transactional(readOnly=true) public List<PurchaseOrderResponse> all(){return orders.findAll().stream().map(this::response).toList();}
 public PurchaseOrderResponse updateStatus(Long id,PurchaseOrderStatusRequest request){var order=orders.findById(id).orElseThrow(()->new IllegalArgumentException("Purchase order not found: "+id));if(request.status()==null)throw new IllegalArgumentException("Status is required.");if("Received".equals(order.getStatus())&&!("Received".equals(request.status())))throw new IllegalArgumentException("A received purchase order cannot be reopened or cancelled.");if("Cancelled".equals(order.getStatus())&&!("Cancelled".equals(request.status())))throw new IllegalArgumentException("A cancelled purchase order cannot be reopened.");if("Received".equals(request.status())&&!("Received".equals(order.getStatus()))){var product=order.getProduct();var stock=inventory.findByProductId(product.getId()).orElseGet(()->new InventoryStock(product,0));stock.setQuantity(stock.getQuantity()+order.getQuantity());inventory.save(stock);}order.setStatus(request.status());return response(order);}
 private PurchaseOrderResponse response(PurchaseOrder o){return new PurchaseOrderResponse(o.getId(),o.getOrderNumber(),o.getSupplier().getCompanyName(),o.getProduct().getName(),o.getProduct().getSku(),o.getQuantity(),o.getStatus(),o.getCreatedAt());}
}
