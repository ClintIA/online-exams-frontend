import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import logoClintia from '../../assets/ClintIA-MarcaRGB-Verti-Cor-FundoOxford.png';
import {useAuth} from "../../hooks/auth.tsx";
import {Button} from "@/components/ui/button.tsx"
import {jwtDecode} from "jwt-decode";
import {ITokenPayload} from "@/types/Auth.ts";
import GeneralModal from "@/components/ModalHandle/GeneralModal.tsx";
import {Checkbox} from "@mui/material";
import {Input} from "@/components/ui/input.tsx";
import {EyeIcon, EyeOff} from "lucide-react";


const AdminLogin: React.FC = () => {

    const navigate = useNavigate();
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(() => {
        const getTenant = () => {
            if(auth?.token) {
                const decoded: ITokenPayload = jwtDecode(auth.token?.toString())
                if(decoded.isAdmin) {
                    navigate('/admin/home')
                }
            }
        }
        getTenant()
    },[auth.token, navigate])

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!email || !password) {
            setErrorMessage('Preencha seu email e senha')
            setIsErrorModalOpen(true)
            return
        }
        if (email && password) {
            const result = await auth.adminLogin(email, password)
            if(!result) {
                setErrorMessage('Erro ao Realizar login')
                setIsErrorModalOpen(true)
                return
            }
                if(result?.status === "error") {
                    setErrorMessage(result.message)
                    setIsErrorModalOpen(true)
                    return
                }
                if(result?.status === "success" && result?.data !== null) {
                    return  navigate('/admin/home')
                }
        }
    }
    return (
        <div>
            <main className="min-h-screen flex">
                {/* Left side with background and logo */}
                <div className="hidden sm:flex-1 bg-oxfordBlue sm:flex flex-col items-center justify-center p-8">
                    <div className="max-w-[400px] w-full space-y-6">
                        <img
                            src={logoClintia}
                            width={500}
                            height={400}
                            alt="Clintia Logo"
                            className="mx-auto rounded-full"
                        />
                        <h1 className="text-sm text-white md:text-3xl font-bold text-center">
                            Bem vindo a ClintIA.
                        </h1>
                    </div>
                </div>


                {/* Right side with login form */}
                <div className="flex-1 flex mt-10 sm:items-center justify-center p-8">
                    <div className="max-w-[500px] w-full space-y-6">
                        <div className="flex justify-center sm:hidden">
                            <img
                                src={logoClintia}
                                width={250}
                                height={200}
                                alt="Clintia Logo"
                                className="mx-auto rounded-full"
                            />
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm text-black font-medium">
                                    E-mail
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    className="w-full p-5 rounded-full text-oxfordBlue placeholder:text-xs placeholder-gray-200 border-oxfordBlue"
                                    onChange={(e) => setEmail(e.target?.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm text-black font-medium">
                                    Senha
                                </label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Digite sua senha"
                                        className="w-full p-5 rounded-full text-oxfordBlue placeholder:text-xs placeholder-gray-200 border-oxfordBlue"
                                        onChange={(e) => setPassword(e.target?.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-gray-700"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5"/>
                                        ) : (
                                            <EyeIcon className="h-5 w-5"/>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-start sm:items-center sm:flex-row justify-between">
                            <div className="flex items-center">
                                <Checkbox id="remember"/>
                                <label
                                    htmlFor="remember"
                                    className="text-xs font-light text-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Lembrar de mim
                                </label>
                            </div>
                            <a
                                href="#"
                                className="ml-12 sm:ml-0 text-xs font-light text-black hover:underline"
                            >
                                Esqueci a senha
                            </a>
                        </div>
                        <div className="flex justify-center sm:justify-end">
                            <Button onClick={handleLogin}
                                    className="w-1/2 rounded-full bg-[#0B1A2B] hover:bg-[#152942]">
                                Acessar
                            </Button>
                        </div>

                    </div>
                </div>
            </main>
            <GeneralModal
                error={true}
                action={'Close'}
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                message={errorMessage}/>
        </div>

    );
};

export default AdminLogin;
