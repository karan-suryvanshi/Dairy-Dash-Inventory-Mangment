package com.dairydash.warehouse;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.dairydash.warehouse.dto.WarehouseRequest;
import com.dairydash.warehouse.entity.Warehouse;
import com.dairydash.warehouse.repository.WarehouseRepository;
import jakarta.validation.Valid;
@RestController @RequestMapping("/api/v1/warehouses")
public class WarehouseController {
 private final WarehouseRepository repository;
 public WarehouseController(WarehouseRepository repository){this.repository=repository;}
 @GetMapping public List<Warehouse> all(){return repository.findAll();}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public Warehouse create(@Valid @RequestBody WarehouseRequest request){return repository.save(new Warehouse(request.name().trim(),request.location()));}
 @PutMapping("/{id}") public Warehouse update(@PathVariable Long id,@Valid @RequestBody WarehouseRequest request){var row=repository.findById(id).orElseThrow(()->new IllegalArgumentException("Warehouse not found: "+id));row.setName(request.name().trim());row.setLocation(request.location());return repository.save(row);}
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){if(!repository.existsById(id))throw new IllegalArgumentException("Warehouse not found: "+id);repository.deleteById(id);}
}
