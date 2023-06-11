import express from "express";
import { getReact, postReact } from "./reactController";
const path = require("path");
const app = express();
var cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors 이슈 해결
app.use(cors());
app.use(express.static(path.join(__dirname, "../project/build")));

app.get("*", getReact);
app.post("/", postReact);

export default app;
