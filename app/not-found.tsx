import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-3xl font-bold mb-4">404 - Stranica nije pronađena</h2>
      <p className="text-gray-600 mb-6 text-center">Stranica koju tražite ne postoji ili je premještena.</p>
      <Button asChild>
        <Link href="/">Povratak na početnu</Link>
      </Button>
    </div>
  )
}

