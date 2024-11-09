import React, {useEffect, useState} from "react";
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

export interface Exams {
    id: number
    exam_name: string
    price: string
    doctorPrice: string
    doctors: Doctor[]
    createdAt: Date
}
export interface Doctor {
    id: number;
    fullName: string
}
const AdminConfigExam: React.FC = () => {
    const [exames, setExames] = useState<Exams[]>([])
    const [filterName, setFilterName] = useState<string>()
    const [tenantId, setTenantID] = useState<number | undefined>()
    const [filterDoctor, setFilterDoctor] = useState<string>()
    const [openModalNewExam, setOpenModalNewExam] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const auth = useAuth()

    useEffect(() => {
        const getTenant = () => {
            if(auth?.token) {
                const decoded: ITokenPayload = jwtDecode(auth.token?.toString())
                setTenantID(decoded.tenantId)
            }
        }
        getTenant()
    },[auth.token])
    useEffect( () => {
        const fetchExams = async () => {
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
        }
        fetchExams().then()
    }, [tenantId]);
    const renderRow = (exame: Exams) => (
        <>
            <TableCell className="text-oxfordBlue font-bold">{exame.exam_name}</TableCell>
            <TableCell className="text-blue-900">{exame.doctors[0].fullName}</TableCell>
            <TableCell className="text-blue-900">{exame.price}</TableCell>
            <TableCell className="text-blue-900 capitalize">{exame.doctorPrice}</TableCell>
        </>
    );
    if (loading) {
        return <Loading />
    }
    return (
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
                    <Button onClick={() => setOpenModalNewExam(true)}
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
                        }} deleteData={() => {
                        }} dataTable={exames} renderRow={renderRow}></DataTable>
                    </Table>
                </CardContent>
            </Card>
        </div>

    )
}

export default AdminConfigExam;