package com.lab.mpp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lab.mpp.Validator;
import com.lab.mpp.domain.Laptop;
import com.lab.mpp.domain.LaptopDTO;
import com.lab.mpp.domain.LogOperation;
import com.lab.mpp.domain.Operation;
import com.lab.mpp.repository.LaptopRepository;
import com.lab.mpp.repository.LaptopRepositoryDB;
import com.lab.mpp.repository.LogOperationRepository;
import com.lab.mpp.service.LogOperationService;
import com.lab.mpp.service.ServiceLaptop;
import com.lab.mpp.service.ServiceLaptopDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.time.LocalDateTime;
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

//    private List <Laptop> data;
//    private ServiceLaptop serviceLaptop;
    private static final String UPLOAD_DIR = "uploads";

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    private boolean isStreaming = false;

    private ServiceLaptopDB serviceLaptop;
    private LogOperationService logOperationService;

    @Autowired
    public LaptopController(ServiceLaptopDB serviceLaptop, LogOperationService logOperationService) {
        this.serviceLaptop = serviceLaptop;
        this.logOperationService = logOperationService;
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

    @GetMapping("/year")
    public List<Integer> getId(@RequestParam int year) {
//        List<Integer> list = new ArrayList<>();
//        list.add(1);
//        list.add(1);
//        list.add(1);
//        return list;
        return serviceLaptop.getIds(year);
    }

    @GetMapping("/params")
    public List<LaptopDTO> getData(@RequestParam String filter, @RequestParam int page) {
//        @RequestHeader("Authorization") String username
//        LogOperation log = new LogOperation(username, "READ", LocalDateTime.now());
//        logOperationService.addLog(log);

        if(filter.equals("sortedByPrice")) {
            return serviceLaptop.getDataSortedByPrice(page).stream().map(LaptopDTO::new).toList();
        } else if(filter.equals("sortedByName")) {
            return serviceLaptop.getDataSortedByName(page).stream().map(LaptopDTO::new).toList();
        } else if(filter.isEmpty()) {
            return serviceLaptop.getData(page).stream().map(LaptopDTO::new).toList();
        } else if(filter.equals("business") || filter.equals("gaming") || filter.equals("ultrabook")) {
            return serviceLaptop.getDataByCategory(page, filter).stream().map(LaptopDTO::new).toList();
        } else {
            return serviceLaptop.getDataFiltered(page, filter).stream().map(LaptopDTO::new).toList();
        }
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<LaptopDTO> get() {
        return serviceLaptop.getData().stream().map(LaptopDTO::new).toList();
    }

    @GetMapping("/{id}")
    public LaptopDTO getLaptopById(@PathVariable int id) {
        return new LaptopDTO(serviceLaptop.getDataById(Long.valueOf(id)));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateLaptop(@PathVariable int id, @RequestBody Laptop newLaptop, @RequestHeader("Authorization") String username) {

        LogOperation log = new LogOperation(username, "UPDATE", LocalDateTime.now());
        logOperationService.addLog(log);

        if(!validateLaptop(newLaptop))
            return new ResponseEntity<>(HttpStatus.OK);
        if(serviceLaptop.updateData((long) id, newLaptop))
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteLaptop(@PathVariable int id, @RequestHeader("Authorization") String username) {
        LogOperation log = new LogOperation(username, "DELETE", LocalDateTime.now());
        logOperationService.addLog(log);

        serviceLaptop.deleteData((long) id);
    }

    @PostMapping
    public ResponseEntity<Void> add(@RequestBody Laptop laptop, @RequestHeader("Authorization") String username) {
        LogOperation log = new LogOperation(username, "CREATE", LocalDateTime.now());
        logOperationService.addLog(log);

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
            serviceLaptop.deleteData((long) payload.get("id"));
        } else if(type.equals("edit")) {
            System.out.println("aici");
            serviceLaptop.updateData((long) payload.get("id"), new Laptop(
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