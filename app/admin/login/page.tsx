"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { login, isAuthenticated } from "@/lib/auth"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { usePathname } from "next/navigation"
import { Home } from "lucide-react"

export default function AdminLogin() {
  const router = useRouter()
  const pathname = usePathname()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Ako je korisnik već prijavljen, preusmeri ga na admin panel
    if (isAuthenticated()) {
      router.push("/admin/zaposleni")
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const result = login(username, password)

    if (result.success) {
      router.push("/admin/zaposleni")
    } else {
      setError(result.message || "Greška prilikom prijave")
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header activePath={pathname} />

      <main className="flex-1 flex items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-md">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0 text-blue-500">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Ovo je stranica za prijavu na administratorski panel. Da biste videli glavni sajt, kliknite na{" "}
                  <Link href="/" className="font-medium underline">
                    Povratak na glavni sajt
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Administratorska prijava</h1>
              <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
                <Home className="h-4 w-4 mr-1" />
                Glavni sajt
              </Link>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Korisničko ime
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Lozinka
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? "Prijavljivanje..." : "Prijavi se"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

