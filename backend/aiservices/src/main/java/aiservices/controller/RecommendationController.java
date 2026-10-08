package aiservices.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import aiservices.models.Recommended;
import aiservices.service.RecommendationServices;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recommendation")
public class RecommendationController {

    private final RecommendationServices recommendationService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Recommended>> getUserRecommendation(
            @PathVariable String userId) {

        return ResponseEntity.ok(
                recommendationService.getUserRecommnedation(userId));
    }

    @GetMapping("/activity/{activityId}")
    public ResponseEntity<Recommended> getActivityRecommendation(
            @PathVariable String activityId) {

        return ResponseEntity.ok(
                recommendationService.getActivityRecommnedation(activityId));
    }

}