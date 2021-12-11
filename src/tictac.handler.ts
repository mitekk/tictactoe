import tictacState from "./tictac.state";
import { ActionResult } from "./types/actionResult.type";
import { Payload } from "./types/payload.type";
import { ResponseFields } from "./types/responseFields.type";

const getResponse = ({
  fields,
  status,
  indexes,
  playerTag = "o",
  opponentMove,
  score,
}: ResponseFields): ActionResult => ({
  fields,
  event: {
    status,
    playerTag,
    indexes,
    score,
  },
  opponentMove,
});

export const playerTurn = (payload: Payload): ActionResult => {
  const validation = tictacState.validateMove(payload);

  if (validation) {
    const fieldsPlayer = tictacState.markPlayerMove(payload);

    const fieldsPlayerStateResult = tictacState.read({
      ...payload,
      fields: fieldsPlayer,
    })!;

    const { playerTag } = payload;
    let winnerPlayerIndexes = tictacState.findWinner(fieldsPlayerStateResult);
    if (winnerPlayerIndexes.length) {
      return getResponse({
        status: "win",
        fields: fieldsPlayer,
        indexes: winnerPlayerIndexes!,
        score: 100,
        playerTag,
      });
    }

    let tiePlayer = tictacState.isTie(payload);
    if (tiePlayer) {
      return getResponse({
        status: "tie",
        fields: fieldsPlayer,
        score: 10,
        playerTag,
      });
    }

    return getResponse({
      status: "ongoing",
      fields: fieldsPlayer,
    });
  }

  throw Error("Field is already occupied");
};

export const AITurn = (payload: Payload): ActionResult => {
  const { player: playerTag, index } = tictacState.createAIMove(payload);

  if (!index) {
    throw Error("AI could not make a move");
  }

  return playerTurn({ ...payload, index, playerTag });
};
