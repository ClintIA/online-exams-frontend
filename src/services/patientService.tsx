import {isAxiosError} from 'axios';
import apiClient from "@/lib/interceptor.ts";
import {DadosPaciente} from "@/components/RegisterPatient.tsx";

export interface PatientFilters {
    patientCpf?: string
    patientName?: string
}
export const getPatientByCpfAndTenant = async (cpf: string, tenantId: number) => {
    const data = {
        cpf: cpf,
    }
    try {
       return await apiClient.post('patient/cpf', data,{
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
export const listPatientsByTenant = async (tenantId: number, filters?: PatientFilters) => {

    try {
        return await apiClient.get('admin/patients', {
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

export const updatePatient = async (patientData: DadosPaciente, tenantId: number) => {
    try {
        return await apiClient.put('admin/patient',patientData,{
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
export const deletePatient = async (patientId: number, tenantId: number) => {
    try {
        return await apiClient.delete(`admin/patient/${patientId}`,{
            headers: {
                'x-tenant-id': tenantId
            }
        })
    }  catch (error) {
        if(isAxiosError(error)) {
            return error.response?.data
        }
    }
}