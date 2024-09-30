import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import GameBoard from "./gameBoard";
import GameControls from "./gameControls";

export interface IGameCardProps {}

export default function GameCard(_props: IGameCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buggy</CardTitle>
      </CardHeader>
      <CardContent>
        <GameBoard />
        <GameControls />
      </CardContent>
    </Card>
  );
}
