import NotAuthGuard from '@/components/NotAuthGuard'
import { Stack } from 'expo-router'

const AuthLayout = () => {
    return (
        <NotAuthGuard>
            <Stack screenOptions={ {headerShown: false}} />
        </NotAuthGuard>
    )
}

export default AuthLayout