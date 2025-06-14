import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginForm from '@/components/LoginForm/LoginForm'
import { globalStyles } from '@/styles/globalStyles'
import { useTranslation } from "react-i18next";

const SigIn = () => {

    const { t } = useTranslation("login")

    return (
      <SafeAreaView  className='flex-1 bg-secondary flex-row items-center justify-center px-3 pb-3'>
        <View className='flex-1 items-center gap-y-8'>
            <View className='w-7/12 h-96'>
                <Image
                    source={require("../../assets/images/login-screen-img.png")}
                    style={{ height: "100%", width: "100%" }}
                    resizeMode="contain"
                /> 
            </View>
            <View className=' w-[27rem] items-center gap-y-2'>
                <Text
                    style={[globalStyles.robotoBold]}
                    className='text-4xl text-primary text-center'
                >
                    { t("header") }
                </Text>
                <Text className=' text-lg text-center text-primary'>{ t("small-header") }</Text>
            </View>
        </View>
        <LoginForm/>
      </SafeAreaView>
    )
}

export default SigIn