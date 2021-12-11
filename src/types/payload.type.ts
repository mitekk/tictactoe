import { Field } from "./field.type";

export type Payload = {
  index: number;
  fields: Field[];
  playerTag?: string;
};
