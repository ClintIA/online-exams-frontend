import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://online-exams-backend.vercel.app/auth',
});
const errorHandler = (errorHandle: any) => {
    if (errorHandle.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        new Error(`Error ${errorHandle.response.status}: ${errorHandle.response.data.message || 'An error occurred'}`)
    } else if (errorHandle.request) {
        // The request was made but no response was received
        new Error('No response received from the server')
    } else {
        // Something happened in setting up the request that triggered an Error
        new Error(`Error: ${errorHandle.message}`)
    }
}
export const loginAdmin = async (email: string, password: string) => {
    try {
        const data = {
            email: email,
            password: password,
        }
        const response = await apiClient.post('/login/admin', data)

        return response.data
        } catch (error) {
        errorHandler(error)
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
        errorHandler(error)
    }
};