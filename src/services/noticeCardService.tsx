import apiClient from "@/lib/interceptor.ts";
import { isAxiosError } from 'axios';

interface ListNoticeCardsFilters {
    startDate?: string
    endDate?: string
}

interface NoticeCardData {
    message: string
    createdBy: number
    date: string
}

export const createNoticeCard = async (dadosBooking: NoticeCardData, tenantId: number) => {

    try {
        return await apiClient.post('admin/noticecard', dadosBooking, {
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

export const listNoticeCards = async (tenantId: number, filters: ListNoticeCardsFilters)=> {
    try {
        return await apiClient.get('admin/noticecard', {
            headers: {
                'x-tenant-id': tenantId
            },
            params: filters
        })
    } catch (error) {
        if(isAxiosError(error)) {
            return error.response?.data
        }
    }
}

export const deleteNoticeCard = async (tenantId: number, noticeCardId: number) => {
    try {
        return await apiClient.delete(`admin/noticecard/${noticeCardId}`, {
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