import React, {useEffect, useState} from "react";
import ClinicCard, {Clinic} from "@/components/AdminSelectTenant/ClinicCard.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {Spinner} from "@/components/ui/Spinner.tsx";
import logoClintia from "@/assets/ClintIA-MarcaRGB-Verti-Cor-FundoOxford.png";
import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/hooks/auth.tsx";

const AdminSelectTenant: React.FC = () => {
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        setIsLoading(true)
        if (location.state) {
            setClinics(location.state.tenants);
            setName(location.state.admin)
            setLogin(location.state.login)
            setIsLoading(false)
        }
    }, []);

    const handleLogin = async (tenantID: number) => {
        setIsLoading(true)

       const result = await auth.login(login, tenantID)
        setIsLoading(false)
        if (result?.status === "success" && result.data !== null) {
                return navigate('/admin/home');
        }
    }
        return (
        <div>
            { isLoading ? ( <Spinner /> ) :  (
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
                                    <div className="flex-1 bg-white p-8 flex flex-col">
                                        <div className="max-w-md mx-auto w-full space-y-4">
                                            <h2 className="text-3xl font-bold mb-2">{`Olá, ${name}!`}</h2>
                                            <h3 className="text-xl font-semibold mb-6">SELECIONE A UNIDADE</h3>
                                            {clinics?.map((clinic) => (
                                                <div key={clinic.id} onClick={() => handleLogin(clinic.id)}>
                                                <ClinicCard
                                                    key={clinic.id}
                                                    clinic={clinic}
                                                />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                <div className="flex justify-center sm:justify-end">
                                    <Button
                                        type="submit"
                                        className="w-1/2 rounded-full bg-[#0B1A2B] hover:bg-[#152942]"
                                    >
                                        Acessar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </div>
    );

}
export default AdminSelectTenant;