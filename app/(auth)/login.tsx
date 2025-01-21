import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginForm from '@/components/LoginForm/LoginForm'
import { globalStyles } from '@/styles/globalStyles'

const SigIn = () => {
    return (
      <SafeAreaView  className='flex-1 bg-secondary flex-row items-center justify-center px-3 pb-3'>
        <View className='flex-1 items-center gap-y-8'>
            <View className='w-7/12 h-96 bg-primary'></View>
            <View className='w-60 items-center gap-y-2'>
                <Text
                    style={[globalStyles.robotoBold]}
                    className='text-4xl text-primary'
                >
                    Lorem Ipsum
                </Text>
                <Text className=' text-lg text-center text-primary'>is simply dummy text of the printingand typesetting industry.</Text>
            </View>
        </View>
        <LoginForm/>
      </SafeAreaView>
    )
}

export default SigIn