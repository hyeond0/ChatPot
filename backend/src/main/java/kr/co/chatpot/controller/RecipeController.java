package kr.co.chatpot.controller;

import kr.co.chatpot.dto.RecipeDto;
import kr.co.chatpot.dto.request.OptionRequest;
import kr.co.chatpot.dto.request.ReRecipeRequest;
import kr.co.chatpot.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeService recipeService;

    @PostMapping("/selectOption")
    public RecipeDto selectOption(@RequestBody OptionRequest request) {
        return recipeService.recommendRecipe(request);
    }

    @PostMapping("/recipe")
    public RecipeDto recipe(@RequestBody ReRecipeRequest request) {
        return recipeService.retryRecommend(request);
    }
}

