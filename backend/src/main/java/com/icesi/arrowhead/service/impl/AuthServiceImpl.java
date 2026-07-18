package com.icesi.arrowhead.service.impl;

import com.icesi.arrowhead.domain.entity.User;
import com.icesi.arrowhead.domain.enums.Role;
import com.icesi.arrowhead.dto.request.LoginRequest;
import com.icesi.arrowhead.dto.request.RegisterRequest;
import com.icesi.arrowhead.dto.response.AuthResponse;
import com.icesi.arrowhead.exception.BadRequestException;
import com.icesi.arrowhead.exception.UnauthorizedException;
import com.icesi.arrowhead.repository.UserRepository;
import com.icesi.arrowhead.security.CustomUserDetails;
import com.icesi.arrowhead.security.JwtTokenProvider;
import com.icesi.arrowhead.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${app.access-code}")
    private String accessCode;

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (!accessCode.equals(request.getCode())) {
            throw new UnauthorizedException("Código de acceso inválido");
        }
        if (userRepository.existsByAlias(request.getAlias())) {
            throw new BadRequestException("El alias ya está en uso");
        }

        User user = User.builder()
                .alias(request.getAlias())
                .password(passwordEncoder.encode(request.getCode()))
                .role(Role.PLAYER)
                .active(true)
                .build();
        userRepository.save(user);

        return buildAuthResponse(user);
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByAlias(request.getAlias())
                .orElseThrow(() -> new UnauthorizedException("Alias o código incorrecto"));

        if (!passwordEncoder.matches(request.getCode(), user.getPassword())) {
            throw new UnauthorizedException("Alias o código incorrecto");
        }
        if (!user.getActive()) {
            throw new UnauthorizedException("Este usuario está desactivado");
        }

        return buildAuthResponse(user);
    }

    private AuthResponse buildAuthResponse(User user) {
        Authentication authentication =
                new UsernamePasswordAuthenticationToken(new CustomUserDetails(user), null);
        String token = jwtTokenProvider.generateToken(authentication);
        return AuthResponse.builder()
                .token(token)
                .alias(user.getAlias())
                .role(user.getRole().name())
                .build();
    }
}
