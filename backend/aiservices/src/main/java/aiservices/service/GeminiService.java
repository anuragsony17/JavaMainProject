package aiservices.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.time.Duration;

@Service
public class GeminiService {

        private final WebClient webClient;

        @Value("${gemini.api.url}")
        private String geminiApiUrl;

        @Value("${gemini.api.key}")
        private String geminiApiKey;

        public GeminiService(WebClient.Builder webClientBuilder) {
                this.webClient = webClientBuilder.build();
        }

        public String getRecommendation(String details) {

                Map<String, Object> message = Map.of(
                                "role", "user",
                                "content", details);

                Map<String, Object> requestBody = Map.of(
                                "model", "openai/gpt-oss-20b",
                                "messages", List.of(message));

                System.out.println("🚀 Calling Groq API...");

                String response = webClient.post()
                                .uri("https://api.groq.com/openai/v1/chat/completions")
                                .header("Content-Type", "application/json")
                                .header("Authorization", "Bearer " + geminiApiKey)
                                .bodyValue(requestBody)
                                .retrieve()
                                .bodyToMono(String.class)
                                .timeout(Duration.ofSeconds(30))
                                .block();

                System.out.println("✅ Groq Response Received!");
                System.out.println(response);

                return response;
        }
}
