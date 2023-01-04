import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4000/api/'
})

const useHttp = (url) => {

    const enterUser = async ({email, password}) => {
        try {
            const response = await instance.post(url, {
                email,
                password
            })
            return response;
        } catch(e) {
            throw new Error(e)
        }
    }

    return { enterUser }
}
export default useHttp;