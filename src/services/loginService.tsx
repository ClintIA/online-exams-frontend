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

export const loginPatient = async (patientCpf: string, password: string): Promise<ILoginAdmin | undefined> => {
    try {
        const data = {
            cpf: patientCpf,
            password: password
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
    let data;
    if(patientData.cpf) {
        data =  {...patientData, cpf: patientData.cpf.replace(/\D/g, '')};
    }
    try {
        return await apiClient.post('admin/register/patient', data,{
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