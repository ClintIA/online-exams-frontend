import React, {useEffect, useState, useCallback} from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx"
import {DadosPaciente} from "@/components/AdminPatient/RegisterPatient.tsx";
import {Button} from "@/components/ui/button.tsx";
import ModalRender, {Type} from "@/components/ModalHandle/ModalRender.tsx";
import {listPatientExams} from "@/services/patientExamService.tsx";
import {ITokenPayload} from "@/types/Auth.ts";
import {jwtDecode} from "jwt-decode";
import {useAuth} from "@/hooks/auth.tsx";
import {IPatientExam} from "@/pages/admin/AdminHome.tsx";
import BookingList from "@/components/Booking/BookingList.tsx";
import DoctorList from "@/components/Booking/DoctorList.tsx";
import BookingPatient from "@/components/Booking/BookingPatient.tsx";
import {Input} from "@/components/ui/input.tsx";
import {formatDate} from "@/lib/utils.ts";

const AdminBooking: React.FC = () =>  {

    const [openModalNewPatient, setOpenModalNewPatient] = useState<boolean>(false)
    const [type,setType] = useState<Type>(Type.newPatient)
    const [tenantId, setTenantID] = useState<number | undefined>()
    const [exams, setExams] = useState<IPatientExam[]>([])
    const [title, setTitle] = useState<string>("")
    const [date, setDate] = useState(new Date().toLocaleDateString())
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
    const [confirmationBookingData, setConfirmaationBookingData] = useState({})
    const auth = useAuth()
    const openFlexiveModal = (title: string, modalType: Type, confirmationBooking?: any, paciente?: DadosPaciente) => {
        if(paciente) {
            setDadosPaciente(paciente)
        }
        if(modalType === Type.bookingConfirmation) {
            setConfirmaationBookingData(confirmationBooking)
        }
        setType(modalType)
        setTitle(title)
        setOpenModalNewPatient(true)
    }
    useEffect(() => {
        const getTenant = () => {
            if (auth?.token) {
                const decoded: ITokenPayload = jwtDecode(auth.token?.toString())
                setTenantID(decoded.tenantId)
            }
        }
        getTenant()
    }, [auth.token])
    const fetchPatientExams = useCallback(async (newDate: string) => {
        try {
            if (tenantId) {
                const result = await listPatientExams(tenantId, {
                    startDate: newDate,
                    endDate: newDate,
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
    }, [tenantId])
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setDate(value)
    }
    useEffect(() => {
        fetchPatientExams(date).then()
    }, [date, fetchPatientExams]);
    const handleModalMessage = () => {
        openFlexiveModal('Confirmação de Agendamento', Type.bookingConfirmation)
    }
    const handleClose = () => {
        fetchPatientExams(date).then()
        setOpenModalNewPatient(false)
    }

    return (
        <div className="w-full max-w-6xl p-4 mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-oxfordBlue">Gerenciamento de Agendamentos</h1>
            <Tabs defaultValue="lista" className="space-y-4">
                <TabsList className="p-5 gap-2">
                    <TabsTrigger className="p-1 text-base text-oxfordBlue" value="lista">Pacientes <span className="hidden sm:flex">Agendados</span></TabsTrigger>
                    <TabsTrigger className="p-1 text-base text-oxfordBlue" value="doctors">Medicos <span className="hidden sm:flex">Agendados</span></TabsTrigger>
                    <TabsTrigger className="p-1 text-base text-oxfordBlue" value="booking">Realizar Agendamento</TabsTrigger>
                </TabsList>
                <TabsContent value="lista">
                    <Card className="p-4">
                        <CardTitle className="ml-8 text-oxfordBlue text-xl">
                            {`Agendamentos do ${formatDate(date)}`}
                        </CardTitle>
                        <CardHeader className="flex flex-col sm:flex-row gap-2 justify-between text-base text-oxfordBlue">
                            <div className="mt-1.5 flex gap-2">
                                <Button onClick={() => openFlexiveModal('Registrar Paciente', Type.newPatient)}
                                        className="bg-oxfordBlue text-white hover:bg-blue-900" type="submit">Cadastrar
                                    Paciente</Button>
                                <Button onClick={() => openFlexiveModal('Agendamento de Exame', Type.newBookingPatient)}
                                        className="bg-oxfordBlue text-white hover:bg-blue-900" type="submit">Realizar
                                    Agendamento
                                </Button>
                            </div>
                            <div>
                                    <Input
                                        id="examDate"
                                        name="examDate"
                                        type="date"
                                        className="col-span-3 w-48 h-10 font-semibold text-base text-oxfordBlue"
                                        onChange={handleInputChange}
                                    />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="ml-4">
                                <BookingList
                                    agendamentos={exams}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="doctors">
                    <Card>
                        <CardHeader className="flex flex-row gap-2 justify-items-start text-base text-oxfordBlue">
                            <CardTitle className="ml-4 text-oxfordBlue text-xl">
                                {`Médicos agendados para ${formatDate(date)}`}
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <DoctorList agendamentos={exams} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="booking">
                    <Card>
                        <CardContent>
                            <BookingPatient />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        {openModalNewPatient && <ModalRender
            isOpen={openModalNewPatient}
            title={title}
            type={type}
            dadosPaciente={dadosPaciente}
            onClose={handleClose}
            dadosBooking={confirmationBookingData}
            modalNewPatient={handleModalMessage}
        />}
        </div>
    )
}

export default AdminBooking;