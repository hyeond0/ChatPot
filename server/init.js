import app from "./server";
const serverless = require("serverless-http");
const PORT = process.env.PORT || 8080;

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚀`);

module.exports.handler = serverless(app);
// app.listen(PORT, handleListening);
