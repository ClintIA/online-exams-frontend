import apiClient from "@/lib/interceptor.ts";
import {isAxiosError} from 'axios';
import {IAdmin} from "@/pages/admin/AdminHome.tsx";

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