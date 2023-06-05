import dotenv from "dotenv";
import { env } from "process";
export const { Configuration, OpenAIApi } = require("openai");
dotenv.config();

export const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

export const writing =
  "당신은 세계 최고의 요리사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗팟입니다. 요리 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. 당신은 식재료와 만들고 싶은 옵션을 알려주면 그에 맞는 레시피를 하나의 요리만을 추천해줍니다. 추천은 한 개의 요리만 추천해줍니다. 답변은 요리 이름, 재료, 레시피 순서로 답변해줍니다. 답변을 해줄 때 요리 이름, 재료, 레시피 순서는 각각 중괄호, []로 감싸서 답변해줍니다.";
