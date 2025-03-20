package com.example.dehobbyistback.controller;

import com.example.dehobbyistback.dao.OrderDao;
import com.example.dehobbyistback.model.Order;
import com.example.dehobbyistback.model.OrderStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderDao orderDao;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderDao.getAllOrders();
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
    public Order createOrder(@RequestBody Order order) {
        order.setStatus(OrderStatus.PENDING);
        return orderDao.saveOrder(order);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public Order updateOrderStatus(@PathVariable Long id, @RequestParam OrderStatus status) {
        Optional<Order> existingOrder = orderDao.getOrderById(id);
        if (existingOrder.isPresent()) {
            Order order = existingOrder.get();
            order.setStatus(status);
            return orderDao.saveOrder(order);
        }
        return null;
    }
}
