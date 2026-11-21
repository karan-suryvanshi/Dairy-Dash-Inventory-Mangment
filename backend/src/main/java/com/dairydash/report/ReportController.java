package com.dairydash.report;
import java.util.Map;
import org.springframework.web.bind.annotation.*;
import com.dairydash.category.repository.CategoryRepository;
import com.dairydash.inventory.repository.InventoryRepository;
import com.dairydash.product.repository.ProductRepository;
import com.dairydash.purchase.repository.PurchaseOrderRepository;
import com.dairydash.supplier.repository.SupplierRepository;
@RestController @RequestMapping("/api/v1/reports")
public class ReportController {
 private final ProductRepository products; private final CategoryRepository categories; private final SupplierRepository suppliers; private final InventoryRepository inventory; private final PurchaseOrderRepository orders;
 public ReportController(ProductRepository p,CategoryRepository c,SupplierRepository s,InventoryRepository i,PurchaseOrderRepository o){products=p;categories=c;suppliers=s;inventory=i;orders=o;}
 @GetMapping("/summary") public Map<String,Long> summary(){return Map.of("totalProducts",products.count(),"activeProducts",products.countByActiveTrue(),"totalCategories",categories.count(),"totalSuppliers",suppliers.count(),"trackedProducts",inventory.count(),"lowStockProducts",inventory.countByQuantityLessThanEqual(5),"purchaseOrders",orders.count());}
}
