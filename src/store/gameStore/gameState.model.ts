import { match } from 'ts-pattern';
import { mod } from '../../lib/utils';

export class EmptyCell {}

export class Sprite {
  position: [number, number];
  orientation: Orientation;

  constructor(data: { position: [number, number]; orientation: Orientation }) {
    this.position = data.position;
    this.orientation = data.orientation;
  }
}

export class Player extends Sprite {}

export class Obstacle extends Sprite {}

export class Flag extends Sprite {}

export class GameState {
  readonly dimensions: [number, number];
  player: Sprite;
  obstacles: Map<`[${number},${number}]`, Obstacle>;
  flags: Map<`[${number},${number}]`, Flag>;

  constructor(data: { player: Player; dimensions: [number, number]; obstacles: Map<`[${number},${number}]`, Obstacle>; flags: Map<`[${number},${number}]`, Flag> }) {
    this.player = data.player;
    this.dimensions = data.dimensions;
    this.obstacles = data.obstacles;
    this.flags = data.flags;
  }

  static postionForwardMove(state: GameState): [number, number] {
    const { player } = state;
    return match(player.orientation)
      .returnType<[number, number]>()
      .with(Orientation.N, () => [player.position[0], mod(player.position[1] + 1, state.dimensions[1])])
      .with(Orientation.S, () => [player.position[0], mod(player.position[1] - 1, state.dimensions[1])])
      .with(Orientation.E, () => [mod(player.position[0] + 1, state.dimensions[0]), player.position[1]])
      .with(Orientation.W, () => [mod(player.position[0] - 1, state.dimensions[0]), player.position[1]])
      .exhaustive();
  }

  static postionBackwardMove(state: GameState) {
    const { player } = state;
    return match(player.orientation)
      .returnType<[number, number]>()
      .with(Orientation.N, () => [player.position[0], mod(player.position[1] - 1, state.dimensions[1])])
      .with(Orientation.S, () => [player.position[0], mod(player.position[1] + 1, state.dimensions[1])])
      .with(Orientation.E, () => [mod(player.position[0] - 1, state.dimensions[0]), player.position[1]])
      .with(Orientation.W, () => [mod(player.position[0] + 1, state.dimensions[0]), player.position[1]])
      .exhaustive();
  }

  static moveForward(state: GameState): GameState {
    const nextPos = GameState.postionForwardMove(state);
    if (state.obstacles.has(`[${nextPos[0]},${nextPos[1]}]`)) {
      return state;
    }

    if (state.flags.has(`[${nextPos[0]},${nextPos[1]}]`)) {
      const updatedFlags = new Map<`[${number},${number}]`, Flag>([...state.flags]);
      updatedFlags.delete(`[${nextPos[0]},${nextPos[1]}]`);
      return new GameState({ ...state, flags: updatedFlags, player: new Player({ ...state.player, position: nextPos }) });
    }

    return new GameState({ ...state, player: new Player({ ...state.player, position: nextPos }) });
  }

  static moveBackwards(state: GameState): GameState {
    const nextPos = GameState.postionBackwardMove(state);
    if (state.obstacles.has(`[${nextPos[0]},${nextPos[1]}]`)) {
      return state;
    }

    if (state.flags.has(`[${nextPos[0]},${nextPos[1]}]`)) {
      const updatedFlags = new Map<`[${number},${number}]`, Flag>([...state.flags]);
      updatedFlags.delete(`[${nextPos[0]},${nextPos[1]}]`);
      return new GameState({ ...state, flags: updatedFlags, player: new Player({ ...state.player, position: nextPos }) });
    }

    return new GameState({ ...state, player: new Player({ ...state.player, position: nextPos }) });
  }

  static rotateCW(state: GameState): GameState {
    return match(state.player.orientation)
      .with(Orientation.N, () => new GameState({ ...state, player: new Player({ ...state.player, orientation: Orientation.E }) }))
      .with(Orientation.S, () => new GameState({ ...state, player: new Player({ ...state.player, orientation: Orientation.W }) }))
      .with(Orientation.E, () => new GameState({ ...state, player: new Player({ ...state.player, orientation: Orientation.S }) }))
      .with(Orientation.W, () => new GameState({ ...state, player: new Player({ ...state.player, orientation: Orientation.N }) }))
      .exhaustive();
  }

  static rotateCCW(state: GameState): GameState {
    return match(state.player.orientation)
      .with(Orientation.N, () => new GameState({ ...state, player: new Player({ ...state.player, orientation: Orientation.W }) }))
      .with(Orientation.S, () => new GameState({ ...state, player: new Player({ ...state.player, orientation: Orientation.E }) }))
      .with(Orientation.E, () => new GameState({ ...state, player: new Player({ ...state.player, orientation: Orientation.N }) }))
      .with(Orientation.W, () => new GameState({ ...state, player: new Player({ ...state.player, orientation: Orientation.S }) }))
      .exhaustive();
  }

  static generateBoard(state: GameState) {
    const board: Sprite[][] = Array(state.dimensions[1])
      .fill([])
      .map(() => Array(state.dimensions[0]).fill(new EmptyCell()));

    state.obstacles.forEach((obstacle) => {
      board[obstacle.position[1]][obstacle.position[0]] = obstacle;
    });

    state.flags.forEach((flag) => {
      board[flag.position[1]][flag.position[0]] = flag;
    });

    board[state.player.position[1]][state.player.position[0]] = state.player;

    return board;
  }
}

export const Orientation = {
  N: 'N',
  S: 'S',
  E: 'E',
  W: 'W'
} as const;

export type Orientation = (typeof Orientation)[keyof typeof Orientation];
