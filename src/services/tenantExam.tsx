import {isAxiosError} from 'axios';
import apiClient from "@/lib/interceptor.ts";

export const listTenantExam = async (tenantId:  number)=> {
    try {
        return await apiClient.get('clinicexams/',{
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

export const listDoctorByExam = async (tenantId:  number,examName: string)=> {
    try {
        return await apiClient.get(`admin/exam?examName=${examName}`,{
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