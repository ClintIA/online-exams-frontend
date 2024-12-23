import {isAxiosError} from 'axios';
import {ILoginAdmin} from "@/types/Auth.ts";
import {DadosPaciente} from "@/components/AdminPatient/RegisterPatient.tsx";
import apiClient from "@/lib/interceptor.ts";


export const loginService = async (user: string, password: string): Promise<ILoginAdmin | undefined> => {
    try {
        const data = {
            user: user,
            password: password
        }
        if(user.includes('@')) {
            data.user = user
        } else {
            data.user = user.replace(/\D/g, '')
        }


        const response = await apiClient.post('auth/login', data);
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