package com.icesi.arrowhead.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private String token;
    private String alias;
    private String role;
}
