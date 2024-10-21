import { ILoginAdmin } from "@/types/Auth.ts";
import { GetPatientExamsFilters } from '@/types/PatientExams';
import axios, { isAxiosError } from 'axios';
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: 'https://online-exams-backend.vercel.app'
});

export const getPatientExams = async (filters: GetPatientExamsFilters): Promise<ILoginAdmin | undefined> => {
  const token = Cookies.get('token');
  const cookieUser = Cookies.get('user');
  const user = cookieUser ? JSON.parse(cookieUser) : null;
  console.log('user', user)
  console.log('token', token)
  try {
    const response = await apiClient.get('patientExams', { params: filters, headers: { Authorization: `Bearer ${token}`, 'x-tenant-id': user.tenantId } });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data
    }
  }
};
