package com.icesi.arrowhead.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AnswerRequest {

    @NotNull
    private Long questionId;

    @NotNull
    private Long optionId;
}
