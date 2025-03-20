package com.example.dehobbyistback.config;

import com.example.dehobbyistback.dao.ProductDao;
import com.example.dehobbyistback.dao.UserDao;
import com.example.dehobbyistback.model.Product;
import com.example.dehobbyistback.model.Role;
import com.example.dehobbyistback.model.User;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;
import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class Seeder {
    private final UserDao userDao;
    private final ProductDao productDao;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void seedDatabase() {
        seedUsers();
        seedProducts();
    }

    private void seedUsers() {
        if (userDao.findByUsername("admin").isEmpty()) {
            User admin = new User("admin", "admin@example.com", passwordEncoder.encode("admin123"), Role.ADMIN);
            userDao.saveUser(admin);
        }

        if (userDao.findByUsername("customer").isEmpty()) {
            User customer = new User("customer", "customer@example.com", passwordEncoder.encode("customer123"), Role.CUSTOMER);
            userDao.saveUser(customer);
        }
    }

    private void seedProducts() {
        if (productDao.getAllProducts().isEmpty()) {
            List<Product> products = List.of(
                    new Product("Acrylic Paint Set", "A set of 12 vibrant acrylic paints for miniatures and models.", new BigDecimal("19.99"), 50, "placeholder"),
                    new Product("Hobby Knife Kit", "Precision hobby knife set with replaceable blades.", new BigDecimal("14.99"), 30, "placeholder"),
                    new Product("Wood Burning Kit", "Complete wood burning tool set for pyrography art.", new BigDecimal("29.99"), 20, "placeholder"),
                    new Product("RC Car Kit", "Build-your-own remote-controlled car kit with electric motor.", new BigDecimal("79.99"), 15, "placeholder"),
                    new Product("Model Airbrush Set", "Professional airbrush kit for model painting.", new BigDecimal("49.99"), 25, "placeholder"),
                    new Product("DIY Candle Making Kit", "Complete set for making scented candles at home.", new BigDecimal("24.99"), 40, "placeholder"),
                    new Product("Resin Casting Starter Kit", "Beginner-friendly resin casting kit for jewelry and art.", new BigDecimal("34.99"), 35, "placeholder"),
                    new Product("Sewing Machine", "Compact sewing machine for beginners and hobbyists.", new BigDecimal("99.99"), 10, "placeholder"),
                    new Product("3D Printing Filament", "High-quality PLA filament for 3D printing.", new BigDecimal("22.99"), 60, "placeholder"),
                    new Product("Miniature Sculpting Tools", "Set of sculpting tools for clay and model detailing.", new BigDecimal("18.99"), 50, "placeholder")
            );
            products.forEach(productDao::saveProduct);
        }
    }
}