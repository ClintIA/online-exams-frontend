import {isAxiosError} from 'axios';
import apiClient from "@/lib/interceptor.ts";
import {IExam} from "@/components/AdminTenantExam/ModalTenantExamRender.tsx";

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

export const listDoctorByExam = async (tenantId:  number,examName: string)=> {
    try {
        return await apiClient.get(`admin/exam`,{
            params: {
                examName: examName
            },
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

export const createExam = async (examName: IExam,tenantId:  number) => {
    try {
        return await apiClient.post('admin/tenantexam', examName, {
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

export const updateExam = async (examName: IExam,tenantId:  number) => {
    try {
        return await apiClient.put(`admin/tenantexam/${examName.id}`, examName, {
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

export const deleteExam = async (clinicExamId: number, tenantId:  number) => {
    try {
        return await apiClient.delete(`admin/tenantexam/${clinicExamId}`, {
            headers: {
                'x-tenant-id': tenantId
            }
        })
    } catch(error) {
        if(isAxiosError(error)) {
            return error.response?.data
        }
    }
}