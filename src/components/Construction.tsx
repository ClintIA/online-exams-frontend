'use client'

import { HardHat, Stethoscope, Mail, Phone } from 'lucide-react'
import React from "react";

const Construction: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="py-6 bg-oxfordBlue text-primary-foreground">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8" />
            <span className="text-2xl font-bold">Clint IA - Soluções Tecnológicas</span>
          </div>
          <HardHat className="h-8 w-8" />
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Nosso site está em construção</h1>
          <p className="text-xl mb-8">Estamos trabalhando para trazer a você uma ótima experiência. Em breve!</p>

          <div className="bg-muted p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-6">About Clint IA</h2>
            <p className="mb-4">A Clint IA está comprometida em fornecer serviços de tecnlogia de alta qualidade.</p>
            <div className="flex justify-center space-x-4">

              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>(22) 19-9779-4401</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="py-6 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Clint IA - Soluções Tecnlógicas. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Mail className="h-5 w-5" />
            <span>dev.clintia@gmail.com</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Construction;