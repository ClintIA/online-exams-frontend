import { Button } from "@/components/ui/button.tsx"
import { Calendar } from "@/components/ui/calendar.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx"
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { BarChart3, CalendarIcon } from 'lucide-react'
import React, { useState} from 'react'
import { DateRange } from 'react-day-picker'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const AdminDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [selectedFilter, setSelectedFilter] = useState('hoje')
  const [isCustomDateOpen, setIsCustomDateOpen] = useState(false)


  const filterOptions = [
    {
      name: 'hoje',
      disabled: false
    },
    {
      name: 'ontem',
      disabled: false
    },
    {
      name: '7dias',
      disabled: false
    },
    {
      name: '30dias',
      disabled: false
    },
    {
      name: 'personalizado',
      disabled: false
    },
  ]

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter)
    if (filter === 'personalizado') {
      setIsCustomDateOpen(true)
    } else {
      setIsCustomDateOpen(false)
      const today = new Date()
      switch (filter) {
        case 'hoje':
          setDateRange({ from: today, to: today })
          break
        case 'ontem':
          {
            const yesterday = new Date(today)
            yesterday.setDate(yesterday.getDate() - 1)
            setDateRange({ from: yesterday, to: yesterday })
            break
          }
        case '7dias':
          {
            const sevenDaysAgo = new Date(today)
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
            setDateRange({ from: sevenDaysAgo, to: today })
            break
          }
        case '30dias':
          {
            const thirtyDaysAgo = new Date(today)
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
            setDateRange({ from: thirtyDaysAgo, to: today })
            break
          }
      }
    }
  }
  const examData = {
    agendado: 15,
    pendente: 8,
    concluido: 22,
    total: 45
  }

  const chartData = [
    { name: 'Seg', agendado: 4, pendente: 3, concluido: 5 },
    { name: 'Ter', agendado: 3, pendente: 2, concluido: 6 },
    { name: 'Qua', agendado: 5, pendente: 1, concluido: 4 },
    { name: 'Qui', agendado: 2, pendente: 4, concluido: 3 },
    { name: 'Sex', agendado: 3, pendente: 2, concluido: 5 },
    { name: 'Sáb', agendado: 1, pendente: 1, concluido: 2 },
    { name: 'Dom', agendado: 0, pendente: 0, concluido: 1 },
  ]

  const recentExams = [
    { id: 1, paciente: 'João Silva', exame: 'Hemograma', data: '2024-03-20', status: 'Agendado' },
    { id: 2, paciente: 'Maria Santos', exame: 'Raio-X', data: '2024-03-19', status: 'Concluído' },
    { id: 3, paciente: 'Pedro Oliveira', exame: 'Eletrocardiograma', data: '2024-03-18', status: 'Pendente' },
    { id: 4, paciente: 'Ana Rodrigues', exame: 'Ultrassom', data: '2024-03-17', status: 'Concluído' },
    { id: 5, paciente: 'Carlos Ferreira', exame: 'Ressonância Magnética', data: '2024-03-16', status: 'Agendado' },
  ]

  return (
      <div className="w-full max-w-6xl p-4 mx-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Dashboard de Exames</h1>

          <div className="flex flex-wrap space-x-2 mb-4">
            {filterOptions.filter(option => !option.disabled).map(option => option.name).map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                onClick={() => handleFilterClick(filter)}
              >
                {filter === 'hoje' && 'Hoje'}
                {filter === 'ontem' && 'Ontem'}
                {filter === '7dias' && 'Últimos 7 dias'}
                {filter === '30dias' && 'Últimos 30 dias'}
                {filter === 'personalizado' && (
                  <>
                    Personalizado
                    {selectedFilter === 'personalizado' && dateRange?.from && dateRange?.to && (
                      <span className="ml-2">
                        ({format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })} - {format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })})
                      </span>
                    )}
                  </>
                )}
              </Button>
            ))}
          </div>

          {selectedFilter === 'personalizado' && (
            <Popover open={isCustomDateOpen} onOpenChange={setIsCustomDateOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" onClick={() => setIsCustomDateOpen(true)}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from && dateRange?.to ? (
                    <>
                      {format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                      {format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}
                    </>
                  ) : (
                    <span>Selecione um período</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={(newDateRange) => {
                    setDateRange(newDateRange)
                    if (newDateRange?.to) {
                      setIsCustomDateOpen(false)
                    }
                  }}
                  numberOfMonths={2}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Exames Agendados</CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{examData.agendado}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Exames Pendentes</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{examData.pendente}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Exames Concluídos</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{examData.concluido}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Exames</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{examData.total}</div>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de linha */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Tendência de Exames</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="agendado" stroke="#8884d8" />
                  <Line type="monotone" dataKey="pendente" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="concluido" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Tabela de exames recentes */}
          <Card>
            <CardHeader>
              <CardTitle>Exames Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Exame</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell>{exam.id}</TableCell>
                      <TableCell>{exam.paciente}</TableCell>
                      <TableCell>{exam.exame}</TableCell>
                      <TableCell>{exam.data}</TableCell>
                      <TableCell>{exam.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}

export default AdminDashboard;