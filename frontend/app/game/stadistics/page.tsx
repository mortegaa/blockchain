"use client";

import Header from "@/components/ui/Header";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Page = () => {
  const [scores, setScores] = useState<number[]>([]);
  const [totalScore, setTotalScore] = useState<number>(0);

  useEffect(() => {

    const storedData = localStorage.getItem("playerData");
    if (storedData) {
      try {
        const splitData = storedData.split(":");
        const recentScores = splitData.slice(2).map(Number);
        setScores(recentScores);
        const total = recentScores.reduce((acc, score) => acc + score, 0);
        setTotalScore(total);
      } catch (error) {
        console.error("Error procesando los datos del jugador:", error);
      }
    }
  }, []);

  const data = {
    labels: ["Partida 1", "Partida 2", "Partida 3", "Partida 4", "Partida 5"],
    datasets: [
      {
        label: "Puntuación",
        data: scores,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
        },
        max: 6,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Puntuación Total: ${totalScore}`,
      },
    },
  };

  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold text-gray-800 text-center mt-5">Mis estadísticas</h1>
      <div className="max-w-3xl mx-auto mt-8">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Page;
