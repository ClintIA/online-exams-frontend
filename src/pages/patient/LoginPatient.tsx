import React, {useState} from 'react';
import logoClintia from '../../assets/logoClintia.png';
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/hooks/auth.tsx";
import {Button} from "@/components/ui/button.tsx";
import GeneralModal from "@/components/ModalHandle/GeneralModal.tsx";
import {useCpf} from "@/hooks/useCpf.tsx";


const LoginPatient: React.FC = () => {
    const [patientCpf, setPatientCpf] = useState("");
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
        <div className="gradient-form bg-oxfordBlue w-full h-screen m-auto">
            <div
                className="flex h-full items-center justify-center">
                <div className="w-3/4 md:w-2/4">
                    <div
                        className="block rounded-lg bg-oxfordBlue shadow-lg shadow-amber-100 dark:bg-neutral-800">
                        <div className="p-5 text-center">

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
                                            <input autoComplete="true" placeholder="Digite seu CPF"
                                                   className='!text-oxfordBlue rounded-xl p-3 focus:text-white w-full'
                                                   type='text' value={patientCpf}
                                                   name="patientCpf"
                                                   onChange={(e) => setPatientCpf(e.target?.value)}/>

                                        </div>
                                        <div className='mb-4'>
                                            <input autoComplete="true" placeholder="Digite sua Senha"
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

export default LoginPatient;
