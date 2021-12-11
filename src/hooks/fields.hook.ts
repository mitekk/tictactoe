import { useState } from "react";
import tictacAPI, { ProcessMoveResponse } from "../api/tictac.api";
import { FieldsInitial } from "../config.ts/fields.initial";
import { PlayersInitial } from "../config.ts/players.initial";

export const useFields = () => {
  const [fields, setFields] = useState(FieldsInitial);
  const [allowClicks, setAllowClicks] = useState(true);
  const [players, setPlayers] = useState(PlayersInitial);
  const [aiTurn, setAITurn] = useState(false);

  const processResponse = (response: ProcessMoveResponse) => {
    setFields(response.fields);

    const { event, fields } = response;
    if (event) {
      const { indexes, playerTag, score, status } = event;

      if (status === "win") {
        setFields(
          fields.map((field) => {
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
  };

  const handleSelect = async (index: number) => {
    if (allowClicks) {
      const { data } = await tictacAPI.playerMove(index, fields);
      processResponse(data);
      setAITurn(true);
      return data;
    }
  };

  const handleAI = async () => {
    const { data } = await tictacAPI.AIMove(fields);
    console.log(data);

    processResponse(data);
    setAITurn(false);
    return data;
  };

  const handleReload = () => {
    setFields(FieldsInitial);
    setAllowClicks(true);
    setAITurn(false);
  };

  return {
    fields,
    players,
    aiTurn,
    allowClicks,
    handleFieldReload: handleReload,
    handleFieldSelect: handleSelect,
    handleAIMove: handleAI,
  };
};
