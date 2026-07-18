package com.icesi.arrowhead.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ScoreResponse {
    private Integer points;
    private Integer maxPoints;
    private Boolean completed;
    private Integer attempts;
}
