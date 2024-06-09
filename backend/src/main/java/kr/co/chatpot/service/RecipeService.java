package kr.co.chatpot.service;

import kr.co.chatpot.dto.RecipeDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecipeService {
    private final RecipeParser recipeParser;
    private final ChatGPTService chatgptService;

    public RecipeDto recommendRecipe(String ingredients, String option) {
        String prompt = String.format(
            "%s를 이용한 %s요리를 한가지만 추천해 줘. 답변은, 요리명 : {요리명 }, 재료 : {내용1,내용2,...}, 레시피 순서 : {1. , 2. , ...}, 소개 : {해당 요리에 관한 간단한 소개} 형태를 맞춰 답변해줘. 레시피 순서를 알려줄 땐 각 문장의 끝에 /를 붙여서 답변해줘. 요리명, 재료, 레시피 순서, 소개 내용들을 {} 중괄호 안에 넣어서 답변해줘. 재료는 양(amount)도 함께 알려 줘. 다른 멘트는 안해도 돼.",
            ingredients, option);
        JSONArray array = new JSONArray();

        JSONObject system = new JSONObject();
        system.put("role", "system");
        String writing =
            "당신은 세계 최고의 요리사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗팟입니다. 요리 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. 당신은 식재료와 만들고 싶은 옵션을 알려주면 그에 맞는 레시피를 하나의 요리만을 추천해줍니다. 추천은 한 개의 요리만 추천해줍니다. 답변은, 요리명 : {요리 이름}, 재료 : {내용1,내용2,...}, 레시피 순서 : {1. , 2. , ...}, 소개 : {해당 요리에 관한 간단한 소개} 형태를 맞춰 답변해줍니다.  레시피 순서를 알려줄 땐 각 문장의 끝에 /를 붙입니다. 요리명, 재료, 레시피 순서, 소개는 각각 {} 중괄호 안에 넣어서 답변해줍니다. 재료는 양(amount)도 함께 알려 주세요. 다른 멘트는 안 해도 됩니다. 답변 예시는 다음과 같습니다. 레시피 순서에서 각 순서의 끝에는 /를 넣어주세요.";
        system.put("content", writing);

        JSONObject assistant = new JSONObject();
        assistant.put("role", "assistant");
        String example =
            "요리명 : {계란말이}, 재료 : {달걀 2개, 양파 1개, 식용유 1큰술, 소금 약간, 후추 약간}, 레시피 순서 : {1. 양파를 채 썰어줍니다./ 2. 달걀을 풀어서 소금과 후추를 넣고 잘 섞어줍니다./ 3. 팬에 식용유를 두르고 양파를 볶아줍니다./ 4. 양파가 익으면 달걀을 넣고 저어가며 익혀줍니다./ 5. 계란말이가 익으면 접시에 담아내어 바로 드시면 됩니다.}, 소개 : {달걀과 양파로 만든 건강하고 간단한 볶음요리입니다. 추운 날 먹기 좋은 따뜻한 요리입니다.}";
        assistant.put("content", example);

        JSONObject promptObject = new JSONObject();
        promptObject.put("role", "user");
        promptObject.put("content", prompt);

        array.add(system);
        array.add(assistant);
        array.add(promptObject);


        log.info("array: {}", array);
        String response = chatgptService.sendMessage(array);
        log.info("response: {}", response);

        RecipeDto recipeDto = recipeParser.parseRecipe(response);
        log.info("recipeDto: {}", recipeDto);

        return recipeDto;
    }
}
