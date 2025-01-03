import React, {useCallback, useEffect, useState} from "react";
import Cards from "@/components/Card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Table, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import DataTable from "@/components/DataTable.tsx";
import {deleteExam, listTenantExam} from "@/services/tenantExamService.tsx";
import {useAuth} from "@/hooks/auth.tsx";
import Loading from "@/components/Loading.tsx";
import {TableCell} from "@mui/material";
import ModalTenantExamRender from "@/components/AdminTenantExam/ModalTenantExamRender.tsx";
import GeneralModal from "@/components/ModalHandle/GeneralModal.tsx";
import {ModalType} from "@/types/ModalType.ts";

export interface Exams {
    id?: number
    exam_name: string
    price: string
    doctorPrice?: string
    doctors: Doctor[]
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
    const [filterDoctor, setFilterDoctor] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false);
    const [type,setType] = useState<ModalType>(ModalType.newExam)
    const [deleteId, setDeleteId] = useState<number>()
    const [title,setTitle] = useState("");
    const [action,setAction] = useState("");
    const [isError, setIsError] = useState(false);
    const [generalMessage, setGeneralMessage] = useState<string>('')
    const [isGeneralModalOpen, setIsGeneralModalOpen] = useState(false)

    const auth = useAuth()

    const fetchExams = useCallback(async () => {
        try {
            if(auth.tenantId) {
                setLoading(true)
                await listTenantExam(auth.tenantId).then(
                    (result) => {
                        if(result.status === 200) {
                            setLoading(false)
                            setExames(result.data.data)
                        }
                    }
                ).catch(error => console.log(error))

            }
        } catch (error) {
            console.error(error)
        }
    },[auth.tenantId])

    useEffect( () => {
        fetchExams().then()
    }, [fetchExams, auth.tenantId]);
    const renderRow = (exame: Exams) => (
        <>
            <TableCell className="text-oxfordBlue font-bold">{exame.exam_name}</TableCell>
            <TableCell className="text-blue-900">{ exame.doctors.length > 0 ?
                exame.doctors.map((doctor) => (<p key={doctor.id}>Dr(a). {doctor.fullName}</p>))
                :
                (<p>Não possuí médico cadastrado</p>)
            }
            </TableCell>
            <TableCell className="text-blue-900">{exame.price}</TableCell>
            <TableCell className="text-blue-900 capitalize">{exame.doctorPrice}</TableCell>
        </>
    );
    const openFlexiveModal = (modalType: ModalType, exams?: Exams) => {
        if(exams) {
            setExame(exams)
        }

        setType(modalType)
        setOpenModalNewExam(true)
    }
    const handleModalMessage = (message: string) => {
        setGeneralMessage(message)
        setTitle('Confirmação')
        setAction('Fechar')
        setIsError(false)
        setIsGeneralModalOpen(true)
    }
    const handleConfirmationDelete = (id: number) => {
        setGeneralMessage("Deseja deletar o exame selecionado?")
        setTitle('Confirmação de Exclusão')
        setAction('Excluir')
        setDeleteId(id)
        setIsGeneralModalOpen(true)

    }
    const deletePatient = async () => {
        try {
            if (auth.tenantId && deleteId) {
                await deleteExam(deleteId,auth.tenantId).then(
                    (result) => {
                        if(result.message && result.message.includes('FK_')){
                            handleModalMessage('Não é possível deletar o exame que está relacionado com um médico')
                            return
                        } else {
                            return fetchExams().then()
                        }
                    }
                )
                setIsGeneralModalOpen(false)
            }

        } catch(error) {
            console.error(error)
        }
    }
    const handleClose = () => {
        setIsGeneralModalOpen(false)
        fetchExams().then()
    }
    if (loading) {
        return <Loading />
    }
    return (
        <>
            <div className="w-full max-w-6xl p-4 mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-oxfordBlue">Tipos de Procedimentos da Clínica</h1>
                <div className="flex flex-col md:flex-row gap-3 mb-6">
                    <Cards name='Total de Exames' content={exames?.length}/>
                </div>

                <div className="flex flex-col md:flex-row gap-3 mb-5">
                    <div className='p-2'>
                        <Label htmlFor="filtroNome" className="text-oxfordBlue">Nome do Exame</Label>
                        <Input
                            className="w-72"
                            id="filtroNome"
                            placeholder="Filtrar por Nome do exame"
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}/>
                    </div>
                    <div className='p-2'>
                        <Label htmlFor="filtroDoctor" className="text-oxfordBlue">Nome do Médico</Label>
                        <Input
                            className="w-72"
                            id="filtroDoctor"
                            placeholder="Filtrar por Médico"
                            value={filterDoctor}
                            onChange={(e) => setFilterDoctor(e.target.value)}/>
                    </div>
                    <div className="flex justify-end mt-7 p-1">
                        <Button onClick={() => openFlexiveModal(ModalType.newExam)}
                                className="bg-oxfordBlue text-white hover:bg-blue-900" type="submit">Adicionar
                            Exame</Button>
                    </div>
                </div>
                <Card>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-oxfordBlue">Nome do Procedimento</TableHead>
                                    <TableHead className="text-oxfordBlue">Médicos</TableHead>
                                    <TableHead className="text-oxfordBlue">Preço do Procedimento</TableHead>
                                    <TableHead className="text-oxfordBlue">Valor do Médico</TableHead>
                                    <TableHead className="text-oxfordBlue">Ação</TableHead>
                                </TableRow>
                            </TableHeader>
                            <DataTable openModalEdit={openFlexiveModal} openModalBooking={false} deleteData={handleConfirmationDelete} dataTable={exames} renderRow={renderRow}></DataTable>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            {openModalNewExam && (
                <ModalTenantExamRender
                    modalNewExam={handleModalMessage}
                    isOpen={openModalNewExam}
                    onClose={() => setOpenModalNewExam(false)}
                    type={type}
                    title="Gerenciamento de Exames da Clínica"
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