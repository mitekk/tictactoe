import _ from "lodash";
import { Payload } from "./types/payload.type";
import { ReadResult } from "./types/readResult.type";
import { DIRECTIONPAIRS, GRID_LENGTH } from "./config/constants";
import { StateReadResult } from "./types/stateReadResult.type";

export default {
  read: ({ index, fields, playerTag = "o" }: Payload) => {
    // try set player field to read result
    const setPlayer = (pivot: number, result: StateReadResult) => {
      if (fields[pivot]?.player === playerTag) {
        result.indexes.push(pivot);
        result.count++;
      }
      return result;
    };

    // count number of playerTags in a single direction
    const findPaths = (
      pivot: number,
      direction: number,
      indexScope: number[]
    ): StateReadResult => {
      if (
        pivot >= fields.length ||
        pivot < 0 ||
        !_.includes(indexScope, pivot)
      ) {
        return {
          indexes: [],
          count: 0,
        };
      }

      const result = findPaths(pivot + direction, direction, indexScope);

      return setPlayer(pivot, result);
    };

    // count number of playerTags in all directions
    return Object.entries(DIRECTIONPAIRS)
      .map(([key, directions]) => {
        let indexScope;

        if (key === "criss") {
          // read diagonals only on even numbers
          if (index % 4 === 0) {
            const crissIndexes = [0, 4, 8];

            // TODO: make sure if needed
            indexScope = _.includes(crissIndexes, index) && crissIndexes;
          }
        } else if (key === "cross") {
          // read diagonals only on even numbers
          if (index % 2 === 0) {
            const crossIndexes = [2, 4, 6];

            // TODO: make sure if needed
            indexScope = _.includes(crossIndexes, index) && crossIndexes;
          }
        } else if (key === "horizontal") {
          // get row of scoped indexes
          indexScope = _.chunk(fields, GRID_LENGTH)
            .filter((chunk) => chunk.findIndex((i) => i.index === index) !== -1)
            .flatMap((chunk) => chunk.map((field) => field.index));
        } else if (key === "vertical") {
          // allow all - direction volume covers it
          indexScope = _.range(Math.pow(GRID_LENGTH, 2));
        }

        if (indexScope) {
          const [directionOne, directionTwo] = directions;
          const directionOneResult = findPaths(
            index + directionOne,
            directionOne,
            indexScope
          );
          const directionTwoResult = findPaths(
            index + directionTwo,
            directionTwo,
            indexScope
          );

          const result = {
            indexes: [
              ...directionOneResult.indexes,
              ...directionTwoResult.indexes,
            ],
            count: directionOneResult.count + directionTwoResult.count,
          };

          return {
            [key]: setPlayer(index, result),
          };
        }
      })
      .filter((d) => d);
  },

  // find a row with 3 playerTag fields
  findWinner: (results: ReadResult) => {
    let winnerIndexes;

    const winnerDirections = results.filter((result) => {
      const { count } = result![Object.keys(result!)[0]];
      return count === GRID_LENGTH;
    });

    if (winnerDirections.length > 0) {
      winnerIndexes = winnerDirections.flatMap((candidate) => {
        const { indexes } = candidate![Object.keys(candidate!)[0]];
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
