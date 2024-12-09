'use client';

import React, { useState } from 'react';
import TextInput from '../../components/ui/TextInput';
import Button from '../../components/ui/Button';
import { parseAbi, stringToHex } from 'viem';
import { useWriteContract } from 'wagmi';

const ADDRESS = "0xdc86955f3344186ded62d7a9d3c8d36d3df34028"

export default function RegisterForm() {
  const { writeContract } = useWriteContract()
  const ABI = parseAbi([
    "function get_value() view returns (bytes32)",
    "function hola_mundo() public view returns(string)",
    // "function set_value(bytes32) public",
    "function add_player(bytes8) public view returns(string)"
  ])
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    writeContract({
      abi: ABI,
      address: ADDRESS,
      functionName: 'add_player',
      args: [stringToHex(formData.username, { size: 8 })]
    })
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
  existingUsers.push(formData);
  localStorage.setItem('users', JSON.stringify(existingUsers));
};

return (
  <form
    onSubmit={handleSubmit}
    className="space-y-6 bg-gray-100 p-8 rounded-xl shadow-lg max-w-md mx-auto border border-gray-200"
  >
    <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
    <TextInput
      label="Username"
      name="username"
      type="text"
      value={formData.username}
      onChange={handleChange}
      placeholder="Enter your username"
    />
    <TextInput
      label="Email"
      name="email"
      type="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Enter your email"
    />
    <TextInput
      label="Password"
      name="password"
      type="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Enter your password"
    />
    <Button type="submit" text="Register" />
  </form>
);
}
