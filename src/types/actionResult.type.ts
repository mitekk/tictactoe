import { Field } from "./field.type";

export type ActionResult = {
  fields: Field[];
  opponentMove?: number;
  event: {
    status: string;
    playerTag: string;
    indexes?: number[];
    score?: number;
  };
};
