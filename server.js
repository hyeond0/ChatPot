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
const writing = process.env.WRITING;
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

// Post 요청
const postReact = async (req, res) => {
  // 프론트에서 받아온 정보 저장.
  // console.log(req.body.postData);
  let { ingredients, option, userMessages, assistantMessages } =
    req.body.postData;
  // console.log(ingredients);
  let messages = [
    // 레시피 기본 가스라이팅
    {
      role: "system",

      content: writing.toString(),
    },
    {
      role: "user",
      content: writing.toString(),
    },
    {
      role: "assistant",
      content:
        "안녕하세요! 저는 챗팟입니다. 어떤 요리를 만들어보고 싶으신가요? 제가 도와드릴게요.",
    },

    { role: "user", content: `${ingredients}를 이용한 요리를 추천해 줘.` },
  ];

  // user 메시지와 chatgpt 메시지를 shift, pop 등으로 뽑아온 후 백엔드에 저장
  // while (userMessages.length != 0 || assistantMessages.length != 0) {
  //   if (userMessages.length != 0) {
  //     messages.push(
  //       JSON.parse(
  //         '{"role": "user", "content": "' +
  //           // userMessage의 맨 앞부터 문장 정리 후 저장
  //           String(userMessages.shift()).replace(/\n/g, "") +
  //           '"}'
  //       )
  //     );
  //   }
  //   if (assistantMessages.length != 0) {
  //     messages.push(
  //       // string을 JSON 형태로 parsing
  //       JSON.parse(
  //         '{"role": "assistant", "content": "' +
  //           // assistantMessage의 맨 앞부터 문장 정리 후 저장
  //           String(assistantMessages.shift()).replace(/\n/g, "") +
  //           '"}'
  //       )
  //     );
  //   }
  // }

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.5,
    max_tokens: 2048,
  });

  // // chatGPT의 레시피 출력 결과를 프론트엔드로 전송
  let recipe = completion.data.choices[0].message["content"];
  console.log(recipe);
  console.log(typeof recipe);
  // 요리 이름 추출
  // const recipeName = recipe.match(/"([^"]+)"/)[1];

  // // 재료 추출
  // const ingre = recipe.match(/재료:\s*([^\n]+)/)[1].split("\n- ");

  // // 요리 순서 추출
  // const cookingSteps = recipe
  //   .match(/요리 순서:\s*([\s\S]+)/)[1]
  //   .split(/\d+\./g)
  //   .map((step) => step.trim());

  // res.send(chatResponse);
  // res.json({ "assistant": chatResponse}); json으로 전송해야 한다면 이렇게 전송
};

app.get("/", getReact);
app.post("/", postReact);

export default app;
