package com.example.dehobbyistback.controller;

import com.example.dehobbyistback.dao.UserDao;
import com.example.dehobbyistback.dao.UserRepository;
import com.example.dehobbyistback.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserDao userDao;

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<User> getCurrentUser(Authentication auth) {
        String username = auth.getName();
        User user = userDao.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<User> getAllUsers() {
        return userDao.getAllUsers();
    }

    @GetMapping("/{id}")
    @PreAuthorize("#id == authentication.principal.id or hasAuthority('ADMIN')")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userDao.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("#id == authentication.principal.id or hasAuthority('ADMIN')")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> userOptional = userDao.getUserById(id);
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOptional.get();
        if (updatedUser.getUsername() != null)        user.setUsername(updatedUser.getUsername());
        if (updatedUser.getEmail() != null)           user.setEmail(updatedUser.getEmail());
        if (updatedUser.getRole() != null)           user.setRole(updatedUser.getRole());
        if (updatedUser.getShippingAddress() != null) user.setShippingAddress(updatedUser.getShippingAddress());
        if (updatedUser.getBillingAddress() != null)  user.setBillingAddress(updatedUser.getBillingAddress());
        userDao.saveUser(user);

        return ResponseEntity.ok(Map.of("message", "User updated successfully."));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userDao.getUserById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        userDao.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
