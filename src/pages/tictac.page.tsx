import React, { MouseEvent, useState } from "react";
import { Field } from "../components/field";
import { FieldProps, Player } from "../components/field/field";
import tictacAPI from "../api/tictac.api";
import "./tictac.page.css";
import { Scoreboard } from "../components/scoreboard/scoreboard";
import { Reload } from "../components/reload/reload.component";

const TictacPage = () => {
  const initialFields: FieldProps[] = [
    {
      player: "empty",
      index: 0,
    },
    {
      player: "empty",
      index: 1,
    },
    {
      player: "empty",
      index: 2,
    },
    {
      player: "empty",
      index: 3,
    },
    {
      player: "empty",
      index: 4,
    },
    {
      player: "empty",
      index: 5,
    },
    {
      player: "empty",
      index: 6,
    },
    {
      player: "empty",
      index: 7,
    },
    {
      player: "empty",
      index: 8,
    },
  ];
  const initialPlayers = [
    {
      name: "bob",
      score: 0,
      playerTag: "o",
    },
    {
      name: "AI",
      score: 0,
      playerTag: "x",
    },
  ];

  const [players, setPlayers] = useState(initialPlayers);
  const [fields, setFields] = useState(initialFields);
  const [allowClicks, setAllowClicks] = useState(true);

  const handleReload = () => {
    setFields(initialFields);
    setAllowClicks(true);
  };

  const handleSelect = async (e: MouseEvent<HTMLDivElement>, index: number) => {
    if (allowClicks) {
      const { data } = await tictacAPI.processMove(index, fields);
      setFields(data.fields);

      const { event } = data;
      if (event) {
        const { indexes, playerTag, score, status } = event;

        if (status === "win") {
          setFields(
            data.fields.map((field) => {
              if (indexes?.includes(field.index)) {
                return {
                  ...field,
                  highlight: playerTag === "o" ? "win" : "lose",
                };
              }

              return field;
            })
          );
          setPlayers(
            players.map((player) => {
              if (player.playerTag === playerTag) {
                return { ...player, score: player.score + score! };
              }

              return { ...player };
            })
          );
          setAllowClicks(false);
        }
        if (status === "tie") {
          setPlayers(
            players.map((player) => {
              if (player.playerTag === playerTag) {
                return { ...player, score: player.score + score! };
              }

              return { ...player };
            })
          );
          setAllowClicks(false);
        }
        // if (status === "ongoing") {
        // }
      }
    }
  };

  return (
    <div className="fieldsContainer">
      <Scoreboard players={players} />
      {fields.map((field) => (
        <Field
          key={`field-${field.player}-${field.index}`}
          index={field.index}
          player={field.player}
          onSelect={handleSelect}
          highlight={field.highlight}
        ></Field>
      ))}
      <Reload onReload={handleReload}></Reload>
    </div>
  );
};

export default TictacPage;
