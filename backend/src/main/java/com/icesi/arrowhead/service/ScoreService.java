package com.icesi.arrowhead.service;

import com.icesi.arrowhead.dto.request.AnswerRequest;
import com.icesi.arrowhead.dto.response.AnswerResultResponse;
import com.icesi.arrowhead.dto.response.ScoreResponse;

public interface ScoreService {

    // Evalúa la respuesta de un jugador a una pregunta
    // Si la opción es correcta, suma puntos al Score del reto
    AnswerResultResponse submitAnswer(Long userId, Long challengeId, AnswerRequest request);

    // Evalúa la flag enviada por el jugador para un reto (ej. contraseña encontrada
    // en una captura simulada). Si coincide, otorga los puntos restantes del reto.
    AnswerResultResponse submitFlag(Long userId, Long challengeId, String flag);

    // Puntaje actual del jugador en un reto (0 / sin completar si aún no ha jugado)
    ScoreResponse getScore(Long userId, Long challengeId);
}
