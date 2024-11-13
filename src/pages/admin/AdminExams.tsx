import { Button } from "@/components/ui/button.tsx"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx"
import { useAuth } from "@/hooks/auth.tsx"
import { listPatientExams, updatePatientExam } from "@/services/patientExamService.tsx"
import { ITokenPayload } from "@/types/Auth.ts"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { jwtDecode } from "jwt-decode"
import { FileUp, Upload } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface IPatientExam {
  id: number
  link: string | null
  patient: string
  createdAt: string
  examDate: string
  uploadedAt: string | null
  status: string
  exam: {
    id: number
    exam_name: string
  }
}

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  }
});

const AdminExams: React.FC = () =>  {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [exams, setExams] = useState<IPatientExam[]>([])
  const [tenantId, setTenantId] = useState<number>()
  const auth = useAuth()
  const [isUploading, setIsUploading] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);

  useEffect(() => {
    if (auth?.token) {
      const decoded: ITokenPayload = jwtDecode(auth.token?.toString())
      setTenantId(decoded.tenantId)
    }
  }, [auth.token])

  useEffect(() => {
    const fetchExams = async () => {
      if (tenantId) {
        const result = await listPatientExams(tenantId, {})
        if (result?.data?.status === "success") {
          setExams(result.data.data.exames[0].patientExams || [])
        }
      }
    }
    fetchExams()
  }, [tenantId])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0])
    }
  }

  const translateStatus = (status: string) => {
    switch (status) {
      case 'Scheduled': 
        return 'Agendado'
      case 'InProgress': 
        return 'Em progresso'
      case 'Completed':
        return 'Concluído'
      default: 
        return ''
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !selectedExamId || !tenantId) return;
    
    try {
      setIsUploading(true);
      
      const fileKey = `${tenantId}/exams/${Date.now()}-${selectedFile.name}`;
      const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME;
      
      if (!bucketName) {
        throw new Error('Bucket name não configurado');
      }

      await s3Client.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
        Body: selectedFile,
        ContentType: selectedFile.type
      }));

      const fileUrl = `https://${bucketName}.s3.amazonaws.com/${fileKey}`;

      const result = await updatePatientExam(tenantId, selectedExamId, {
        status: 'Completed',
        link: fileUrl
      });

      if (result?.data?.status === "success") {
        toast.success("Arquivo enviado com sucesso!");
        const updatedExams = await listPatientExams(tenantId!, {});
        if (updatedExams?.data?.status === "success") {
          setExams(updatedExams.data.data.exames[0].patientExams || []);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar arquivo");
    } finally {
      setIsUploading(false);
      setIsDialogOpen(false);
      setSelectedFile(null);
      setSelectedExamId(null);
    }
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-5">Exames Pendentes</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Paciente</TableHead>
            <TableHead>Tipo de Exame</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead>Data de Agendamento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams.map((exam) => (
            <TableRow key={exam.id}>
              <TableCell>{exam.patient}</TableCell>
              <TableCell>{exam.exam.exam_name}</TableCell>
              <TableCell>{new Date(exam.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(exam.examDate).toLocaleDateString()}</TableCell>
              <TableCell>{translateStatus(exam.status)}</TableCell>
              <TableCell>
                <Button 
                  onClick={() => {
                    setSelectedExamId(exam.id);
                    setIsDialogOpen(true);
                  }}
                  disabled={exam.status === 'Completed'}
                >
                  <Upload className="mr-2 h-4 w-4" /> Upload
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Upload de Arquivo</DialogTitle>
          </DialogHeader>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <div className="flex flex-col items-center gap-2">
              <FileUp className="w-10 h-10 text-gray-400" />
              {selectedFile ? (
                <p>Arquivo selecionado: {selectedFile.name}</p>
              ) : (
                <p>Arraste um arquivo aqui ou clique para selecionar</p>
              )}
            </div>
          </div>
          <Button 
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? "Enviando..." : "Enviar Arquivo"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default AdminExams;