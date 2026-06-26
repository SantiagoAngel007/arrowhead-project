package com.icesi.arrowhead.service;

import com.icesi.arrowhead.dto.request.AnswerRequest;
import com.icesi.arrowhead.dto.response.AnswerResultResponse;

public interface ScoreService {

    // Evalúa la respuesta de un jugador a una pregunta
    // Si la opción es correcta, suma puntos al Score del reto
    AnswerResultResponse submitAnswer(Long userId, Long challengeId, AnswerRequest request);
}
