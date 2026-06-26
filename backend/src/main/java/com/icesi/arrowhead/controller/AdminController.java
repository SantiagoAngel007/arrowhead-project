package com.icesi.arrowhead.controller;

import com.icesi.arrowhead.dto.request.UserUpdateRequest;
import com.icesi.arrowhead.dto.response.ChallengeResponse;
import com.icesi.arrowhead.dto.response.UserResponse;
import com.icesi.arrowhead.service.ChallengeService;
import com.icesi.arrowhead.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserService userService;
    private final ChallengeService challengeService;

    // ── Usuarios ───────────────────────────────────────────────────────────────

    // GET /api/admin/users
    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    // GET /api/admin/users/{id}
    @GetMapping("/users/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    // PUT /api/admin/users/{id}
    @PutMapping("/users/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id,
                                                   @Valid @RequestBody UserUpdateRequest request) {
        return ResponseEntity.ok(userService.update(id, request));
    }

    // DELETE /api/admin/users/{id}
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // PATCH /api/admin/users/{id}/toggle-active
    @PatchMapping("/users/{id}/toggle-active")
    public ResponseEntity<UserResponse> toggleUserActive(@PathVariable Long id) {
        return ResponseEntity.ok(userService.toggleActive(id));
    }

    // ── Retos ──────────────────────────────────────────────────────────────────

    // GET /api/admin/challenges — todos los retos (incluye deshabilitados)
    @GetMapping("/challenges")
    public ResponseEntity<List<ChallengeResponse>> getAllChallenges() {
        return ResponseEntity.ok(challengeService.findAll());
    }

    // PATCH /api/admin/challenges/{id}/toggle-status
    @PatchMapping("/challenges/{id}/toggle-status")
    public ResponseEntity<ChallengeResponse> toggleChallengeStatus(@PathVariable Long id) {
        return ResponseEntity.ok(challengeService.toggleStatus(id));
    }
}
