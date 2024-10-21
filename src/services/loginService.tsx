import axios, {isAxiosError} from 'axios';
import {ILoginAdmin} from "@/types/Auth.ts";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/auth',
});

export const loginAdmin = async (email: string, password: string): Promise<ILoginAdmin | undefined> => {
     try {
             const data = {
                 email: email,
                 password: password,
             }
             const response = await apiClient.post('/login/admin', data);
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
        const response = await apiClient.post('/login/patient', data);
        return response.data;
    } catch (error) {
        if(isAxiosError(error)) {
            return error.response?.data
        }
    }
};