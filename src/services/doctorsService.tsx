import apiClient from "@/lib/interceptor.ts";
import {isAxiosError} from 'axios';
import {IAdmin} from "@/pages/admin/AdminHome.tsx";

export const listDoctors = async (tenantId: number, page?: number, perPage?: number) => {
    try {
        return await apiClient.get('admin/doctors/', {
            headers: {
                'x-tenant-id': tenantId
            },
            params: {
                page: page,
                take: perPage || 10
            }
        })
    } catch (error) {
        if (isAxiosError(error)) {
            return error.response?.data
        }
    }
}
export const registerAdminDoctor = async (adminData: IAdmin, tenantId:  number) => {
    const newDoctor = {...adminData, isDoctor: true}

    try {
        return await apiClient.post('admin/register', newDoctor, {
            headers: {
                'x-tenant-id': tenantId
            }
        })

    } catch (error) {
        if (isAxiosError(error)) {
            return error.response?.data
        }
    }
}
export const updateAdminDoctor = async (adminData: IAdmin, tenantId:  number) => {
    const newDoctor = {...adminData, isDoctor: true}
    try {
        return await apiClient.put(`admin/update/${adminData.id}`, newDoctor, {
            headers: {
                'x-tenant-id': tenantId
            }
        })

    } catch (error) {
        if (isAxiosError(error)) {
            return error.response?.data
        }
    }
}
export const deleteDoctor = async (deleteId:number, tenantId: number) => {
    try {
        return await apiClient.delete(`admin/delete/${deleteId}`, {
            headers: {
                'x-tenant-id': tenantId
            }
        })
      } catch (error) {
        if (isAxiosError(error)) {
        return error.response?.data
     }
    }
}