package aiservices.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import aiservices.models.Activity;
import aiservices.models.Recommended;
import aiservices.repository.RecommentionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityMessageListener {

    private final ActivityAiService activityAiService;
    private final RecommentionRepository recommentionRepository;

    @Value("${kafka.topic}")
    private String topicName;

    @KafkaListener(topics = "${kafka.topic}", groupId = "activity-processor-group")
    public void processeActivity(Activity activity) {
        log.info("Recived Activity for processing : {}", activity.getUserId());

        try {
            Recommended recommendation = activityAiService.generateRecommendation(activity);
            recommentionRepository.save(recommendation);
        } catch (Exception e) {
            log.error("AI failed for activity: {}", activity.getId(), e);
        }
    }

}
