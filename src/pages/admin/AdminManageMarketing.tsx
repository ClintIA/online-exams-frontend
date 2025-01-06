import React, {useCallback, useEffect, useState} from "react";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Pie} from 'react-chartjs-2'
import {useToast} from "@/hooks/use-toast"
import {Toaster} from "@/components/ui/toaster.tsx";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {ModalType} from "@/types/ModalType.ts";
import ModalRender from "@/components/ModalHandle/ModalRender.tsx";
import GeneralModal from "@/components/ModalHandle/GeneralModal.tsx";
import {getBudgetCanal, listCanalMarketing, updateBudgetCanal} from "@/services/marketingService.ts";
import {useAuth} from "@/hooks/auth.tsx";
import {IMarketing} from "@/components/AdminMarketing/RegisterCanal.tsx";
import {TooltipManual} from "@/components/ui/TooltipManual.tsx";

ChartJS.register(ArcElement, Tooltip, Legend,ChartDataLabels)

const AdminManageMarketing: React.FC = () => {

    const [ totalBudget, setTotalBudget] = useState(0)
    const [newTotalBudget, setNewTotalBudget] = useState(0)
    const [allocations, setAllocations] = useState<IMarketing[]>([])
    const [openModalPlatform, setOpenModalModalPlatform] = useState<boolean>(false)
    const [type,setType] = useState<ModalType>(ModalType.newPatient)
    const [title,setTitle] = useState("");
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
            }

        }
    },[auth.tenantId])
    useEffect(   () => {
    fetchCanal().then()
    }, [fetchCanal]);
    const fetchBudget = useCallback(async () => {
        if(auth.tenantId) {
            const result = await getBudgetCanal(auth.tenantId)
            setTotalBudget(result.data.data.budget)
        }
    },[auth.tenantId])
    useEffect(() => {
        fetchBudget().then()
    }, [fetchBudget]);

    const calculateTotalAllocation = () => allocations.reduce((sum, alloc) => Number(sum) + Number(alloc.budgetCanal), 0)

    const calculatePercentages = () => {
        return allocations?.map(alloc => ({
            ...alloc,
            percentage: ((Number(alloc.budgetCanal) / totalBudget) * 100).toFixed(1),
            formattedAmount: `R$ ${Number(alloc.budgetCanal).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        }))
    }

    const openFlexiveModal = (modalType: ModalType) => {
        setType(modalType)
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

    const updateAllocation = (platform: string, amount: number) => {
        const newAllocations = allocations.map(alloc =>
            alloc.canal === platform ? { ...alloc, amount } : alloc
        )
        const newTotal = newAllocations.reduce((sum, alloc) => sum + Number(alloc.budgetCanal), 0)

        if (newTotal > totalBudget) {
            toast({
                title: "Orçamento excedido",
                description: "O total das alocações não pode ser maior que o orçamento total.",
                variant: "destructive",

            })
        } else {
            setAllocations(newAllocations)
        }
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
                    'rgb(255, 0, 0)',
                    'rgb(0, 255, 0)',
                    'rgb(0, 0, 255)',
                    'rgb(255, 255, 0)',
                    'rgb(255, 0, 255)',
                    'rgb(0, 255, 255)',
                    'rgb(255, 128, 0)',
                    'rgb(128, 0, 128)',
                    'rgb(128, 255, 0)',
                    'rgb(255, 105, 180)',
                    'rgb(64, 224, 208)',
                    'rgb(128, 0, 32)',
                    'rgb(128, 128, 0)',
                    'rgb(0, 0, 128)',
                    'rgb(139, 69, 19)',
                ],
            },
        ],
    }
    return (
        <div className="w-full p-10 mx-auto">
            <h1 className="text-3xl mb-6 font-bold tracking-tight">Gerenciamento Financeiro do Marketing</h1>
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Total Budget</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center">
                        <Input
                            type="text"
                            placeholder={`R$ ${newTotalBudget !== 0 ? newTotalBudget : totalBudget}`}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9,]/g, '').replace(',', '.');
                                setNewTotalBudget(Number(value));
                            }}

                            className="mr-2"
                        />
                        <Button onClick={updateBudgetTenant}>Atualizar</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between">ORÇAMENTO POR CANAL
                            <Button onClick={() => openFlexiveModal(ModalType.newCanal)}
                                    className="bg-oxfordBlue text-white hover:bg-blue-900" type="submit">Gerenciar Canais</Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {calculatePercentages().map((allocation) => (
                            <div key={allocation.canal} className="mb-2 flex items-center">
                                <span className="min-w-40 text-right mr-4">{allocation.canal}</span>
                                <TooltipManual text={'Clique em Gerenciar Canais para editar'}>
                                <Input
                                    type="text"
                                    placeholder={allocation.formattedAmount}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9,]/g, '').replace(',', '.');
                                        updateAllocation(allocation.canal, Number(value));
                                    }
                                }
                                    disabled={true}
                                    readOnly={true}
                                    className="placeholder-black text-black mr-2"
                                />
                                </TooltipManual>
                                <span className="hidden xl:flex w-10 text-right">{Number(allocation.percentage) ? allocation.percentage+'%' : ''}</span>
                            </div>
                        ))}
                        <div className="flex justify-between mt-8">
                            <p><strong>Total Distribuído:</strong> R$ {calculateTotalAllocation()}</p>
                            <p><strong>Orçamento Restante:</strong> R$ {(totalBudget - calculateTotalAllocation()).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Grafico de Distribuição</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Pie
                            data={chartData}
                            options={{
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: function(context) {
                                                const label = context.label || '';
                                                const value = context.parsed || 0;
                                                const percentage = ((value / totalBudget) * 100).toFixed(1);
                                                const formattedValue = `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                                                return `${label}: ${formattedValue} (${percentage}%)`;
                                            }
                                        }
                                    },
                                    datalabels: {
                                        formatter: (value) => {
                                            if((value / totalBudget * 100)) {
                                                return (value / totalBudget * 100).toFixed(1) + "%"
                                            } else {
                                                return ''
                                            }
                                        },
                                        color: '#000',
                                        font: {
                                            weight: 'bold',
                                            size: 12,
                                        }
                                    },
                                    legend: {
                                        position: 'bottom',
                                        labels: {
                                            boxWidth: 10,
                                            padding: 12
                                        },
                                        display: true,
                                        align: 'center'
                                    }
                                },
                                layout: {
                                    padding: {
                                        bottom: 30
                                    }
                                }
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
            {openModalPlatform && <ModalRender
                modalMessage={handleModalMessage}
                isOpen={openModalPlatform}
                onClose={() => setOpenModalModalPlatform(false)}
                type={type}
                title="Gerenciamento de Canais"
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