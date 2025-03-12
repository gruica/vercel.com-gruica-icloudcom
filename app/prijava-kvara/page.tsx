"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { AnimatedElement } from "@/components/AnimatedElement"
import { ClipboardList, Send } from "lucide-react"
import { AnimatedButton } from "@/components/AnimatedButton"

export default function PrijavaKvara() {
  const router = useRouter()
  const pathname = usePathname()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const formValues = Object.fromEntries(formData.entries())

      const response = await fetch("/api/prijava-kvara", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Nepoznata greška")
      }

      if (data.success) {
        toast({
          title: "Prijava uspješno poslata",
          description: "Vaša prijava kvara je uspješno primljena. Kontaktiraćemo vas uskoro.",
        })

        setTimeout(() => {
          router.push(
            `/prijava-kvara/potvrda?viber=${data.viberSent || false}&id=${data.serviceId}&email=${data.emailSent || false}`,
          )
        }, 1000)
      } else {
        throw new Error(data.error || "Nepoznata greška")
      }
    } catch (error) {
      console.error("Greška prilikom slanja:", error)
      toast({
        title: "Greška",
        description:
          error instanceof Error
            ? error.message
            : "Došlo je do greške prilikom slanja prijave. Molimo pokušajte ponovo ili nas kontaktirajte telefonom.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header activePath={pathname} />

      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h1 className="text-3xl font-bold mb-4">Prijava kvara</h1>
              <p className="text-gray-600">
                Popunite formular ispod da biste prijavili kvar na vašem uređaju. Naš tim će vas kontaktirati u
                najkraćem mogućem roku.
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={200}>
            <Card className="max-w-3xl mx-auto shadow-lg">
              <CardHeader className="bg-blue-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <ClipboardList className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <CardTitle>Obrazac za prijavu kvara</CardTitle>
                    <CardDescription>
                      Svi podaci se tretiraju kao povjerljivi i koriste se samo za potrebe servisa.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Lični podaci */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-blue-700">Lični podaci</h3>

                      <div>
                        <label htmlFor="ime" className="block text-sm font-medium text-gray-700 mb-1">
                          Ime i prezime *
                        </label>
                        <input
                          type="text"
                          id="ime"
                          name="ime"
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-1">
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          id="telefon"
                          name="telefon"
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="adresa" className="block text-sm font-medium text-gray-700 mb-1">
                          Adresa *
                        </label>
                        <input
                          type="text"
                          id="adresa"
                          name="adresa"
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="grad" className="block text-sm font-medium text-gray-700 mb-1">
                            Grad *
                          </label>
                          <input
                            type="text"
                            id="grad"
                            name="grad"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label htmlFor="postanskiBroj" className="block text-sm font-medium text-gray-700 mb-1">
                            Poštanski broj
                          </label>
                          <input
                            type="text"
                            id="postanskiBroj"
                            name="postanskiBroj"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Podaci o uređaju */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-blue-700">Podaci o uređaju</h3>

                      <div>
                        <label htmlFor="tipUredjaja" className="block text-sm font-medium text-gray-700 mb-1">
                          Tip uređaja *
                        </label>
                        <select
                          id="tipUredjaja"
                          name="tipUredjaja"
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Izaberite tip uređaja</option>
                          <option value="Frižider">Frižider</option>
                          <option value="Zamrzivač">Zamrzivač</option>
                          <option value="Veš mašina">Veš mašina</option>
                          <option value="Mašina za suđe">Mašina za suđe</option>
                          <option value="Šporet">Šporet</option>
                          <option value="Rerna">Rerna</option>
                          <option value="Klima uređaj">Klima uređaj</option>
                          <option value="Bojler">Bojler</option>
                          <option value="Mikrotalasna">Mikrotalasna</option>
                          <option value="Sušilica">Sušilica</option>
                          <option value="Drugo">Drugo</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="proizvodjac" className="block text-sm font-medium text-gray-700 mb-1">
                          Proizvođač
                        </label>
                        <input
                          type="text"
                          id="proizvodjac"
                          name="proizvodjac"
                          placeholder="npr. Beko, Candy, Gorenje..."
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                          Model
                        </label>
                        <input
                          type="text"
                          id="model"
                          name="model"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="starostUredjaja" className="block text-sm font-medium text-gray-700 mb-1">
                          Starost uređaja
                        </label>
                        <select
                          id="starostUredjaja"
                          name="starostUredjaja"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Izaberite starost uređaja</option>
                          <option value="Manje od 1 godine">Manje od 1 godine</option>
                          <option value="1-2 godine">1-2 godine</option>
                          <option value="3-5 godina">3-5 godina</option>
                          <option value="6-10 godina">6-10 godina</option>
                          <option value="Više od 10 godina">Više od 10 godina</option>
                          <option value="Ne znam">Ne znam</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Opis kvara */}
                  <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-medium text-blue-700">Opis kvara</h3>

                    <div>
                      <label htmlFor="opisKvara" className="block text-sm font-medium text-gray-700 mb-1">
                        Opis problema *
                      </label>
                      <textarea
                        id="opisKvara"
                        name="opisKvara"
                        rows={4}
                        required
                        placeholder="Detaljno opišite problem koji imate sa uređajem..."
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="hitnost" className="block text-sm font-medium text-gray-700 mb-1">
                        Hitnost
                      </label>
                      <select
                        id="hitnost"
                        name="hitnost"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Nije hitno">Nije hitno</option>
                        <option value="Umereno hitno">Umereno hitno</option>
                        <option value="Hitno">Hitno</option>
                        <option value="Vrlo hitno">Vrlo hitno</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="napomena" className="block text-sm font-medium text-gray-700 mb-1">
                        Dodatna napomena
                      </label>
                      <textarea
                        id="napomena"
                        name="napomena"
                        rows={2}
                        placeholder="Unesite dodatne informacije koje smatrate važnim..."
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    </div>
                  </div>

                  {/* Samo menjamo dugme za slanje */}
                  <div className="pt-4">
                    {isSubmitting ? (
                      <Button disabled className="w-full py-6 text-lg bg-blue-600">
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Slanje u toku...
                        </span>
                      </Button>
                    ) : (
                      <AnimatedButton
                        type="submit"
                        className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <span className="flex items-center justify-center">
                          <Send className="mr-2 h-5 w-5" />
                          Pošalji prijavu
                        </span>
                      </AnimatedButton>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </AnimatedElement>
        </div>
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}

