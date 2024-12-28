import apiClient from "@/lib/interceptor.ts";

export const listCanalMarketing = async (tenantId: number) => {
    return await apiClient.get('admin/marketing/canal', {
        headers: {
            'x-tenant-id': tenantId
        }
    })
}