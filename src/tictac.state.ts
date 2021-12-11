import * as TicTacHandler from "./tictac.handler";
import _ from "lodash";

export type StateReadResult = {
  indexes: number[];
  count: number;
};

const LENGTH = 3;

const Directions = {
  a: -1 * LENGTH,
  b: -1 * (LENGTH - 1),
  c: 1,
  d: 1 * (LENGTH + 1),
  e: 1 * LENGTH,
  f: 1 * (LENGTH - 1),
  g: -1,
  h: -1 * (LENGTH + 1),
};

const DirectionPairs = {
  vertical: [Directions.a, Directions.e],
  horizontal: [Directions.c, Directions.g],
  criss: [Directions.d, Directions.h],
  cross: [Directions.b, Directions.f],
};

export default {
  // index: selected index
  // fields: board fields
  // playerTag: 'o' or 'x'
  read: ({ index, fields, playerTag = "o" }: TicTacHandler.Payload) => {
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
    return Object.entries(DirectionPairs)
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
          indexScope = _.chunk(fields, LENGTH)
            .filter((chunk) => chunk.findIndex((i) => i.index === index) !== -1)
            .flatMap((chunk) => chunk.map((field) => field.index));
        } else if (key === "vertical") {
          // allow all - direction volume covers it
          indexScope = _.range(Math.pow(LENGTH, 2));
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
  findWinner: (results: TicTacHandler.ReadResult) => {
    let winnerIndexes;

    const winnerDirections = results.filter((result) => {
      const { count } = result![Object.keys(result!)[0]];
      return count === LENGTH;
    });

    if (winnerDirections.length > 0) {
      winnerIndexes = winnerDirections.flatMap((candidate) => {
        const { indexes } = candidate![Object.keys(candidate!)[0]];
        return indexes;
      });
    }

    return _.uniq(winnerIndexes);
  },

  // were all fields selected by player/AI
  isTie: ({ fields }: TicTacHandler.Payload) =>
    fields.filter((field) => field.player === "empty").length === 0,
};
