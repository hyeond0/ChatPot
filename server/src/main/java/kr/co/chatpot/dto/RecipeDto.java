package kr.co.chatpot.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDto {
    private String dishName;
    private List<String> elements;
    private List<String> recipeSteps;
    private String introduction;
}
