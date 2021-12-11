import tictacState, { StateReadResult } from "./tictac.state";

export type Field = {
  player: string;
  index: number;
};

export type Payload = {
  index: number;
  fields: Field[];
  playerTag?: string;
  opponentTag?: string;
};

export type DirectionResult = {
  indexes: number[];
  count: number;
};

export type MoveResult = {
  fields: Field[];
  opponentMove?: number;
  event: {
    status: string;
    playerTag: string;
    indexes?: number[];
    score?: number;
  };
};

export type ReadResult = ({ [x: string]: StateReadResult } | undefined)[];

const validate = ({ index, fields }: Payload) =>
  fields[index].player === "empty";

const markPlayerMove = ({ index, fields, playerTag = "o" }: Payload) =>
  fields.map((field) => {
    if (field.index === index) {
      field.player = playerTag;
    }
    return field;
  });

const AIMove = ({ fields, opponentTag = "x" }: Payload) => ({
  ...fields.filter((field) => field.player === "empty").pop(),
  player: opponentTag,
});

const getResponse = ({
  fields,
  status,
  indexes,
  playerTag = "o",
  opponentMove,
  score,
}: {
  fields: Field[];
  status: string;
  indexes?: number[];
  playerTag?: string;
  opponentMove?: number;
  score?: number;
}): MoveResult => ({
  fields,
  event: {
    status,
    playerTag,
    indexes,
    score,
  },
  opponentMove,
});

export const processMove = (payload: Payload): MoveResult => {
  const validation = validate(payload);

  if (validation) {
    // ---------- Player ----------
    const fieldsPlayer = markPlayerMove(payload);
    const fieldsPlayerStateResult = tictacState.read({
      ...payload,
      fields: fieldsPlayer,
    })!;

    console.log(fieldsPlayerStateResult);

    let winnerPlayerIndexes = tictacState.findWinner(fieldsPlayerStateResult);
    if (winnerPlayerIndexes) {
      return getResponse({
        status: "win",
        fields: fieldsPlayer,
        indexes: winnerPlayerIndexes!,
        score: 100,
      });
    }

    let tiePlayer = tictacState.isTie(payload);
    if (tiePlayer) {
      return getResponse({
        status: "tie",
        fields: fieldsPlayer,
        score: 10,
      });
    }

    // ---------- AI ----------

    const { player: tagAI, index: indexAI = -1 } = AIMove({
      ...payload,
      fields: fieldsPlayer,
    });

    const fieldsAI = markPlayerMove({
      index: indexAI,
      fields: fieldsPlayer,
      playerTag: tagAI,
    });

    let tieAI = tictacState.isTie({ ...payload, fields: fieldsAI });
    if (tieAI) {
      return getResponse({
        status: "tie",
        fields: fieldsPlayer,
        score: 10,
        opponentMove: indexAI,
      });
    }

    const fieldsAIStateResult = tictacState.read({
      index: indexAI,
      fields: fieldsAI,
      playerTag: tagAI,
    })!;

    let winnerAIIndexes = tictacState.findWinner(fieldsAIStateResult);
    if (winnerAIIndexes) {
      return getResponse({
        status: "win",
        fields: fieldsPlayer,
        indexes: winnerAIIndexes,
        playerTag: tagAI,
        score: 100,
        opponentMove: indexAI,
      });
    }

    return getResponse({
      status: "ongoing",
      fields: fieldsPlayer,
      opponentMove: indexAI,
    });
  }

  throw Error("Field is already occupied");
};
