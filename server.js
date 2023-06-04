import express from "express";
import dotenv from "dotenv";
import { env } from "process";
const { Configuration, OpenAIApi } = require("openai");
const path = require("path");
const app = express();
var cors = require("cors");
dotenv.config();

// chatGPT API 설정
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//POST 요청 받을 수 있게 만듬
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// cors 이슈 해결
app.use(cors());

// react의 html 파일을 읽어옴.
app.use(express.static(path.join(__dirname, "project/build")));

const getReact = (req, res) => {
  res.sendFile(path.join(__dirname, "/project/build/index.html"));
};

let writing =
  "당신은 세계 최고의 요리사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗팟입니다. 요리 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. 당신은 식재료와 만들고 싶은 옵션을 알려주면 그에 맞는 레시피를 하나의 요리만을 추천해줍니다. 추천은 한 개의 요리만 추천해줍니다. 답변은 요리 이름, 재료, 레시피 순서로 답변해줍니다. 답변을 해줄 때 요리 이름, 재료, 레시피 순서는 각각 중괄호, []로 감싸서 답변해줍니다.";
// Post 요청
const postReact = async (req, res) => {
  // console.log(req.body);
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
        content: `${ingredients}를 이용한  ${option}요리를 요리 이름, 재료, 레시피 순서로 추천해 줘.`,
      },
    ];

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.1,
      top_p: 1,
      max_tokens: 2048,
    });

    // // chatGPT의 레시피 출력 결과를 프론트엔드로 전송
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

    // chatGPT의 레시피 추천 정보에서 따온 정보 object로 저장.
    // 요리 정보 react로 전송
    res.json({
      name: name,
      element: element,
      instructions: instructions,
    });
  }
};

app.get("/", getReact);
app.post("/", postReact);

export default app;
