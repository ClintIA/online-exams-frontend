import React,{ useState} from 'react'
import { CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import CheckCPF from "@/components/CheckCPF.tsx";
import RegisterPatient, {DadosPaciente} from "@/components/RegisterPatient.tsx";
import Booking from "@/components/Booking.tsx";
import StepIndicator from "@/components/StepIndicator.tsx";
import BookingConfirmation from "@/components/BookingConfirmation.tsx";


const BookingSteps: React.FC = () => {

    const [etapaAtual, setEtapaAtual] = useState(0)
    const [pacienteCadastrado, setPacienteCadastrado] = useState<boolean>(false)
    const [dadosPaciente, setDadosPaciente] = useState({} as DadosPaciente)
    const etapas = [
        "Verificação de CPF",
        "Cadastro de Paciente",
        "Agendamento de Consulta",
        "Confirmação"
    ]
    const avancarEtapa = () => {
        setEtapaAtual(prev => Math.min(prev + 1, etapas.length - 1))
    }

    const handleCPFVerificado = (dados: DadosPaciente, cadastrado: boolean) => {
        setDadosPaciente(dados)
        console.log(dados)
        setPacienteCadastrado(cadastrado)
        setEtapaAtual(prev => Math.min(prev + 2, etapas.length - 1))

    }

    const handleCadastroConcluido = (dados: DadosPaciente) => {
        setPacienteCadastrado(true)
        setDadosPaciente(dados)
        avancarEtapa()
    }

    const handleAgendamentoConcluido = () => {
        avancarEtapa()
    }
    const renderEtapaAtual = () => {
        switch (etapaAtual) {
            case 0:
                return <CheckCPF onCPFVerificado={handleCPFVerificado} />
            case 1:
                return pacienteCadastrado ? (
                    <Booking dadosBooking={dadosPaciente} onAgendamentoConcluido={handleAgendamentoConcluido} />
                ) : (
                    <RegisterPatient dadosIniciais={dadosPaciente} onCadastroConcluido={handleCadastroConcluido} />
                )
            case 2:
                return <Booking dadosBooking={dadosPaciente}  onAgendamentoConcluido={handleAgendamentoConcluido} />
            case 3:
                return <BookingConfirmation />
            default:
                return null
        }
    }
    return (
        <div className="w-full max-w-6xl mx-auto">
            <CardHeader>
                <CardTitle className='text-3xl text-blue-800'>Agendamento de Consulta</CardTitle>
            </CardHeader>
            <CardContent>
                <StepIndicator etapas={etapas} etapaAtual={etapaAtual}/>
                <div className="mt-6">
                    {renderEtapaAtual()}
                </div>
            </CardContent>
        </div>
    )
}

export default BookingSteps;