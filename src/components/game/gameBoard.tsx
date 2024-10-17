import { cn } from "@/lib/utils";
import {
  EmptyCell,
  Flag,
  Obstacle,
  Orientation,
  Player,
} from "@/store/gameStore/gameState.model";
import { useGameGenerateBoard } from "@/store/gameStore/gameStore";
import { FlagTriangleRight, Bug, BrickWall } from "lucide-react";
import { match, P } from "ts-pattern";

export interface IGameBoardProps {}

export default function GameBoard(_props: IGameBoardProps) {
  const board = useGameGenerateBoard();

  return (
    <div className="flex flex-col-reverse">
      {board.map((row) => (
        <div className="flex border-b-2 last:border-t-2">
          {row.map((cell) => {
            return match(cell)
              .with(P.instanceOf(Player), () => (
                <div className="flex aspect-square w-[calc(2rem+1vw)] items-center justify-center border-l-2 last:border-r-2">
                  <Bug
                    className={cn(
                      "w-full text-orange-500",
                      cell.orientation === Orientation.N && "rotate-0",
                      cell.orientation === Orientation.S && "rotate-180",
                      cell.orientation === Orientation.E && "rotate-90",
                      cell.orientation === Orientation.W && "-rotate-90",
                    )}
                  />
                </div>
              ))
              .with(P.instanceOf(Obstacle), () => (
                <div className="flex aspect-square w-[calc(2rem+1vw)] items-center justify-center border-l-2 last:border-r-2">
                  <BrickWall className="w-full" />
                </div>
              ))
              .with(P.instanceOf(Flag), () => (
                <div className="flex aspect-square w-[calc(2rem+1vw)] items-center justify-center border-l-2 last:border-r-2">
                  <FlagTriangleRight />
                </div>
              ))
              .with(P.instanceOf(EmptyCell), () => (
                <div className="aspect-square w-[calc(2rem+1vw)] flex-grow border-l-2 last:border-r-2"></div>
              ))
              .exhaustive();
          })}
        </div>
      ))}
    </div>
  );
}
