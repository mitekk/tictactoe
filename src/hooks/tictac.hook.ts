import { MouseEvent, useEffect, useState } from "react";
import { tictacAPI, ProcessMoveResponse } from "../api/tictac.api";
import { FieldsInitial } from "../config.ts/fields.initial";
import { PlayersInitial } from "../config.ts/players.initial";
import { Field } from "../types/field.type";
import { PlayerTag } from "../types/playerTag.type";

export const useTictac = () => {
  const [fields, setFields] = useState(FieldsInitial);
  const [allowClicks, setAllowClicks] = useState(true);
  const [players, setPlayers] = useState(PlayersInitial);
  const [aiTurn, setAITurn] = useState(false);

  useEffect(() => {
    if (aiTurn && allowClicks) {
      handleAI();
    }
  }, [aiTurn, allowClicks]);

  const setFieldState = (
    fields: Field[],
    indexes: number[],
    playerTag: PlayerTag
  ) => {
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
  };

  const setPlayerState = (score: number, playerTag: PlayerTag) => {
    setPlayers(
      players.map((player) => {
        if (player.playerTag === playerTag) {
          return { ...player, score: player.score + score };
        }

        return { ...player };
      })
    );
  };

  const processResponse = (response: ProcessMoveResponse) => {
    setFields(response.fields);
    const { event, fields } = response;

    if (event) {
      const { indexes, playerTag, score, status } = event;

      const setState = {
        win: () => {
          setFieldState(fields, indexes!, playerTag);
          setPlayerState(score, playerTag);
          setAllowClicks(false);
        },
        tie: () => {
          setPlayerState(score, playerTag);
          setAllowClicks(false);
        },
        ongoing: () => {},
      };

      setState[status]();
    }
  };

  const handleSelect = async (e: MouseEvent<HTMLDivElement>, index: number) => {
    if (allowClicks) {
      const { data } = await tictacAPI.playerMove(index, fields);
      processResponse(data);
      setAITurn(true);
      return data;
    }
  };

  const handleAI = async () => {
    const { data } = await tictacAPI.AIMove(fields);
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
    handleFieldReload: handleReload,
    handleFieldSelect: handleSelect,
  };
};
