import { create } from 'zustand';

import { Flag, GameState, Obstacle, Orientation, Player } from './gameState.model';

interface IGameStoreState {
  state: GameState;
  actions: {
    moveForward: () => void;
    moveBackward: () => void;
    rotateCW: () => void;
    rotateCCW: () => void;
  };
}

const useGameStore = create<IGameStoreState>((set) => ({
  state: new GameState({
    dimensions: [10, 10],
    player: new Player({ position: [10, 10], orientation: Orientation.N }),
    obstacles: new Map<`[${number},${number}]`, Obstacle>(),
    flags: new Map<`[${number},${number}]`, Flag>()
  }),
  actions: {
    moveForward: () => {},
    moveBackward: () => {},
    rotateCW: () => {},
    rotateCCW: () => {}
  }
}));

const useGameActions = () => useGameStore((state) => state.actions);
const useGameGenerateBoard = () => useGameStore((state) => GameState.generateBoard(state.state));
