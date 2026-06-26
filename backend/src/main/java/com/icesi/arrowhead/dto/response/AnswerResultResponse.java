package com.icesi.arrowhead.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AnswerResultResponse {
    private Boolean correct;
    private Integer pointsEarned;
    private String message;
}
