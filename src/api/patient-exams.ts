import {apiClient} from '../lib/interceptor'

export interface Exam {
  id: number
  exam_name: string
}

export interface PatientExam {
  id: number
  link: string | null
  createdAt: string
  examDate: string
  uploadedAt: string | null
  status: string
  exam: Exam
}

export interface Tenant {
  id: number
  name: string
  patientExams: PatientExam[]
}

export interface GetPatientExamsResponse {
  status: string
  message: string
  data: {
    tenant: Tenant[]
  }
}

export async function getPatientExams(patientId: number) {
    const response = await apiClient.get(`/patient/exams`, {
        headers: {
          'x-patient-id': patientId,
        },

      });
    return response.data;
  }

  // export async function getPatientExams(patientId: number): Promise<GetPatientExamsResponse> {
  //   // Dados mockados
  //   const mockResponse: GetPatientExamsResponse = {
  //     status: "success",
  //     message: "Exames listados com sucesso",
  //     data: {
  //       tenant: [
  //         {
  //           id: 1,
  //           name: "Clinica A",
  //           patientExams: [
  //             {
  //               id: 1,
  //               link: null,
  //               createdAt: "2024-10-26T16:02:15.373Z",
  //               examDate: "2024-10-26T00:00:00.000Z",
  //               uploadedAt: null,
  //               status: "Scheduled",
  //               exam: {
  //                 id: 3,
  //                 exam_name: "Exame de Sangue"
  //               }
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   };
  
  //   // Retorna a resposta mockada
  //   return mockResponse;
  // }