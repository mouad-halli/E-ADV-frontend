import { useState } from 'react'
import { useUserContext } from '@/contexts/userContext';
import { useRouter } from 'expo-router';
import { AccessTokenRequestConfig, exchangeCodeAsync, makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import { login, msalLogin } from '@/services/Api/authentication';

const useLoginForm = () => {

    const { handleUpdateUser } = useUserContext()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const discovery = useAutoDiscovery(
        `https://login.microsoftonline.com/${process.env.EXPO_PUBLIC_TENANT_ID}/v2.0`,
        // {
        //     authorizationEndpoint: `https://login.microsoftonline.com/${process.env.EXPO_PUBLIC_TENANT_ID}/oauth2/v2.0/authorize`,
        //     tokenEndpoint: `https://login.microsoftonline.com/${process.env.EXPO_PUBLIC_TENANT_ID}/oauth2/v2.0/token`,
        // }
    )
    
    const redirectUri = makeRedirectUri({
        scheme: 'myapp',
        path: 'login',
    })

    const [request, , promptAsync] = useAuthRequest(
        {
            clientId: process.env.EXPO_PUBLIC_CLIENT_ID as string,
            scopes: ['openid', 'profile', 'email', 'offline_access'],
            redirectUri,
        },
        discovery,
    )

    const handleLoginButtonPress = async () => {
        // router.replace('/(main)/(tabs)')
        try {
            setIsLoading(true)
            const user = await login({email, password})
            handleUpdateUser(user)
            setIsLoading(false)    
        } catch (error: any) {
            const errResponse = (error && error.response && error.response.data) || (error && error.message)

            console.error(errResponse)
            setIsLoading(false)
        }
    }

    const handleMicrosoftLoginButtonPress = async () => {
        try {
            if (!request) {
                console.log("request not initialized yet")
                return
            }
            
            setIsLoading(true)
            const codeResponse = await promptAsync()
    
            if (request && codeResponse.type === 'success' && discovery) {
                const config: AccessTokenRequestConfig = {
                    clientId: process.env.EXPO_PUBLIC_CLIENT_ID as string,
                    code: codeResponse.params.code,
                    extraParams: request.codeVerifier
                        ? { code_verifier: request.codeVerifier }
                        : undefined,
                    redirectUri,
                }
                const { accessToken } = await exchangeCodeAsync(config, discovery)

                const user = await msalLogin(accessToken)
                handleUpdateUser(user)
            }
            setIsLoading(false)
        } catch (error: any) {

            const errResponse = (error && error.response && error.response.data) || (error && error.message)

            console.log(errResponse)
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        handleMicrosoftLoginButtonPress,
        handleLoginButtonPress,
        email, setEmail, password, setPassword
    }
}

export default useLoginForm