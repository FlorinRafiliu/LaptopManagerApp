package com.lab.mpp;


import com.lab.mpp.service.LogOperationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/activity")
public class ActivityController {

    private LogOperationService logOperationService;

    @Autowired
    public ActivityController(LogOperationService logOperationService) {
        this.logOperationService = logOperationService;

        new Thread(() -> {
            while (true) {
                logOperationService.analyze();

                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    @GetMapping
    public List<String> getSuspicousUsers() {
        return logOperationService.getSuspiciousUsers();
    }
}
