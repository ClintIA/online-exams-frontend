import React, {useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle} from "lucide-react";
import {Exams} from "@/pages/AdminTenantExams.tsx";
import {IDoctor} from "@/pages/AdminHome.tsx";

interface RegisterExamProps {
    dadosIniciais?: Partial<Exams>
    onClose: () => void
    isUpdate?: (examData: Exams, tenant: number) => Promise<any>
    isNewExam?: (examData: Exams, tenant: number) => Promise<any>
}
const RegisterExam: React.FC<RegisterExamProps> = ({dadosIniciais, onClose, isUpdate, isNewPatient}) => {

    const [examData, setExamData] = useState<Exams>({
        exam_name: '',
        price: '',
        doctorPrice: ''
    });
    const [doctors, setDoctors] = useState<IDoctor[]>([])
    const [selectedDoctor, setSelectedDoctor] = useState<string>('')
    const [erro, setErro] = useState<string | null>(null)


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setExamData(prev => ({ ...prev, [name]: value }))
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className="mt-10">

            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className='text-blue-900 text-xl'>Cadastro de Exames</CardTitle>
                    <CardDescription>
                        Preencha os detalhes do paciente abaixo. Clique em salvar quando terminar.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>

                        <div className="grid gap-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="exam_name" className="text-right text-blue-800">
                                    Nome do Exame
                                </Label>
                                <Input
                                    id="exam_name"
                                    name="exam_name"
                                    value={examData.exam_name}
                                    onChange={handleInputChange}
                                    className="col-span-3"/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right text-blue-800" htmlFor="examId">Selecione o
                                    Médico</Label>
                                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                                    <SelectTrigger className="col-span-3" id="doctor">
                                        <SelectValue placeholder="Selecione o Médico"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {doctors.map((doctor: IDoctor) => (
                                            <SelectItem key={doctor.id} value={doctor.id.toString()}>
                                                {doctor.fullName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-right text-blue-800">
                                    Preço do Exame
                                </Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="price"
                                    placeholder="0.00"
                                    value={examData.price}
                                    onChange={handleInputChange}
                                    className="col-span-3"/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="doctorPrice" className="text-right text-blue-800">
                                    Valor do Médico
                                </Label>
                                <Input
                                    id="doctorPrice"
                                    type="text"
                                    value={examData.doctorPrice}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                />
                            </div>

                        </div>
                        <div className="flex justify-end mt-6">
                            <Button className="bg-oxfordBlue text-white" type="submit">Cadastrar Exame</Button>
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
export default RegisterExam;