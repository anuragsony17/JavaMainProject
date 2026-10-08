package aiservices.service;

import java.util.List;

import org.springframework.stereotype.Service;

import aiservices.models.Recommended;
import aiservices.repository.RecommentionRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecommendationServices {
  private final RecommentionRepository recommentionRepository;

  public List<Recommended> getUserRecommnedation(String userId) {
    return recommentionRepository.findByUserId(userId);
  }

  public Recommended getActivityRecommnedation(String activityId) {
    return recommentionRepository.findByActivityId(activityId)
        .orElseThrow(() -> new RuntimeException("no recommendation found for this activity" + activityId));
  }
}
