import express from "express";

const path = require("path");
const app = express();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: messages,
});

// react와 nodejs 서버간 ajax 요청, cors 처리
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var cors = require("cors");
app.use(cors());

app.use(express.static(path.join(__dirname, "project/build")));

const getReact = (req, res) => {
  res.sendFile(path.join(__dirname, "/project/build/index.html"));
};

app.get("/", getReact);

export default app;
