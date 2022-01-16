import React, { MouseEvent } from "react";
import { Highlight } from "../../types/highlight.type";
import { PlayerTag } from "../../types/playerTag.type";
import "./field.component.css";

type FieldProps = {
  index: number;
  player: PlayerTag;
  highlight?: Highlight;
  onSelect?: (e: MouseEvent<HTMLDivElement>, index: number) => void;
};

const defaultProps: FieldProps = {
  player: "empty",
  index: -1,
  onSelect: () => null,
  highlight: "none",
};

const BoardField = ({ index, player, highlight, onSelect }: FieldProps) => {
  const getContent = {
    x: <div>x</div>,
    o: <div>o</div>,
    empty: <div className="empty" onClick={(e) => onSelect!(e, index!)}></div>,
  };

  return (
    <div className={`fieldContainer ${highlight !== "none" && highlight}`}>
      {getContent[player]}
    </div>
  );
};

BoardField.defaultProps = defaultProps;

export { BoardField };
