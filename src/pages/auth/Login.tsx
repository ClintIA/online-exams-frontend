import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import logoClintia from '../../assets/ClintIA-MarcaRGB-Verti-Cor-FundoOxford.png';
import { useAuth } from "@/hooks/auth.tsx";
import { Button } from "@/components/ui/button.tsx";
import GeneralModal from "@/components/ModalHandle/GeneralModal.tsx";
import { Input } from "@/components/ui/input.tsx";
import { EyeIcon, EyeOff } from "lucide-react";
import Cookies from "js-cookie";
import {ITokenPayload} from "@/types/Auth.ts";
import {jwtDecode} from "jwt-decode";
import {Spinner} from "@/components/ui/Spinner.tsx";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const tokenFromStorage = Cookies.get('token');
                const user = Cookies.get('user');

                if (tokenFromStorage && user) {
                    const decoded: ITokenPayload = jwtDecode(tokenFromStorage);
                    if (decoded.exp * 1000 < Date.now()) {
                        auth.logOut();
                    } else {
                       if(decoded.role === 'patient') {
                           return navigate('/paciente/home');
                       } else {
                           return navigate('/admin/home');
                       }
                    }
                }
            } catch (error) {
                console.error("Erro ao decodificar token:", error);
                auth.logOut();
            }
        };

        checkToken().then();
    }, []);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)

        if (!identifier || !password) {
            setErrorMessage('Preencha seu usuário e senha.');
            setIsErrorModalOpen(true);
            return;
        }

        const result = await auth.loginToTenant(identifier, password);
        if (!result) {
            setErrorMessage('Erro ao realizar login');
            setIsErrorModalOpen(true);
            setIsLoading(false)
            return;
        }

        if (result.status === "error") {
            setErrorMessage(result.message);
            setIsErrorModalOpen(true);
            setIsLoading(false)

            return;
        }

        if (result.status === "success" && result.data !== null) {
            setIsLoading(false)
            if (result.data.token) {
                const decoded: ITokenPayload = jwtDecode(result.data.token);
                if (decoded) {
                    await auth.login(identifier, decoded.tenantId)
                    return navigate('/admin/home')
                }
            } else {
                return navigate('/select-tenant', {state: result.data});
            }
        }
    }

    return (
        <div>
            <main className="min-h-screen flex">
                <div className="hidden sm:flex-1 bg-oxfordBlue sm:flex flex-col items-center justify-center p-8">
                    <div className="max-w-[400px] w-full space-y-1">
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
                        {isLoading ? (
                            <div className="flex justify-center">
                                <Spinner className="w-52 h-24"/>
                            </div>
                        ) : (
                            <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="identifier" className="block text-sm text-black font-medium">
                                    Usuário
                                </label>
                                <Input
                                    id="identifier"
                                    type="text"
                                    placeholder="Digite seu Usuário"
                                    className="w-full p-5 rounded-full text-oxfordBlue placeholder:text-xs placeholder-gray-200 border-oxfordBlue"
                                    onChange={(e) => setIdentifier(e.target?.value)}
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

                            {/* <div className="flex flex-col items-start sm:items-center sm:flex-row justify-between">
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
                            </div> */}
                            <div className="flex justify-center sm:justify-end">
                                <Button
                                    type="submit"
                                    className="w-1/2 rounded-full bg-[#0B1A2B] hover:bg-[#152942]"
                                >
                                    Acessar
                                </Button>
                            </div>
                        </form>)}
                    </div>
                </div>
            </main>
            <GeneralModal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                title="Erro ao realizar seu Login"
                message={errorMessage}
                action="Fechar"
                error={true}
            />
        </div>
        )

};

export default Login;