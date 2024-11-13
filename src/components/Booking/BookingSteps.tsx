import React, {useState} from 'react'
import { CardContent } from "@/components/ui/card.tsx"
import CheckCPF from "@/components/Booking/CheckCPF.tsx";
import RegisterPatient, {DadosPaciente} from "@/components/AdminPatient/RegisterPatient.tsx";
import Booking, {DadosBooking, Exams} from "@/components/Booking/Booking.tsx";
import StepIndicator from "@/components/Booking/StepIndicator.tsx";
import BookingConfirmation from "@/components/Booking/BookingConfirmation.tsx";
import {Card} from "@mui/material";

const BookingSteps: React.FC = () => {
    const [etapaAtual, setEtapaAtual] = useState(0)
    const [pacienteCadastrado, setPacienteCadastrado] = useState<boolean>(false)
    const [dadosPaciente, setDadosPaciente] = useState({} as DadosPaciente)
    const [exame, setExame] = useState<Exams>()
    const [examData, setExamData] = useState<DadosBooking>()
    const etapas = [
        "Verificação de CPF",
        "Cadastro de Paciente",
        "Agendamento de Consulta",
        "Confirmação"
    ]
    const handleNewBooking = () => {
        setEtapaAtual(0)
        setDadosPaciente({} as DadosPaciente)
        setPacienteCadastrado(false)
        setExame(undefined)
        setExamData(undefined)
    }
    const avancarEtapa = () => {
        setEtapaAtual(prev => Math.min(prev + 1, etapas.length - 1))
    }

    const handleCPFVerificado = (dados: DadosPaciente, cadastrado: boolean) => {
        setDadosPaciente(dados)
        setPacienteCadastrado(cadastrado)
        if(cadastrado) {
            setEtapaAtual(prev => Math.min(prev + 2, etapas.length - 1))
        } else {
            avancarEtapa()
        }
    }

    const handleCadastroConcluido = (dados: DadosPaciente) => {
        setPacienteCadastrado(true)
        setDadosPaciente(dados)
        avancarEtapa()
    }

    const handleAgendamentoConcluido = (exam: Exams, dados: DadosPaciente, dataBooking: DadosBooking) => {
        setDadosPaciente(dados)
        setExame(exam)
        setExamData(dataBooking)
        avancarEtapa()
    }
    const renderEtapaAtual = () => {
        switch (etapaAtual) {
            case 0:
                return <CheckCPF onCPFVerificado={handleCPFVerificado} />
            case 1:
                return pacienteCadastrado ? (
                    <Booking onClose={() => {}} dadosPaciente={dadosPaciente} onAgendamentoConcluido={handleAgendamentoConcluido} />
                ) : (
                    <RegisterPatient onClose={() => {}} dadosIniciais={dadosPaciente} onCadastroConcluido={handleCadastroConcluido} />
                )
            case 2:
                return <Booking onClose={() => {}} dadosPaciente={dadosPaciente}  onAgendamentoConcluido={handleAgendamentoConcluido} />
            case 3:
                return <BookingConfirmation exame={exame}
                                            dadosPaciente={dadosPaciente}
                                            dadosBooking={examData}
                                            onNewBooking={handleNewBooking}
                />
            default:
                return null
        }
    }
    return (
        <div className="w-full max-w-6xl">
            <h1 className="text-2xl font-bold mb-6 text-blue-800">Agendamento de Consulta</h1>
            <Card className="p-10">
            <CardContent>
                <StepIndicator etapas={etapas} etapaAtual={etapaAtual}/>
                <div className="mt-6">
                    {renderEtapaAtual()}
                </div>
            </CardContent>
            </Card>
        </div>
    )
}

export default BookingSteps;