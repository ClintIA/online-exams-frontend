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
import {FormField} from "@/components/ui/form.tsx";

interface RegisterDoctorProps {
    dadosIniciais?: Partial<IAdmin>
    isUpdate?: (adminData: IAdmin, tenant: number,isDoctor: boolean) => Promise<any>
    isDoctor?: (adminData: IAdmin, tenant: number,isDoctor: boolean) => Promise<any>
}

const RegisterDoctor: React.FC<RegisterDoctorProps> = ({dadosIniciais, isUpdate, isDoctor}: RegisterDoctorProps) => {

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
        setIsLoading(true)
        console.log(e)

        setErro(null)
        setIsLoading(false)


    }
    const [isLoading, setIsLoading] = useState<boolean>(false)

   return (
       <div>
           <Card className="w-full max-w-2xl">
               <CardHeader>
                   <CardTitle>Adicionar Novo Médico</CardTitle>
                   <CardDescription>Preencha os dados do novo médico para registrá-lo no sistema.</CardDescription>
               </CardHeader>
               <CardContent>
                                            <span className="flex flex-col text-xs w-full col-span-3">
                                   <Input
                                       id="fullName"
                                       name="fullName"
                                       type="text"
                                       value={adminData.fullName}
                                       onChange={handleInputChange}
                                   />
                                   Nome completo do médico conforme registro profissional.
                               </span>
                   <Form>
                       <form onSubmit={handleSubmit} className="space-y-8">
                           <FormField

                               name="fullName"
                               render={({field}) => (
                                   <FormItem>
                                       <FormLabel>Nome Completo</FormLabel>
                                       <FormControl>
                                           <Input placeholder="Dr. João da Silva" {...field} />
                                       </FormControl>
                                       <FormDescription>
                                           Nome completo do médico conforme registro profissional.
                                       </FormDescription>
                                       <FormMessage/>
                                   </FormItem>
                               )}
                           />
                           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                               <FormField

                                   name="cpf"
                                   render={({field}) => (
                                       <FormItem>
                                           <FormLabel>CPF</FormLabel>
                                           <FormControl>
                                               <Input placeholder="12345678900" {...field} />
                                           </FormControl>
                                           <FormMessage/>
                                       </FormItem>
                                   )}
                               />
                               <FormField

                                   name="CRM"
                                   render={({field}) => (
                                       <FormItem>
                                           <FormLabel>CRM</FormLabel>
                                           <FormControl>
                                               <Input placeholder="123456" {...field} />
                                           </FormControl>
                                           <FormMessage/>
                                       </FormItem>
                                   )}
                               />
                           </div>
                           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                               <FormField
                                   name="cep"
                                   render={({field}) => (
                                       <FormItem>
                                           <FormLabel>CEP</FormLabel>
                                           <FormControl>
                                               <Input placeholder="12345678" {...field} />
                                           </FormControl>
                                           <FormMessage/>
                                       </FormItem>
                                   )}
                               />
                               <FormField
                                   name="CNPJ"
                                   render={({field}) => (
                                       <FormItem>
                                           <FormLabel>CNPJ</FormLabel>
                                           <FormControl>
                                               <Input placeholder="12345678000199" {...field} />
                                           </FormControl>
                                           <FormMessage/>
                                       </FormItem>
                                   )}
                               />
                           </div>
                           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                               <FormField
                                   name="phone"
                                   render={({field}) => (
                                       <FormItem>
                                           <FormLabel>Telefone</FormLabel>
                                           <FormControl>
                                               <Input placeholder="(11) 98765-4321" {...field} />
                                           </FormControl>
                                           <FormMessage/>
                                       </FormItem>
                                   )}
                               />
                               <FormField
                                   name="occupation"
                                   render={({field}) => (
                                       <FormItem>
                                           <FormLabel>Especialidade</FormLabel>
                                           <FormControl>
                                               <Input placeholder="Cardiologia" {...field} />
                                           </FormControl>
                                           <FormMessage/>
                                       </FormItem>
                                   )}
                               />
                           </div>
                           <FormField
                               name="password"
                               render={({field}) => (
                                   <FormItem>
                                       <FormLabel>Senha</FormLabel>
                                       <FormControl>
                                           <Input type="password" {...field} />
                                       </FormControl>
                                       <FormDescription>
                                           A senha deve ter pelo menos 8 caracteres.
                                       </FormDescription>
                                       <FormMessage/>
                                   </FormItem>
                               )}
                           />
                       </form>
                   </Form>
               </CardContent>
               <CardFooter>
                   <Button onClick={handleSubmit} disabled={isLoading}>
                       {isLoading ? "Adicionando..." : "Adicionar Médico"}
                   </Button>
               </CardFooter>
           </Card>
       </div>
   )
}
export default RegisterDoctor;