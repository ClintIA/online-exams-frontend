import React from "react";

export interface GetPatientExamsResponse {
    status: string
    message: string
    data?: {
      tenant?: Tenant[]
    }
}

export type IPatientContextType = {
    getPatientExams: (patientId: number) => Promise<GetPatientExamsResponse | undefined>;

}

export interface Tenant {
    id: number
    name: string
    patientExams: PatientExam[]
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

export interface Exam {
    id: number
    exam_name: string
}

export type Props = {
    children?: React.ReactNode;
};
  

  

  
