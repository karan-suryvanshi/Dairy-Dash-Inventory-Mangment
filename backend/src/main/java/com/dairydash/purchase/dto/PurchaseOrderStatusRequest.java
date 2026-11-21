package com.dairydash.purchase.dto;
import jakarta.validation.constraints.Pattern;
public record PurchaseOrderStatusRequest(@Pattern(regexp="Draft|Submitted|Received|Cancelled") String status) {}
