package com.lab.mpp;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class LaptopControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetLaptopById() throws Exception {
        int userId = 1;
        ResultActions result = mockMvc.perform(get("/laptops/{id}", userId));
        result.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(userId))
                .andExpect(jsonPath("$.name").value("Dell"))
                .andExpect(jsonPath("$.brand").value("Dell"))
                .andExpect(jsonPath("$.category").value("gaming"))
                .andExpect(jsonPath("$.description").value("Cel mai bun 2"))
                .andExpect(jsonPath("$.year").value(2024))
                .andExpect(jsonPath("$.price").value(3000))
                .andExpect(jsonPath("$.path").value("dell.jpg"));
    }

    @Test
    public void testGetLaptops() throws Exception {
        ResultActions result = mockMvc.perform(get("/laptops"));

        result.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].name").value("name"))
                .andExpect(jsonPath("$[1].name").value("Dell"))
                .andExpect(jsonPath("$[2].name").value("Lenovo"));
    }
    @Test
    public void testGetLaptopsSortedByPrice() throws Exception {
        ResultActions result = mockMvc.perform(get("/laptops/sortedByPrice"));

        result.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].name").value("Asus"))
                .andExpect(jsonPath("$[1].name").value("Lenovo"))
                .andExpect(jsonPath("$[2].name").value("Dell"));
    }
    @Test
    public void testGetLaptopsSortedByName() throws Exception {
        ResultActions result = mockMvc.perform(get("/laptops/sortedByName"));

        result.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].name").value("Apple"))
                .andExpect(jsonPath("$[1].name").value("Dell"));
    }
    @Test
    public void testGetLaptopsFilteredByName() throws Exception {
        ResultActions result = mockMvc.perform(get("/laptops/filteredByName={val}", "A"));

        result.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].name").value("Apple"));
    }

    @Test
    public void testGetLaptopsFilteredByCategory() throws Exception {
        ResultActions result = mockMvc.perform(get("/laptops/filteredByCategory={val}", "ultrabook"));

        result.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].name").value("Apple"));
    }

    @Test
    public void testAddLaptop() throws Exception {
        // Arrange
        String userJson =
                "{" +
                        "\"name\":\"name\"," +
                        "\"brand\":\"brand\"," +
                        "\"category\":\"business\"," +
                        "\"description\":\"description\"," +
                        "\"year\" : 2024," +
                        "\"price\" : 3000," +
                        "\"path\":\"path\"" +
                "}";

        // Act
        ResultActions result = mockMvc.perform(post("/laptops")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson));

        // Assert
        result.andExpect(status().isOk());
    }

    @Test
    public void testUpdateUser() throws Exception {
        // Arrange
        int laptopId = 0;
        String userJson =
                "{" +
                        "\"name\":\"name\"," +
                        "\"brand\":\"brand\"," +
                        "\"category\":\"gaming\"," +
                        "\"description\":\"description\"," +
                        "\"year\" : 2024," +
                        "\"price\" : 3000," +
                        "\"path\":\"path\"" +
                "}";

        // Act
        ResultActions result = mockMvc.perform(patch("/laptops/{id}", laptopId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson));

        // Assert
        result.andExpect(status().isOk());
    }

    @Test
    public void testDeleteUser() throws Exception {
        // Arrange
        int userId = 1;

        // Act
        ResultActions result = mockMvc.perform(delete("/laptops/{id}", userId));

        // Assert
        result.andExpect(status().isNoContent());
    }
}
