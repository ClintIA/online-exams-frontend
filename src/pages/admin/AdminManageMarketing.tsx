import React, {useState} from "react";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Pie} from 'react-chartjs-2'
import {canaisOptions, CanalOptions} from "@/lib/optionsFixed.ts";
import {useToast} from "@/hooks/use-toast"
import {Toaster} from "@/components/ui/toaster.tsx";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {ModalType} from "@/types/ModalType.ts";
import ModalRender from "@/components/ModalHandle/ModalRender.tsx";
import GeneralModal from "@/components/ModalHandle/GeneralModal.tsx";

ChartJS.register(ArcElement, Tooltip, Legend,ChartDataLabels)

const AdminManageMarketing: React.FC = () => {

    const [totalBudget, setTotalBudget] = useState(0)
    const [allocations, setAllocations] = useState<CanalOptions[]>(canaisOptions)
    const [openModalPlatform, setOpenModalModalPlatform] = useState<boolean>(false)
    const [type,setType] = useState<ModalType>(ModalType.newPatient)
    const [title,setTitle] = useState("");
    const [action,setAction] = useState("");
    const [isError, setIsError] = useState(false);
    const [generalMessage, setGeneralMessage] = useState<string>('')
    const [isGeneralModalOpen, setIsGeneralModalOpen] = useState(false)
    const { toast } = useToast()

    const calculateTotalAllocation = () => allocations.reduce((sum, alloc) => sum + alloc.amount, 0)

    const calculatePercentages = () => {
        return allocations.map(alloc => ({
            ...alloc,
            percentage: ((alloc.amount / totalBudget) * 100).toFixed(1),
            formattedAmount: `R$ ${alloc.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
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
    const updateAllocation = (platform: string, amount: number) => {
        const newAllocations = allocations.map(alloc =>
            alloc.platform === platform ? { ...alloc, amount } : alloc
        )
        const newTotal = newAllocations.reduce((sum, alloc) => sum + alloc.amount, 0)

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

    const chartData = {
        labels: calculatePercentages().map(a => `${a.platform} (${a.percentage}%)`),
        datasets: [
            {
                data: allocations.map(a => a.amount),
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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gerenciamento Financeiro do Marketing</h1>

            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Total Budget</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center">
                        <Input
                            type="text"
                            value={`R$ ${totalBudget.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9,]/g, '').replace(',', '.');
                                setTotalBudget(Number(value));
                            }}
                            className="mr-2"
                        />
                        <Button onClick={() => setTotalBudget(totalBudget)}>Atualizar</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between"> DISTRIBUIÇÃO DO ORÇAMENTO POR CANAL
                            <Button onClick={() => openFlexiveModal(ModalType.newDoctorAdmin)}
                                    className="bg-oxfordBlue text-white hover:bg-blue-900" type="submit">Gerenciar Canais</Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {calculatePercentages().map((allocation) => (
                            <div key={allocation.platform} className="mb-2 flex items-center">
                                <span className="min-w-40 text-right mr-4">{allocation.platform}</span>
                                <Input
                                    type="text"
                                    value={allocation.formattedAmount}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9,]/g, '').replace(',', '.');
                                        updateAllocation(allocation.platform, Number(value));
                                    }}
                                    className="mr-2"
                                />
                                <span className="w-10 text-right">{Number(allocation.percentage) ? allocation.percentage+'%' : ''}</span>
                            </div>
                        ))}
                        <div className="flex justify-between mt-8">
                            <p><strong>Total Distribuído:</strong> R$ {calculateTotalAllocation().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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
                                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                                const percentage = ((value / total) * 100).toFixed(1);
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
            />}
            <GeneralModal
                onClose={() => setIsGeneralModalOpen(false)}
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