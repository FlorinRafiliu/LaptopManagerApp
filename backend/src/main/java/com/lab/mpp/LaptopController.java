package com.lab.mpp;

import com.lab.mpp.Validator;
import com.lab.mpp.domain.Laptop;
import com.lab.mpp.domain.Operation;
import com.lab.mpp.repository.LaptopRepository;
import com.lab.mpp.service.ServiceLaptop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.core.io.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;
import java.util.Objects;

import static com.lab.mpp.Validator.validateLaptop;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/laptops")
public class LaptopController {

    private List <Laptop> data;
    private ServiceLaptop serviceLaptop;
    private static final String UPLOAD_DIR = "uploads";

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    private boolean isStreaming = false;

    public LaptopController() {
        super();

        LaptopRepository laptopRepository = new LaptopRepository();
        laptopRepository.generateRandomData(400);

        this.serviceLaptop = new ServiceLaptop(laptopRepository);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {
        try (InputStream is = file.getInputStream()) {
            Path path = Paths.get(UPLOAD_DIR, Objects.requireNonNull(file.getOriginalFilename()));
            Files.copy(is, path, StandardCopyOption.REPLACE_EXISTING);
            return ResponseEntity.ok("File uploaded: " + file.getOriginalFilename());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed.");
        }
    }

    @GetMapping("/download/{filename}")
    public ResponseEntity<Resource> download(@PathVariable String filename) {
        try {
            Path path = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
            Resource resource = new UrlResource(path.toUri());

            if (!resource.exists()) return ResponseEntity.notFound().build();

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @MessageMapping("/start-stream")
    public void startStreaming() {
        if (isStreaming) return;
        isStreaming = true;

        new Thread(() -> {
            while (isStreaming) {
                serviceLaptop.addRandomData(10);
                messagingTemplate.convertAndSend("/topic/data", serviceLaptop.lastNth(10));

                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    @MessageMapping("/stop-stream")
    public void stopStreaming() {
        isStreaming = false;
    }

    @GetMapping("/params")
    public List<Laptop> getData(@RequestParam String filter, @RequestParam int page) {
        if(filter.equals("sortedByPrice")) {
            return serviceLaptop.getDataSortedByPrice(page);
        } else if(filter.equals("sortedByName")) {
            return serviceLaptop.getDataSortedByName(page);
        } else if(filter.isEmpty()) {
            return serviceLaptop.getData(page);
        } else if(filter.equals("business") || filter.equals("gaming") || filter.equals("ultrabook")) {
            return serviceLaptop.getDataByCategory(page, filter);
        } else {
            return serviceLaptop.getDataFiltered(page, filter);
        }
    }

//
//    @GetMapping("/sortedByPrice")
//    public List<Laptop> getSortedByPrice() {
//        return data.stream().sorted((a, b) -> a.price < b.price ? -1 : 1).toList();
//    }
//
//    @GetMapping("/page={page}")
//    public List<Laptop> getPage(@PathVariable int page) {
//        return data.subList((page - 1) * 10, Math.min(data.size(), page * 10));
//    }
//
//    @GetMapping("/sortedByName")
//    public List<Laptop> getSortedByName() {
//        return data.stream().sorted((a, b) -> a.name.compareTo(b.name)).toList();
//    }
//
//    @GetMapping("/filteredByName={val}")
//    public List<Laptop> getSortedByName(@PathVariable String val) {
//        return data.stream().filter(laptop -> laptop.name.contains(val)).toList();
//    }
//
//    @GetMapping("/filteredByCategory={val}")
//    public List<Laptop> getFilteredByCategory(@PathVariable String val) {
//        return data.stream().filter(laptop -> laptop.category.equals(val)).toList();
//    }
//
    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<Laptop> get() {
        return serviceLaptop.getData();
    }

    @GetMapping("/{id}")
    public Laptop getLaptopById(@PathVariable int id) {
        return serviceLaptop.getDataById(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateLaptop(@PathVariable int id, @RequestBody Laptop newLaptop) {
        if(!validateLaptop(newLaptop))
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        if(serviceLaptop.updateData(id, newLaptop))
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteLaptop(@PathVariable int id) {
        serviceLaptop.deleteData(id);
    }

    @PostMapping
    public ResponseEntity<Void> add(@RequestBody Laptop laptop) {
        if(Validator.validateLaptop(laptop)) {
            serviceLaptop.addData(laptop);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @PostMapping("/sync")
    public ResponseEntity<Void> syncOperation(@RequestBody Operation operation) {
        String type = operation.getType();
        Map <String, Object> payload = operation.getPayload();

        if(type.equals("create")) {
            serviceLaptop.addData(new Laptop(
                    ((String) payload.get("name")),
                    ((String) payload.get("brand")),
                    ((String) payload.get("category")),
                    ((String) payload.get("description")),
                    (Integer.parseInt((String) payload.get("year"))),
                    (Integer.parseInt((String) payload.get("price"))),
                    ((String) payload.get("path"))
            ));
        } else if(type.equals("delete")) {
            serviceLaptop.deleteData((int) payload.get("id"));
        } else if(type.equals("edit")) {
            System.out.println("aici");
            serviceLaptop.updateData((int) payload.get("id"), new Laptop(
                    ((String) payload.get("name")),
                    ((String) payload.get("brand")),
                    ((String) payload.get("category")),
                    ((String) payload.get("description")),
                    ((int) payload.get("year")),
                    ((int) payload.get("price")),
                    ((String) payload.get("path"))));
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/ping")
    public ResponseEntity<Void> getPing() {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}