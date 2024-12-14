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
                take: perPage || 100
            }
        })
    } catch (error) {
        if (isAxiosError(error)) {
            return error.response?.data
        }
    }
}
export const registerAdmin = async (adminData: IAdmin, tenantId:  number,isDoctor: boolean) => {
    const data = {
        adminData: {...adminData, isDoctor: isDoctor},
        exams: adminData.examsIDs
    }
    delete data.adminData.examsIDs

    try {
        return await apiClient.post('admin/register', data, {
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
export const updateAdmin = async (adminData: IAdmin, tenantId:  number,isDoctor: boolean) => {
    const newAdmin = {...adminData, isDoctor: isDoctor}

    try {
        return await apiClient.put(`admin/update/${adminData.id}`, newAdmin, {
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

export const listAdmins = async (tenantId: number) => {
    try {
        return await apiClient.get('admin/', {
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