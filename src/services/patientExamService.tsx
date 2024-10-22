import axios, {isAxiosError} from 'axios';
import {DadosBooking} from "@/components/Booking.tsx";

const apiPatientExam = axios.create({
    baseURL: 'http://localhost:3000/patientExams',
});

export const registerPatientExam = async (dadosBooking: DadosBooking, tenantId: number) => {

    try {
        return await apiPatientExam.post('/registerPatientExam', dadosBooking,{
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