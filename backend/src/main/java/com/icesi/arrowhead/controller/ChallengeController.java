package com.icesi.arrowhead.controller;

import com.icesi.arrowhead.dto.request.AnswerRequest;
import com.icesi.arrowhead.dto.response.AnswerResultResponse;
import com.icesi.arrowhead.dto.response.ChallengeResponse;
import com.icesi.arrowhead.service.ChallengeService;
import com.icesi.arrowhead.service.ScoreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;
    private final ScoreService scoreService;

    // GET /api/challenges — lista retos habilitados para el jugador
    @GetMapping
    public ResponseEntity<List<ChallengeResponse>> getAll() {
        return ResponseEntity.ok(challengeService.findAllEnabled());
    }

    // GET /api/challenges/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ChallengeResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(challengeService.findById(id));
    }

    // POST /api/challenges/{challengeId}/answer
    // TODO: extraer userId del SecurityContext en lugar de recibirlo como param
    @PostMapping("/{challengeId}/answer")
    public ResponseEntity<AnswerResultResponse> submitAnswer(
            @PathVariable Long challengeId,
            @RequestParam Long userId,
            @Valid @RequestBody AnswerRequest request) {
        return ResponseEntity.ok(scoreService.submitAnswer(userId, challengeId, request));
    }
}
