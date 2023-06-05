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
          "안녕하세요! 무엇을 도와드릴까요? 식재료와 만들고 싶은 옵션을 알려주세요.",
      },

      {
        role: "user",
        content: `${ingredients} 를 이용한 ${option} 요리를 한가지만 추천해 줘. 답변은 요리 이름, 재료, 레시피 순서로 부탁해. 답변을 해줄 때 요리 이름, 재료, 레시피 순서는 각각 중괄호, []로 감싸서 답변해줘. 해당 양식을 기억했다가, 메뉴 추천을 부탁할 때 같은 양식으로 답변해줘.`,
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
