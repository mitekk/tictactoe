import _ from "lodash";
import { Payload } from "./types/payload.type";
import { GRID_LENGTH } from "./config/constants";
import { StateReadResult } from "./types/stateReadResult.type";

export default {
  read: ({ index, fields, playerTag = "o" }: Payload) => {
    type path = "criss" | "cross" | "horizontal" | "vertical";
    const directions: path[] = ["criss", "cross", "horizontal", "vertical"];

    const rowChunks = _.chunk(fields, GRID_LENGTH);

    // get scoped paths which are indexes to look for winners
    const getPathsBy = (index: number) => ({
      // -1 will be ignored - grid doesn't include that index
      criss: index % 4 === 0 ? [0, 4, 8] : [-1],
      cross: index % 2 === 0 ? [2, 4, 6] : [-1],
      horizontal: rowChunks
        .filter((chunk) => chunk.findIndex((i) => i.index === index) !== -1)
        .flatMap((chunk) => chunk.map((field) => field.index)),
      vertical: rowChunks
        .map((_, colIndex) => rowChunks.flatMap((row) => row[colIndex].index))
        .filter((chunk) => chunk.findIndex((i) => i === index) !== -1)
        .flat(),
    });

    const scopedIndexes = _.uniq(
      directions.map((direction) => getPathsBy(index)[direction])
    );

    const scopedResults = scopedIndexes.map((indexesToInspect) =>
      indexesToInspect.reduce(
        (result: StateReadResult, index) => {
          if (fields[index]?.player === playerTag) {
            result.indexes.push(index);
            result.count++;
          }
          return result;
        },
        {
          indexes: [],
          count: 0,
        }
      )
    );

    return scopedResults;
  },

  // find a row with 3 playerTag fields
  findWinner: (results: StateReadResult[]) => {
    let winnerIndexes;

    const winnerDirections = results.filter((result) => {
      const { count } = result;
      return count === GRID_LENGTH;
    });

    if (winnerDirections.length > 0) {
      winnerIndexes = winnerDirections.flatMap((candidate) => {
        const { indexes } = candidate;
        return indexes;
      });
    }

    return _.uniq(winnerIndexes);
  },

  // empty fields remain ?
  isTie: ({ fields }: Payload) =>
    fields.filter((field) => field.player === "empty").length === 0,

  // can move onto empty field only
  validateMove: ({ index, fields }: Payload) =>
    fields[index].player === "empty",

  // tag user by field index s
  markPlayerMove: ({ index, fields, playerTag = "o" }: Payload) =>
    fields.map((field) => {
      if (field.index === index) {
        field.player = playerTag;
      }
      return field;
    }),

  // TODO: come up with wiser one
  createAIMove: ({ fields, playerTag = "x" }: Payload) => ({
    ...fields.filter((field) => field.player === "empty").pop(),
    player: playerTag,
  }),
};
