package com.lab.mpp.service;


import com.lab.mpp.domain.LogOperation;
import com.lab.mpp.domain.MonitoredUser;
import com.lab.mpp.repository.LogOperationRepository;
import com.lab.mpp.repository.MonitoredUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class LogOperationService {

    private LogOperationRepository logOperationRepository;
    private MonitoredUserRepository monitoredUserRepository;

    @Autowired
    public LogOperationService(LogOperationRepository logOperationRepository, MonitoredUserRepository monitoredUserRepository) {
        this.logOperationRepository = logOperationRepository;
        this.monitoredUserRepository = monitoredUserRepository;
    }

    public void addLog(LogOperation log) {
        try (FileWriter fw = new FileWriter("log.txt", true)) { // 'true' means append mode
            fw.write(log.toString() + System.lineSeparator());
        } catch (IOException e) {
            e.printStackTrace();
        }
        logOperationRepository.save(log);
    }

    public void analyze() {
        List <LogOperation> logs = logOperationRepository.findLast30();
        if(Math.abs(Duration.between(logs.getFirst().getDate(), logs.getLast().getDate()).toSeconds()) < 10) {
            if(Math.abs(Duration.between(LocalDateTime.now(), logs.getFirst().getDate()).toSeconds()) > 2) {
                return;
            }

            String username = logs.getFirst().getUsername();
            int freq = 0;
            for(int i = 0; i < logs.size(); i++)
                if(logs.get(i).getUsername().equals(username))
                    freq += 1;
            if(freq == 30) {
                try (FileWriter fw = new FileWriter("log.txt", true)) { // 'true' means append mode
                    fw.write("Monitored username:" + username + System.lineSeparator());
                } catch (IOException e) {
                    e.printStackTrace();
                }

                if(!monitoredUserRepository.findByUsername(username).isPresent()) {
                    monitoredUserRepository.save(new MonitoredUser(username));
                }
            }
//            int freq = 0;
//            for(int i = 0; i < logs.size(); i++) {
//                if(logs.get(i).getUsername().equals(username)) {
//                    freq += 1;
//                } else {
//                    freq -= 1;
//                }
//
//                if(freq == 0)
//                    username = logs.get(i).getUsername();
//            }
//
//            freq = 0;
//            for(int i = 0; i < logs.size(); i++) {
//                if(logs.get(i).getUsername().equals(username))
//                    freq += 1;
//            }
//
//            if(freq > 15) {
//                try (FileWriter fw = new FileWriter("log.txt", true)) { // 'true' means append mode
//                    fw.write("Monitored username:" + username + System.lineSeparator());
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
        }
    }

    public List<String> getSuspiciousUsers() {
        return monitoredUserRepository.findAll().stream().map(user -> user.username).toList();
    }
}
