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

    const deleteData = async () => {
        try {
            const data = await $authHost.delete(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`)
            return data
        } catch(e) {
            return e
        }
    }

    const postData = async (body) => {
        try {
            const data = await $authHost.post(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, body)
            return data
        } catch(e) {
            return e
        }
    }

    const updateData = async (body) => {
        try {
            const data = await $authHost.patch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, body)
            return data
        } catch(e) {
            return e
        }
    }

    const getData = async () => {
        try {
            const response = await $host(url)
            return await response.data
        } catch(e) {
            return e
        }
    }

    const getNewData = async (newUrl) => {
        try {
            const response = await $host(newUrl)
            return await response.data
        } catch(e) {
            return e
        }
    }

    return { enterUser, createCategory, downloadFile, deleteData, postData, updateData, getData, getNewData }
}
export default useHttp;