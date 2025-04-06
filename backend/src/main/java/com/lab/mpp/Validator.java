package com.lab.mpp;

import com.lab.mpp.domain.Laptop;

public class Validator {
    public static boolean validateLaptop(Laptop laptop) {
        if(laptop.name.length() < 3)
            return false;
        if(!laptop.name.matches("[a-zA-Z0-9\\- ]+"))
            return false;
        if(!laptop.brand.matches("[a-zA-Z]+"))
            return false;
        if(!laptop.category.matches("business|ultrabook|gaming"))
            return false;

        if(laptop.price < 0)
            return false;
        if(laptop.year < 2000)
            return false;
        if(laptop.year > 2025)
            return false;

        return true;
    }
}
