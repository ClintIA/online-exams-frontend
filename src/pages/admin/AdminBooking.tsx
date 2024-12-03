import React, {useCallback, useEffect, useState} from 'react'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx"
import {Tabs, TabsContent} from "@/components/ui/tabs.tsx"
import {DadosPaciente} from "@/components/AdminPatient/RegisterPatient.tsx";
import {Button} from "@/components/ui/button.tsx";
import ModalRender from "@/components/ModalHandle/ModalRender.tsx";
import {confirmPatientExam, listPatientExams} from "@/services/patientExamService.tsx";
import {ITokenPayload} from "@/types/Auth.ts";
import {jwtDecode} from "jwt-decode";
import {useAuth} from "@/hooks/auth.tsx";
import {IPatientExam} from "@/pages/admin/AdminHome.tsx";
import BookingList from "@/components/Booking/BookingList.tsx";
import {Input} from "@/components/ui/input.tsx";
import {formatDate} from "@/lib/utils.ts";
import GeneralModal from "@/components/ModalHandle/GeneralModal.tsx";
import {ModalType} from "@/types/ModalType.ts";
import Cards from "@/components/Card.tsx";

const AdminBooking: React.FC = () =>  {

    const [openModalNewPatient, setOpenModalNewPatient] = useState<boolean>(false)
    const [type,setType] = useState<ModalType>(ModalType.newPatient)
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
        cep:'',
        gender: '',
        health_card_number: '',
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [titleModal,setTitleModal] = useState("");
    const [action,setAction] = useState("");
    const [isError, setIsError] = useState(false);
    const [generalMessage, setGeneralMessage] = useState<string>('')
    const [isGeneralModalOpen, setIsGeneralModalOpen] = useState(false)
    const auth = useAuth()

    const openFlexiveModal = (title: string, modalType: ModalType, paciente?: DadosPaciente) => {
        if(paciente) {
            setDadosPaciente(paciente)
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
                setLoading(true)
                const result = await listPatientExams(tenantId, {
                    startDate: newDate,
                    endDate: newDate,
                    status: 'Scheduled'
                })
                setLoading(false)
                if (result?.data?.status === "success") {
                    const examsList = result?.data?.data?.exams as IPatientExam[]
                    setExams(examsList || [])
                }
            }
        } catch (error) {
            setLoading(false)
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
    const handleConfirmationBooking = () => {
        openFlexiveModal('Confirmação de Agendamento', ModalType.bookingConfirmation)
    }
    const handleModalMessage = (message: string) => {
        setGeneralMessage(message)
        setTitleModal('Confirmação')
        setAction('Fechar')
        setIsError(false)
        setIsGeneralModalOpen(true)
    }
    const handleClose = () => {
        fetchPatientExams(date).then()
        setOpenModalNewPatient(false)
    }
    const handlePresence  = async (examId: number) => {
        try {
            if(tenantId) {

                const result = await confirmPatientExam(tenantId, examId)
                if(result) {
                    handleModalMessage('Paciente Confirmado')
                    fetchPatientExams(date).then()
                }
            }
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full max-w-6xl p-4 mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-oxfordBlue">Agendamentos</h1>
            <div className="flex flex-col md:flex-row gap-3 mb-6">
                <Cards name='Total de Agendamentos' content={exams?.length}/>
            </div>
            <Tabs defaultValue="lista" className="space-y-4">
                <TabsContent value="lista">
                    <Card className="p-4">
                        <CardTitle className="ml-8 text-oxfordBlue text-xl">
                            {`Agendamentos do ${formatDate(date)}`}
                        </CardTitle>
                        <CardHeader
                            className="flex flex-col sm:flex-row gap-2 justify-between text-base text-oxfordBlue">
                            <div className="mt-1.5 flex gap-2">
                                <Button
                                    onClick={() => openFlexiveModal('Agendamento de Exame', ModalType.newBookingPatient)}
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
                                    onConfirmarPresenca={handlePresence}
                                    loading={loading}
                                    agendamentos={exams}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            {openModalNewPatient && <ModalRender
                isOpen={openModalNewPatient}
                title={title}
                type={type}
                isStepper={true}
                dadosPaciente={dadosPaciente}
                onClose={handleClose}
                modalNewPatient={handleModalMessage}
                modalNewBookingConfirmation={handleConfirmationBooking}
            />}
            <GeneralModal
                title={titleModal}
                action={action}
                error={isError}
                isOpen={isGeneralModalOpen}
                onClose={() => setIsGeneralModalOpen(false)}
                message={generalMessage}/>
        </div>
    )
}

export default AdminBooking;