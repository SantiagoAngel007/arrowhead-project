package com.icesi.arrowhead.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration-ms}")
    private long jwtExpirationMs;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateToken(Authentication authentication) {
        // TODO: extraer el principal (UserDetailsImpl) y construir el token
        // Ejemplo base:
        // UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        // return Jwts.builder()
        //     .subject(userPrincipal.getUsername())
        //     .issuedAt(new Date())
        //     .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
        //     .signWith(getSigningKey())
        //     .compact();
        throw new UnsupportedOperationException("Implementar generateToken");
    }

    public String getUserEmailFromToken(String token) {
        // TODO: parsear el token y retornar el subject (email)
        throw new UnsupportedOperationException("Implementar getUserEmailFromToken");
    }

    public boolean validateToken(String token) {
        // TODO: validar firma, expiración y formato del token
        // Capturar JwtException y retornar false si es inválido
        throw new UnsupportedOperationException("Implementar validateToken");
    }
}
