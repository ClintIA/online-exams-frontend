import apiClient from "@/lib/interceptor.ts";
import {isAxiosError} from 'axios';
import {IAdmin} from "@/types/dto/Admin.ts";

export const listAdmins = async (tenantId: number, page?: number, perPage?: number) => {
    try {
        return await apiClient.get('admin/', {
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
export const registerAdmin = async (adminData: IAdmin, tenantId:  number) => {

    try {
        return await apiClient.post('admin/', adminData, {
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
export const updateAdmin = async (adminData: IAdmin, tenantId:  number) => {

    try {
        return await apiClient.put(`admin/${adminData.id}`, adminData, {
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
export const deleteAdmin = async (deleteId: number, tenantId: number) => {
    try {
        return await apiClient.delete(`admin/${deleteId}`, {
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