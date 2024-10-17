import { create } from "zustand";

import {
  Flag,
  GameState,
  Obstacle,
  Orientation,
  Player,
} from "./gameState.model";

interface IGameStoreState {
  levelName: string;
  initalNumFlags: number;
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
    ["[1,3]", new Obstacle({ position: [1, 3], orientation: Orientation.N })],
    ["[1,4]", new Obstacle({ position: [1, 4], orientation: Orientation.N })],
    ["[1,5]", new Obstacle({ position: [1, 5], orientation: Orientation.N })],
    ["[7,4]", new Obstacle({ position: [7, 4], orientation: Orientation.N })],
    ["[8,4]", new Obstacle({ position: [8, 4], orientation: Orientation.N })],
    ["[9,4]", new Obstacle({ position: [9, 4], orientation: Orientation.N })],
    ["[3,3]", new Obstacle({ position: [3, 3], orientation: Orientation.N })],
    ["[8,9]", new Obstacle({ position: [8, 9], orientation: Orientation.N })],
    ["[8,8]", new Obstacle({ position: [8, 8], orientation: Orientation.N })],
    ["[8,7]", new Obstacle({ position: [8, 7], orientation: Orientation.N })],
    ["[8,6]", new Obstacle({ position: [8, 6], orientation: Orientation.N })],
    ["[9,6]", new Obstacle({ position: [9, 6], orientation: Orientation.N })],
  ]),
  flags: new Map<`[${number},${number}]`, Flag>([
    ["[7,7]", new Flag({ position: [7, 7], orientation: Orientation.N })],
    ["[9,8]", new Flag({ position: [9, 8], orientation: Orientation.N })],
    ["[3,5]", new Flag({ position: [3, 5], orientation: Orientation.N })],
    ["[7,1]", new Flag({ position: [7, 1], orientation: Orientation.N })],
  ]),
});

const useGameStore = create<IGameStoreState>((set) => ({
  levelName: "Test Level",
  initalNumFlags: state.flags.size,
  state: state,
  actions: {
    moveOrientation: (orientation: Orientation) =>
      set((state) => ({
        state: GameState.moveOrientation(state.state, orientation),
      })),
  },
}));

export const useGameActions = () => useGameStore((state) => state.actions);
export const useGameFlags = () => useGameStore((state) => state.state.flags);
export const useGameMiscData = () => {
  const state = useGameStore((state) => state.state);
  const levelName = useGameStore((state) => state.levelName);
  const initalNumFlags = useGameStore((state) => state.initalNumFlags);
  return {
    levelName,
    initalNumFlags,
    numFlags: initalNumFlags - state.flags.size,
  };
};
export const useGameGenerateBoard = () =>
  GameState.generateBoard(useGameStore((state) => state.state));
