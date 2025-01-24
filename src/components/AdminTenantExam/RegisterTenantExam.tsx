import React, {useCallback, useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle} from "lucide-react";
import {useAuth} from "@/hooks/auth.tsx";
import {Exams} from "@/pages/admin/AdminTenantExams.tsx";
import {MultiSelect} from "@/components/ui/MultiSelect.tsx";
import {listDoctors} from "@/services/doctorService.ts";
import {IDoctor} from "@/components/AdminDoctor/RegisterDoctor.tsx";
import {examOptions} from "@/lib/optionsFixed.ts";

export interface IExam {
    id?: number
    exam_name: string
    price: string
    exam_type?: string
    doctorPrice?: string
    doctors?: number[]
    createdAt?: Date
}
interface RegisterExamProps {
    dadosIniciais?: Partial<Exams>
    title?: string
    isUpdate?: (examData: IExam, tenant: number) => Promise<void>
    isNewExam?: (examData: IExam, tenant: number) => Promise<void>
}
const RegisterTenantExam: React.FC<RegisterExamProps> = ({dadosIniciais,title, isUpdate, isNewExam}) => {

    const [examData, setExamData] = useState<IExam>({
        exam_name: '',
        price: '',
        doctorPrice: '',
        exam_type: ''
    });
    const [selectedDoctors, setSelectedDoctors] = useState<number[]>();
    const [doctors, setDoctors] = useState<IDoctor[]>([])
    const [erro, setErro] = useState<string | null>(null)
    const [doctorIDs, setDoctorsIDs ] = useState<number[]>([])
    const auth = useAuth()

    useEffect(() => {
        const getDoctorsId = () => {
            if(dadosIniciais) {
                dadosIniciais.doctors?.map((doctor) => {
                    if(!doctorIDs?.includes(doctor.id)) {
                        doctorIDs.push(doctor.id)
                    }
                })
                setDoctorsIDs(doctorIDs)
            }
        }
        getDoctorsId()
        examData.id = dadosIniciais?.id
        const newDados = {...dadosIniciais, doctors: selectedDoctors}
        setExamData(prevDados => ({
            ...prevDados,
            ...newDados
        }))
    }, [dadosIniciais])
    const fetchDoctors = useCallback(async () => {
        try {
            if(auth.tenantId)  {
                await listDoctors(auth.tenantId).then(
                    (result) => {
                        setDoctors(result.data.data.data)
                    }
                ).catch((error) => console.log(error))

            }
        } catch (error) {
            setErro('Erro ao carregar médicos' + error)
        }
    }, [auth.tenantId])
    useEffect(() => {
    fetchDoctors().then()
    }, [fetchDoctors]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target
        setExamData(prev => ({ ...prev, [name]: value }))
    }
    const handleSelectedDoctors = (doctorIDs: number[]) => {
        setSelectedDoctors(doctorIDs)
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!examData.exam_name || !examData.price || !examData.doctorPrice) {
            setErro('Por favor, preencha todos os campos')
            return
        }
        const newExam = {...examData,
            price: examData.price.replace(',', '.'),
            doctorPrice: examData.doctorPrice.replace(',', '.'),
            doctors: selectedDoctors,
        }

        if(isUpdate && auth.tenantId) {

                await isUpdate(newExam, auth.tenantId).catch((error) => {
                    setErro(error)
                    console.log(error)
                })
            return
        }
        if(isNewExam && auth.tenantId) {
            await isNewExam(newExam, auth.tenantId).catch((error) => {
                setErro(error)
                console.log(error)
            })
            return
        }
    }

    return (
        <div className="mt-6">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className='text-oxfordBlue text-xl'>{title}</CardTitle>
                    <CardDescription>
                        Preencha os dados do exame. Clique em salvar quando terminar.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="exam_name" className="text-right text-oxfordBlue">
                                    Nome do Exame
                                </Label>
                                <Input
                                    id="exam_name"
                                    name="exam_name"
                                    value={examData?.exam_name}
                                    onChange={handleInputChange}
                                    className="col-span-3"/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="exam_type" className="text-right text-oxfordBlue">
                                    Tipo do Exame
                                </Label>
                                <div className="flex flex-row gap-2">
                                    {examOptions.map((option) => (

                                        <label
                                            key={option.value}
                                            className="flex items-center space-x-3 cursor-pointer"
                                        >
                                            <input
                                                type="radio"
                                                name="exam_type"
                                                value={option.value}
                                                checked={examData.exam_type === option.value}
                                                onChange={handleInputChange}
                                                className="form-radio h-4 w-4 text-oxfordBlue border-gray-300"
                                            />
                                            <span className="w-max text-sm text-oxfordBlue">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right text-oxfordBlue" htmlFor="doctorId">Selecione o(s)
                                    Médico(s)</Label>
                                <MultiSelect
                                    options={doctors}
                                    atribbute="fullName"
                                    onValueChange={handleSelectedDoctors}
                                    defaultValue={doctorIDs}
                                    placeholder="Selecione o(s) médico(s)"
                                    variant="inverted"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-right text-oxfordBlue">
                                    Preço do Exame
                                </Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="price"
                                    placeholder="0.00"
                                    value={examData?.price}
                                    onChange={handleInputChange}
                                    className="col-span-3"/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="doctorPrice" className="text-right text-oxfordBlue">
                                    Valor do Médico
                                </Label>
                                <Input
                                    id="doctorPrice"
                                    name="doctorPrice"
                                    type="text"
                                    value={examData?.doctorPrice}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                />
                            </div>

                        </div>
                        <div className="flex justify-end mt-6">
                            {isNewExam && (
                                <Button className="bg-oxfordBlue text-white" type="submit">Cadastrar Exame</Button>)}
                            {isUpdate && (
                                <Button className="bg-oxfordBlue text-white" type="submit">Atualizar Exame</Button>)}

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
export default RegisterTenantExam;