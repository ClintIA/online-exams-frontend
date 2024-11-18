import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import logoClintia from '../../assets/logoClintia.png';
import {useAuth} from "../../hooks/auth.tsx";
import {Button} from "@/components/ui/button.tsx"
import {jwtDecode} from "jwt-decode";
import {ITokenPayload} from "@/types/Auth.ts";
import GeneralModal from "@/components/ModalHandle/GeneralModal.tsx";


const LoginAdmin: React.FC = () => {

    const navigate = useNavigate();
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                <div className="gradient-form bg-oxfordBlue w-full h-screen m-auto">
                    <div
                        className="flex h-full items-center justify-center">
                        <div className="w-3/4 md:w-2/4">
                            <div
                                className="block rounded-lg bg-oxfordBlue shadow-lg shadow-amber-100 dark:bg-neutral-800">
                                    <div className="p-5 text-center">
                                        <h2
                                            className="text-sm tracking-widest text-white font-semibold">
                                            Acesso Admin
                                        </h2>
                                        <div className="flex flex-col items-center md:mx-6 md:px-12">
                                            <div className="">

                                                <div className="p-4">
                                                    <img src={logoClintia} alt="Logo"
                                                         className="w-full h-auto shadow shadow-amber-50"/>
                                                </div>
                                                <h3 className="mt-1 text-sm sm:text-base tracking-widest text-white font-semibold">
                                                    Bem vindo a ClintIA.
                                                </h3>
                                            </div>
                                            <h4
                                                className="p-3 text-base sm:text-xl md:text-xl tracking-widest text-white font-semibold">
                                                Login
                                            </h4>
                                            <form className="sm:w-3/4 md:w-3/5" id="login-form">
                                                {/* Username Input */}
                                                <div className="flex flex-col relative">
                                                    <div className="mb-4">
                                                        <input autoComplete="true" placeholder="Email"
                                                               className='!text-oxfordBlue rounded-xl p-3 focus:text-white w-full'
                                                               type='text' value={email}
                                                               onChange={(e) => setEmail(e.target?.value)}/>

                                                    </div>
                                                    <div className='mb-4'>
                                                        <input autoComplete="true" placeholder="Senha"
                                                               className='!text-oxfordBlue rounded-xl p-3 focus:text-white w-full'
                                                               type='password' value={password}
                                                               onChange={(e) => setPassword(e.target.value)}/>

                                                    </div>
                                                </div>
                                                {/* Submit Button */}
                                                <div className="mb-12 pb-1 pt-1 text-center">
                                                    <Button
                                                        variant="outline"
                                                        onClick={(e) => handleLogin(e)}
                                                        className="mb-3 inline-block w-3/4 bg-amber-50 hover:bg-amber-500 hover:text-oxfordBlue rounded-xl px-6 pb-2 pt-2.5 text-sm font-semibold uppercase leading-normal text-oxfordBlue shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                                    >
                                                        Acessar
                                                    </Button>
                                                    <GeneralModal
                                                        error={true}
                                                        action={'Close'}
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
    );
};

export default LoginAdmin;
