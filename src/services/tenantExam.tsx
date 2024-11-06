import {isAxiosError} from 'axios';
import apiClient from "@/lib/interceptor.ts";

export const listTenantExam = async (tenantId:  number)=> {
    try {
        return await apiClient.get('admin/tenantexam/',{
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