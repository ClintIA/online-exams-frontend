import React, {useEffect, useState} from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ListaAgendamentos from "@/components/Booking/BookingList.tsx";
import Booking from "@/components/Booking/Booking.tsx";
import RegisterPatient, {DadosPaciente} from "@/components/AdminPatient/RegisterPatient.tsx";
import {Button} from "@/components/ui/button.tsx";
import ModalPatientRender, {Type} from "@/components/AdminPatient/ModalPatientRender.tsx";
import {listPatientExams} from "@/services/patientExamService.tsx";
import {ITokenPayload} from "@/types/Auth.ts";
import {jwtDecode} from "jwt-decode";
import {useAuth} from "@/hooks/auth.tsx";
import {IPatientExam} from "@/pages/AdminHome.tsx";
import {createDate} from "@/lib/utils.ts";

const NewBooking: React.FC = () =>  {
    const [openModalNewPatient, setOpenModalNewPatient] = useState<boolean>(false)
    const [type,setType] = useState<Type>(Type.newPatient)
    const [tenantId, setTenantID] = useState<number | undefined>()
    const [userId, setUserID] = useState<number | undefined>()
    const [exams, setExams] = useState<IPatientExam[]>([])

    const [dadosPaciente, setDadosPaciente] = useState<DadosPaciente>({
        full_name: '',
        email: '',
        phone: '',
        dob: '',
        cpf: '',
        canal:'',
        address:'',
        gender: '',
        health_card_number: '',
    })
    const auth = useAuth()
    const openFlexiveModal = (modalType: Type, paciente?: DadosPaciente) => {
        if(paciente) {
            setDadosPaciente(paciente)
        }
        setType(modalType)
        setOpenModalNewPatient(true)
    }
    useEffect(() => {
        const getTenant = () => {
            if (auth?.token) {
                const decoded: ITokenPayload = jwtDecode(auth.token?.toString())
                setTenantID(decoded.tenantId)
                setUserID(decoded.userId)
            }
        }
        getTenant()
    }, [auth.token])
    useEffect(() => {
        const fetchPatientExams = async () => {
            try {
                if (tenantId) {
                    const today = new Date().toLocaleDateString()
                    const result = await listPatientExams(tenantId, {
                        startDate: createDate(today),
                        endDate: createDate(today),
                        status: 'Scheduled'
                    })
                    if (result?.data?.status === "success") {
                        const examsList = result?.data?.data?.exams as IPatientExam[]
                        setExams(examsList || [])
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchPatientExams()
    }, [tenantId]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-oxfordBlue">Gerenciamento de Agendamentos</h1>
            <Tabs defaultValue="lista" className="space-y-4">
                <TabsList className="p-5 gap-2">
                    <TabsTrigger className="p-1 text-base text-oxfordBlue" value="lista">Agendamentos do Dia</TabsTrigger>
                    <TabsTrigger className="p-1 text-base text-oxfordBlue" value="paciente">Medicos Agendados</TabsTrigger>
                    <TabsTrigger className="p-1 text-base text-oxfordBlue" value="agendamentos">Realizar Agendamento</TabsTrigger>
                </TabsList>
                <TabsContent value="paciente">
                    <Card>
                        <CardContent>
                            <RegisterPatient />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="agendamentos">
                    <Card>
                        <CardContent>
                            <Booking dadosPaciente={dadosPaciente} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="lista">
                    <Card>
                        <CardHeader className="flex flex-row gap-2 justify-items-start text-base text-oxfordBlue">
                            <div className="mt-1.5">
                                <Button onClick={() => openFlexiveModal(Type.newPatient)}
                                        className="bg-oxfordBlue text-white hover:bg-blue-900" type="submit">Cadastrar
                                    Paciente</Button>
                            </div>
                            <div>
                                <Button onClick={() => openFlexiveModal(Type.booking)}
                                        className="bg-oxfordBlue text-white hover:bg-blue-900" type="submit">Realizar Agendamento
                                </Button>
                            </div>
                        </CardHeader>
                        <CardTitle className="ml-8 text-oxfordBlue text-xl">
                            Agendamentos de Hoje
                        </CardTitle>
                        <CardContent>
                                <div className="ml-8">
                                    <ListaAgendamentos
                                        agendamentos={exams}
                                    />
                                </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        {openModalNewPatient && <ModalPatientRender
            isOpen={openModalNewPatient}
            onClose={() => setOpenModalNewPatient(false)}
            type={type}
            dadosPaciente={dadosPaciente}
        />}
        </div>
    )
}

export default NewBooking;