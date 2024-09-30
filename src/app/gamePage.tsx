import GameCard from "@/components/game/gameCard";
import * as React from "react";

export interface IGamePageProps {}

export default function GamePage(_props: IGamePageProps) {
  return (
    <div className="flex h-screen items-center justify-center">
      <GameCard />
    </div>
  );
}
