import axios, {isAxiosError} from 'axios';
import {ILoginAdmin} from "@/types/Auth.ts";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/auth',
});

export const loginAdmin = async (email: string, password: string): Promise<any> => {
     try {
             const data = {
                 email: email,
                 password: password,
             }
             const response = await apiClient.post('/login/admin', data);
             console.log(response.data)
             return response.data;
         } catch (error) {
         if(isAxiosError(error)) {
             return error.response?.data
         } else {
             return 'Erro ao realizar login'
         }
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