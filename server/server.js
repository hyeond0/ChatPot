import express from "express";
import { getReact, postReact, reRecipe } from "./reactController";
const path = require("path");
const app = express();
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

app.get("*", getReact);
app.post("/selectOption", postReact);
app.post("/recipe", reRecipe);

export default app;
