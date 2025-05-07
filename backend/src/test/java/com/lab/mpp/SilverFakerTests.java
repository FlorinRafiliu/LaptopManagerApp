package com.lab.mpp;

import com.github.javafaker.Faker;
import com.github.javafaker.service.FakeValuesService;
import com.github.javafaker.service.RandomService;
import com.lab.mpp.domain.Laptop;
import com.lab.mpp.repository.LaptopRepositoryDB;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Locale;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class SilverFakerTests {

    @Autowired
    LaptopRepositoryDB laptopRepositoryDB;

    @Test
    public void whenBothifyCalled_checkPatternMatches() throws Exception {

        Faker faker = new Faker();

        List<String> categories = List.of("business", "gaming", "ultrabook");
        List <String> paths = List.of("acer.jpg", "apple.jpg", "asus.jpg", "lenovo.jpg", "macbook.jpg", "msi.jpg");

        for(int i = 0; i < 100000; i++) {
            Random random = new Random();
            String name = faker.name().name();
            String brand = faker.letterify("brand_??????");
            String category = categories.get(random.nextInt((categories.size())));
            String description = faker.letterify("???????????????????????????????????????????");
            int year = faker.number().numberBetween(2000, 2025);
            int price = faker.number().numberBetween(100, 5000);
            String path = paths.get(random.nextInt(paths.size()));
            laptopRepositoryDB.save(new Laptop(name, brand, category, description, year, price, path));
        }
    }
}
