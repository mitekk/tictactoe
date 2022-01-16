import express from "express";
import cors from "cors";
import { errorHandler } from "./error.middleware";
import * as TicTacHandler from "./tictac.handler";

const port = 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.post("/player", (req, res, next) => {
  let result;
  try {
    result = TicTacHandler.playerTurn(req.body);
  } catch (error) {
    next(error);
  }

  return res.send(result);
});

app.post("/ai", (req, res, next) => {
  let result;
  try {
    result = TicTacHandler.AITurn(req.body);
  } catch (error) {
    next(error);
  }

  return res.send(result);
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
