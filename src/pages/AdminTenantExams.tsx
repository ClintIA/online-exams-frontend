import React, {useCallback, useEffect, useState} from "react";
import Cards from "@/components/Card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Table, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import DataTable from "@/components/DataTable.tsx";
import {listTenantExam} from "@/services/tenantExam.tsx";
import {useAuth} from "@/hooks/auth.tsx";
import {ITokenPayload} from "@/types/Auth.ts";
import {jwtDecode} from "jwt-decode";
import Loading from "@/components/Loading.tsx";
import {TableCell} from "@mui/material";
import {Type} from "@/components/ModalPatientRender.tsx";
import ModalExamRender from "@/components/ModalExamRender.tsx";
import GeneralModal from "@/components/GeneralModal.tsx";
import {deletePatient} from "@/services/patientService.tsx";

export interface Exams {
    id?: number
    exam_name: string
    price: string
    doctorPrice?: string
    doctors?: Doctor[]
    createdAt?: Date
}
export interface Doctor {
    id: number;
    fullName: string
}
const AdminTenantExams: React.FC = () => {

    const [exames, setExames] = useState<Exams[]>([])
    const [exame, setExame] = useState<Exams>()
    const [filterName, setFilterName] = useState<string>()
    const [openModalNewExam, setOpenModalNewExam] = useState<boolean>(false)
    const [tenantId, setTenantID] = useState<number | undefined>()
    const [filterDoctor, setFilterDoctor] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false);
    const [type,setType] = useState<Type>(Type.newExam)
    const [tenant, setTenant] = useState<number | undefined>()
    const [deleteId, setDeleteId] = useState<number>()
    const [title,setTitle] = useState("");
    const [action,setAction] = useState("");
    const [isError, setIsError] = useState(false);
    const [generalMessage, setGeneralMessage] = useState<string>('')
    const [isGeneralModalOpen, setIsGeneralModalOpen] = useState(false)

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
    useEffect(() => {
        const getTenant = () => {
            if(auth?.token) {
                const decoded: ITokenPayload = jwtDecode(auth.token?.toString())
                setTenantID(decoded.tenantId)
            }
        }
        getTenant()
    },[auth.token])
    const fetchExams = useCallback(async () => {
        try {
            if(tenantId) {
                setLoading(true)
                const result = await listTenantExam(tenantId)
                if(result?.data.status === "success") {
                    setExames(result?.data.data)
                    setLoading(false)
                }
            }
        } catch (error) {
            console.error(error)
        }
    },[tenantId])
    useEffect( () => {
        fetchExams().then()
    }, [fetchExams, tenantId]);
    const renderRow = (exame: Exams) => (
        <>
            <TableCell className="text-oxfordBlue font-bold">{exame.exam_name}</TableCell>
            <TableCell className="text-blue-900">{exame.doctors? exame.doctors.map((doctor) => (<p>{doctor.fullName}</p>)) : 'Não possuí medico cadastrado'}</TableCell>
            <TableCell className="text-blue-900">{exame.price}</TableCell>
            <TableCell className="text-blue-900 capitalize">{exame.doctorPrice}</TableCell>
        </>
    );
    const openFlexiveModal = (modalType: Type, exams?: Exams) => {
        if(exams) {
            setExame(exams)
        }

        setType(modalType)
        setOpenModalNewExam(true)
    }
    const handleConfirmationDelete = (message: string) => {
        setGeneralMessage(message)
        setTitle('Confirmação')
        setAction('Fechar')
        setIsError(false)
        setIsGeneralModalOpen(true)
    }
    const deletePatient = async () => {
        try {
            if (tenant && deleteId) {
                setIsGeneralModalOpen(false)

            }

        } catch(error) {
            console.error(error)
        }
    }
    const handleClose = () => {
        if(openModalNewExam) {
            setOpenModalNewExam(false)
        }
        fetchExams().then()
    }
    if (loading) {
        return <Loading />
    }
    return (
        <>
            <div className="w-full max-w-6xl">
                <h1 className="text-2xl font-bold mb-6 text-oxfordBlue">Listagem de Exames da Clínica</h1>
                <div className="flex flex-col md:flex-row gap-3 mb-6">
                    <Cards name='Total de Exames' content={exames?.length}/>
                </div>

                <div className="flex flex-col md:flex-row gap-3 mb-5">
                    <div className='p-2'>
                        <Label htmlFor="filtroNome" className="text-oxfordBlue">Nome do Exame</Label>
                        <Input
                            className="w-72"
                            id="filtroNome"
                            placeholder="Filtrar por nome"
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}/>
                    </div>
                    <div className='p-2'>
                        <Label htmlFor="filtroCPF" className="text-oxfordBlue">Nome do Médico</Label>
                        <Input
                            className="w-72"
                            id="filtroCPF"
                            placeholder="Filtrar por CPF"
                            value={filterDoctor}
                            onChange={(e) => setFilterDoctor(e.target.value)}/>
                    </div>
                    <div className="flex justify-end mt-7 p-1">
                        <Button onClick={() => openFlexiveModal(Type.newExam)}
                                className="bg-oxfordBlue text-white hover:bg-blue-900" type="submit">Adicionar
                            Exame</Button>
                    </div>
                </div>
                <Card>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-oxfordBlue">Nome do Exame</TableHead>
                                    <TableHead className="text-oxfordBlue">Médicos</TableHead>
                                    <TableHead className="text-oxfordBlue">Preço do Exame</TableHead>
                                    <TableHead className="text-oxfordBlue">Valor do Médico</TableHead>
                                    <TableHead className="text-oxfordBlue">Ação</TableHead>
                                </TableRow>
                            </TableHeader>
                            <DataTable openModalEdit={() => {
                            }} deleteData={handleConfirmationDelete} dataTable={exames} renderRow={renderRow}></DataTable>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            {openModalNewExam && (
                <ModalExamRender
                    modalNewExam={handleModalMessage}
                    isOpen={openModalNewExam}
                    onClose={handleClose}
                    type={type}
                    dadosExam={exame}/>
            )
            }
            <GeneralModal
                title={title}
                action={action}
                error={isError}
                isOpen={isGeneralModalOpen}
                isDelete={deletePatient}
                onClose={handleClose}
                message={generalMessage}/>
        </>
    )
}

export default AdminTenantExams;