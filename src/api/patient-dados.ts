import {apiClient} from '../lib/interceptor';

export interface Tenant {
  id: number;
  name: string;
  domain: string;
  created_at: string;
  uploadUsage: number;
}

export interface PatientData {
  id: number;
  full_name: string;
  cpf: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  health_card_number: string;
  exams: string | null;
  sessionToken: string;
  created_at: string;
  tenants: Tenant[];
}

export interface GetPatientDataResponse {
    status: string;
    message: string;
    data: PatientData;
}

export async function getPatientData(patientId: number, cpf: string) {
  const response = await apiClient.get<GetPatientDataResponse>(`/patient/cpf`, {
    params: { cpf },
    headers: {
      'x-patient-id': patientId,
    },

  });
return response.data;
}
