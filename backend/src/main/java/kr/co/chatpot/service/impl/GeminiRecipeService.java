package kr.co.chatpot.service.impl;

import java.util.List;
import kr.co.chatpot.dto.request.ChatMessage;
import kr.co.chatpot.dto.RecipeDto;
import kr.co.chatpot.dto.request.OptionRequest;
import kr.co.chatpot.dto.request.ReRecipeRequest;
import kr.co.chatpot.service.RecipeParser;
import kr.co.chatpot.service.RecipeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class GeminiRecipeService implements RecipeService {
    private final RecipeParser recipeParser;
    private final VertexAiGeminiChatModel chatModel;

    @Value("${chat.system.message}")
    private String sysMessage;


    public RecipeDto recommendRecipe(OptionRequest request) {
        String ingredients = String.join(", ", request.getIngredients());
        String option = String.join(", ", request.getOption());
        String message = String.format(
                "%s를 이용한 %s요리를 한가지만 추천해 줘. 답변은, 요리명 : {요리명 }, 재료 : {내용1,내용2,...}, 레시피 순서 : {1. , 2. , ...}, 소개 : {해당 요리에 관한 간단한 소개} 형태를 맞춰 답변해줘. 레시피 순서를 알려줄 땐 각 문장의 끝에 /를 붙여서 답변해줘. 요리명, 재료, 레시피 순서, 소개 내용들을 {} 중괄호 안에 넣어서 답변해줘. 재료는 양(amount)도 함께 알려 줘. 다른 멘트는 안해도 돼.",
                ingredients, option);

        Prompt prompt = new Prompt(List.of(new SystemMessage(sysMessage), new UserMessage(message)));

        ChatResponse response = chatModel.call(prompt);
        String result = response.getResult().getOutput().getContent();

        return recipeParser.parseRecipe(result);
    }

    public RecipeDto retryRecommend(ReRecipeRequest request) {
        List<ChatMessage> chatMessages = request.getChatMessages();
        List<Message> messages = chatMessages.stream()
                .map(this::createMessage)
                .toList();

        ChatResponse response = chatModel.call(new Prompt(messages));

        String result = response.getResult().getOutput().getContent();

        return recipeParser.parseRecipe(result);
    }

    private Message createMessage(ChatMessage chatMessage) {
        return switch (chatMessage.getRole()) {
            case "system" -> new SystemMessage(chatMessage.getContent());
            case "assistant" -> new AssistantMessage(chatMessage.getContent());
            default -> new UserMessage(chatMessage.getContent());
        };
    }
}
