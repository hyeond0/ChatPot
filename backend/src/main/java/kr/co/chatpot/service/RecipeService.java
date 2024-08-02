package kr.co.chatpot.service;

import kr.co.chatpot.dto.RecipeDto;
import kr.co.chatpot.dto.request.OptionRequest;
import kr.co.chatpot.dto.request.ReRecipeRequest;

public interface RecipeService {
    RecipeDto recommendRecipe(OptionRequest request);
    RecipeDto retryRecommend(ReRecipeRequest request);
}
