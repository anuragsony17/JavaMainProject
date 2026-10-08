package fitness.activityservice.dto;

import java.time.LocalDateTime;
import java.util.Map;
import fitness.activityservice.models.ActivityType;
import lombok.Data;

@Data
public class ActivityRequest {
     private String id;
    private String userId;
    private ActivityType type;
    private Integer duration;
    private Integer caloriesBurner;
    private LocalDateTime startTime;
    private Map<String , Object> additionalMetrics; 
}
