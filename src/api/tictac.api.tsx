import axios from "axios";
import { FieldProps } from "../components/field/field";

const baseURL = "http://localhost:3001";

type ProcessMoveResponse = {
  fields: FieldProps[];
  opponentMove?: number;
  event: {
    status: string;
    playerTag: string;
    indexes?: number[];
    score?: number;
  };
};

export default {
  processMove: (index: Number, fields: Array<FieldProps>) =>
    axios.post<ProcessMoveResponse>(baseURL, {
      index,
      fields,
    }),
};
