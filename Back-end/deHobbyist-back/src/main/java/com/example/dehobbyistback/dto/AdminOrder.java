package com.example.dehobbyistback.dto;

import com.example.dehobbyistback.model.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record AdminOrder(
        Long id,
        BigDecimal totalAmount,
        OrderStatus status,
        LocalDateTime createdAt,
        Long userId,
        String username,
        String shippingAddress,
        String billingAddress,
        Integer itemCount
) {
}
