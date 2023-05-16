import app from "./server";

const PORT = process.env.PORT || 8080;

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
