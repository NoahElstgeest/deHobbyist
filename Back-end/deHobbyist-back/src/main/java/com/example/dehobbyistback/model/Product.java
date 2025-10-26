package com.example.dehobbyistback.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name", nullable = false, unique = true)
    private String name;

    @Column(name="description", nullable = false, length = 1000)
    private String description;

    @Column(name="price", nullable = false)
    private BigDecimal price;

    @Column(name="stock", nullable = false)
    private int stock;

    @Column(name="image_url")
    private String imageUrl;

    public Product(String name, String description, BigDecimal price, int stock, String imageUrl) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.imageUrl = imageUrl;
    }
}
