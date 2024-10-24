import {isAxiosError} from 'axios';
import {ILoginAdmin} from "@/types/Auth.ts";
import {DadosPaciente} from "@/components/RegisterPatient.tsx";
import apiClient from "@/lib/interceptor.ts";

export const loginAdmin = async (email: string, password: string): Promise<ILoginAdmin | undefined> => {
     try {
             const data = {
                 email: email,
                 password: password,
             }
             const response = await apiClient.post('auth/login/admin', data);
             return response.data;
         } catch (error) {
         if(isAxiosError(error)) {
             return error.response?.data
         }
     }


};

export const loginPatient = async (patientCpf: string): Promise<ILoginAdmin | undefined> => {
    try {
        const data = {
            cpf: patientCpf,
        }
        const response = await apiClient.post('auth/login/patient', data);
        return response.data;
    } catch (error) {
        if(isAxiosError(error)) {
            return error.response?.data
        }
    }
};

export const registerPatient = async (patientData: DadosPaciente, tenantId: number) => {

    try {
        return await apiClient.post('auth/register/patient', patientData,{
            headers: {
                'x-tenant-id': tenantId
            }
        })
    } catch (error) {
        if(isAxiosError(error)) {
            return error.response?.data
        }
    }
};