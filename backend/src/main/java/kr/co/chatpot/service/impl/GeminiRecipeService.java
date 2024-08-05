package kr.co.chatpot.service.impl;

import java.util.ArrayList;
import java.util.List;
import kr.co.chatpot.dto.RecipeDto;
import kr.co.chatpot.dto.request.ChatMessage;
import kr.co.chatpot.dto.request.OptionRequest;
import kr.co.chatpot.dto.request.ReRecipeRequest;
import kr.co.chatpot.dto.respons.RecipeResponse;
import kr.co.chatpot.service.RecipeParser;
import kr.co.chatpot.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GeminiRecipeService implements RecipeService {
    private final RecipeParser recipeParser;
    private final VertexAiGeminiChatModel chatModel;

    @Value("${chat.system.message}")
    private String sysMessage;

    @Override
    public RecipeResponse recommendRecipe(OptionRequest request) {
        String userMessageContent = createUserMessageContent(request.getIngredients(), request.getOption());
        Prompt prompt = createPrompt(sysMessage, userMessageContent);

        String responseContent = getChatResponseContent(prompt);
        RecipeDto recipeDto = recipeParser.parseRecipe(responseContent);

        List<ChatMessage> chatMessages = createChatMessages(sysMessage, userMessageContent, responseContent);
        return RecipeResponse.of(recipeDto, chatMessages);
    }

    @Override
    public RecipeResponse retryRecommend(ReRecipeRequest request) {
        List<ChatMessage> chatHistory = request.getMessages();

        List<String> excludedDishes = extractDishNames(chatHistory);
        String userMessageContent =
                chatHistory.get(1).getContent() + String.join(", ", excludedDishes) + "을 제외하고 다른 요리 추천해 줘.";
        Prompt prompt = createPrompt(sysMessage, userMessageContent);

        String responseContent = getChatResponseContent(prompt);
        RecipeDto recipeDto = recipeParser.parseRecipe(responseContent);

        chatHistory.add(new ChatMessage("assistant", responseContent));
        return RecipeResponse.of(recipeDto, chatHistory);
    }

    private String createUserMessageContent(List<String> ingredients, List<String> options) {
        return String.format(
                "%s를 이용한 %s요리를 한가지만 추천해 줘. 답변은, 요리명 : {요리명 }, 재료 : {내용1,내용2,...}, 레시피 순서 : {1. , 2. , ...}, 소개 : {해당 요리에 관한 간단한 소개} 형태를 맞춰 답변해줘. 레시피 순서를 알려줄 땐 각 문장의 끝에 /를 붙여서 답변해줘. 요리명, 재료, 레시피 순서, 소개 내용들을 {} 중괄호 안에 넣어서 답변해줘. 재료는 양(amount)도 함께 알려 줘. 다른 멘트는 안해도 돼.",
                String.join(", ", ingredients),
                String.join(", ", options)
        );
    }

    private Prompt createPrompt(String sysMessage, String userMessageContent) {
        SystemMessage systemMessage = new SystemMessage(sysMessage);
        UserMessage userMessage = new UserMessage(userMessageContent);
        return new Prompt(List.of(systemMessage, userMessage));
    }

    private String getChatResponseContent(Prompt prompt) {
        ChatResponse response = chatModel.call(prompt);
        return response.getResult().getOutput().getContent();
    }

    private List<ChatMessage> createChatMessages(String sysMessage, String userMessageContent,
                                                 String assistantMessageContent) {
        return List.of(
                new ChatMessage("system", sysMessage),
                new ChatMessage("user", userMessageContent),
                new ChatMessage("assistant", assistantMessageContent)
        );
    }

    private List<String> extractDishNames(List<ChatMessage> chatHistory) {
        List<String> dishes = new ArrayList<>();
        chatHistory.stream()
                .filter(message -> "assistant".equals(message.getRole()))
                .forEach(message -> dishes.add(recipeParser.parseRecipe(message.getContent()).getDishName()));
        return dishes;
    }
}
