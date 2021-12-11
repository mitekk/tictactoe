import React, { MouseEvent } from "react";
import "./field.css";

export type Player = "o" | "x" | "empty";
export type Highlight = "win" | "lose" | "none";

export type FieldProps = {
  index: number;
  player: Player;
  highlight?: Highlight;
  onSelect?: (e: MouseEvent<HTMLDivElement>, index: number) => void;
};

const defaultProps: FieldProps = {
  player: "empty",
  index: -1,
  onSelect: () => null,
  highlight: "none",
};

const Field = ({ index, player, highlight, onSelect }: FieldProps) => {
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

Field.defaultProps = defaultProps;

export { Field };
