import { StateReadResult } from "./stateReadResult.type";

export type ReadResult = ({ [x: string]: StateReadResult } | undefined)[];
