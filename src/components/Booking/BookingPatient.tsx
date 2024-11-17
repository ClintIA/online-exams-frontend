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
import {AlertCircle} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"
import {DadosPaciente} from "@/components/AdminPatient/RegisterPatient.tsx";
import {listDoctorByExam, listTenantExam} from "@/services/tenantExam.tsx";
import {useAuth} from "@/hooks/auth.tsx";
import {ITokenPayload} from "@/types/Auth.ts";
import {jwtDecode} from "jwt-decode";
import Loading from "@/components/Loading.tsx";
import {useNavigate} from "react-router-dom";
import {validarCPF} from "@/lib/utils.ts";
import {getPatientByCpfAndTenant} from "@/services/patientService.tsx";
import {Type} from "@/components/ModalHandle/ModalRender.tsx";

export interface DadosBooking {
    patientId: number | undefined
    examId: number | undefined
    examDate: string
    doctorId: number | undefined
    userId: number | undefined
    doctor?: Doctor
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
interface BookingModalProps {
    handleModalMessage?: (type: Type) => void
    submitBooking?: (bookingDados: DadosBooking, tenantId: number) => Promise<any>
}

const BookingPatient: React.FC<BookingModalProps> = ({handleModalMessage, submitBooking}: BookingModalProps) => {
    const [tenant, setTenant] = useState<number | undefined>()
    const [dadosBooking, setDadosBooking] = useState<DadosBooking>({} as DadosBooking);
    const [patientData, setPatientData] = useState<DadosPaciente>()
    const [selectedExame, setSelectedExame] = useState<string>('')
    const [selectedDoctor, setSelectedDoctor] = useState<string>('')
    const [exames, setExames] = useState<Exams[]>([])
    const [cpf, setCpf] = useState<string>('')
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
                setTenant(decoded.tenantId)
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
                if(tenant) {
                    setLoading(true)
                    const result = await listTenantExam(tenant)
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
    }, [tenant]);
    useEffect( () => {
        const fetchDoctors = async () => {
            try {
                if(tenant && selectedExame) {
                    setLoading(true)
                    const exam = exames.find((exam) => exam.id === parseInt(selectedExame))
                    if(exam) {
                        const result = await listDoctorByExam(tenant,exam.exam_name)
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
    }, [exames, selectedExame, tenant]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCpf(e.target.value)
    }

    const handleCPFSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErro(null)
        const checkCPF = validarCPF(cpf)
        if (!cpf) {
            setErro('Por favor, insira um CPF')
            return
        }
        if (!checkCPF) {
            setErro('CPF Inválido')
            return
        }
        const numericCPF = cpf.replace(/\D/g, '')
        try {
            if(tenant) {
                const result = await getPatientByCpfAndTenant(numericCPF, tenant)

                if(result?.message?.includes("não encontrado")) {
                    setErro(result.message)
                    return
                }
                const data = result?.data.data
                if(!data) {
                    setErro('Cadastro não encontrado, realizar o cadastro do paciente')
                    return
                } else {
                    setPatientData(data)
                }
            }
        } catch (error) {
            setErro('Falha ao verificar o CPF. Por favor, tente novamente.' + error)
        }
    }
    const handleInputBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setDadosBooking(prev => ({ ...prev, [name]: value }))
    }
   const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault()
       setErro(null)
       dadosBooking.examId = parseInt(selectedExame)
       dadosBooking.patientId = patientData?.id;
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
       const doctorSelected = doctors?.find(e => e.id === dadosBooking.doctorId);

       try {
           if (tenant) {
               const bookingDados = {
                   ...dadosBooking,
                   examDate: createDate(dadosBooking.examDate),
                   doctor: doctorSelected
               }
               try {
                   if (submitBooking) {
                       const result = await submitBooking(bookingDados, tenant)
                       if(result.status === 201 && handleModalMessage) {
                           handleModalMessage(Type.bookingConfirmation)
                       }
                   }
               } catch (error) {
                   console.error(error)
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
                    <CardTitle className='text-xl text-blue-900'>Agendamento de Exame</CardTitle>
                    <CardDescription>
                        Preencha os detalhes do paciente abaixo. Clique em salvar para continuar.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="cpf" className="text-right text-blue-800">
                                        CPF
                                    </Label>
                                    <Input
                                        id="cpf"
                                        name="cpf"
                                        value={cpf}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                    />
                                </div>
                                    <div className="flex justify-end mt-1">
                                        <Button className="bg-oxfordBlue text-white"
                                                onClick={handleCPFSubmit}>Verificar</Button>
                                    </div>
                            </div>
                            <div className={patientData? '' : 'hidden'}>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="full_name" className="text-right text-blue-800">
                                    Nome
                                </Label>
                                <Input
                                    id="full_name"
                                    name="full_name"
                                    value={patientData?.full_name}
                                    className="col-span-3"
                                    disabled={true}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="full_name" className="text-right text-blue-800">
                                    Contato
                                </Label>
                                <Input
                                    id="full_name"
                                    name="full_name"
                                value={patientData?.phone}
                                className="col-span-3"
                                disabled={true}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right text-blue-800">
                                Plano de Saúde
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={patientData?.health_card_number}
                                className="col-span-3"
                                disabled={true}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right text-blue-800">
                                Clinica
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={patientData?.tenants ? patientData?.tenants[0].name : 'Não selecionado'}
                                className="col-span-3"
                                disabled={true}
                            />
                        </div>
                            </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right text-blue-800" htmlFor="examId">Selecione o Exame</Label>
                            <Select disabled={!patientData} value={selectedExame} onValueChange={setSelectedExame}>
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
                                    onChange={handleInputBookingChange}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <Button className="bg-oxfordBlue text-white" type="submit">Salvar Agendamento</Button>
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

export default BookingPatient;