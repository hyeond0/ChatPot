import { writing, openai } from "./chatgpt";
const path = require("path");

export const getReact = (req, res) => {
  res.sendFile(path.join(__dirname, "/project/build/index.html"));
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
          "안녕하세요! 어떤 요리를 만들고 싶으신가요? 제가 도와드릴게요.",
      },

      {
        role: "user",
        content: `${ingredients}를 이용한  ${option}요리를 요리 이름, 재료, 레시피 순서로 하나의 요리만 추천해 줘. 답변은 요리 이름, 재료, 레시피 순서로 답변해줍니다. 답변을 해줄 때 요리 이름, 재료, 레시피 순서는 각각 중괄호, []로 감싸서 답변해줍니다.`,
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

    // 이름 추출
    const nameRegex = /{([^}]*)}/;
    const nameMatch = recipeString.match(nameRegex);
    const name = nameMatch ? nameMatch[1] : "";

    // 식재료 추출
    const elementRegex = /\[재료\]\n([\s\S]*?)\n\n/;
    const elementMatch = recipeString.match(elementRegex);
    const element = elementMatch ? elementMatch[1].split("\n") : [];

    // 레시피 순서 추출
    const instructionsRegex = /\[레시피 순서\]\n([\s\S]*)/;
    const instructionsMatch = recipeString.match(instructionsRegex);
    const instructions = instructionsMatch
      ? instructionsMatch[1].split("\n")
      : [];

    // 요리 정보 react로 전송
    res.json({
      name: name,
      element: element,
      instructions: instructions,
    });
  }
};
