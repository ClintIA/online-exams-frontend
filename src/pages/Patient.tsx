import React, {useEffect, useState} from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Cards from "@/components/Card.tsx";
import {listPatientsByTenant} from "@/services/patientService.tsx";
import {useAuth} from "@/hooks/auth.tsx";
import {ITokenPayload} from "@/types/Auth.ts";
import {jwtDecode} from "jwt-decode";
import ErrorModal from "@/error/ErrorModal.tsx";
import {DadosPaciente} from "@/components/RegisterPatient.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Calendar, MoreHorizontal, Pencil, Trash2} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Loading from "@/components/Loading.tsx";
import ModalEditPatient from "@/components/ModalEditPatient.tsx";

const Patient: React.FC = () => {

    const [tenant, setTenant] = useState<number | undefined>()
    const [pacientes, setPacientes] = useState<DadosPaciente[]>()
    const [filtroNome, setFiltroNome] = useState('')
    const [filtroCPF, setFiltroCPF] = useState('')
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState<boolean>(true);
    const auth = useAuth()
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
    const [dadosPaciente, setDadosPaciente] = useState<DadosPaciente>({} as DadosPaciente)
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
       const fetchPatients = async () => {
           setLoading(true);
           try {
               if(tenant) {
                   const result = await listPatientsByTenant(tenant)
                   if(result?.data.data.length === 0) {
                       setErrorMessage('Não foram encontrados pacientes')
                   }
                   setLoading(false);
                   setPacientes(result?.data.data)
               }
           } catch(error) {
               setErrorMessage('Não foi possível carregar a lista de pacientes: ' + error)
           }
       }
       fetchPatients().then()
    }, [filtroNome, filtroCPF, tenant])
    const openModal = (paciente: DadosPaciente) => {
        setDadosPaciente(paciente)
        setOpenModalEdit(true)
    }
    if (loading) {
        return <Loading />
    }
    return (
        <>
            <div className="w-full max-w-6xl">
                <h1 className="text-2xl font-bold mb-6 text-oxfordBlue">Listagem de Pacientes</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Cards name='Total de Pacientes' content='10'/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <Label htmlFor="filtroNome" className="text-oxfordBlue">Nome</Label>
                        <Input
                            id="filtroNome"
                            placeholder="Filtrar por nome"
                            value={filtroNome}
                            onChange={(e) => setFiltroNome(e.target.value)}/>
                    </div>
                    <div>
                        <Label htmlFor="filtroCPF" className="text-oxfordBlue">CPF</Label>
                        <Input
                            id="filtroCPF"
                            placeholder="Filtrar por CPF"
                            value={filtroCPF}
                            onChange={(e) => setFiltroCPF(e.target.value)}/>
                    </div>

                </div>

                <Card>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-oxfordBlue">Nome</TableHead>
                                    <TableHead className="text-oxfordBlue">CPF</TableHead>
                                    <TableHead className="text-oxfordBlue">Clínica</TableHead>
                                    <TableHead className="text-oxfordBlue">Contato</TableHead>
                                    <TableHead className="text-oxfordBlue">Cartão do Plano</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pacientes?.map((paciente) => (
                                    <TableRow key={paciente.id}>
                                        <TableCell
                                            className="text-oxfordBlue font-bold">{paciente.full_name}</TableCell>
                                        <TableCell className="text-blue-900">{paciente.cpf}</TableCell>
                                        <TableCell className="text-blue-900">{paciente.phone}</TableCell>
                                        <TableCell
                                            className="text-blue-900">{new Date(paciente.dob ? paciente.dob : 'Erro ao gerar data').toLocaleDateString()}</TableCell>
                                        <TableCell className="text-blue-900">{paciente.health_card_number}</TableCell>
                                        <TableCell className="text-blue-900">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <MoreHorizontal className="h-4 w-4"/>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <div className="p-1 flex flex-row gap-0.5">
                                                        <Button onClick={() => openModal(paciente)} className="w-1/3 bg-skyBlue text-white">
                                                            <Pencil className="mr-1 h-4 w-4"/>
                                                            <span className="text-sm">Editar</span>
                                                        </Button>
                                                        <Button className="w-1/3 bg-skyBlue text-white">
                                                            <Trash2 className="mr-1 h-4 w-4"/>
                                                            <span className="text-sm">Excluir</span>
                                                        </Button>
                                                        <Button className="w-1/3 bg-skyBlue text-white">
                                                            <Calendar className="h-4 w-4"/>
                                                            <span className="text-sm">Agendar</span>
                                                        </Button>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <ErrorModal
                    isOpen={isErrorModalOpen}
                    onClose={() => setIsErrorModalOpen(false)}
                    message={errorMessage}/>
            </div>
            {openModalEdit && <ModalEditPatient
                isOpen={openModalEdit}
                onClose={() => setOpenModalEdit(false)}
                dadosPaciente={dadosPaciente}/>}
        </>
    )
}
export default Patient;