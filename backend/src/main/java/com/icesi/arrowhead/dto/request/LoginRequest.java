package com.icesi.arrowhead.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

    @NotBlank
    private String alias;

    // Código de acceso del evento, no una contraseña personal.
    @NotBlank
    private String code;
}
