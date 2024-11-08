import React, {useCallback, useEffect, useState} from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Cards from "@/components/Card.tsx";
import {deletePatient, listPatientsByTenant, PatientFilters} from "@/services/patientService.tsx";
import {useAuth} from "@/hooks/auth.tsx";
import {ITokenPayload} from "@/types/Auth.ts";
import {jwtDecode} from "jwt-decode";
import ErrorModal from "@/error/ErrorModal.tsx";
import {DadosPaciente} from "@/components/RegisterPatient.tsx";
import {Button} from "@/components/ui/button.tsx";
import Loading from "@/components/Loading.tsx";
import ModalEditPatient from "@/components/ModalEditPatient.tsx";
import ModalNewPatient from "@/components/ModalNewPatient.tsx";
import DataTable from "@/components/DataTable.tsx";

const Patient: React.FC = () => {

    const [tenant, setTenant] = useState<number | undefined>()
    const [pacientes, setPacientes] = useState<DadosPaciente[]>([])
    const [filtroName, setFiltroName] = useState<string>()
    const [filtroCPF, setFiltroCPF] = useState<string>()
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState<boolean>(true);
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
    const [dadosPaciente, setDadosPaciente] = useState<DadosPaciente>({} as DadosPaciente)
    const [openModalNewPatient, setOpenModalNewPatient] = useState<boolean>(false)
    const auth = useAuth()

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
            if (filtroCPF || filtroName) {
                const filters: PatientFilters = {
                    patientCpf: filtroCPF,
                    patientName: filtroName
                }
                try {
                    const result = await listPatientsByTenant(tenant, filters)
                    if (result?.data.data.length !== 0) {
                        setLoading(false);
                        setPacientes(result?.data.data)
                    } else {
                        setLoading(false);
                        setPacientes([])
                    }
                } catch (error) {
                    console.log(error)
                }
            } else {
                fetchPatients().then()
            }
        }
    }
    fetchFilters().then()

    }, [filtroCPF, filtroName, tenant]);
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
            setErrorMessage('Não foi possível carregar a lista de pacientes: ' + error)
            setIsErrorModalOpen(true)

        }
    }, [tenant])
    useEffect(() => {
       fetchPatients().then()
    }, [fetchPatients])

    const handleDeletePatient = async (id: number) => {
        try {
            if (tenant) {
                await deletePatient(id,tenant)
                fetchPatients().then()
            }

        } catch(error) {
            console.error(error)
        }
    }

    const openModal = (paciente: DadosPaciente) => {
        setDadosPaciente(paciente)
        setOpenModalEdit(true)
    }

    const handleCloseEditModal = () =>  {
        setOpenModalEdit(false)
    }
    const handleCloseNewModal = () =>  {
        setOpenModalNewPatient(false)
    }
    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="w-full max-w-6xl">
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
                        <Button onClick={() => setOpenModalNewPatient(true)} className="bg-oxfordBlue text-white hover:bg-blue-900" type="submit">Adicionar Paciente</Button>
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
                            <DataTable openModal={openModal} isDelete={handleDeletePatient} dataTable={pacientes}></DataTable>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            {openModalEdit && <ModalEditPatient
                isOpen={openModalEdit}
                onClose={handleCloseEditModal}
                dadosPaciente={dadosPaciente}/>}
            {openModalNewPatient && <ModalNewPatient
                isOpen={openModalNewPatient}
                onClose={handleCloseNewModal}
                />}
            <ErrorModal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                message={errorMessage}/>
        </>
    )
}
export default Patient;