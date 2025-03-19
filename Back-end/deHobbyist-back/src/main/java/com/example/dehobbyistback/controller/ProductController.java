package com.example.dehobbyistback.controller;

import com.example.dehobbyistback.dao.ProductDao;
import com.example.dehobbyistback.model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductDao productDao;

    @GetMapping
    @PreAuthorize("permitAll()")
    public List<Product> getAllProducts() {
        return productDao.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productDao.getProductById(id).orElse(null);
    }

    @GetMapping("/search")
    @PreAuthorize("permitAll()")
    public List<Product> searchProducts(@RequestParam String name) {
        return productDao.searchProductsByName(name);
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productDao.saveProduct(product);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        Optional<Product> existingProduct = productDao.getProductById(id);
        if (existingProduct.isPresent()) {
            Product product = existingProduct.get();
            product.setName(updatedProduct.getName());
            product.setDescription(updatedProduct.getDescription());
            product.setPrice(updatedProduct.getPrice());
            product.setStock(updatedProduct.getStock());
            product.setImageUrl(updatedProduct.getImageUrl());
            return productDao.saveProduct(product);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productDao.deleteProduct(id);
    }
}
