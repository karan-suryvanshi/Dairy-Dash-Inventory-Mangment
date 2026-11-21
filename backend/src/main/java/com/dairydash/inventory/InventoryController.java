package com.dairydash.inventory;
import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.dairydash.inventory.dto.*;
import com.dairydash.inventory.service.InventoryService;
import jakarta.validation.Valid;
@RestController @RequestMapping("/api/v1/inventory")
public class InventoryController {
    private final InventoryService service;
    public InventoryController(InventoryService service) { this.service = service; }
    @GetMapping public List<InventoryResponse> getAll() { return service.getAll(); }
    @PutMapping("/{productId}") public InventoryResponse set(@PathVariable Long productId, @Valid @RequestBody InventoryRequest request) { return service.set(productId, request); }
}
