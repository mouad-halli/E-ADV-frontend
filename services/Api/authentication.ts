import { AxiosHeaders } from "axios"
import $api from "./API"

export const login = async (data: any) => {
    return (await $api.post('authentication/login', data)).data
}

export const msalLogin = async (accessToken: string) => {

    return (await $api.post(
        'authentication/msal-login',
        {  },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            } 
        }
    )).data

}

export const logout = async () => {
    return (await ($api.get("authentication/logout"))).data
}