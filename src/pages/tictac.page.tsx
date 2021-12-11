import React, { MouseEvent, useEffect } from "react";
import { Scoreboard } from "../components/scoreboard/scoreboard.component";
import { Reload } from "../components/reload/reload.component";
import { BoardField } from "../components/field/field.component";
import { useFields } from "../hooks/fields.hook";
import "./tictac.page.css";

const TictacPage = () => {
  const {
    fields,
    players,
    aiTurn,
    allowClicks,
    handleFieldReload,
    handleFieldSelect,
    handleAIMove,
  } = useFields();

  useEffect(() => {
    if (aiTurn && allowClicks) {
      handleAIMove();
    }
  }, [aiTurn]);

  const handleSelect = async (e: MouseEvent<HTMLDivElement>, index: number) => {
    handleFieldSelect(index);
  };

  return (
    <div className="fieldsContainer">
      <Scoreboard players={players} />

      {fields.map((field) => (
        <BoardField
          key={`field-${field.player}-${field.index}`}
          index={field.index}
          player={field.player}
          onSelect={handleSelect}
          highlight={field.highlight}
        />
      ))}

      <Reload onReload={handleFieldReload}></Reload>
    </div>
  );
};

export default TictacPage;
