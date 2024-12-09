"use client"

import { Board } from "@/components/Board";
import { Keyboard } from "@/components/Keyboard";
import { boardDefault, generateWordSet } from "../Words";
import React, { useState, createContext, useEffect } from "react";
import { useRouter } from 'next/navigation';
import GameOver from "@/components/GameOver";
import Header from "@/components/ui/Header";
import StadisticsButton from "@/components/ui/StadisticsButton"
import { hexToString, parseAbi, stringToHex } from "viem";
import { useReadContract } from "wagmi";

interface Attempt {
  attempt: number;
  letter: number;
}

interface GameOverState {
  gameOver: boolean;
  guessedWord: boolean;
}

interface AppContextType {
  board: string[][];
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
  currAttempt: Attempt;
  setCurrAttempt: React.Dispatch<React.SetStateAction<Attempt>>;
  correctWord: string;
  onSelectLetter: (key: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  setDisabledLetters: React.Dispatch<React.SetStateAction<string[]>>;
  disabledLetters: string[];
  gameOver: GameOverState;
}

const ADDRESS = "0xdc86955f3344186ded62d7a9d3c8d36d3df34028";
const ABI = parseAbi([
  "function get_value() view returns(bytes32)",
  "function get_player_info(bytes8) public view returns(bytes32)",
]);
export const AppContext = createContext<AppContextType | undefined>(undefined);

function App() {
  const [board, setBoard] = useState<string[][]>(boardDefault);
  const [currAttempt, setCurrAttempt] = useState<Attempt>({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState<Set<string>>(new Set());
  const [correctWord, setCorrectWord] = useState<string>("");
  const [disabledLetters, setDisabledLetters] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<GameOverState>({
    gameOver: false,
    guessedWord: false,
  });
  const [user, setUser] = useState<{ username: string } | null>(null);

  const router = useRouter();
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      try {
        setUser(JSON.parse(loggedInUser));
      } catch (error) {
        console.error("Error parsing loggedInUser from localStorage:", error);
      }
    }
  }, []);

  const result = useReadContract({
    address: ADDRESS,
    abi: ABI,
    functionName: "get_player_info",
    args: user?.username ? [stringToHex(user.username, { size: 8 })] : undefined,
  });
  useEffect(() => {
    if (result?.data) {
      try {
        let playerData = hexToString(result.data);  
        playerData = playerData.slice(10);  
        localStorage.setItem("playerData", playerData);
      } catch (error) {
        console.error("Error decoding contract data:", error);
      }
    } else {
      console.log("Contract data is undefined or loading...");
    }
  }, [result?.data]);
  
  
  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);
  const onEnter = () => {
    if (currAttempt.letter !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });

    } else {
      alert("Word not found");
    }
    if (currWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onSelectLetter = (key: string) => {
    if (currAttempt.letter > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };

  return (
    <div className="App">

      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          setDisabledLetters,
          disabledLetters,
          gameOver,
        }}
      >
        <div className="w-[100%] h-[calc(100vh-170px)] flex items-center pt-12 flex-col">
          <Header />
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
          <StadisticsButton />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
