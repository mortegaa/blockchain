"use client"
import Header from "@/components/ui/Header"
import RegisterForm from "./RegisterForm"


export default function Container() {

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-200 to-gray-300 flex-col">
      <Header/>
      <div className="w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-lg">
        <RegisterForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-purple-600 hover:text-purple-800 font-semibold"
          >
            Sign In
          </a>
        </p>
      </div>
    </main>
  )
}
