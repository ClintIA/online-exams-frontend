import {isAxiosError} from 'axios';
import apiClient from "@/lib/interceptor.ts";
import { GetPatientExamsResponse } from '../types/Patient.ts';

export const getPatientByCpfAndTenant = async (cpf: string, tenantId: number) => {
    const data = {
        cpf: cpf,
    }
    try {
       return await apiClient.post('patient/cpf', data,{
           headers: {
               'x-tenant-id': tenantId
           }
       })
    } catch (error) {
        if(isAxiosError(error)) {
            return error.response?.data
        }
    }
}

export const patientExams = async(patientId: number): Promise<GetPatientExamsResponse | undefined> => {
    try{
        const response = await apiClient.get(`/patientExams`, {
            params: { patientId },

        });
        return response.data;

    } catch (error) {
        if(isAxiosError(error)) {
            return error.response?.data
        }
    }
};