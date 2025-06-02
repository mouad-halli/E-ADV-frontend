import { logout } from "@/services/Api/authentication"
import { getMe } from "@/services/Api/user"
import { UserType } from "@/types/user"
import { useRouter } from "expo-router"
import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from "react"

type userContextType = {
    user: UserType | null | undefined
    handleUpdateUser: (newUserData: UserType) => void
    handleLogout: () => void
}

const userContext = createContext<userContextType>({} as userContextType)

export const useUserContext = () => useContext(userContext)

type userProviderProps = { children: ReactNode }

export const UserContextProvider: FC<userProviderProps> = ({children}) => {
    const [user, setUser] = useState<UserType | null | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleUpdateUser = (newUserData: UserType) => {
        setUser({...newUserData})
    }

    const handleLogout = async () => {
        try {
            await logout()
            setUser(null)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getMe()
                // const user: UserType = {
                //     firstName: "patrick",
                //     lastName: "lastPa",
                //     email: "patrick@mail.com"
                // }
                setUser(user)
                
            } catch (error: any) {
                
                const errResponse = (error && error.response && error.response.data) || (error && error.message)

                if (error?.status === 401){
                    setUser(null)

                    router.push("/(auth)/login")
                }
                console.log(errResponse)
            }
        }

        fetchUser()
    }, [])

    const value = useMemo(() => ({user, handleUpdateUser, handleLogout}), [user])

    return (
        <userContext.Provider value={value}>
            {!isLoading && children}
        </userContext.Provider>
    )
}