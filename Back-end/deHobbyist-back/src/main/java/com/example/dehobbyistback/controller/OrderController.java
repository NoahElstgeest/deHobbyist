package com.example.dehobbyistback.controller;

import com.example.dehobbyistback.dao.OrderDao;
import com.example.dehobbyistback.dao.ProductDao;
import com.example.dehobbyistback.dao.UserDao;
import com.example.dehobbyistback.dto.AdminOrder;
import com.example.dehobbyistback.model.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderDao orderDao;
    private final UserDao userDao;
    private final ProductDao productDao;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<AdminOrder> getAllOrders() {
        return orderDao.getAllOrders().stream().map(this::toAdminDto).toList();
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("#userId == authentication.principal.id or hasRole('ADMIN')")
    public List<Order> getUserOrders(@PathVariable Long userId) {
        return orderDao.getOrdersByUserId(userId);
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderDao.getOrderById(id).orElse(null);
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    @Transactional
    public ResponseEntity<Order> createOrder(@RequestBody Order order, Authentication auth) {
        String username = auth.getName();
        User user = userDao.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        order.setUser(user);

        BigDecimal total = BigDecimal.ZERO;

        for (OrderItem item : order.getOrderItems()) {
            Product p = productDao.getProductById(item.getProduct().getId()).orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Product not found: " + item.getProduct().getId()
            ));;

            if (p.getStock() < item.getQuantity()) {
                throw new IllegalArgumentException("Not enough stock for " + p.getName());
            }

            item.setOrder(order);
            item.setProduct(p);
            item.setPrice(p.getPrice());

            total = total.add(p.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));

            p.setStock(p.getStock() - item.getQuantity());
            productDao.saveProduct(p);
        }

        order.setTotalAmount(total);
        order.setStatus(OrderStatus.PENDING);
        orderDao.saveOrder(order);

        return ResponseEntity.ok(order);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestParam OrderStatus status) {
        Optional<Order> optionalOrder = orderDao.getOrderById(id);

        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setStatus(status);
            var saved = orderDao.saveOrder(order);
            return ResponseEntity.ok(toAdminDto(saved));
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Order not found"));
        }
    }

    private AdminOrder toAdminDto(Order o) {
        var user = o.getUser();
        return new AdminOrder(
                o.getId(),
                o.getTotalAmount(),
                o.getStatus(),
                o.getCreatedAt(),
                user != null ? user.getId() : null,
                user != null ? user.getUsername() : null,
                o.getShippingAddress(),
                o.getBillingAddress(),
                o.getOrderItems() != null ? o.getOrderItems().size() : 0
        );
    }
}
