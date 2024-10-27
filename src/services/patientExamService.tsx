import { DadosBooking } from "@/components/Booking.tsx";
import apiClient from "@/lib/interceptor.ts";
import { isAxiosError } from 'axios';

interface ListPatientExamsFilters {
    startDate?: string
    endDate?: string
    patientCpf?: string
    status?: string
    patientName?: string
}

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

export const listPatientExams = async (tenantId: number, filters: ListPatientExamsFilters)=> {
    try {
        return await apiClient.get('patientExams', {
            headers: {
                'x-tenant-id': tenantId
            },
            params: filters
        })
    } catch (error) {
        if(isAxiosError(error)) {
            return error.response?.data
        }
    }
}