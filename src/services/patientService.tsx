import {isAxiosError} from 'axios';
import apiClient from "@/lib/interceptor.ts";
import {DadosPaciente} from "@/components/RegisterPatient.tsx";

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
export const listPatientsByTenant = async (tenantId: number) => {
    try {
        return await apiClient.get('admin/patients', {
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