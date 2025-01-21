import axios from 'axios'

const $api = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_BACK_END_URL}/api/`,
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
})

export default $api