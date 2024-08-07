package kr.co.chatpot.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import kr.co.chatpot.dto.RecipeDto;
import org.springframework.stereotype.Component;

@Component
public class RecipeParser {
    public RecipeDto parseRecipe(String recipeString) {
        String dishName = extractContent(recipeString, "요리명\\s*:\\s*\\{([^}]*)}");

        String elementsString = extractContent(recipeString, "재료\\s*:\\s*\\{([^}]*)}");
        List<String> elements = elementsString.isEmpty() ? new ArrayList<>() :
                Arrays.asList(elementsString.split("\\|\\s*"));
        String recipeStepsString = extractContent(recipeString, "레시피\\s*순서\\s*:\\s*\\{([^}]*)}");
        List<String> recipeSteps = recipeStepsString.isEmpty() ? new ArrayList<>() :
                Arrays.asList(recipeStepsString.split("\\s*/\\s*"));

        String introduction = extractContent(recipeString, "소개\\s*:\\s*\\{([^}]*)}");

        return new RecipeDto(dishName, elements, recipeSteps, introduction);
    }

    private String extractContent(String text, String regex) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) {
            return matcher.group(1).trim();
        }
        return "";
    }
}
