import apiClient from "@/lib/interceptor.ts";
import {IMarketing} from "@/components/AdminMarketing/RegisterCanal.tsx";

export const listCanalMarketing = async (tenantID: number) => {
    return await apiClient.get('admin/marketing/canal', {
        headers: {
            'x-tenant-id': tenantID
        }
    })
}

export const getBudgetCanal = async(tenantID: number ) => {
    return await apiClient.get('/admin/marketing/tenantBudget', {
        headers: {
            'x-tenant-id': tenantID
        }
    })
}
export const updateBudgetCanal = async (budget: number,tenantID: number) => {
    return await apiClient.put('/admin/marketing/tenantBudget', {
        budget: budget
    }, {
        headers: {
            'x-tenant-id': tenantID
        }
    })
}
export const registerCanalMarketing = async(canal: IMarketing, tenantID: number) => {
    return await apiClient.post('admin/marketing/canal', canal, {
        headers: {
            'x-tenant-id': tenantID
        }
    })
}
export const updateCanalMarketing = async(canal: IMarketing, tenantID: number) => {
    return await apiClient.put('admin/marketing/canal', canal, {
        headers: {
            'x-tenant-id': tenantID
        }
    })
}