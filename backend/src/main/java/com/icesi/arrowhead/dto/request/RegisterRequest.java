package com.icesi.arrowhead.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank
    @Size(min = 3, max = 50)
    private String alias;

    // Código de acceso del evento, no una contraseña personal.
    @NotBlank
    private String code;
}
