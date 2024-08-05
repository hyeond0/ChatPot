package kr.co.chatpot.service;

import kr.co.chatpot.dto.request.OptionRequest;
import kr.co.chatpot.dto.request.ReRecipeRequest;
import kr.co.chatpot.dto.respons.RecipeResponse;

public interface RecipeService {
    RecipeResponse recommendRecipe(OptionRequest request);

    RecipeResponse retryRecommend(ReRecipeRequest request);
}
