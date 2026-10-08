package aiservices.models;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;

@Document
@Data
@Builder
public class Recommended {
    @Id
    private String id;
    private String activityId;
    private String type;
    private String userId;
    private String recommendation;
    private List<String> safety;
    private List<String> suggestion;
    private List<String> improvement;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
}
