import {Button} from "@/components/ui/button.tsx"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx"
import {Input} from "@/components/ui/input.tsx"
import {useAuth} from "@/hooks/auth.tsx"
import {listDoctors} from "@/services/adminsService.tsx"
import {createNoticeCard, deleteNoticeCard, listNoticeCards} from "@/services/noticeCardService.tsx"
import {listPatientExams} from "@/services/patientExamService.tsx"
import {format} from "date-fns"
import {ptBR} from "date-fns/locale"
import {ChevronLeft, ChevronRight, Plus, X} from "lucide-react"
import React, {useCallback, useEffect, useState} from "react"
import CardDoctor from "@/components/AdminHome/CardDoctor.tsx";
import {createDate} from "@/lib/utils.ts";
import {IAdmin} from "@/types/dto/Admin.ts";

export interface IPatientExam {
  id: number
  link: string | null
  createdAt: string
  examDate: string
  uploadedAt: string | null
  status: string
  attended: boolean
  exam: {
    id: number
    exam_name: string
  },
  patient?: {
    id: number
    full_name: string
  }
  doctor?: {
    id: number
    fullName: string
    CRM: string
    phone: string
    email: string
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

const AdminHome: React.FC = () => {
  const [notices, setNotices] = useState<INoticeCard[]>([])
  const [newNotice, setNewNotice] = useState("")
  const [currentDoctorPage, setCurrentDoctorPage] = useState(1)
  const [currentExamPage, setCurrentExamPage] = useState(1)
  const examsPerPage = 12
  const [doctors, setDoctors] = useState<IAdmin[]>([])
  const [doctorsPagination, setDoctorsPagination] = useState({ total: 0, page: 1, take: 5, skip: 0, remaining: 0 })
  const [exams, setExams] = useState<IPatientExam[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)

  const auth = useAuth()

  
  useEffect(() => {
    const fetchDoctors = async (page: number) => {
      try {
        if (auth.tenantId) {
          const result = await listDoctors(auth.tenantId, page, doctorsPagination.take)
          if (result?.data.status === "success") {
            const doctorsList = result?.data?.data?.data as IAdmin[]
            setDoctors(doctorsList || [])
            setDoctorsPagination(result.data?.data?.pagination)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchDoctors(currentDoctorPage).then()
  }, [auth.tenantId, currentDoctorPage, doctorsPagination.take]);

  useEffect(() => {
    const fetchPatientExams = async () => {
      try {
        if (auth.tenantId) {
          const today = new Date().toLocaleDateString()
          const result = await listPatientExams(auth.tenantId, {
            startDate: createDate(today),
            endDate: createDate(today),
            status: 'Scheduled'
          })
          if (result?.data?.status === "success") {

            const examsList = result?.data?.data?.exams as IPatientExam[]
            setExams(examsList || [])
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchPatientExams().then()
  }, [auth.tenantId]);
  const fetchNotices = useCallback(async () => {
    try {
      if (auth.tenantId) {
        const result = await listNoticeCards(auth.tenantId, {})
        if (result?.data?.status === "success") {
          setNotices(result.data.data || [])
        }
      }
    } catch (error) {
      console.error(error)
    }
  }, [auth.tenantId])
  useEffect(() => {
    fetchNotices().then()
  }, [fetchNotices])

  const indexOfLastExam = currentExamPage * examsPerPage

  const addNotice = async () => {
    if (newNotice.trim() && auth.tenantId && auth.userId) {
      try {
        const noticeData = {
          message: newNotice,
          createdBy: auth.userId,
          date: new Date().toISOString()
        }
        const filters = {
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString()
        }
        const result = await createNoticeCard(noticeData, auth.tenantId)
        if (result?.data?.status === "success") {
          const updatedNotices = await listNoticeCards(auth.tenantId, filters)
          setNotices(updatedNotices.data.data || [])
          setNewNotice("")
          setDialogOpen(false)
          fetchNotices().then()
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const removeNotice = async (id: number) => {
    try {
      if (auth.tenantId) {
        const result = await deleteNoticeCard(auth.tenantId, id)
        if (result?.data?.status === "success") {
          const updatedNotices = await listNoticeCards(auth.tenantId, {})
          setNotices(updatedNotices.data.data || [])
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const totalPages = Math.ceil(doctorsPagination.total / doctorsPagination.take);

  return (
    <div className="w-full max-w-full min-h-screen overflow-x-hidden mx-auto">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-end mt-[2px]">
        <div className="flex items-center space-x-2">
          <Button
                  className="bg-oxfordBlue text-white hover:bg-blue-900" type="submit">Cadastrar
            Paciente</Button>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
        <div className="max-w-full mx-auto space-y-6">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>MÉDICOS ATENDENDO HOJE</CardTitle>
                <div className="flex items-center">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Array.isArray(doctors) ? (
                    doctors.map((doctor) => (
                      <CardDoctor especialidade={doctor.fullName} nome={doctor.fullName} crm={doctor?.fullName} contato={doctor.phone} />
                    ))
                  ) : (
                    <p>Não há médicos agendados para hoje</p>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>MURAL DE AVISOS</CardTitle>
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
                      {notice.createdBy.id !== auth.userId && (
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
              <CardTitle>PRÓXIMOS AGENDAMENTOS ({format(new Date(), "dd/MM/yyyy", { locale: ptBR })})</CardTitle>
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
                        <p className="font-medium">Paciente: <strong>{exam?.patient?.full_name}</strong></p>
                        <p className="text-sm text-muted-foreground"><strong>{exam.exam.exam_name}</strong></p>
                      </div>
                      <span className="text-sm font-medium"><strong>{new Date(exam?.examDate).toISOString().substring(11, 16)}</strong></span>
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
export default AdminHome;