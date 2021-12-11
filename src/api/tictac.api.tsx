import axios from "axios";
import { Field } from "../types/field.type";

const baseURL = "http://localhost:3001";
const playerURL = `${baseURL}/player`;
const aiURL = `${baseURL}/ai`;

export type ProcessMoveResponse = {
  fields: Field[];
  opponentMove?: number;
  event: {
    status: string;
    playerTag: string;
    indexes?: number[];
    score?: number;
  };
};

export default {
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
