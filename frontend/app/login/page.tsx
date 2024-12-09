'use client';

import React from 'react';
import Link from 'next/link';
import LoginForm from './LoginForm';
import Header from '@/components/ui/Header';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-200 to-gray-300 flex-col">
      <Header />
      <div className="w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-lg">
        <LoginForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link
            href="/register"
            className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-500 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
