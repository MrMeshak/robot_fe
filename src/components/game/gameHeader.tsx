import { useGameMiscData } from "@/store/gameStore/gameStore";
import * as React from "react";

export interface IGameHeaderProps {}

export default function GameHeader(_props: IGameHeaderProps) {
  const miscData = useGameMiscData();

  return (
    <ul className="flex justify-between pb-2 font-semibold">
      <li>{miscData.levelName}</li>
      <li>
        Flags: {miscData.numFlags}/{miscData.initalNumFlags} {}
      </li>
    </ul>
  );
}
