package com.icesi.arrowhead.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FlagSubmitRequest {

    @NotBlank
    private String flag;
}
