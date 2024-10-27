import apiClient from "@/lib/interceptor.ts";
import { isAxiosError } from 'axios';

export const listDoctors = async (tenantId: number, page: number, perPage?: number) => {
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