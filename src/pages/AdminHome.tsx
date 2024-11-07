import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/auth"
import { listDoctors } from "@/services/doctorsSerivce"
import { createNoticeCard, deleteNoticeCard, listNoticeCards } from "@/services/noticeCardService"
import { listPatientExams } from "@/services/patientExamService"
import { ITokenPayload } from "@/types/Auth"
import { format, formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { jwtDecode } from "jwt-decode"
import { ChevronLeft, ChevronRight, Plus, Search, X } from "lucide-react"
import { useEffect, useState } from "react"

interface IDoctor {
  id: number
  fullName: string
  email: string
  CRM: string
  phone: string
}

interface IPatientExam {
  id: number
  link: string | null
  createdAt: string
  examDate: string
  uploadedAt: string | null
  status: string
  exam: {
    id: number
    exam_name: string
  }
}

interface INoticeCard {
  id: number
  message: string
  createdBy: {
    id: number
    fullName: string
  }
  date: string
}

export default function AdminHome() {
  const [notices, setNotices] = useState<INoticeCard[]>([])
  const [tenantId, setTenantID] = useState<number | undefined>()
  const [userId, setUserID] = useState<number | undefined>()
  const [newNotice, setNewNotice] = useState("")
  const [currentDoctorPage, setCurrentDoctorPage] = useState(1)
  const [currentExamPage, setCurrentExamPage] = useState(1)
  const examsPerPage = 12
  const [doctors, setDoctors] = useState<IDoctor[]>([])
  const [doctorsPagination, setDoctorsPagination] = useState({ total: 0, page: 1, take: 5, skip: 0, remaining: 0 })
  const [exams, setExams] = useState<IPatientExam[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)

  const auth = useAuth()

  useEffect(() => {
    const getTenant = () => {
      if (auth?.token) {
        const decoded: ITokenPayload = jwtDecode(auth.token?.toString())
        setTenantID(decoded.tenantId)
        setUserID(decoded.userId)
      }
    }
    getTenant()
  }, [auth.token])
  
  useEffect(() => {
    const fetchDoctors = async (page: number) => {
      try {
        if (tenantId) {
          const result = await listDoctors(tenantId, page, doctorsPagination.take)
          if (result?.data.status === "success") {
            const doctorsList = result?.data?.data?.data as IDoctor[]
            setDoctors(doctorsList || [])
            setDoctorsPagination(result.data?.data?.pagination)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchDoctors(currentDoctorPage)
  }, [tenantId, currentDoctorPage, doctorsPagination.take]);

  useEffect(() => {
    const fetchPatientExams = async () => {
      try {
        if (tenantId) {
          const today = new Date().toISOString()
          const result = await listPatientExams(tenantId, {
            startDate: today,
            endDate: today,
          })
          if (result?.data?.status === "success") {
            const examsList = result?.data?.data?.exames[0]?.patientExams as IPatientExam[]
            setExams(examsList || [])
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchPatientExams()
  }, [tenantId]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        if (tenantId) {
          const result = await listNoticeCards(tenantId, {})
          if (result?.data?.status === "success") {
            setNotices(result.data.data || [])
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchNotices()
  }, [tenantId])

  const indexOfLastExam = currentExamPage * examsPerPage

  const addNotice = async () => {
    if (newNotice.trim() && tenantId && userId) {
      try {
        const noticeData = {
          message: newNotice,
          createdBy: userId,
          date: new Date().toISOString()
        }
        const filters = {
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString()
        }
        const result = await createNoticeCard(noticeData, tenantId)
        if (result?.data?.status === "success") {
          const updatedNotices = await listNoticeCards(tenantId, filters)
          setNotices(updatedNotices.data.data || [])
          setNewNotice("")
          setDialogOpen(false)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const removeNotice = async (id: number) => {
    try {
      if (tenantId) {
        const result = await deleteNoticeCard(tenantId, id)
        if (result?.data?.status === "success") {
          const updatedNotices = await listNoticeCards(tenantId, {})
          setNotices(updatedNotices.data.data || [])
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const totalPages = Math.ceil(doctorsPagination.total / doctorsPagination.take);

  return (
    <div className="flex flex-col min-h-screen bg-background w-[90%] mx-auto">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-end mt-2">
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
                <span className="sr-only">Buscar Paciente</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle>Buscar Paciente</DialogTitle>
              </DialogHeader>
              <Input className="w-full" placeholder="Digite o nome ou CPF do paciente" />
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Corpo clínico</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentDoctorPage(currentDoctorPage > 1 ? currentDoctorPage - 1 : 1)}
                    disabled={currentDoctorPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span>{currentDoctorPage}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentDoctorPage(currentDoctorPage < totalPages ? currentDoctorPage + 1 : currentDoctorPage)}
                    disabled={currentDoctorPage >= totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.isArray(doctors) ? (
                    doctors.map((doctor) => (
                      <div key={doctor.id} className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{doctor.fullName}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Não há corpo clínico cadastrado</p>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Mural de Avisos</CardTitle>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setDialogOpen(true)}>
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Adicionar Aviso</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                      <DialogTitle>Adicionar Aviso</DialogTitle>
                    </DialogHeader>
                    <Input
                      value={newNotice}
                      onChange={(e) => setNewNotice(e.target.value)}
                      placeholder="Digite o novo aviso"
                    />
                    <Button onClick={addNotice}>Adicionar</Button>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {notices.map((notice) => (
                    <li key={notice.id} className="flex justify-between items-center bg-muted p-3 rounded-lg">
                      <span className="flex-1">{notice.message}</span>
                      {notice.createdBy.id !== userId && (
                        <Button variant="ghost" size="icon" onClick={() => removeNotice(notice.id)} className="h-3">
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remover Aviso</span>
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Próximos Exames ({format(new Date(), "dd/MM/yyyy", { locale: ptBR })})</CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentExamPage(currentExamPage > 1 ? currentExamPage - 1 : 1)}
                  disabled={currentExamPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span>{currentExamPage}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentExamPage(indexOfLastExam < exams.length ? currentExamPage + 1 : currentExamPage)}
                  disabled={indexOfLastExam >= exams.length}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {exams.length > 0 ? (
                  exams.map((exam) => (
                    <div key={exam.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">Está faltando</p>
                        <p className="text-sm text-muted-foreground">{exam.exam.exam_name}</p>
                      </div>
                      <span className="text-sm font-medium">{formatDate(exam.examDate, 'HH:mm')}</span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex items-center justify-center h-40">
                    <p className="text-center">Não há exames agendados para hoje</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}