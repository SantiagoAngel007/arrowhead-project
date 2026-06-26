package com.icesi.arrowhead.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OptionResponse {
    private Long id;
    private String label;
    private String text;
    // "correct" NO se incluye aquí — evita que el cliente vea la respuesta
}
