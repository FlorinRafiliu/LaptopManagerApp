package com.lab.mpp;

import com.lab.mpp.domain.Laptop;
import com.lab.mpp.domain.WarehouseLaptop;
import com.lab.mpp.domain.WarehouseLaptopRequestDTO;
import com.lab.mpp.repository.WarehouseLaptopRepository;
import com.lab.mpp.service.WarehouseLaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/warehouse_laptop")
public class WarehouseLaptopController {

    private final WarehouseLaptopService warehouseLaptopService;

    @Autowired
    public WarehouseLaptopController(WarehouseLaptopService warehouseLaptopService) {
        this.warehouseLaptopService = warehouseLaptopService;
    }

    @PostMapping
    public ResponseEntity<String> addLaptopToWarehouse(@RequestBody WarehouseLaptopRequestDTO request) {
        warehouseLaptopService.addLaptopToWarehouse(request.laptopId, request.warehouseId);
        return ResponseEntity.ok("Laptop added to warehouse successfully");
    }
}
