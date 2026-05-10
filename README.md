# Tic-tac-toe

A small full-stack tic-tac-toe proof of concept. The player faces off against an AI opponent: the React client renders the board and forwards moves to a Node/Express server that owns the game rules and AI move selection.

## Project structure

```
tictactoe/
├── server/   # Node + Express + TypeScript API (game logic + AI)
└── web/      # React + TypeScript client (Create React App)
```

- [server/](server/) — exposes `POST /player` (apply a move, detect win/tie) and `POST /ai` (pick the next AI move and return the resulting board state). See [server/README.md](server/README.md) for the API contract and architecture notes.
- [web/](web/) — renders the board, tracks scores, and triggers AI turns through the API. See [web/README.md](web/README.md) for the client-side state and layout notes.

## Requirements

- Node.js 14+ and npm
- Two free local ports: `3000` (web) and `3001` (server)

## Startup guide

The server and the web client are independent npm projects. Install and run them in two terminals.

### 1. Start the server

```bash
cd server
npm install
npm start
```

The API will be available at http://localhost:3001. `npm start` runs the TypeScript compiler and then `node dist/app.js`.

### 2. Start the web client

```bash
cd web
npm install
npm start
```

The app opens at http://localhost:3000 and talks to the server at `http://localhost:3001`.

## Notes

- The server is the source of truth for move validation, win/tie detection, and AI move selection — the client only renders state and forwards user input.
- AI strategy is intentionally simple (see the TODO list in [server/README.md](server/README.md) for the planned smarter heuristic).
- No persistence layer yet: scores live in client state, and there is no database. High-score storage and multiplayer (via Redis) are listed as next steps in the server README.
- The two sub-projects each have their own `package.json`, `tsconfig.json`, and `.gitignore`; there is no root-level workspace.
