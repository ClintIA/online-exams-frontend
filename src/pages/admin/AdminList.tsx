import Cards from "@/components/Card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import ModalRender from "@/components/ModalHandle/ModalRender.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Table, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import DataTable from "@/components/DataTable.tsx";
import GeneralModal from "@/components/ModalHandle/GeneralModal.tsx";
import React, {useCallback, useEffect, useState} from "react";
import {useAuth} from "@/hooks/auth.tsx";
import {TableCell} from "@mui/material";
import Loading from "@/components/Loading.tsx";
import {ModalType} from "@/types/ModalType.ts";
import {deleteDoctor, listAdmins} from "@/services/adminsService.tsx";
import {IAdmin} from "@/pages/admin/AdminHome.tsx";
import {format} from "date-fns";
import {ptBR} from "date-fns/locale";

const AdminList: React.FC = () => {

    const [title,setTitle] = useState("");
    const [action,setAction] = useState("");
    const [isError, setIsError] = useState(false);
    const [generalMessage, setGeneralMessage] = useState<string>('')
    const [isGeneralModalOpen, setIsGeneralModalOpen] = useState(false)
    const [admins,setAdmins] = useState<IAdmin[]>([]);
    const [filtroName, setFiltroName] = useState<string>('')
    const [deleteId, setDeleteId] = useState<number>()
    const [admin, setAdmin] = useState<IAdmin>()
    const [openModalNewAdmin, setOpenModalNewAdmin] = useState<boolean>(false)
    const [type,setType] = useState<ModalType>(ModalType.newPatient)
    const [loading, setLoading] = useState<boolean>(false);
    const auth = useAuth()


    const openFlexiveModal = (modalType: ModalType, admin?: IAdmin) => {
        if(admin) {
            setAdmin(admin)
        }

        setType(modalType)
        setOpenModalNewAdmin(true)
    }

    const fetchAdmins = useCallback(async () => {
        try {
            if (auth.tenantId) {
                setLoading(true)
                const result = await listAdmins(auth.tenantId)
                setLoading(false)
                if (result?.data.status === "success") {
                    const adminsList = result?.data?.data as IAdmin[]
                    setAdmins(adminsList || [])
                }
            }
        } catch (error) {
            console.error(error)
        }
    },[auth.tenantId])
    useEffect(() => {
        fetchAdmins().then()
    }, [fetchAdmins]);

    const handleModalMessage = (message: string) => {
        setGeneralMessage(message)
        setTitle('Confirmação de Ação')
        setAction('Fechar')
        setIsError(false)
        setIsGeneralModalOpen(true)
    }
    const handleConfirmationDelete = (id: number) => {
        setGeneralMessage("Deseja deletar o administrador selecionado?")
        setTitle('Confirmação de Exclusão')
        setAction('Excluir')
        setDeleteId(id)
        setIsGeneralModalOpen(true)

    }
    const handleDeletePatient = async () => {
        try {
            if(deleteId && auth.tenantId) {
            await deleteDoctor(deleteId,auth.tenantId).then(
                    (result) => {
                        if (result.message && result.message.includes('FK_')) {
                            handleModalMessage('Não é possível deletar um administrador com agendamento pendente')
                            return
                        } else {
                            return fetchAdmins().then()
                        }
                    })
                setIsGeneralModalOpen(false)
            }
        } catch(error) {
            console.error(error)
        }
    }
    const handleClose = () => {
        setIsGeneralModalOpen(false)
        fetchAdmins().then()
    }

    if (loading) {
        return <Loading />
    }
    const renderRow = (doctor: IAdmin) => (
        <>
            <TableCell className="text-oxfordBlue font-bold">{doctor.fullName}</TableCell>
            <TableCell className="text-blue-900">{doctor.cpf}</TableCell>
            <TableCell className="text-blue-900">{doctor.email}</TableCell>
            <TableCell className="text-blue-900">{doctor.phone}</TableCell>
            <TableCell className="text-blue-900">{doctor.created_at ? format(doctor.created_at, "dd/MM/yyyy", { locale: ptBR }) : ''}</TableCell>

        </>
    );

    return (
        <div className="w-full max-w-6xl p-4 mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-oxfordBlue">Administradores</h1>
            <div className="flex flex-col md:flex-row gap-3 mb-6">
                <Cards name='Total de Adminstradores' content={admins?.length}/>
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

                <div className="flex justify-end mt-7 p-1">
                    <Button onClick={() => openFlexiveModal(ModalType.newAdmin)}
                            className="bg-oxfordBlue text-white hover:bg-blue-900" type="submit">Adicionar
                        Administradores</Button>
                </div>
            </div>

            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-oxfordBlue">Nome</TableHead>
                                <TableHead className="text-oxfordBlue">CPF</TableHead>
                                <TableHead className="text-oxfordBlue">Email</TableHead>
                                <TableHead className="text-oxfordBlue">Contato</TableHead>
                                <TableHead className="text-oxfordBlue">Data de Cadastro</TableHead>
                            </TableRow>
                        </TableHeader>
                        <DataTable renderRow={renderRow} openModalBooking={false} openModalEdit={openFlexiveModal}
                                   deleteData={handleConfirmationDelete} dataTable={admins}></DataTable>
                    </Table>
                </CardContent>
            </Card>

            {openModalNewAdmin && <ModalRender
                modalNewPatient={handleModalMessage}
                isOpen={openModalNewAdmin}
                onClose={() => setOpenModalNewAdmin(false)}
                type={type}
                title="Gerenciamento de Administradores"
                adminData={admin}
                isDoctor={false}
            />}

            <GeneralModal
                title={title}
                action={action}
                error={isError}
                isOpen={isGeneralModalOpen}
                isDelete={handleDeletePatient}
                onClose={handleClose}
                message={generalMessage}/>
        </div>
    )
}

export default AdminList;