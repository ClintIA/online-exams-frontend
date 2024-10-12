import { Stethoscope, Mail, Phone, LogOut} from 'lucide-react'
import React, {useEffect} from "react";
import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/hooks/auth.tsx";
import {useNavigate} from "react-router-dom";
import {ITokenPayload} from "@/types/Auth.ts";


const Construction: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if(user && token) {
      const tokenPayload: ITokenPayload = JSON.parse(user)
      if(tokenPayload.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/paciente')
      }
    }

  }, [])
  const handleLogout = async () => {
    try {
      auth.logOut()
      navigate('/login/admin')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="py-6 bg-oxfordBlue text-primary-foreground">
        <div className="container mx-auto px-2 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8" />
            <span className="text-2xl font-bold">Clint IA - Soluções Tecnológicas</span>
          </div>
          <Button
              variant="outline"
              size="sm"
              className={`flex text-black items-center space-x-2 hover:bg-gray-200`}
              onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
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