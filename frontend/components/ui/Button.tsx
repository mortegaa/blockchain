import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  text: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  type = 'button',
  text,
  onClick,
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg hover:from-blue-400 hover:to-purple-400 hover:shadow-2xl focus:outline-none focus:ring focus:ring-purple-300 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur-lg"></span>
      <span className="relative z-10">{text}</span>
    </button>
  );
}
