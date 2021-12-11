export const GRID_LENGTH = 3;

// TODO: remove this attempt - obsolete
export const DIRECTIONS = {
  a: -1 * GRID_LENGTH,
  b: -1 * (GRID_LENGTH - 1),
  c: 1,
  d: 1 * (GRID_LENGTH + 1),
  e: 1 * GRID_LENGTH,
  f: 1 * (GRID_LENGTH - 1),
  g: -1,
  h: -1 * (GRID_LENGTH + 1),
};

export const DIRECTIONPAIRS = {
  vertical: [DIRECTIONS.a, DIRECTIONS.e],
  horizontal: [DIRECTIONS.c, DIRECTIONS.g],
  criss: [DIRECTIONS.d, DIRECTIONS.h],
  cross: [DIRECTIONS.b, DIRECTIONS.f],
};
