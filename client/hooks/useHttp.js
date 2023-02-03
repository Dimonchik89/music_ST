import axios from "axios";
import { getCookie } from 'cookies-next';

const $host = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

const $authHost = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        authorization: `Bearer ${getCookie('token')}`
    }
})

// const instance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_BASE_URL
// })

const useHttp = (url) => {

    const enterUser = async ({email, password}) => {
        try {
            const response = await $host.post(url, {
                email,
                password
            })
            return response;
        } catch(e) {
            return e
        }
    }

    const createCategory = async (category) => {
        try {
            const response = await $authHost.post(url, category)
            return await response.data
        } catch(e) {
            return e
        }
    }

    const downloadFile = async (fileLink) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}music/download?filename=${fileLink}`)
        return response
    }

    return { enterUser, createCategory, downloadFile }
}
export default useHttp;