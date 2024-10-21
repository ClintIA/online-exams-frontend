import AdminSidebar from "@/components/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { normalizeFileName } from "@/lib/utils"
import { getPatientExams } from "@/services/patientExams"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import MenuIcon from '@mui/icons-material/Menu'
import { format } from "date-fns"
import { useEffect, useState } from "react"

interface Exam {
  id: number
  description: string
  url: string
  creationDate: Date
  patientCPF: string
}

const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: '',
    secretAccessKey: '',
  },
})

export function AdminExamsList() {
  const [exams, setExams] = useState<Exam[]>([])
  const [newExam, setNewExam] = useState<Partial<Exam>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchExams()
  }, [])

  const fetchExams = async () => {
    try {
      const examsData = await getPatientExams({ tenantId: 1 })
      console.log('examsData', examsData)
      // setExams(examsData)
    } catch (error) {
      console.error("Error fetching exams:", error)
    }
  }

  const uploadFileToS3 = async (file: File) => {
    const fileName = normalizeFileName(file.name)
    const params = {
      Bucket: 'clintia-dev',
      Key: `${Date.now()}_${fileName}`,
      Body: file,
      ContentType: file.type,
    }

    try {
      setIsUploading(true)
      const command = new PutObjectCommand(params)
      await s3Client.send(command)
      const url = `https://clintia-dev.s3.us-east-1.amazonaws.com/${params.Key}`
      return url
    } catch (err) {
      console.error("Error uploading file:", err)
      return null
    } finally {
      setIsUploading(false)
    }
  }

  const addExam = async () => {
    if (newExam.description && newExam.patientCPF && newExam.url) {
      setExams([
        ...exams,
        {
          id: exams.length + 1,
          description: newExam.description,
          url: newExam.url,
          creationDate: new Date(),
          patientCPF: newExam.patientCPF,
        },
      ])
      setNewExam({})
      setIsModalOpen(false)
    }
  }

  const editExam = (exam: Exam) => {
    console.log('edit exam:', exam)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const uploadedUrl = await uploadFileToS3(file)

      if (uploadedUrl) {
        setNewExam({ ...newExam, url: uploadedUrl })
      } else {
        console.error('File upload failed')
      }
    }
  }

  const maskCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskCPF(e.target.value)
    setNewExam({ ...newExam, patientCPF: maskedValue })
  }

  return (
    <div className="home flex flex-col md:flex-row">
      <button className="md:hidden text-blue p-4" onClick={() => setMenuOpen(!menuOpen)}>
        <MenuIcon />
      </button>

      <div className={`md:block ${menuOpen ? 'block' : 'hidden'} w-60`}>
        <AdminSidebar />
      </div>

      <div className="content flex-1 ml-0 md:ml-6">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Exames</h1>
          <div className="mb-4">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button>Adicionar novo exame</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar novo exame</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="cpf" className="text-right">
                      CPF do paciente
                    </Label>
                    <Input
                      id="cpf"
                      className="col-span-3"
                      value={newExam.patientCPF || ""}
                      onChange={handleCPFChange}
                      maxLength={14}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Descrição
                    </Label>
                    <Input
                      id="description"
                      className="col-span-3"
                      value={newExam.description || ""}
                      onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="file" className="text-right">
                      Arquivo
                    </Label>
                    <Input
                      id="file"
                      type="file"
                      className="col-span-3"
                      onChange={handleFileChange}
                      disabled={isUploading}
                    />
                  </div>
                </div>
                <Button onClick={addExam} disabled={isUploading}>
                  {isUploading ? 'Enviando...' : 'Adicionar exame'}
                </Button>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CPF do paciente</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Arquivo</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell>{exam.patientCPF}</TableCell>
                  <TableCell>{exam.description}</TableCell>
                  <TableCell>
                    <a href={exam.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Ver exame
                    </a>
                  </TableCell>
                  <TableCell>{format(exam.creationDate, "dd/MM/yyyy HH:mm:ss")}</TableCell>
                  <TableCell>
                    <Button onClick={() => editExam(exam)}>Editar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>

  )
}
