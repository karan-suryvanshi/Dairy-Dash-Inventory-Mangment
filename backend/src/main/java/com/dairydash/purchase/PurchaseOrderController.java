package com.dairydash.purchase;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.dairydash.purchase.dto.*;
import com.dairydash.purchase.service.PurchaseOrderService;
import jakarta.validation.Valid;
@RestController @RequestMapping("/api/v1/purchase-orders")
public class PurchaseOrderController {
 private final PurchaseOrderService service;
 public PurchaseOrderController(PurchaseOrderService service){this.service=service;}
 @GetMapping public List<PurchaseOrderResponse> all(){return service.all();}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public PurchaseOrderResponse create(@Valid @RequestBody PurchaseOrderRequest request){return service.create(request);}
 @PatchMapping("/{id}/status") public PurchaseOrderResponse updateStatus(@PathVariable Long id,@Valid @RequestBody PurchaseOrderStatusRequest request){return service.updateStatus(id,request);}
}
