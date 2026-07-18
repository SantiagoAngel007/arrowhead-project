package com.icesi.arrowhead.service.impl;

import com.icesi.arrowhead.domain.entity.Score;
import com.icesi.arrowhead.domain.entity.User;
import com.icesi.arrowhead.dto.response.RankingEntryResponse;
import com.icesi.arrowhead.repository.ScoreRepository;
import com.icesi.arrowhead.repository.UserRepository;
import com.icesi.arrowhead.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RankingServiceImpl implements RankingService {

    private final ScoreRepository scoreRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<RankingEntryResponse> getGlobalRanking() {
        List<Object[]> rows = scoreRepository.findRankingGlobal();
        List<RankingEntryResponse> ranking = new java.util.ArrayList<>();

        int position = 1;
        for (Object[] row : rows) {
            Long userId = ((Number) row[0]).longValue();
            int totalScore = ((Number) row[1]).intValue();
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) continue;

            long challengesCompleted = scoreRepository.findByUserId(userId)
                    .stream().filter(Score::getCompleted).count();

            ranking.add(RankingEntryResponse.builder()
                    .position(position++)
                    .alias(user.getAlias())
                    .totalScore(totalScore)
                    .challengesCompleted((int) challengesCompleted)
                    .build());
        }
        return ranking;
    }

    @Override
    @Transactional(readOnly = true)
    public List<RankingEntryResponse> getRankingByChallenge(Long challengeId) {
        List<Score> scores = scoreRepository.findByChallengeId(challengeId).stream()
                .filter(Score::getCompleted)
                .sorted(Comparator.comparing(Score::getPoints).reversed())
                .toList();

        List<RankingEntryResponse> ranking = new java.util.ArrayList<>();
        int position = 1;
        for (Score score : scores) {
            ranking.add(RankingEntryResponse.builder()
                    .position(position++)
                    .alias(score.getUser().getAlias())
                    .totalScore(score.getPoints())
                    .challengesCompleted(1)
                    .build());
        }
        return ranking;
    }
}
