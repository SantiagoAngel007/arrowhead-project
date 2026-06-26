package com.icesi.arrowhead.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ChallengeResponse {
    private Long id;
    private String name;
    private String description;
    private String level;
    private String status;
    private Integer maxPoints;
    private Integer displayOrder;
    private List<QuestionResponse> questions;
}
