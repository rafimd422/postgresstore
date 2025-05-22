import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet()); // helmet is a security middleware that helps you protect app by setting various HTTP headers
app.use(morgan("dev"));

app.get("/", (req, res) => {
  console.log(res.getHeaders());
  res.send("Hello From The backend");
});

app.listen(3000, () => {
  console.log("server is running on port: " + PORT);
});
