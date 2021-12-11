import express from "express";
import cors from "cors";
import { errorHandler } from "./error.middleware";
import * as TicTacHandler from "./tictac.handler";

const port = 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.post("/", (req, res, next) => {
  let result;
  try {
    result = TicTacHandler.processMove(req.body);
  } catch (error) {
    next(error);
  }

  return res.send(result);
});
app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
