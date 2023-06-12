import { writing, openai } from "./chatgpt";
const path = require("path");

export const getReact = (req, res) => {
  res.sendFile(path.join(__dirname, "../project/build/index.html"));
};

export const postReact = async (req, res) => {
  let { ingredients, option } = req.body;

  if (ingredients) {
    let messages = [
      // 레시피 기본 가스라이팅
      {
        role: "system",
        content: writing,
      },
      {
        role: "user",
        content: writing,
      },
      {
        role: "assistant",
        content:
          "안녕하세요! 무엇을 도와드릴까요? 식재료와 만들고 싶은 옵션을 알려주세요.",
      },

      {
        role: "user",
        content: `${ingredients}를 이용한 ${option}요리를 한가지만 추천해 줘. 답변은, 요리명 : {요리 이름}, 재료 : {내용1,내용2,...}, 레시피 순서 : {1. , 2. , ...}, 소개 : {해당 요리에 관한 간단한 소개} 형태를 맞춰 답변해줘. 레시피 순서를 알려줄 땐 각 문장의 끝에 /를 붙여서 답변해줘. 재료는 양(amount)도 함께 알려 줘. 다른 멘트는 안해도 돼.`,
      },
    ];

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.1,
      top_p: 1,
      max_tokens: 2048,
    });

    let recipeString = completion.data.choices[0].message["content"];
    console.log(recipeString);

    const dishNameRegex = /요리명\s*:\s*{([^}]*)}/;
    // 요리명 다음에 오는 중괄호를 찾음.
    const dishNameMatch = recipeString.match(dishNameRegex);
    // recipeString에서 dishNameRegex와 일치하는 부분을 찾아 매칭.
    const dishName = dishNameMatch ? dishNameMatch[1].trim() : "";
    // trim() 함수를 사용하여 앞뒤의 공백을 제거.

    const elementsRegex = /재료\s*:\s*{([^}]*)}/;
    // 재료 다음에 오는 중괄호({}) 안의 내용을 찾음.
    const elementsMatch = recipeString.match(elementsRegex);
    // recipeString에서 elementsRegex와 일치하는 부분을 찾아 매칭.
    let elements = elementsMatch ? elementsMatch[1].split(",") : [];
    elements = elements.map((s) => s.trim());
    // split하면서 생기는 양 옆 공백 제거
    //  ,로 구분하여 문자열을 배열로 변환.

    const recipeStepsRegex = /레시피\s*순서\s*:\s*{([^}]*)}/;
    // 레시피 순서 다음에 오는 중괄호({}) 안의 내용을 찾음.
    const recipeStepsMatch = recipeString.match(recipeStepsRegex);
    // console.log(recipeStepsMatch[1].split(".") + ".");
    // recipeString에서 recipeStepsMatch 일치하는 부분을 찾아 매칭.
    let recipeSteps = recipeStepsMatch ? recipeStepsMatch[1].split("/") : [];
    recipeSteps = recipeSteps.map((s) => s.trim());

    const introductionRegex = /소개\s*:\s*{([^}]*)}/;
    // 소개 다음에 오는 중괄호({}) 안의 내용을 찾음.
    const introductionMatch = recipeString.match(introductionRegex);
    // recipeString에서 introductionRegex와 일치하는 부분을 찾아 매칭.
    const introduction = introductionMatch ? introductionMatch[1].trim() : "";

    // 요리 정보 react로 전송
    res.json({
      dishName: dishName,
      elements: elements,
      recipeSteps: recipeSteps,
      introduction: introduction,
    });
  }
};
