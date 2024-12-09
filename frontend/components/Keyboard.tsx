import React, { useCallback, useEffect, useContext } from 'react';
import { Key } from './Key';
import { AppContext } from '@/app/game/page';

export const Keyboard = () => {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const {
    gameOver,
    onSelectLetter,
    onEnter,
    onDelete,
  } = useContext(AppContext)!;

  const handleKeyboard = useCallback(
    (event: KeyboardEvent) => {
      if (gameOver.gameOver) return;

      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        const allKeys = [...keys1, ...keys2, ...keys3];
        allKeys.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
      }
    },
    [gameOver, keys1, keys2, keys3, onEnter, onDelete, onSelectLetter]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="w-[700px] h-[300px] mt-[60px]">
      <div className="flex flex-row justify-center m-1">
        {keys1.map((key) => (
          <Key key={key} keyVal={key} />
        ))}
      </div>
      <div className="flex flex-row justify-center m-1">
        {keys2.map((key) => (
          <Key key={key} keyVal={key} />
        ))}
      </div>
      <div className="flex flex-row justify-center m-1">
        <Key keyVal={"ENTER"} bigKey />
        {keys3.map((key) => (
          <Key key={key} keyVal={key} />
        ))}
        <Key keyVal={"DELETE"} bigKey />
      </div>
    </div>
  );
};
