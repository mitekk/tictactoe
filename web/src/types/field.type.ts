import { MouseEvent } from "react";
import { Highlight } from "./highlight.type";
import { PlayerTag } from "./playerTag.type";

export type Field = {
  player: PlayerTag;
  index: number;
  highlight?: Highlight;
  onSelect?: (e: MouseEvent<HTMLDivElement>, index: number) => void;
};
