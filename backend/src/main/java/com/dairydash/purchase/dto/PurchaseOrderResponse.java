package com.dairydash.purchase.dto;
import java.time.LocalDateTime;
public record PurchaseOrderResponse(Long id,String orderNumber,String supplier,String product,String sku,Integer quantity,String status,LocalDateTime createdAt) {}
