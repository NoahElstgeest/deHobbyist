package com.example.dehobbyistback.controller;

import com.example.dehobbyistback.dao.UserDao;
import com.example.dehobbyistback.dao.UserRepository;
import com.example.dehobbyistback.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class UserController {
    private final UserDao userDao;

    // Get all users (Admin only)
    @GetMapping
    public List<User> getAllUsers() {
        return userDao.getAllUsers();
    }

    // Get a user by ID (Admin only)
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userDao.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update a user (Admin only)
    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> userOptional = userDao.getUserById(id);
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOptional.get();
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        userDao.saveUser(user);

        return ResponseEntity.ok("User updated successfully.");
    }

    // Delete a user (Admin only)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        if (userDao.getUserById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        userDao.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully.");
    }
}
