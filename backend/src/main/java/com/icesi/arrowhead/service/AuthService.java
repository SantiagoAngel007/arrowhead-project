package com.icesi.arrowhead.service;

import com.icesi.arrowhead.dto.request.LoginRequest;
import com.icesi.arrowhead.dto.request.RegisterRequest;
import com.icesi.arrowhead.dto.response.AuthResponse;

public interface AuthService {

    // Registra un nuevo jugador y devuelve el token JWT
    AuthResponse register(RegisterRequest request);

    // Autentica un usuario existente y devuelve el token JWT
    AuthResponse login(LoginRequest request);
}
