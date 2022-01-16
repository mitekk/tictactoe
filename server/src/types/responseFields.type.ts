import { Field } from "./field.type";

export type Status = "win" | "tie" | "ongoing";

export type ResponseFields = {
  fields: Field[];
  status: Status;
  indexes?: number[];
  playerTag?: string;
  opponentMove?: number;
  score?: number;
};
