import axios from "axios";
import { Field } from "../types/field.type";

const baseURL = "http://localhost:3001";
const playerURL = `${baseURL}/player`;
const aiURL = `${baseURL}/ai`;

export type Status = "win" | "tie" | "ongoing";
export type PlayerTag = "o" | "x" | "empty";

export type ProcessMoveResponse = {
  fields: Field[];
  opponentMove?: number;
  event: {
    status: Status;
    playerTag: PlayerTag;
    indexes?: number[];
    score: number;
  };
};

export const tictacAPI = {
  playerMove: (index: Number, fields: Array<Field>) =>
    axios.post<ProcessMoveResponse>(playerURL, {
      index,
      fields,
    }),
  AIMove: (fields: Array<Field>) =>
    axios.post<ProcessMoveResponse>(aiURL, {
      fields,
    }),
};
