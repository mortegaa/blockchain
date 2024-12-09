import { AppContext } from "@/app/game/page";
import React, { useContext, useEffect, useState } from "react";
import { parseAbi, stringToHex } from "viem";
import { useWriteContract } from "wagmi";

const ADDRESS = "0xdc86955f3344186ded62d7a9d3c8d36d3df34028";
const ABI = parseAbi([
  "function get_value() view returns(bytes32)",
  "function hola_mundo() public view returns(string)",
  "function set_player_info(bytes32)",
]);

interface PlayerData {
  username: string;
  totalScore: number;
  recentScores: number[];
}

function GameOver() {
  const { writeContract } = useWriteContract();
  const { gameOver, currAttempt, correctWord } = useContext(AppContext)!;
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("playerData");
    if (storedData) {
      try {
        const splitData = storedData.split(":");
        const formattedData: PlayerData = {
          username: splitData[0],
          totalScore: parseInt(splitData[1], 10),
          recentScores: splitData.slice(2).map(Number),
        };

        setPlayerData(formattedData);
      } catch (error) {
        console.error("Error processing player data:", error);
      }
    }
  }, []);

  function updateAndSendData() {
    if (!playerData) {
      console.error("Player data is not available to update");
      return;
    }
    const newScore = currAttempt.attempt;
    const updatedTotalScore = playerData.totalScore + newScore;

    const updatedRecentScores = [...playerData.recentScores];
    updatedRecentScores.shift();
    updatedRecentScores.push(newScore);

    const updatedPlayerData: PlayerData = {
      username: playerData.username,
      totalScore: updatedTotalScore,
      recentScores: updatedRecentScores,
    };
    const updatedDataString = [
      updatedPlayerData.username,
      updatedPlayerData.totalScore,
      ...updatedPlayerData.recentScores,
    ].join(":");
    localStorage.setItem("playerData", updatedDataString);
    const dataWithoutSeparators = [
      updatedPlayerData.username,
      updatedPlayerData.totalScore.toString().padStart(3, "0"),
      ...updatedPlayerData.recentScores,
    ].join("");
    writeContract({
      abi: ABI,
      address: ADDRESS,
      functionName: "set_player_info",
      args: [stringToHex(dataWithoutSeparators, { size: 32 })],
    });

    setPlayerData(updatedPlayerData);
  }

  return (
    <div className="text-center mt-8">
      <h3 className="text-xl font-semibold mb-2">
        {gameOver.guessedWord
          ? "You Correctly Guessed the Wordle"
          : "You Failed to Guess the Word"}
      </h3>
      <h1 className="text-3xl font-bold text-gray-800">{`Correct Word: ${correctWord}`}</h1>
      {gameOver.guessedWord && (
        <h3 className="text-lg text-green-600 mt-4">{`You guessed in ${currAttempt.attempt} attempts`}</h3>
      )}
      <button
        onClick={updateAndSendData}
        className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
      >
        Send Updated Data
      </button>
    </div>
  );
}

export default GameOver;
