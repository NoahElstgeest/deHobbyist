package com.example.dehobbyistback.controller;

import com.example.dehobbyistback.dao.UserDao;
import com.example.dehobbyistback.model.User;
import com.example.dehobbyistback.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDao userDao;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

        Optional<User> userOptional = userDao.findByUsername(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        User user = userOptional.get();
        String token = jwtUtil.generateToken(user);

        return ResponseEntity.ok(Map.of(
                "token", token,
                "role", user.getRole().name()
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userDao.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already taken.");
        }

        user.setPassword(userDao.loadUserByUsername(user.getUsername()).getPassword());
        userDao.saveUser(user);

        return ResponseEntity.ok("User registered successfully.");
    }
}
