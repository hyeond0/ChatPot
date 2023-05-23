import express from "express";
import dotenv from "dotenv";
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

// Post 요청
const postReact = async (req, res) => {
  // 프론트에서 받아온 정보 저장.
  let { ingredients, option, userMessages, assistantMessages } = req.body;
  let messages = [
    // 레시피 기본 가스라이팅
    {
      role: "system",
      content:
        "당신은 세계 최고의 요리사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗팟입니다. 당신은 식재료와 옵션을 알려주면 그것에 맞는 레시피를 답변해 줄 수 있습니다. 요리 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. 당신은 식재료와 만들고 싶은 옵션을 알려주면 그에 맞는 레시피를 이름, 소개, 레시피 순서 형태로 답변해줍니다.",
    },
    {
      role: "user",
      content:
        "당신은 세계 최고의 요리사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗팟입니다. 당신은 식재료와 옵션을 알려주면 그것에 맞는 레시피를 답변해 줄 수 있습니다. 요리 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. 당신은 식재료와 만들고 싶은 옵션을 알려주면 그에 맞는 레시피를 이름, 소개, 레시피 순서 형태로 답변해줍니다.",
    },
    {
      role: "assistant",
      content:
        "안녕하세요! 저는 챗팟입니다. 어떤 요리를 만들어보고 싶으신가요? 제가 도와드릴게요.",
    },

    { role: "user", content: "$}" },
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
  });

  // chatGPT의 레시피 출력 결과를 프론트엔드로 전송
  let recipe = completion.data.choices[0].message["content"];
  res.send(recipe);
  // res.json({ "assistant": recipe}); json으로 전송해야 한다면 이렇게 전송
};

app.get("/", getReact);
app.post("/", postReact);

export default app;
