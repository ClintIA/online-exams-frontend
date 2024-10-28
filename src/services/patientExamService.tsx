import {isAxiosError} from 'axios';
import {DadosBooking} from "@/components/Booking.tsx";
import apiClient from "@/lib/interceptor.ts";


export const registerPatientExam = async (dadosBooking: DadosBooking, tenantId: number) => {

    try {
        return await apiClient.post('patientExams', dadosBooking,{
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