import React from "react";
import { Scoreboard } from "../components/scoreboard/scoreboard.component";
import { Reload } from "../components/reload/reload.component";
import { BoardField } from "../components/field/field.component";
import { useTictac } from "../hooks/tictac.hook";
import "./tictac.page.css";

const TictacPage = () => {
  const { fields, players, handleFieldReload, handleFieldSelect } = useTictac();

  return (
    <div className="fieldsContainer">
      <Scoreboard players={players} />

      {fields.map((field) => (
        <BoardField
          key={`field-${field.player}-${field.index}`}
          index={field.index}
          player={field.player}
          onSelect={handleFieldSelect}
          highlight={field.highlight}
        />
      ))}

      <Reload onReload={handleFieldReload}></Reload>
    </div>
  );
};

export default TictacPage;
