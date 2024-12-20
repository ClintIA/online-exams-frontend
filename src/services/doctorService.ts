import apiClient from "@/lib/interceptor.ts";
import {isAxiosError} from "axios";
import {IDoctor} from "@/components/AdminDoctor/RegisterDoctor.tsx";

export const registerDoctor = async (doctorData: IDoctor, tenantId:  number) => {

    try {
        return await apiClient.post('admin/doctors/', doctorData, {
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
export const updateDoctor = async (doctorData: IDoctor, tenantId:  number) => {

    try {
        return await apiClient.put(`admin/doctors/${doctorData.id}`, doctorData, {
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
export const deleteDoctor = async (doctorID: number, tenantId: number) => {

    try {
        return await apiClient.delete(`admin/doctors/${doctorID}`, {
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