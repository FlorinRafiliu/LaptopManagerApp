package com.lab.mpp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;

//@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@SpringBootApplication
@EnableCaching
public class MppApplication {

    public static void main(String[] args) {
        SpringApplication.run(MppApplication.class, args);
    }

}
