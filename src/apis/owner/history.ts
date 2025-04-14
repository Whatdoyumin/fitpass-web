import { axiosInstance } from "../axios-instance"

// 월별 정산 내역
export const getMonthHistory = async(fitnessId: string, page: number = 0, size: number = 10) => {
    try { 
        const response = await axiosInstance.get(`/owner/history/month/${fitnessId}`, {
            params: {
                page,
                size,
            },
        })
        if (response.data.isSuccess) {
            return response.data.result
        }
        throw new Error(response.data.message)
    } catch (error) {
        console.error('Failed to fetch notices:', error)
        throw error
    }
}

// 이용 회원 내역
export const getUsageHistory = async(fitnessId: string, page: number = 0, size: number = 10) => {
    try { 
        const response = await axiosInstance.get(`/owner/history/usage/${fitnessId}`,{
            params: {
                page,
                size,
            },
        })
        if (response.data.isSuccess) {
            return response.data.result
        }
        throw new Error(response.data.message)
    } catch (error) {
        console.error('Failed to fetch notices:', error)
        throw error
    }
}