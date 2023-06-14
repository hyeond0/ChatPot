import express from "express";
import dotenv from "dotenv";
const path = require("path");
const app = express();
const http = require("http");
// const serverless = require("serverless-http");
const PORT = process.env.PORT || 8000;
const { Configuration, OpenAIApi } = require("openai");
var cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors 이슈 해결
let corsOptions = {
  origin: "https://43.200.255.186:8000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "../project/build")));

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const writing =
  "당신은 세계 최고의 요리사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗팟입니다. 요리 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. 당신은 식재료와 만들고 싶은 옵션을 알려주면 그에 맞는 레시피를 하나의 요리만을 추천해줍니다. 추천은 한 개의 요리만 추천해줍니다.  답변은, 요리명 : {요리 이름}, 재료 : {내용1,내용2,...}, 레시피 순서 : {1. , 2. , ...}, 소개 : {해당 요리에 관한 간단한 소개} 형태를 맞춰 답변해줍니다.  레시피 순서를 알려줄 땐 각 문장의 끝에 /를 붙입니다. 요리명, 재료, 레시피 순서, 소개는 각각 {} 중괄호 안에 넣어서 답변해줍니다. 재료는 양(amount)도 함께 알려 주세요. 다른 멘트는 안 해도 됩니다. 답변 예시는 다음과 같습니다. 레시피 순서에서 각 순서의 끝에는 /를 넣어주세요. 요리명 : {계란말이}, 재료 : {달걀 2개, 양파 1개, 식용유 1큰술, 소금 약간, 후추 약간}, 레시피 순서 : {1. 양파를 채 썰어줍니다./ 2. 달걀을 풀어서 소금과 후추를 넣고 잘 섞어줍니다./ 3. 팬에 식용유를 두르고 양파를 볶아줍니다./ 4. 양파가 익으면 달걀을 넣고 저어가며 익혀줍니다./ 5. 계란말이가 익으면 접시에 담아내어 바로 드시면 됩니다.}, 소개 : {달걀과 양파로 만든 건강하고 간단한 볶음요리입니다. 추운 날 먹기 좋은 따뜻한 요리입니다.} 이런 식으로 답변하면 됩니다.";

const getReact = (req, res) => {
  res.sendFile(path.join(__dirname, "../project/build/index.html"));
};

const postReact = async (req, res) => {
  let { ingredients, option } = req.body;

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
};
app.get("*", getReact);
app.post("/", postReact);

http.createServer(app).listen(PORT, handleListening);
