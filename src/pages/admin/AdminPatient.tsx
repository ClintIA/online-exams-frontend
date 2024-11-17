import React, {useCallback, useEffect, useState} from 'react'
import { Card, CardContent } from "@/components/ui/card.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx"
import Cards from "@/components/Card.tsx";
import {deletePatient, listPatientsByTenant, PatientFilters} from "@/services/patientService.tsx";
import {useAuth} from "@/hooks/auth.tsx";
import {ITokenPayload} from "@/types/Auth.ts";
import {jwtDecode} from "jwt-decode";
import {DadosPaciente} from "@/components/AdminPatient/RegisterPatient.tsx";
import {Button} from "@/components/ui/button.tsx";
import Loading from "@/components/Loading.tsx";
import ModalRender, {Type} from "@/components/ModalHandle/ModalRender.tsx";
import DataTable from "@/components/DataTable.tsx";
import GeneralModal from "@/components/ModalHandle/GeneralModal.tsx";
import {TableCell} from "@mui/material";
import { findCanalOptions} from "@/lib/canalOptions.ts";

const AdminPatient: React.FC = () => {

    const [title,setTitle] = useState("");
    const [action,setAction] = useState("");
    const [isError, setIsError] = useState(false);
    const [generalMessage, setGeneralMessage] = useState<string>('')
    const [isGeneralModalOpen, setIsGeneralModalOpen] = useState(false)
    const [tenant, setTenant] = useState<number | undefined>()
    const [deleteId, setDeleteId] = useState<number>()
    const [pacientes, setPacientes] = useState<DadosPaciente[]>([])
    const [filtroName, setFiltroName] = useState<string>('')
    const [filtroCPF, setFiltroCPF] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true);
    const [dadosPaciente, setDadosPaciente] = useState<DadosPaciente>({} as DadosPaciente)
    const [openModalNewPatient, setOpenModalNewPatient] = useState<boolean>(false)
    const [type,setType] = useState<Type>(Type.newPatient)
    const auth = useAuth()

    const fetchPatients = useCallback(async () => {
        setLoading(true)
        try {
            if(tenant) {
                const result = await listPatientsByTenant(tenant)
                if(result?.data.data.length !== 0) {
                    setLoading(false);
                    setPacientes(result?.data.data)
                } else {
                    setLoading(false);
                    setPacientes([])
                }

            }
        } catch(error) {
            setLoading(false);
            setTitle("Erro ao carregar")
            setAction("Fechar")
            setIsError(true)
            setGeneralMessage('Não foi possível carregar a lista de pacientes: ' + error)
            setIsGeneralModalOpen(true)

        }
    }, [tenant])

    useEffect(() => {
        const getTenant = () => {
            if(auth?.token) {
                const decoded: ITokenPayload = jwtDecode(auth.token?.toString())
                setTenant(decoded.tenantId)
            }
        }
        getTenant()
    },[auth.token])

    useEffect( () => {
        const fetchFilters =  async () => {
            if (tenant) {
                if (filtroCPF.length > 0 || filtroName.length > 0) {
                    const filters: PatientFilters = {
                        patientCpf: filtroCPF,
                        patientName: filtroName
                    }
                    try {
                        const result = await listPatientsByTenant(tenant, filters)
                        if (result?.data.data.length !== 0) {
                            setPacientes(result?.data.data)
                        } else {
                            setPacientes([])
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        }
    fetchFilters().then()
    }, [fetchPatients, filtroCPF, filtroName, tenant]);

    useEffect(() => {

       fetchPatients().then()
    }, [fetchPatients])

    const handleConfirmationDelete = (id: number) => {
        setGeneralMessage("Deseja deletar o paciente selecionado?")
        setTitle('Confirmação de Exclusão')
        setAction('Excluir')
        setDeleteId(id)
        setIsGeneralModalOpen(true)

    }
    const formatDate = (date?: string) => {
        if(date) {
            const spliData = new Date(date).toLocaleDateString().split("/");
            return spliData[1] + "/" + spliData[0] + "/" + spliData[2]
        }
    }

    const renderRow = (paciente: DadosPaciente) => (
        <>
            <TableCell className="text-oxfordBlue font-bold">{paciente.full_name}</TableCell>
            <TableCell className="text-blue-900">{paciente.cpf}</TableCell>
            <TableCell className="text-blue-900">{paciente.phone}</TableCell>
            <TableCell className="text-blue-900">{formatDate(paciente?.dob)}</TableCell>
            <TableCell className="text-blue-900">{paciente.health_card_number}</TableCell>
            <TableCell className="text-blue-900 capitalize">{findCanalOptions(paciente.canal)}</TableCell>
        </>
    );
    const handleDeletePatient = async () => {
        try {
            if (tenant && deleteId) {
                setIsGeneralModalOpen(false)
                await deletePatient(deleteId.toString(),tenant).then(
                    (result) => {
                        if(result.message && result.message.includes('FK_')){
                            handleModalMessage('Não é possível deletar um paciente com agendamento ou exame realizado')
                            return
                        } else {
                            return result
                        }
                    }
                )
            }

        } catch(error) {
            console.error(error)
        }
    }
    const handleModalMessage = (message: string) => {
        setGeneralMessage(message)
        setTitle('Confirmação')
        setAction('Fechar')
        setIsError(false)
        setIsGeneralModalOpen(true)
    }

    const openFlexiveModal = (modalType: Type, paciente?: DadosPaciente) => {
        if(paciente) {
            setDadosPaciente(paciente)
        }

        setType(modalType)
        setOpenModalNewPatient(true)
    }

    const handleClose = () => {
        setIsGeneralModalOpen(false)
        fetchPatients().then()
    }

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="w-full max-w-6xl p-4 mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-oxfordBlue">Listagem de Pacientes</h1>
                <div className="flex flex-col md:flex-row gap-3 mb-6">
                    <Cards name='Total de Pacientes' content={pacientes?.length}/>
                </div>

                <div className="flex flex-col md:flex-row gap-3 mb-5">
                    <div className='p-2'>
                        <Label htmlFor="filtroNome" className="text-oxfordBlue">Nome</Label>
                        <Input
                            className="w-72"
                            id="filtroNome"
                            placeholder="Filtrar por nome"
                            value={filtroName}
                            onChange={(e) => setFiltroName(e.target.value)}/>
                    </div>
                    <div className='p-2'>
                        <Label htmlFor="filtroCPF" className="text-oxfordBlue">CPF</Label>
                        <Input
                            className="w-72"
                            id="filtroCPF"
                            placeholder="Filtrar por CPF"
                            value={filtroCPF}
                            onChange={(e) => setFiltroCPF(e.target.value)}/>
                    </div>
                    <div className="flex justify-end mt-7 p-1">
                        <Button onClick={() => openFlexiveModal(Type.newPatient)} className="bg-oxfordBlue text-white hover:bg-blue-900" type="submit">Adicionar Paciente</Button>
                    </div>
                </div>

                <Card>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-oxfordBlue">Nome</TableHead>
                                    <TableHead className="text-oxfordBlue">CPF</TableHead>
                                    <TableHead className="text-oxfordBlue">Contato</TableHead>
                                    <TableHead className="text-oxfordBlue">Data de Nascimento</TableHead>
                                    <TableHead className="text-oxfordBlue">Cartão do Plano</TableHead>
                                    <TableHead className="text-oxfordBlue">Canal de Captação</TableHead>
                                    <TableHead className="text-oxfordBlue">Ação</TableHead>
                                </TableRow>
                            </TableHeader>
                            <DataTable renderRow={renderRow} openModalBooking={true} openModalEdit={openFlexiveModal}  deleteData={handleConfirmationDelete} dataTable={pacientes}></DataTable>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {openModalNewPatient && <ModalRender
                modalNewPatient={handleModalMessage}
                isOpen={openModalNewPatient}
                onClose={() => setOpenModalNewPatient(false)}
                type={type}
                dadosPaciente={dadosPaciente}
            />}

            <GeneralModal
                title={title}
                action={action}
                error={isError}
                isOpen={isGeneralModalOpen}
                isDelete={handleDeletePatient}
                onClose={handleClose}
                message={generalMessage}/>
        </>
    )
}
export default AdminPatient;