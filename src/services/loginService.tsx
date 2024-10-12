import axios from 'axios';
import {ILoginAdmin} from "@/types/Auth.ts";

const apiClient = axios.create({
    baseURL: 'https://online-exams-backend.vercel.app/auth',
});

export const loginAdmin = async (email: string, password: string): Promise<ILoginAdmin | undefined> => {
    try {
        const data = {
            email: email,
            password: password,
        }
         return await apiClient.post<ILoginAdmin>('/login/admin', data)
             .catch((result) => {
           return result.response.data;
        })

        } catch (error) {

        new Error(error instanceof Error ? error.message : 'Não possível realizar login')

    }
};

export const loginPatient = async (patientCpf: string): Promise<ILoginAdmin | undefined> => {
    try {
        const data = {
            cpf: patientCpf,
        }
        return await apiClient.post<ILoginAdmin>('/login/patient', data)
            .catch((result) => {
            return result.response.data;
        });
    } catch (error) {
        new Error(error instanceof Error ? error.message : 'Não possível realizar login')
    }
};