import { axiosInstance } from "../axios-instance"

// 공지사항 3개 조회
export const getOwnerDashboardNotices = async() =>{
    try {
        const response = await axiosInstance.get('/owner/dashboard/notices/preview')
        if (response.data.isSuccess) {
            return response.data.result
        }
        throw new Error(response.data.message)
    } catch (error) {
        console.error('Failed to fetch notices:', error)
        throw error
    }
}

// 이번달 정산 내역 조회
export const getOwnerDashboardSettlements = async(fitnessId: string) => {
    try {
        const response = await axiosInstance.get(`/owner/dashboard/settlements/month/${fitnessId}`)
        if (response.data.isSuccess) {
            return response.data.result
        }
        throw new Error(response.data.message)
    } catch (error) {
        console.error('Failed to fetch notices:', error)
        throw error
    }
}

// 이용 내역 3개 조회
export const getOwnerDashboardUsages = async(fitnessId: string) => {
    try {
        const response = await axiosInstance.get(`/owner/dashboard/usages/preview/${fitnessId}`)
        if (response.data.isSuccess) {
            return response.data.result
        }
        throw new Error(response.data.message)
    } catch (error) {
        console.error('Failed to fetch notices:', error)
        throw error
    }
}

