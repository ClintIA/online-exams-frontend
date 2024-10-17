import { Button } from "@/components/ui/button.tsx"
import { Stethoscope, HardHat, Home, Link } from 'lucide-react'
import React from "react";

const Error404: React.FC = () => {
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
        <h1 className="text-4xl font-bold mb-6">404 - Pagina não encontrada</h1>
        <p className="text-xl mb-8">Oops! Pagina não foi encontrada, verifique a url</p>
        
        <div className="bg-muted p-6 rounded-lg mb-8 max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Lamentamos o inconveniente</h2>
          <p className="mb-4">Nossa equipe está trabalhando duro para trazer a você uma ótima experiência. Enquanto isso, você pode retornar à nossa página inicial ou entrar em contato conosco para obter assistência.</p>
        </div>

        <Link href="/public">
          <Button className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Button>
        </Link>
      </main>

      <footer className="py-6 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Clint IA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
export default Error404;