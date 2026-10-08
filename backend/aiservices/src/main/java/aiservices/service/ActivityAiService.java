package aiservices.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import aiservices.models.Activity;
import aiservices.models.Recommended;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityAiService {

    private final GeminiService geminiService;

    public Recommended generateRecommendation(Activity activity) {

        String prompt = createPromptForActivity(activity);

        String response = geminiService.getRecommendation(prompt);

        log.info("Response From AI: {}", response);
        return processAIResponse(activity, response);
    }

    private Recommended processAIResponse(Activity activity, String aiResponse) {

        try {

            ObjectMapper mapper = new ObjectMapper();

            // Groq response ko parse karo
            JsonNode rootNode = mapper.readTree(aiResponse);

            /*
             * Groq response format:
             *
             * {
             * "choices": [
             * {
             * "message": {
             * "content": "{ actual JSON response }"
             * }
             * }
             * ]
             * }
             */

            JsonNode choicesNode = rootNode.path("choices");

            if (!choicesNode.isArray() || choicesNode.isEmpty()) {
                log.error("No choices found in Groq response");
                return createDefaultRecommendation(activity);
            }

            JsonNode messageNode = choicesNode
                    .get(0)
                    .path("message");

            String jsonContent = messageNode
                    .path("content")
                    .asText();

            if (jsonContent == null || jsonContent.isBlank()) {
                log.error("Empty content received from Groq");
                return createDefaultRecommendation(activity);
            }

            // Agar AI markdown code block bhej de to remove karo
            jsonContent = jsonContent
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();

            log.info("Parsed AI JSON Content: {}", jsonContent);

            // Actual recommendation JSON parse karo
            JsonNode analysisJson = mapper.readTree(jsonContent);

            JsonNode analysisNode = analysisJson.path("analysis");

            StringBuilder fullAnalysis = new StringBuilder();

            addAnalysisSection(
                    fullAnalysis,
                    analysisNode,
                    "overallAnalysis",
                    "Overall: ");

            addAnalysisSection(
                    fullAnalysis,
                    analysisNode,
                    "pace",
                    "Pace: ");

            addAnalysisSection(
                    fullAnalysis,
                    analysisNode,
                    "heartRate",
                    "Heart Rate: ");

            addAnalysisSection(
                    fullAnalysis,
                    analysisNode,
                    "caloriesBurned",
                    "Calories Burned: ");

            List<String> improvements = extractImprovements(
                    analysisJson.path("improvements"));

            List<String> suggestions = extractSuggestion(
                    analysisJson.path("suggestions"));

            List<String> safety = extractSafety(
                    analysisJson.path("safety"));

            return Recommended.builder()
                    .activityId(activity.getId())
                    .userId(activity.getUserId())
                    .type(activity.getType().toString())
                    .recommendation(fullAnalysis.toString().trim())
                    .improvement(improvements)
                    .suggestion(suggestions)
                    .safety(safety)
                    .createdAt(LocalDateTime.now())
                    .build();

        } catch (Exception e) {

            log.error("Error while processing AI response", e);

            return createDefaultRecommendation(activity);
        }
    }

    private Recommended createDefaultRecommendation(Activity activity) {

        return Recommended.builder()
                .activityId(activity.getId())
                .userId(activity.getUserId())
                .type(activity.getType().toString())
                .recommendation("Unable to generate detailed analysis.")
                .improvement(
                        Collections.singletonList(
                                "Continue with your current routine."))
                .suggestion(
                        Collections.singletonList(
                                "Consider consulting a fitness coach."))
                .safety(
                        Arrays.asList(
                                "Always warm up before exercise.",
                                "Stay hydrated.",
                                "Listen to your body."))
                .createdAt(LocalDateTime.now())
                .build();
    }

    private List<String> extractSafety(JsonNode safetyNode) {

        List<String> safety = new ArrayList<>();

        if (safetyNode.isArray()) {

            safetyNode.forEach(item -> safety.add(item.asText()));
        }

        return safety.isEmpty()
                ? Collections.singletonList(
                        "No specific safety recommendations provided")
                : safety;
    }

    private List<String> extractSuggestion(JsonNode suggestionNode) {

        List<String> suggestions = new ArrayList<>();

        if (suggestionNode.isArray()) {

            suggestionNode.forEach(suggestion -> {

                String workout = suggestion.path("workout").asText();

                String description = suggestion.path("description").asText();

                suggestions.add(
                        String.format(
                                "%s : %s",
                                workout,
                                description));
            });
        }

        return suggestions.isEmpty()
                ? Collections.singletonList(
                        "No specific suggestions provided")
                : suggestions;
    }

    private List<String> extractImprovements(
            JsonNode improveJsonNode) {

        List<String> improvements = new ArrayList<>();

        if (improveJsonNode.isArray()) {

            improveJsonNode.forEach(improvement -> {

                String area = improvement.path("area").asText();

                String recommendation = improvement
                        .path("recommendation")
                        .asText();

                improvements.add(
                        String.format(
                                "%s : %s",
                                area,
                                recommendation));
            });
        }

        return improvements.isEmpty()
                ? Collections.singletonList(
                        "No specific improvements provided")
                : improvements;
    }

    private void addAnalysisSection(
            StringBuilder fullAnalysis,
            JsonNode analysisNode,
            String key,
            String prefix) {

        if (!analysisNode.path(key).isMissingNode()) {

            fullAnalysis
                    .append(prefix)
                    .append(analysisNode.path(key).asText())
                    .append("\n\n");
        }
    }

    private String createPromptForActivity(Activity activity) {

        return String.format("""
                You are a professional fitness coach.

                Analyze this fitness activity and provide a detailed recommendation in the following JSON format:

                {
                  "analysis": {
                    "overallAnalysis": "Overall analysis here",
                    "pace": "Pace analysis here",
                    "heartRate": "Heart rate analysis here",
                    "caloriesBurned": "Calories burned analysis here"
                  },
                  "improvements": [
                    {
                      "area": "Area name",
                      "recommendation": "Detailed recommendation here"
                    }
                  ],
                  "suggestions": [
                    {
                      "workout": "Workout name",
                      "description": "Detailed workout description"
                    }
                  ],
                  "safety": [
                    "Safety point 1",
                    "Safety point 2"
                  ]
                }

                Analyze the following activity:

                Activity Type: %s
                Duration: %d minutes
                Calories Burned: %d
                Additional Metrics: %s

                Provide a detailed analysis focusing on:
                - Overall performance
                - Areas for improvement
                - Recommended next workout
                - Safety guidelines

                Ensure the response follows the exact JSON format shown above.
                Return ONLY the JSON object.
                Do not include markdown, explanations, or any extra text.
                """,

                activity.getType(),
                activity.getDuration(),
                activity.getCaloriesBurner(),
                activity.getAdditionalMetrics());
    }
}