import express from "express";
import { getReact, postReact } from "./reactController";
const path = require("path");
const app = express();
var cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors 이슈 해결
let corsOptions = {
  origin: "https://408984aa.chatpot.pages.dev",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "../project/build")));

app.get("*", getReact);
app.post("/", postReact);

export default app;
