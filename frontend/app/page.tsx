"use client";

import { hexToString, parseAbi } from "viem";
import Navigation from "./Navigation";
import { useReadContract } from "wagmi";
import Link from "next/link";

const ADDRESS = "0xdc86955f3344186ded62d7a9d3c8d36d3df34028";
const ABI = parseAbi([
  "function get_value() view returns(bytes32)",
  "function hola_mundo() public view returns(string)",
  "function set_value(bytes32) public",
]);

export default function Container() {
  const result = useReadContract({
    address: ADDRESS,
    abi: ABI,
    functionName: "get_value",
  });

  const value = result?.data ? hexToString(result.data) : "No data";

  return (
    <>
      <Navigation />
      <div className="flex flex-col items-center justify-center h-screen space-y-6">
        <p className="text-5xl font-bold text-center">Bienvenido a Blockdle</p>
        <div className="flex space-x-4">
          <Link href="/register">
            <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
              Registrarse
            </button>
          </Link>
          <Link href="/login">
            <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300">
              Iniciar sesión
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
