package com.icesi.arrowhead.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class QuestionResponse {
    private Long id;
    private String text;
    private Integer points;
    private Integer displayOrder;
    // Opciones sin el campo "correct" — nunca se expone al cliente
    private List<OptionResponse> options;
}
