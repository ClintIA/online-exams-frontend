'use client'

import { Button } from "@/components/ui/button.tsx"
import { Stethoscope, HardHat, Home, Lock, Link } from 'lucide-react'
import React from "react";

export const Error401: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="py-6 bg-oxfordBlue text-primary-foreground">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8" />
            <span className="text-2xl font-bold">Clint IA</span>
          </div>
          <HardHat className="h-8 w-8" />
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center">
        <Lock className="h-16 w-16 text-primary mb-6" />
        <h1 className="text-4xl font-bold mb-6">401 - Acesso não Autorizado</h1>
        <p className="text-xl mb-8">Oops! Você não possui acesso a essa pagina</p>
        
        <div className="bg-muted p-6 rounded-lg mb-8 max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Lamentamos o inconveniente</h2>
          <p className="mb-4">Esta área pode estar em construção ou restrita apenas a pessoal autorizado. Se você acredita que deveria ter acesso, entre em contato com nossa equipe de suporte.</p>
        </div>

        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full flex items-center justify-center space-x-2">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Button>
          </Link>
        </div>
      </main>

      <footer className="py-6 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Clint IA. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <span className="flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              Security is our priority
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}