package com.icesi.arrowhead.controller;

import com.icesi.arrowhead.dto.response.RankingEntryResponse;
import com.icesi.arrowhead.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ranking")
@RequiredArgsConstructor
public class RankingController {

    private final RankingService rankingService;

    // GET /api/ranking — ranking global
    @GetMapping
    public ResponseEntity<List<RankingEntryResponse>> getGlobal() {
        return ResponseEntity.ok(rankingService.getGlobalRanking());
    }

    // GET /api/ranking/challenge/{challengeId} — ranking por reto
    @GetMapping("/challenge/{challengeId}")
    public ResponseEntity<List<RankingEntryResponse>> getByChallenge(@PathVariable Long challengeId) {
        return ResponseEntity.ok(rankingService.getRankingByChallenge(challengeId));
    }
}
