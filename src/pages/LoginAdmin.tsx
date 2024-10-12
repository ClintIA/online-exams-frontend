import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logoClintia from '../assets/logoClintia.png';
import {useAuth} from "../hooks/auth.tsx";
import ErrorModal from "../error/ErrorModal.tsx";
import {ILoginAdmin} from "../types/Auth.ts";
import { Button } from "@/components/ui/button"
import {Input} from "@mui/material";

const LoginAdmin: React.FC = () => {

    const navigate = useNavigate();
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!email || !password) {
            setErrorMessage('Preencha seu email e senha')
            setIsErrorModalOpen(true)
        }
        try {
            if(email && password) {
                auth.adminLogin(email, password).then((result: ILoginAdmin | undefined) => {
                    if(result?.status == "error") {
                        setIsErrorModalOpen(true)
                        setErrorMessage(result?.message)
                        return
                    } else {
                        navigate("/admin");
                    }

                })
            }

        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : "Erro ao realizar login")
            setIsErrorModalOpen(true)
        }
    }
    return (
            <div className="gradient-form bg-oxfordBlue">
                <div className="container h-screen w-max m-auto">
                    <div
                        className="flex h-full items-center justify-center text-neutral-800 dark:text-neutral-200">
                        <div className="w-full">
                            <div
                                className="block rounded-lg bg-oxfordBlue shadow-lg shadow-amber-100 dark:bg-neutral-800">
                                <div className="flex justify-center">

                                    <div className="text-center">
                                        <h3
                                            className="m-4 pb-1 text-sm tracking-widest text-white font-semibold">
                                            Acesso Admin
                                        </h3>
                                        <div className="md:mx-6 md:px-12">
                                            {/* Logo */}
                                            <div className="text-center">
                                                {/* Logo */}
                                                <div className="p-4">
                                                    <img src={logoClintia} alt="Logo"
                                                         className="w-30 mb-4 shadow shadow-amber-50"/>
                                                </div>
                                                <h4 className="mb-12 mt-1 pb-1 text-xl tracking-widest text-white font-semibold">
                                                    Bem vindo a ClintIA.
                                                </h4>
                                            </div>

                                            <form id="login-form">
                                                {/* Username Input */}
                                                <div className="flex flex-col relative">
                                                    <div className="mb-4">
                                                        <Input placeholder="Email"
                                                               className='!text-white focus:text-white border-b border-blue-500 p-1 w-full'
                                                               type='text' value={email}
                                                               onChange={(e) => setEmail(e.target?.value)}/>

                                                    </div>
                                                    <div className='mb-4'>
                                                        <Input placeholder="Senha"
                                                               className='!text-white focus:text-white border-b border-blue-500 p-1 w-full'
                                                               type='password' value={password}
                                                               onChange={(e) => setPassword(e.target.value)}/>

                                                    </div>
                                                </div>
                                                {/* Submit Button */}
                                                <div className="mb-12 pb-1 pt-1 text-center">
                                                    <Button
                                                        variant="outline"
                                                        onClick={(e) => handleLogin(e)}
                                                        className="mb-3 inline-block w-full bg-gray-800 hover:bg-amber-100 hover:text-black rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                                    >
                                                        Acessar
                                                    </Button>
                                                    <ErrorModal
                                                        isOpen={isErrorModalOpen}
                                                        onClose={() => setIsErrorModalOpen(false)}
                                                        message={errorMessage}/>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default LoginAdmin;
