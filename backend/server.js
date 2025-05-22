import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello From The backend");
});

app.get("/test", (req, res) => {
  res.send("Hello From The Test Route");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
