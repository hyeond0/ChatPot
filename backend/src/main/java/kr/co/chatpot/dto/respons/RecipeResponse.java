package kr.co.chatpot.dto.respons;

import java.util.List;
import kr.co.chatpot.dto.RecipeDto;
import kr.co.chatpot.dto.request.ChatMessage;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RecipeResponse {
    private String dishName;
    private List<String> elements;
    private List<String> recipeSteps;
    private String introduction;
    private List<ChatMessage> messages;

    private RecipeResponse(
            String dishName,
            List<String> elements,
            List<String> recipeSteps,
            String introduction,
            List<ChatMessage> messages
    ) {
        this.dishName = dishName;
        this.elements = elements;
        this.recipeSteps = recipeSteps;
        this.introduction = introduction;
        this.messages = messages;
    }

    public static RecipeResponse of(RecipeDto recipe, List<ChatMessage> messages) {
        return new RecipeResponse(
                recipe.getDishName(),
                recipe.getElements(),
                recipe.getRecipeSteps(),
                recipe.getIntroduction(),
                messages
        );
    }
}
