import React, { MouseEvent } from "react";
import "./reload.component.css";

export type ReloadProps = {
  onReload: (e: MouseEvent<HTMLDivElement>) => void;
};

export const Reload = ({ onReload }: ReloadProps) => {
  return (
    <div className="reloadContainer" onClick={onReload}>
      Reload
    </div>
  );
};
