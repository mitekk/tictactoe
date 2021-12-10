import React from "react";
type Player = { title: string; score: number };

type ScoreboardProps = {
  players: Array<Player>;
};

const Scoreboard = ({ players }: ScoreboardProps) => {
  return (
    <div>
      {players.map((player) => (
        <div className="player">
          <div className="title">{player.title}</div>
          <div className="score">{player.score}</div>
        </div>
      ))}
    </div>
  );
};
