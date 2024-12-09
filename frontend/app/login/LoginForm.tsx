'use client';

import React, { useState } from 'react';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        const user = users.find((user: { email: string, password: string }) => 
            user.email === formData.email && user.password === formData.password
        );

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            router.push('/game');
        } else {
            alert('Invalid email or password');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-gray-100 p-8 rounded-xl shadow-lg max-w-md mx-auto border border-gray-200"
        >
            <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
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
            <Button type="submit" text="Login" />
        </form>
    );
}
