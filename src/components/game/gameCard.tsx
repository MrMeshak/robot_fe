import * as React from 'react';
import { Card, CardContent, CardTitle } from '../ui/card';
import GameBoard from './gameBoard';
import GameControls from './gameControls';

export interface IGameCardProps {}

export default function GameCard(_props: IGameCardProps) {
  return (
    <Card>
      <CardContent>
        <GameBoard />
        <GameControls />
      </CardContent>
    </Card>
  );
}
