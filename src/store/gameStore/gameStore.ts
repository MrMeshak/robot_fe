import { create } from "zustand";

import {
  Flag,
  GameState,
  Obstacle,
  Orientation,
  Player,
} from "./gameState.model";

interface IGameStoreState {
  state: GameState;
  actions: {
    moveOrientation: (orientation: Orientation) => void;
  };
}

const state = new GameState({
  dimensions: [10, 10],
  player: new Player({ position: [5, 5], orientation: Orientation.S }),
  obstacles: new Map<`[${number},${number}]`, Obstacle>([
    ["[1,2]", new Obstacle({ position: [1, 2], orientation: Orientation.N })],
  ]),
  flags: new Map<`[${number},${number}]`, Flag>([
    [`[7,7]`, new Flag({ position: [7, 7], orientation: Orientation.N })],
  ]),
});

const useGameStore = create<IGameStoreState>((set) => ({
  state: state,
  actions: {
    moveOrientation: (orientation: Orientation) =>
      set((state) => ({
        state: GameState.moveOrientation(state.state, orientation),
      })),
  },
}));

export const useGameActions = () => useGameStore((state) => state.actions);
export const useGameGenerateBoard = () =>
  GameState.generateBoard(useGameStore((state) => state.state));
