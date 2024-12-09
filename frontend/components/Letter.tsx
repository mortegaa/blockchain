
import { AppContext } from "@/app/game/page";
import React, { useContext, useEffect } from "react";

interface LetterProps {
  letterPosition: number;
  attempValue: number;
}

function Letter({ letterPosition, attempValue }: LetterProps) {
  const { board, setDisabledLetters, currAttempt, correctWord } =
    useContext(AppContext)!;

  const letter = board[attempValue][letterPosition];
  const correct = correctWord.toUpperCase()[letterPosition] === letter;
  const almost =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
  const letterState =
    currAttempt.attempt > attempValue &&
    (correct ? "bg-[#528d4e]" : almost ? "bg-[#b49f39]" : "bg-[#3a393c]");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev: string[]) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);

  return (
    <div className={`flex-[33%] border border-gray-700 m-1 grid place-items-center text-[30px] h-[70px] ${letterState}`}>
      {letter}
    </div>
  );
}

export default Letter;
