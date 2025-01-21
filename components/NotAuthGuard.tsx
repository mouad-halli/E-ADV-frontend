import { View, Text } from 'react-native'
import React, { ReactNode, useEffect } from 'react'
import { useUserContext } from '@/contexts/userContext'
import { useRouter } from 'expo-router'
import LoadingScreen from './LoadingScreen'

interface PropTypes {
    children: ReactNode
}

const NotAuthGuard = ({children}: PropTypes) => {

    const { user } = useUserContext()
    const router = useRouter()

    useEffect(() => {
        if (user !== null)
            router.replace('/(main)/(tabs)')
    }, [user])

    if (user === undefined)
        return <LoadingScreen />
    return children
}

export default NotAuthGuard