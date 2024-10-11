import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://online-exams-backend.vercel.app/auth',
    timeout: 2000,
});

export const loginAdmin = async (email: string, password: string) => {
    try {
        const data = {
            email: email,
            password: password,
        }
        const response = await apiClient.post('/login/admin', data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const loginPatient = async (patientCpf: string) => {
    try {
        const data = {
            cpf: patientCpf,
        }
        const response = await apiClient.post('/login/patient', data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};