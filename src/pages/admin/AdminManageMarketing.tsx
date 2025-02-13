import React, {useCallback, useEffect, useState} from "react";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js'
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { Doughnut } from 'react-chartjs-2'
import {useToast} from "@/hooks/use-toast"
import {Toaster} from "@/components/ui/toaster.tsx";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {ModalType} from "@/types/ModalType.ts";
import ModalRender from "@/components/ModalHandle/ModalRender.tsx";
import GeneralModal from "@/components/ModalHandle/GeneralModal.tsx";
import {getBudgetCanal, listCanalMarketing, updateBudgetCanal} from "@/services/marketingService.ts";
import {useAuth} from "@/hooks/auth.tsx";
import {IMarketing} from "@/components/AdminMarketing/RegisterCanal.tsx";
import {Label} from "@/components/ui/label.tsx";

ChartJS.register(ArcElement, Tooltip, Legend,ChartDataLabels)

const AdminManageMarketing: React.FC = () => {

    const [totalBudget, setTotalBudget] = useState(0)
    const [newTotalBudget, setNewTotalBudget] = useState(0)
    const [clicks, setClicks] = useState(0)
    const [leads, setLeads] = useState(0)
    const [costs, setCosts] = useState(0)
    const [allocations, setAllocations] = useState<IMarketing[]>([])
    const [openModalPlatform, setOpenModalModalPlatform] = useState<boolean>(false)
    const [type, setType] = useState<ModalType>(ModalType.newPatient)
    const [title, setTitle] = useState("");
    const [titleModal, setTitleModal] = useState("");

    const [action,setAction] = useState("");
    const [isError, setIsError] = useState(false);
    const [generalMessage, setGeneralMessage] = useState<string>('')
    const [isGeneralModalOpen, setIsGeneralModalOpen] = useState(false)
    const { toast } = useToast()
    const auth = useAuth()
    const fetchCanal = useCallback(async () => {
        if (auth.tenantId) {
            const result = await listCanalMarketing(auth.tenantId)
            if (result.data) {
                setAllocations(result.data.data)
                setClicks(524)
                setLeads(343)
                setCosts(543.34)
            }
        }
    },[auth.tenantId])

    const fetchBudget = useCallback(async () => {
        if(auth.tenantId) {
           await getBudgetCanal(auth.tenantId).
                then(
                (result) => {
                    toast({
                        title: 'ClintIA',
                        description: 'Orçamento total atualizado'
                        }
                    )
                    setTotalBudget(result.data.data.budget)

                }
            )
        }
    },[auth.tenantId])

    useEffect(() => {
        fetchBudget().then()
    }, [fetchBudget]);
    useEffect(   () => {
        fetchCanal().then()
    }, [fetchCanal]);

    const calculateTotalAllocation = () => allocations.reduce((sum, alloc) => Number(sum) + Number(alloc.budgetCanal), 0)

    const calculatePercentages = () => {
        return allocations?.map(alloc => ({
            ...alloc,
            percentage: ((Number(alloc.budgetCanal) / totalBudget) * 100).toFixed(1),
            formattedAmount: `R$ ${Number(alloc.budgetCanal).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        }))
    }

    const openFlexiveModal = (title: string, modalType: ModalType) => {
        setType(modalType)
        setTitleModal(title)
        setOpenModalModalPlatform(true)
    }
    const handleModalMessage = (message: string) => {
        setGeneralMessage(message)
        setTitle('Confirmação de Ação')
        setAction('Fechar')
        setIsError(false)
        setIsGeneralModalOpen(true)
    }
    const onClose = () => {
        fetchCanal().then()
        setIsGeneralModalOpen(false)
    }

    const updateBudgetTenant = async () => {
      if(auth.tenantId) {
        const result = await updateBudgetCanal(Number(newTotalBudget), auth.tenantId)
          if(result.data.data) {
              setTotalBudget(result.data.data.budget)
              fetchCanal().then()
              fetchBudget().then()
          }

      }
    }

    const chartData = {
        labels: calculatePercentages().map(a => `${a.canal} (${a.percentage}%)`),
        datasets: [
            {
                data: allocations.map(a => a.budgetCanal),
                backgroundColor: [
                    'rgb(3, 30, 50,1)',
                    'rgba(5, 166, 205, 1)',
                    'rgb(2,120,220,1)',
                    'rgb(3, 30, 50,1)'
                ],
            },
        ],
    }
    return (
        <div className="w-full p-10 mx-auto">
            <h1 className="text-3xl mb-6 font-bold tracking-tight">Gerenciamento Financeiro do Marketing</h1>
            <div className="flex flex-col xl:flex-row space-x-3">
                <Card className="drop-shadow-lg shadow-gray-300 col-span-2 mb-4 w-max p-1">
                    <CardContent>
                        <div className="flex justify-between space-x-2 items-center p-2">
                            <div className="flex flex-col">
                                <Label htmlFor="totalBudget" className="my-2 font-bold text-base text-oxfordBlue">
                                    Total Budget
                                </Label>
                                <Input
                                    name="budgetCanal"
                                    type="text"

                                    placeholder={`R$ ${newTotalBudget !== 0 ? (newTotalBudget).toLocaleString('pt-BR', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }) : (totalBudget).toLocaleString('pt-BR', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}`}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9,]/g, '').replace(',', '.');
                                        setNewTotalBudget(Number(value));
                                    }}
                                    className="w-full mr-2"
                                />
                            </div>
                            <Button className="mt-10" onClick={updateBudgetTenant}>Atualizar</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className="drop-shadow-lg shadow-gray-300 col-span-2 mb-4 w-max p-1">
                    <CardContent>
                        <div className="flex justify-between space-x-2 items-center p-2">
                            <div className="flex flex-col">
                                <Label htmlFor="total" className="my-2 font-bold text-base text-oxfordBlue">
                                    Total Distriuído
                                </Label>
                                <div className="flex justify-between mt-2 text-nowrap">
                                    <div className="flex flex-row">
                                        <p className="align-text-top font-bold">R$</p> <p
                                        className="text-3xl ml-1 font-bold">
                                        {calculateTotalAllocation().toLocaleString('pt-BR', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="drop-shadow-lg shadow-gray-300 col-span-2 mb-4 w-max p-1">
                    <CardContent>
                        <div className="flex justify-between space-x-2 items-center p-2">
                            <div className="flex flex-col">
                                <Label htmlFor="budgetCanal" className="my-2 font-bold text-base text-oxfordBlue">
                                    Orçamento Restante
                                </Label>
                                <div className="flex justify-between mt-2 text-nowrap">
                                    <div className="flex flex-row">
                                        <p className="align-text-top font-bold">R$</p> <p
                                        className="text-3xl ml-1 font-bold">
                                        {(totalBudget - calculateTotalAllocation()).toLocaleString('pt-BR', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-row space-x-5 p-8">
                <h2 className="text-2xl font-bold tracking-tight">ORÇAMENTO POR CANAL</h2><Button
                onClick={() => openFlexiveModal('Gerenciamento de Canais', ModalType.newCanal)}
                className="bg-oxfordBlue text-white hover:bg-blue-900" type="submit">Gerenciar
                Canais</Button>
            </div>

            <div className="p-8 flex flex-row space-x-5">
                <Button onClick={() => openFlexiveModal('Gerenciamento de Canais', ModalType.newCanal)}
                        className="bg-oxfordBlue w-36 h-10 uppercase font-bold text-white hover:bg-blue-900" type="submit">Facebook
                </Button>
                <Button onClick={() => openFlexiveModal('Gerenciamento de Canais', ModalType.newCanal)}
                        className="bg-lightBlue text-oxfordBlue uppercase font-bold w-36 h-10 hover:bg-blue-900" type="submit">Google
                </Button>
            </div>


            <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col md:flex-row space-x-3">
                            <Card className="drop-shadow-lg shadow-gray-300 col-span-2 mb-4 w-48 h-max p-1">
                                <CardContent>
                                    <div className="flex justify-between space-x-2 items-center p-2">
                                        <div className="flex flex-col">
                                            <Label htmlFor="total" className="my-2 font-bold text-base text-oxfordBlue">
                                                Clicks
                                            </Label>
                                            <div className="flex justify-between mt-2 text-nowrap">
                                                <div className="flex flex-row">
                                                   <p className="text-3xl ml-1 font-bold">
                                                    {clicks}
                                                   </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="drop-shadow-lg shadow-gray-300 col-span-2 mb-4 w-48 h-max p-1">
                                <CardContent>
                                    <div className="flex justify-between space-x-2 items-center p-2">
                                        <div className="flex flex-col">
                                            <Label htmlFor="total" className="my-2 font-bold text-base text-oxfordBlue">
                                                Custo
                                            </Label>
                                            <div className="flex justify-between mt-2 text-nowrap">
                                                <div className="flex flex-row">
                                                    <p className="align-text-top font-bold">R$</p> <p
                                                    className="text-3xl ml-1 font-bold">
                                                    {costs.toLocaleString('pt-BR', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    })}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="drop-shadow-lg shadow-gray-300 col-span-2 mb-4 h-max w-48 p-1">
                                <CardContent>
                                    <div className="flex justify-between space-x-2 items-center p-2">
                                        <div className="flex flex-col">
                                            <Label htmlFor="total" className="my-2 font-bold text-base text-oxfordBlue">
                                                Leads
                                            </Label>
                                            <div className="flex justify-between mt-2 text-nowrap">
                                                <div className="flex flex-row">
                                                  <p className="text-3xl ml-1 font-bold">
                                                        {leads}
                                                  </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                <div>
                    <p className="my-2 font-bold text-base text-oxfordBlue">Grafico de Distribuição</p>
                    <Card className="w-max p-10">
                        <CardContent>
                            <Doughnut
                                data={chartData}
                                options={{
                                    plugins: {
                                        tooltip: {
                                            callbacks: {
                                                label: function (context) {
                                                    const label = context.label || '';
                                                    const value = context.parsed || 0;
                                                    const percentage = ((Number(value) / totalBudget) * 100).toFixed(1);
                                                    const formattedValue = `R$ ${value}`;
                                                    return `${label}: ${formattedValue} (${percentage}%)`;
                                                }
                                            }
                                        },
                                        datalabels: {
                                            formatter: (value) => {
                                                if ((value / totalBudget * 100)) {
                                                    return (value / totalBudget * 100).toFixed(1) + "%"
                                                } else {
                                                    return ''
                                                }
                                            },
                                            display: "block",
                                            backgroundColor: '#ECEAF8',
                                            color: '#051E32',
                                            borderRadius: 50,
                                            anchor: "center",
                                            font: {
                                                weight: 'bold',
                                                size: 15,
                                            },
                                            padding: 10
                                        },
                                        legend: {
                                            position: 'bottom',
                                            labels: {
                                                boxWidth: 15,
                                                padding: 12
                                            },
                                            display: true,
                                            align: 'center'
                                        }
                                    },
                                    layout: {
                                        padding: {
                                            bottom: 10
                                        }
                                    }
                                }}
                            />
                        </CardContent>
                    </Card>
                </div>
                </div>
            {openModalPlatform && <ModalRender
                modalMessage={handleModalMessage}
                isOpen={openModalPlatform}
                onClose={() => setOpenModalModalPlatform(false)}
                type={type}
                title={titleModal}
                totalBudget={totalBudget}
            />}
            <GeneralModal
                onClose={onClose}
                title={title}
                action={action}
                error={isError}
                isOpen={isGeneralModalOpen}
                message={generalMessage}/>
            <Toaster/>
        </div>
    )
}

export default AdminManageMarketing;