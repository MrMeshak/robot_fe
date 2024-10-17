import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import GameBoard from "./gameBoard";
import GameControls from "./gameControls";
import GameHeader from "./gameHeader";

export interface IGameCardProps {}

export default function GameCard(_props: IGameCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buggy</CardTitle>
      </CardHeader>
      <CardContent>
        <GameHeader />
        <GameBoard />
        <GameControls />
      </CardContent>
    </Card>
  );
}
