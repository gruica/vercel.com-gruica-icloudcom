"use client"

import Link from "next/link"
import { CheckCircle, Home, ArrowLeft, Headset, MessageCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { usePathname, useSearchParams } from "next/navigation"
import { SMS_SENDER_NUMBER } from "@/lib/constants"
import { AnimatedElement } from "@/components/AnimatedElement"

export default function PotvrdaPrijave() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const viberSent = searchParams.get("viber") === "true"
  const serviceId = searchParams.get("id") || ""
  const emailSent = searchParams.get("email") !== "false"

  return (
    <div className="flex flex-col min-h-screen">
      <Header activePath={pathname} />

      <main className="flex-1 py-12 bg-gray-50 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="fade-in">
            <div className="max-w-md mx-auto">
              <Card className="text-center shadow-lg">
                <CardHeader className="pb-0">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 p-4 rounded-full">
                      <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-green-700">Prijava uspješno poslata!</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Hvala vam na prijavi kvara. Vaš zahtjev je uspješno primljen.
                    {serviceId && <div className="font-medium mt-2">Referentni broj: #{serviceId}</div>}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="mb-2 font-medium">
                      Naš tim će vas kontaktirati u najkraćem mogućem roku kako bismo dogovorili termin servisa.
                    </p>

                    <div className="space-y-3 mt-4">
                      {emailSent && (
                        <div className="flex items-center justify-center text-blue-700 bg-blue-50 p-2 rounded-lg border border-blue-200">
                          <Mail className="h-5 w-5 mr-2 text-blue-600" />
                          <p>Poslali smo vam potvrdu na vašu email adresu.</p>
                        </div>
                      )}

                      {viberSent ? (
                        <div className="flex items-center justify-center text-purple-700 bg-purple-50 p-2 rounded-lg border border-purple-200">
                          <MessageCircle className="h-5 w-5 mr-2 text-purple-600" />
                          <p>Poslali smo vam potvrdu putem Viber aplikacije.</p>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-200">
                          <MessageCircle className="h-5 w-5 mr-2 text-gray-600" />
                          <p>Poslali smo vam SMS potvrdu sa broja {SMS_SENDER_NUMBER}.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-gray-500">
                      Ukoliko imate hitnu potrebu za servisom, možete pozvati naš call centar direktno:
                    </p>
                    <a
                      href="tel:+38233402402"
                      className="flex items-center justify-center font-bold text-xl mt-2 text-red-600 hover:text-red-700 hover:underline"
                    >
                      <Headset className="h-5 w-5 mr-2" />
                      +38233402402
                    </a>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center gap-4 pt-2">
                  <Button asChild variant="outline" className="gap-2">
                    <Link href="/">
                      <Home className="h-4 w-4" />
                      Početna
                    </Link>
                  </Button>
                  <Button asChild className="gap-2">
                    <Link href="/prijava-kvara">
                      <ArrowLeft className="h-4 w-4" />
                      Nova prijava
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </AnimatedElement>
        </div>
      </main>

      <Footer />
    </div>
  )
}

