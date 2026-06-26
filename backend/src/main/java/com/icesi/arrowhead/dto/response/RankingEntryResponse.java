package com.icesi.arrowhead.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RankingEntryResponse {
    private Integer position;
    private String alias;
    private Integer totalScore;
    private Integer challengesCompleted;
}
