import React, {useEffect, useState} from 'react'
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx"
import {registerPatientExam} from "@/services/patientExamService.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"
import {DadosPaciente} from "@/components/AdminPatient/RegisterPatient.tsx";
import {listDoctorByExam, listTenantExam} from "@/services/tenantExam.tsx";
import {useAuth} from "@/hooks/auth.tsx";
import {ITokenPayload} from "@/types/Auth.ts";
import {jwtDecode} from "jwt-decode";
import Loading from "@/components/Loading.tsx";
import {useNavigate} from "react-router-dom";

export interface DadosBooking {
    patientId: number | undefined
    examId: number | undefined
    examDate: string
    doctorId: number | undefined
    userId: number | undefined
    doctor?: Doctor
}
interface BookingModalProps {
    dadosPaciente?: DadosPaciente
    onAgendamentoConcluido?: (exam: Exams, dados: DadosPaciente, dadosBooking: DadosBooking) => void
    isNewBooking?: (bookingDados: DadosBooking, tenant: number) => Promise<any>
    onClose?: () => void
}
export interface Exams {
    id: number
    exam_name: string
    price: string
    createdAt: Date
}
interface Doctor {
    id: number
    fullName: string
    exams: any[]
}

const Booking: React.FC<BookingModalProps> = ({dadosPaciente, onAgendamentoConcluido, isNewBooking}: BookingModalProps ) => {
    const [tenantId, setTenantID] = useState<number | undefined>()
    const [dadosBooking, setDadosBooking] = useState<DadosBooking>({} as DadosBooking);
    const [selectedExame, setSelectedExame] = useState<string>('')
    const [selectedDoctor, setSelectedDoctor] = useState<string>('')
    const [exames, setExames] = useState<Exams[]>([])
    const [erro, setErro] = useState<string | null>(null)
    const [doctors, setDoctors] = useState<Doctor[] | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false);
    const auth = useAuth()
    const navigate = useNavigate()
    const [userId, setUserId] = useState<number | undefined>(undefined)

    useEffect(() => {
        const getTenant = () => {
            if(auth?.token) {
                const decoded: ITokenPayload = jwtDecode(auth.token?.toString())
                if(!decoded.isAdmin) {
                    navigate('/admin')
                }
                setTenantID(decoded.tenantId)
                setUserId(decoded.userId)
            } else {
                navigate('/admin')
            }
        }
        getTenant()
    },[auth.token, navigate])

    useEffect( () => {
        const fetchExams = async () => {
            try {
                if(tenantId) {
                    setLoading(true)

                    const result = await listTenantExam(tenantId)
                    if(result?.data.data.length === 0 ) {
                      setErro('Não possui exames cadastrados')
                        setLoading(false)
                        return
                    }
                    if(result?.data.status === "success") {
                        setExames(result?.data.data)
                        setErro(null)
                        setLoading(false)

                    }
                }
            } catch (error) {
                setErro("Não possível carregar os exames")
                console.error(error)
            }
        }
        fetchExams().then()
    }, [tenantId]);
    useEffect( () => {
        const fetchDoctors = async () => {
            try {
                if(tenantId && selectedExame) {
                    setLoading(true)
                    const exam = exames.find((exam) => exam.id === parseInt(selectedExame))
                    if(exam) {
                        const result = await listDoctorByExam(tenantId,exam.exam_name)
                        if(result?.data.status === "success") {
                            if(result?.data.data.length === 0) {
                                setDoctors(undefined)
                                setErro('Não possui médico cadastrado para esse exame')
                                setLoading(false)

                                return
                            } else {
                                setDoctors(result?.data.data)
                                setErro(null)
                            }
                        }
                    }
                    setLoading(false)

                }

            } catch (error) {
                setErro("Não possível carregar os Médicos")
                console.error(error)
            }
        }
        fetchDoctors().then()
    }, [exames, selectedExame, tenantId]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setDadosBooking(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErro(null)
        if(!dadosPaciente?.id) {
            setErro('ID do Paciente não encontrado')
        }
        dadosBooking.examId = parseInt(selectedExame)
        dadosBooking.patientId = dadosPaciente?.id;
        dadosBooking.userId = userId;
        dadosBooking.doctorId = parseInt(selectedDoctor)

        if (!dadosBooking.examDate ||
            !dadosBooking.examId) {
            setErro('Por favor, preencha todos os campos')
            return
        }
        const createDate = (date: string) => {
            const dateArray = date.split('-')
            return dateArray[0] + "-" + dateArray[1] + "-" + dateArray[2]
        }
        const selectedExam = exames.find(e => e.id === dadosBooking.examId);
        const doctorSelected = doctors?.find(e => e.id === dadosBooking.doctorId);

        try {
            if(tenantId) {
                const bookingDados = { ...dadosBooking, examDate: createDate(dadosBooking.examDate), doctor: doctorSelected }
                if(isNewBooking) {
                    try {
                        await isNewBooking(bookingDados, tenantId)

                    } catch (error) {
                        console.error(error)
                    }

                }
                const result = await registerPatientExam(bookingDados, tenantId)
                if(result?.data.status === "success" && selectedExam && dadosPaciente && onAgendamentoConcluido) {
                    onAgendamentoConcluido(selectedExam, dadosPaciente, bookingDados)
                }
                setDadosBooking({
                    examDate: '',
                    patientId: undefined,
                    examId: undefined,
                    doctorId: undefined,
                    userId: undefined,
                })
            }
        } catch (error) {
            setErro('Falha ao cadastrar paciente. Por favor, tente novamente.')
            console.log(error)
        }
    }
    if (loading) {
        return <Loading />
    }


    return (
        <div className="mt-10">

            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className='text-xl text-blue-900'>Agendamento do Exame</CardTitle>
                    <CardDescription>
                        Preencha os detalhes do paciente abaixo. Clique em salvar para continuar.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="full_name" className="text-right text-blue-800">
                                    Nome
                                </Label>
                                <Input
                                    id="full_name"
                                    name="full_name"
                                    value={dadosPaciente?.full_name}
                                    className="col-span-3"
                                    disabled={true}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right text-blue-800">
                                    Contato
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={dadosPaciente?.phone}
                                    className="col-span-3"
                                    disabled={true}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right text-blue-800" htmlFor="examId">Selecione o Exame</Label>
                                <Select value={selectedExame} onValueChange={setSelectedExame}>
                                    <SelectTrigger className="col-span-3" id="examId">
                                        <SelectValue placeholder="Selecione o Exame"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {exames.map((exam) => (
                                            <SelectItem key={exam.id} value={exam.id.toString()}>
                                                {exam.exam_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="doctor" className="text-right text-blue-800">
                                    Selecione o Médico
                                </Label>
                                <Select disabled={!doctors} value={selectedDoctor} onValueChange={setSelectedDoctor}>
                                    <SelectTrigger className="col-span-3" id="doctor">
                                        <SelectValue placeholder="Selecione o Médico"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {doctors?.map((doctor) => (
                                            <SelectItem key={doctor.id} value={doctor.id.toString()}>
                                                {doctor.fullName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="examDate" className="text-right text-blue-800">
                                    Dia do Exame
                                </Label>
                                <Input
                                    id="examDate"
                                    name="examDate"
                                    type="datetime-local"
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>

                        </div>
                        <div className="flex justify-end mt-6">
                            <Button className="bg-skyBlue text-white" type="submit">Salvar Agendamento</Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    {erro && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4"/>
                            <AlertTitle>Erro</AlertTitle>
                            <AlertDescription>{erro}</AlertDescription>
                        </Alert>
                    )}
                </CardFooter>
            </Card>

        </div>

    )
}

export default Booking;