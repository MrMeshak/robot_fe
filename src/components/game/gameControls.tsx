import { Button } from "@/components/ui/button";
import { Orientation } from "@/store/gameStore/gameState.model";
import { useGameActions } from "@/store/gameStore/gameStore";
import {
  MoveDown,
  MoveLeft,
  MoveRight,
  MoveUp,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import { useEffect } from "react";
import { match } from "ts-pattern";
export interface IGameControlsProps {}

export default function GameControls(_props: IGameControlsProps) {
  const { moveOrientation } = useGameActions();

  const handleKeyboard = (e: KeyboardEvent) => {
    match(e.key)
      .with("ArrowUp", () => {
        moveOrientation(Orientation.N);
      })
      .with("ArrowDown", () => {
        moveOrientation(Orientation.S);
      })
      .with("ArrowRight", () => {
        moveOrientation(Orientation.E);
      })
      .with("ArrowLeft", () => {
        moveOrientation(Orientation.W);
      });
  };

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyboard);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="flex w-full p-6">
      <div className="flex items-center gap-1">
        <Button onClick={() => moveOrientation(Orientation.W)}>
          <MoveLeft />
        </Button>
        <div className="flex flex-col gap-1">
          <Button onClick={() => moveOrientation(Orientation.N)}>
            <MoveUp />
          </Button>
          <Button onClick={() => moveOrientation(Orientation.S)}>
            <MoveDown />
          </Button>
        </div>
        <Button onClick={() => moveOrientation(Orientation.E)}>
          <MoveRight />
        </Button>
      </div>
    </div>
  );
}
