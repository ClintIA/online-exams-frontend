import apiClient from "@/lib/interceptor.ts";
import {isAxiosError} from "axios";
import {LeadRegisterDTO} from "@/components/AdminLeadRegister/LeadRegister.tsx";

export const createRegisterLead = async (leadRegister: LeadRegisterDTO, tenantId:  number) => {

    try {
        return await apiClient.post('/admin/lead-register', leadRegister , {
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