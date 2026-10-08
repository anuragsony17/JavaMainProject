package fitness.activityservice;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import fitness.activityservice.models.Activity;

public interface ActivityRepository extends MongoRepository<Activity, String> {
    List<Activity> findByUserId(String userId);
}
