"use client"

import { Hero } from "@/components/Hero"
import { AboutSection } from "@/components/AboutSection"
import { ServicesSection } from "@/components/ServicesSection"
import { ContactSection } from "@/components/ContactSection"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { useState, useEffect } from "react"
import { initialEmployees } from "@/lib/data"
import type { Employee } from "@/lib/types"

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isAddingEmployee, setIsAddingEmployee] = useState(false)
  const [isEditingEmployee, setIsEditingEmployee] = useState(false)

  // Učitaj inicijalne podatke
  useEffect(() => {
    // Pokušaj učitati podatke iz localStorage
    const savedEmployees = localStorage.getItem("employees")
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees))
      setFilteredEmployees(JSON.parse(savedEmployees))
    } else {
      // Ako nema podataka u localStorage, koristi inicijalne podatke
      setEmployees(initialEmployees)
      setFilteredEmployees(initialEmployees)
    }
  }, [])

  // Sačuvaj podatke u localStorage kada se promene
  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem("employees", JSON.stringify(employees))
    }
  }, [employees])

  const handleSearch = (query: string, field: string) => {
    if (!query) {
      setFilteredEmployees(employees)
      return
    }

    const lowercaseQuery = query.toLowerCase()
    const filtered = employees.filter((employee) => {
      if (field === "name") {
        return employee.name.toLowerCase().includes(lowercaseQuery)
      } else if (field === "jobTitle") {
        return employee.jobTitle.toLowerCase().includes(lowercaseQuery)
      } else if (field === "all") {
        return (
          employee.name.toLowerCase().includes(lowercaseQuery) ||
          employee.jobTitle.toLowerCase().includes(lowercaseQuery) ||
          (employee.email && employee.email.toLowerCase().includes(lowercaseQuery)) ||
          (employee.phoneNumber && employee.phoneNumber.toLowerCase().includes(lowercaseQuery))
        )
      }
      return false
    })
    setFilteredEmployees(filtered)
  }

  const handleAddEmployee = (employee: Employee) => {
    const newEmployee = {
      ...employee,
      id: Date.now().toString(),
      employmentHistory: employee.employmentHistory || [],
    }
    setEmployees([...employees, newEmployee])
    setFilteredEmployees([...employees, newEmployee])
    setIsAddingEmployee(false)
  }

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    const updatedEmployees = employees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    setEmployees(updatedEmployees)
    setFilteredEmployees(updatedEmployees)
    setSelectedEmployee(updatedEmployee)
    setIsEditingEmployee(false)
  }

  const handleDeleteEmployee = (id: string) => {
    const updatedEmployees = employees.filter((emp) => emp.id !== id)
    setEmployees(updatedEmployees)
    setFilteredEmployees(updatedEmployees)
    setSelectedEmployee(null)
  }

  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsEditingEmployee(false)
  }

  const resetToInitialData = () => {
    if (
      window.confirm(
        "Da li ste sigurni da želite resetovati sve podatke na početne vrednosti? Ova akcija se ne može poništiti.",
      )
    ) {
      setEmployees(initialEmployees)
      setFilteredEmployees(initialEmployees)
      setSelectedEmployee(null)
      localStorage.setItem("employees", JSON.stringify(initialEmployees))
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header activePath="/" />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

