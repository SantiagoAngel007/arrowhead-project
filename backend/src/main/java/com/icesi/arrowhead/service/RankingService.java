package com.icesi.arrowhead.service;

import com.icesi.arrowhead.dto.response.RankingEntryResponse;

import java.util.List;

public interface RankingService {

    // Ranking global ordenado por puntos totales
    List<RankingEntryResponse> getGlobalRanking();

    // Ranking filtrado por un reto específico
    List<RankingEntryResponse> getRankingByChallenge(Long challengeId);
}
