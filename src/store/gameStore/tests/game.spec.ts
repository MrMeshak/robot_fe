import { describe, it, expect } from 'vitest';
import { Flag, GameState, Obstacle, Orientation, Player } from '../game.model';

describe('GameState - moveForwardPostion', () => {
  describe('when the player is orientated N and at the top edge', () => {
    it('should return the co-ordinates of the next postion by wraping around to the bottom edge', () => {
      const state = new GameState({
        dimensions: [10, 10],
        player: new Player({ position: [0, 9], orientation: Orientation.N }),
        obstacles: new Map(),
        flags: new Map()
      });

      const result = GameState.postionForwardMove(state);

      expect(result).toEqual([0, 0]);
    });
  });

  describe('when the player is orientated S and at the bottom edge', () => {
    it('should return the co-ordinates of the next postion by wrapping around to the top edge', () => {
      const state = new GameState({
        dimensions: [10, 10],
        player: new Player({ position: [0, 0], orientation: Orientation.S }),
        obstacles: new Map(),
        flags: new Map()
      });
      const result = GameState.postionForwardMove(state);

      expect(result).toEqual([0, 9]);
    });
  });

  describe('when the player is orientated E and at the right edge', () => {
    it('should return the co-ordinates of the next postion by wrapping around to the left edge ', () => {
      const state = new GameState({
        dimensions: [10, 10],
        player: new Player({ position: [9, 0], orientation: Orientation.E }),
        obstacles: new Map(),
        flags: new Map()
      });
      const result = GameState.postionForwardMove(state);

      expect(result).toEqual([0, 0]);
    });
  });

  describe('when the player is orientated W and at the left edge', () => {
    it('should return the co-ordinates of the next postion by wrapping around to the right edge', () => {
      const state = new GameState({
        dimensions: [10, 10],
        player: new Player({ position: [0, 0], orientation: Orientation.W }),
        obstacles: new Map(),
        flags: new Map()
      });
      const result = GameState.postionForwardMove(state);
      expect(result).toEqual([9, 0]);
    });
  });

  describe('when the player is not on a edge', () => {
    it('should return the next position (co-ordinates directly infront of the player)', () => {
      const state = new GameState({
        dimensions: [10, 10],
        player: new Player({ position: [5, 5], orientation: Orientation.E }),
        obstacles: new Map(),
        flags: new Map()
      });
      const result = GameState.postionForwardMove(state);

      expect(result).toEqual([6, 5]);
    });
  });
});

describe('GameState - moveBackwardPosition', () => {
  describe('when the player is orientatied N and at the bottom edge', () => {
    it('should return the co-ordinates of the next position by wrapping around to the top edge', () => {
      const state = new GameState({
        dimensions: [10, 10],
        player: new Player({ position: [0, 0], orientation: Orientation.N }),
        obstacles: new Map(),
        flags: new Map()
      });
      const result = GameState.postionBackwardMove(state);

      expect(result).toEqual([0, 9]);
    });
  });

  describe('when the player is orientated S and at the top edge', () => {
    it('should return the co-ordinates of the next postion by wrapping around to the bottom edge', () => {
      const state = new GameState({
        dimensions: [10, 10],
        player: new Player({ position: [0, 9], orientation: Orientation.S }),
        obstacles: new Map(),
        flags: new Map()
      });
      const result = GameState.postionBackwardMove(state);

      expect(result).toEqual([0, 0]);
    });
  });

  describe('when the player is orientated E and at the left edge', () => {
    it('should return the co-ordinates of the next position by wrapping around to the right edge', () => {
      const state = new GameState({
        dimensions: [10, 10],
        player: new Player({ position: [0, 0], orientation: Orientation.E }),
        obstacles: new Map(),
        flags: new Map()
      });
      const result = GameState.postionBackwardMove(state);
      expect(result).toEqual([9, 0]);
    });
  });

  describe('when the player is orientated W and at the right edge', () => {
    it('should return the co-ordinates of the next position by wrapping around to the left edge', () => {
      const state = new GameState({
        dimensions: [10, 10],
        player: new Player({ position: [9, 0], orientation: Orientation.W }),
        obstacles: new Map(),
        flags: new Map()
      });
      const result = GameState.postionBackwardMove(state);

      expect(result).toEqual([0, 0]);
    });
  });

  describe('when the player is not on an edge', () => {
    it('should return the next position (co-ordinates directly behind player)', () => {
      const state = new GameState({
        dimensions: [10, 10],
        player: new Player({ position: [5, 5], orientation: Orientation.N }),
        obstacles: new Map(),
        flags: new Map()
      });
      const result = GameState.postionBackwardMove(state);

      expect(result).toEqual([5, 4]);
    });
  });
});

describe('GameState - moveForward', () => {
  describe('when next postion is a obstacle', () => {
    it('should return the gamestate unchanged (ie player remain in same postion)', () => {
      const obstacle = new Obstacle({ position: [5, 6], orientation: Orientation.N });
      const player = new Player({ position: [5, 5], orientation: Orientation.N });
      const state = new GameState({
        dimensions: [10, 10],
        player: player,
        obstacles: new Map<`[${number},${number}]`, Obstacle>([[`[${obstacle.position[0]},${obstacle.position[1]}]`, obstacle]]),
        flags: new Map()
      });

      const result = GameState.moveForward(state);

      expect(result).toBe(state);
      expect(result.player.position).toEqual(player.position);
    });
  });

  describe('when next position is a flag', () => {
    it('should return the game state with flag removed and player position updated', () => {
      const flag = new Flag({ position: [5, 6], orientation: Orientation.N });
      const player = new Player({ position: [5, 5], orientation: Orientation.N });
      const state = new GameState({
        dimensions: [10, 10],
        player: player,
        obstacles: new Map(),
        flags: new Map<`[${number},${number}]`, Obstacle>([[`[${flag.position[0]},${flag.position[1]}]`, flag]])
      });

      const result = GameState.moveForward(state);

      expect(result).not.toBe(state);
      expect(result.player.position).toEqual(flag.position);
      expect(result.flags.has(`[${flag.position[0]},${flag.position[1]}]`)).toBeFalsy();
    });
  });

  describe('when next position is a empty', () => {
    it('should return the updated gamestate with player position updated', () => {
      const state = new GameState({
        dimensions: [10, 10],
        player: new Player({ position: [5, 5], orientation: Orientation.N }),
        obstacles: new Map(),
        flags: new Map()
      });

      const result = GameState.moveForward(state);

      expect(result).not.toBe(state);
      expect(result.player.position).toEqual([5, 6]);
    });
  });
});

describe('GameState - moveBackward', () => {
  describe('when next postion is a obstacle', () => {
    it('should return the gamestate unchanged (ie player remain in same postion)', () => {
      const obstacle = new Obstacle({ position: [5, 4], orientation: Orientation.N });
      const player = new Player({ position: [5, 5], orientation: Orientation.N });
      const state = new GameState({
        dimensions: [10, 10],
        player: player,
        obstacles: new Map<`[${number},${number}]`, Obstacle>([[`[${obstacle.position[0]},${obstacle.position[1]}]`, obstacle]]),
        flags: new Map()
      });

      const result = GameState.moveBackwards(state);

      expect(result).toBe(state);
      expect(result.player.position).toEqual(player.position);
    });
  });

  describe('when next position is a flag', () => {
    it('should return the game state with flag removed and player position updated', () => {
      const flag = new Flag({ position: [5, 4], orientation: Orientation.N });
      const player = new Player({ position: [5, 5], orientation: Orientation.N });
      const state = new GameState({
        dimensions: [10, 10],
        player: player,
        obstacles: new Map(),
        flags: new Map<`[${number},${number}]`, Obstacle>([[`[${flag.position[0]},${flag.position[1]}]`, flag]])
      });

      const result = GameState.moveBackwards(state);

      expect(result).not.toBe(state);
      expect(result.player.position).toEqual(flag.position);
      expect(result.flags.has(`[${flag.position[0]},${flag.position[1]}]`)).toBeFalsy();
    });
  });

  describe('when next position is a empty', () => {
    it('should return the updated gamestate with player position updated', () => {
      const state = new GameState({
        dimensions: [10, 10],
        player: new Player({ position: [5, 5], orientation: Orientation.N }),
        obstacles: new Map(),
        flags: new Map()
      });

      const result = GameState.moveBackwards(state);

      expect(result).not.toBe(state);
      expect(result.player.position).toEqual([5, 4]);
    });
  });
});

describe('GameState - rotateCW', () => {
  describe('when player is orientated N', () => {
    it.todo('should update game state with player orientated E');
  });
  describe('when player is orientated S', () => {
    it.todo('should update game state with player orientated W');
  });
});
