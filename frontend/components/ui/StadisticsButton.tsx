import React from "react";
import { useRouter } from "next/navigation";

export default function StadisticsButton() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/game/stadistics");
  };

  return (
    <button
      onClick={handleNavigation}
      className="my-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
      Go to Stadistics
    </button>
  );
}
