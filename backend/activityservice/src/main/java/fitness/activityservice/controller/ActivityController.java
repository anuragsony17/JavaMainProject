package fitness.activityservice.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fitness.activityservice.dto.ActivityRequest;
import fitness.activityservice.dto.ActivityResponse;
import fitness.activityservice.services.ActivityServices;
import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/api/activites")
@AllArgsConstructor
public class ActivityController {

   private final ActivityServices activityServices;

   @PostMapping
   public ResponseEntity<ActivityResponse> trackActivity(@RequestBody ActivityRequest request,
         @RequestHeader("X-User-ID") String userId) {
      if (userId != null) {
         request.setUserId(userId);
      }
      return ResponseEntity.ok(activityServices.trackActivity(request));
   }

   @GetMapping
   public ResponseEntity<List<ActivityResponse>> getUserActivities(@RequestHeader("X-User-ID") String userId) {

      return ResponseEntity.ok(activityServices.getUserActivities(userId));

   }

   @GetMapping("/{activityId}")
   public ResponseEntity<ActivityResponse> getActivity(@PathVariable String activityId) {
      return ResponseEntity.ok(activityServices.getActivityById(activityId));
   }
}
