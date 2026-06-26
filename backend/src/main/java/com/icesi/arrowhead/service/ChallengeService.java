package com.icesi.arrowhead.service;

import com.icesi.arrowhead.dto.response.ChallengeResponse;

import java.util.List;

public interface ChallengeService {

    // Devuelve solo los retos habilitados (para los jugadores)
    List<ChallengeResponse> findAllEnabled();

    // Devuelve todos los retos sin importar estado (para el admin)
    List<ChallengeResponse> findAll();

    ChallengeResponse findById(Long id);

    // Habilita o deshabilita un reto
    ChallengeResponse toggleStatus(Long id);
}
