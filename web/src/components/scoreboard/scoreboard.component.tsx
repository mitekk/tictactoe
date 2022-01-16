import React from "react";
import "./scoreboard.component.css";

type Player = { name: string; score: number };

type ScoreboardProps = {
  players: Array<Player>;
};

export const Scoreboard = ({ players }: ScoreboardProps) => {
  return (
    <div className="scoreboard">
      {players.map((player) => (
        <div className="player" key={`player-${player.name}`}>
          <div className="name">{player.name}</div>
          <div className="score">{player.score}</div>
        </div>
      ))}
    </div>
  );
};
