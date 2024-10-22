import axios, {isAxiosError} from 'axios';
import {ILoginAdmin} from "@/types/Auth.ts";
import {DadosPaciente} from "@/components/RegisterPatient.tsx";

const apiAuth = axios.create({
    baseURL: 'http://localhost:3000/auth',
});

export const loginAdmin = async (email: string, password: string): Promise<ILoginAdmin | undefined> => {
     try {
             const data = {
                 email: email,
                 password: password,
             }
             const response = await apiAuth.post('/login/admin', data);
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
        const response = await apiAuth.post('/login/patient', data);
        return response.data;
    } catch (error) {
        if(isAxiosError(error)) {
            return error.response?.data
        }
    }
};

export const registerPatient = async (patientData: DadosPaciente, tenantId: number) => {

    try {
        return await apiAuth.post('/register/patient', patientData,{
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