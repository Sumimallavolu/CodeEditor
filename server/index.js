import express from "express";
import axios from "axios";
import cors from "cors";
import qs from "qs";

const app = express();
app.use(cors());
app.use(express.json());


app.post("/compile", (req, res) => {
    console.log("req.body",req.body)
  let code = req.body.code;
  let language = req.body.language;
  let data = {
    code: code,
    language: "js",
  };
  let config = {
    method: "post",
    url: "https://api.codex.jaagrav.in",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  axios(config)
    .then((response) => {
      res.send(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(8000, () => {
  console.log("Backend connected with port 8000");
});
