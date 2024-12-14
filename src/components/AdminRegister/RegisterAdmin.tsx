import React, {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Label} from "@/components/ui/label.tsx"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card.tsx"
import {AlertCircle} from "lucide-react"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx"
import {ITokenPayload} from "@/types/Auth.ts";
import {jwtDecode} from "jwt-decode";
import {useAuth} from "@/hooks/auth.tsx";
import {validarEmail, validarTelefone} from "@/lib/utils.ts";
import {IAdmin} from "@/pages/admin/AdminHome.tsx";
import {Exams} from "@/components/Booking/BookingPatient.tsx";
import {listTenantExam} from "@/services/tenantExamService.tsx";
import {MultiSelect} from "@/components/ui/MultiSelect.tsx";
import {Switch} from "@/components/ui/switch.tsx";

interface RegisterDoctorProps {
    dadosIniciais?: Partial<IAdmin>
    isUpdate?: (adminData: IAdmin, tenant: number,isDoctor: boolean) => Promise<any>
    isAdmin?: (adminData: IAdmin, tenant: number,isDoctor: boolean) => Promise<any>
    isDoctor: boolean
}

const RegisterAdmin: React.FC<RegisterDoctorProps> = ({dadosIniciais, isUpdate, isAdmin, isDoctor}: RegisterDoctorProps) => {

    const [doctorData, setDoctorData] = useState<IAdmin>({
        fullName: '',
        email: '',
        phone: '',
        cpf: '',
        CRM:'',
        occupation: '',
        examsIDs: []

    })
    const [exames,  setExames] = useState<Exams[]>([])
    const [selectedExame, setSelectedExame] = useState<string[] | undefined>([]);
    const [examesIDs, setExamesIDs] = useState<string[]>([])
    const [addExam, setAddExam] = useState<boolean>(false)
    const [tenant, setTenant] = useState<number | undefined>(undefined)
    const [erro, setErro] = useState<string | null>(null)
    const auth = useAuth()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setDoctorData(prev => ({ ...prev, [name]: value }))
    }


    useEffect(() => {
        const getTenant = () => {
            if(auth?.token) {
                const decoded: ITokenPayload = jwtDecode(auth.token?.toString())
                setTenant(decoded.tenantId)
            }
        }
        getTenant()
    },[auth.token])
    useEffect(() => {
        if(dadosIniciais) {

            setDoctorData(prevDados => ({
                ...prevDados,
                ...dadosIniciais
            }))
        }
    }, [dadosIniciais])
    useEffect( () => {
        const fetchExams = async () => {
            try {
                if(tenant) {
                    const result = await listTenantExam(tenant)
                    if(result?.data.data.length === 0 ) {
                        setErro('Não possui exames cadastrados')
                        return
                    }
                    if(result?.data.status === "success") {
                        setExames(result?.data.data)
                        setErro(null)
                    }
                }
            } catch (error) {
                setErro("Não possível carregar os exames")
                console.error(error)
            }
        }
        fetchExams().then()
    }, [tenant]);
    const handleSelectedExames = (exames: string[]) => {
        setSelectedExame(exames)
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErro(null)
        if (!doctorData.fullName ||
            !doctorData.email ||
            !doctorData.phone ||
            !doctorData.cpf) {
            setErro('Por favor, preencha todos os campos')
            return
        }
         if (!validarEmail(doctorData.email)) {
            setErro('Email Inválido')
             return
        }
         if (!validarTelefone(doctorData.phone)) {
            setErro('Telefone inválido')
             return
        }

        try {
            if(tenant) {

                if(isUpdate) {
                    await isUpdate(doctorData, tenant, isDoctor)
                        .catch((error) => console.log(error))
                    return
                }
                if(isAdmin) {
                        await isAdmin({...doctorData, examsIDs: selectedExame}, tenant, isDoctor)
                            .catch((error) => console.log(error))
                }

                setDoctorData({
                    fullName: '',
                    email: '',
                    phone: '',
                    CRM: '',
                    cpf: '',
                    examsIDs: [],
                    occupation: ''
                })
                setSelectedExame([])
                setAddExam(false)
                setExamesIDs([])
            }
        } catch (error) {
            setErro('Falha ao cadastrar médico')
            console.log(error)
        }
    }

   return (
           <div className="mt-10">

               <Card className="w-full max-w-2xl mx-auto">
                   <CardHeader>
                       <CardTitle className='text-blue-900 text-xl'>{isDoctor ? 'Cadastro de Médicos' : 'Cadastro de Adminstradores'}</CardTitle>
                       <CardDescription>
                           Preencha os dados abaixo. Clique em salvar para finalizar o cadastro.
                       </CardDescription>
                   </CardHeader>
                   <CardContent>
                       <form onSubmit={handleSubmit}>

                           <div className="grid gap-4">
                               <div className="grid grid-cols-4 items-center gap-4">
                                   <Label htmlFor="fullName" className="text-right text-blue-800">
                                       Nome
                                   </Label>
                                   <Input
                                       id="fullName"
                                       name="fullName"
                                       type="text"
                                       value={doctorData.fullName}
                                       onChange={handleInputChange}
                                       className="col-span-3"/>
                               </div>
                               {isDoctor && (
                                   <div>
                                       <div className="grid grid-cols-4 items-center gap-4">
                                           <Label htmlFor="CRM" className="text-right text-blue-800">
                                               CRM
                                           </Label>
                                           <Input
                                       id="CRM"
                                       name="CRM"
                                       type="text"
                                       value={doctorData?.CRM}
                                       onChange={handleInputChange}
                                       className="col-span-3"/>
                                       </div>
                                       <div className="grid grid-cols-4 items-center gap-4">
                                           <Label htmlFor="occupation" className="text-right text-blue-800">
                                               Ocupação
                                           </Label>
                                           <Input
                                               id="occupation"
                                               name="occupation"
                                               type="text"
                                               value={doctorData?.occupation}
                                               onChange={handleInputChange}
                                               className="col-span-3"/>
                                       </div>
                                   </div>
                               )}
                               <div className="grid grid-cols-4 items-center gap-4">
                                   <Label htmlFor="cpf" className="text-right text-blue-800">
                                       CPF
                                   </Label>
                                   <Input
                                       id="cpf"
                                       name="cpf"
                                       type="number"
                                       value={doctorData?.cpf}
                                       onChange={handleInputChange}
                                       className="col-span-3"/>
                               </div>
                               <div className="grid grid-cols-4 items-center gap-4">
                                   <Label htmlFor="email" className="text-right text-blue-800">
                                       Email
                                   </Label>
                                   <Input
                                       id="email"
                                       name="email"
                                       type="email"
                                       value={doctorData.email}
                                       onChange={handleInputChange}
                                       className="col-span-3"/>
                               </div>
                               <div className="grid grid-cols-4 items-center gap-4">
                                   <Label htmlFor="phone" className="text-right text-blue-800">
                                       Telefone
                                   </Label>
                                   <Input
                                       id="phone"
                                       name="phone"
                                       type="tel"
                                       value={doctorData.phone}
                                       onChange={handleInputChange}
                                       className="col-span-3"/>
                               </div>
                               <div className="grid grid-cols-4 items-center gap-4">
                                   <Label htmlFor="gender" className="text-right text-blue-800">
                                       Deseja adicionar exame(s) ?
                                   </Label>
                                   <div className="flex flex-row gap-2">
                                       <Switch
                                           id="toggle-select"
                                           checked={addExam}
                                           onCheckedChange={setAddExam}
                                       />
                                   </div>
                               </div>
                               {addExam && (
                                   <div className="grid grid-cols-4 items-center gap-4">
                                   <Label className="text-right text-blue-800" htmlFor="examId">
                                       Exame(s)</Label>
                                   <MultiSelect
                                       options={exames}
                                       atribbute="exam_name"
                                       onValueChange={handleSelectedExames}
                                       defaultValue={examesIDs}
                                       placeholder="Selecione o(s) exame(s)"
                                       variant="inverted"
                                   />
                                   </div>
                               )}
                           </div>
                           <div className="flex justify-end mt-6">
                               {isAdmin && (
                                   <Button className="bg-oxfordBlue text-white" type="submit">Cadastrar</Button>
                               )}
                               {isUpdate && (
                                   <Button className="bg-oxfordBlue text-white" type="submit">Atualizar
                                   </Button>
                               )}                           </div>
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
export default RegisterAdmin;