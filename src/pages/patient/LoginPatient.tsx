import React, {useState} from 'react';
import logoClintia from '../../assets/logoClintia.png';
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/hooks/auth.tsx";
import {Button} from "@/components/ui/button.tsx";
import GeneralModal from "@/components/ModalHandle/GeneralModal.tsx";
import {useCpf} from "@/hooks/useCpf.tsx";
import {Input} from "@/components/ui/input.tsx";
import {EyeIcon, EyeOff} from "lucide-react";
import {Checkbox} from "@mui/material";


const LoginPatient: React.FC = () => {
    const [patientCpf, setPatientCpf] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();
    const { setCpf } = useCpf();
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!patientCpf) {
            setErrorMessage('Preencha seu CPF')
            setIsErrorModalOpen(true)
        }
        if (patientCpf) {
            const result = await auth.patientLogin(patientCpf, password)
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
                setCpf(patientCpf); // Armazena o CPF no contexto
                return  navigate('/paciente/home');
            }
        }
    }

    return (
        <div>
            <main className="min-h-screen flex">
                {/* Left side with background and logo */}
                <div className="flex-1 bg-oxfordBlue flex flex-col items-center justify-center p-8">
                    <div className="max-w-[400px] w-full space-y-6">
                        <img
                            src={logoClintia}
                            width={500}
                            height={400}
                            alt="Clintia Logo"
                            className="mx-auto"
                        />
                        <h1 className="text-sm text-white md:text-3xl font-bold text-center">
                            Bem vindo a ClintIA.
                        </h1>
                    </div>
                </div>

                {/* Right side with login form */}
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="max-w-[500px] w-full space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm text-black font-medium">
                                    CPF
                                </label>
                                <Input
                                    id="patientCpf"
                                    type="patientCpf"
                                    placeholder="Digite seu CPF"
                                    className="w-full p-5 rounded-full text-oxfordBlue placeholder:text-xs placeholder-gray-200 border-oxfordBlue"
                                    onChange={(e) => setPatientCpf(e.target?.value)}
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
                        <div className="flex justify-end">
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

export default LoginPatient;
