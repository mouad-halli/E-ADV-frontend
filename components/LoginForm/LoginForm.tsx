import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react'
import MicrosoftIcon from '../ui/icons/MicrosoftIcon';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTogglePasswordVisibility } from '@/hooks/useTogglePasswordVisibility';
import Logo from '../ui/icons/Logo';
import { globalStyles } from '@/styles/globalStyles';
import colors from '@/styles/colors';
import LoadingScreen from '../LoadingScreen';
import useLoginForm from './useLoginForm';
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'

const LoginForm = () => {

    const { t } = useTranslation('login')

    const {
        passwordVisibility,
        rightIcon,
        handlePasswordVisibility
    } = useTogglePasswordVisibility()

    const {
        isLoading,
        handleMicrosoftLoginButtonPress,
        handleLoginButtonPress,
        email, setEmail, password, setPassword
    } = useLoginForm()

    return (
        <View className='h-full w-[40%]'>
            {isLoading ?
                <LoadingScreen />
            :
                <View className=' items-center bg-white rounded-xl gap-y-14 pt-4 pb-8'>
                    <Pressable
                          onLongPress={() => router.push(__DEV__ ? "/_sitemap" : "/") }
                    >
                        <Logo />
                    </Pressable>
                    <View className='items-center gap-y-2'>
                        <Text style={[globalStyles.robotoMedium]} className=' text-5xl text-primary'>{t("login-form.header")}</Text>
                        <Text style={[globalStyles.robotoMedium]} className=' text-secondary'>{t("login-form.small-header")}</Text>
                    </View>
                    <View className='w-9/12 gap-y-4'>
                        <View className='gap-y-2'>
                            <Text style={[globalStyles.robotoMedium]} className='text-xl text-primary'>{t("login-form.input1-title")}</Text>
                            <TextInput
                                style={[globalStyles.roboto]}
                                className='text-primary border-2 border-accent rounded-lg px-4 py-4'
                                placeholder={t("login-form.input1-placeholder")}
                                placeholderTextColor={colors.primary}
                                numberOfLines={1}
                                editable={!isLoading}
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                        <View className='gap-y-2'>
                            <Text style={[globalStyles.robotoMedium]} className='text-xl text-primary'>{t("login-form.input2-title")}</Text>
                            <View className='w-full h-min flex-row items-center border-2 border-accent rounded-lg'>
                                <TextInput
                                    style={[globalStyles.roboto]}
                                    className='w-11/12 text-primary px-4 py-4'
                                    placeholder={t("login-form.input2-placeholder")}
                                    placeholderTextColor={colors.primary}
                                    secureTextEntry={passwordVisibility}
                                    numberOfLines={1}
                                    editable={!isLoading}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <Pressable className='w-1/12' onPress={handlePasswordVisibility}>
                                    <MaterialCommunityIcons name={rightIcon} size={22} color="#1e3a8a" />
                                </Pressable>
                            </View>
                            <Text
                              style={[globalStyles.roboto]}
                              className=' text-xs text-right text-secondary'
                            >
                                {t("login-form.forgot-password-small-title")}
                            </Text>
                        </View>
                    </View>
                    <View className='w-8/12 gap-y-4 items-center'>
                        <Pressable
                            className='w-full bg-primary py-4 rounded-full'
                            onPress={handleLoginButtonPress}
                            disabled={isLoading}
                        >
                            <Text
                                style={[globalStyles.roboto]}
                                className='text-xl text-white text-center'
                            >
                                {t("login-form.login-button-title")}
                            </Text>
                        </Pressable>
                        <Pressable
                            className='w-full flex-row items-center justify-center gap-x-2 bg-customGrey py-4 rounded-full'
                            onPress={handleMicrosoftLoginButtonPress}
                            disabled={isLoading}
                        >
                            <MicrosoftIcon className='size-4' />
                            <Text
                                style={[globalStyles.roboto]}
                                className='text-xl'
                            >
                                {t("login-form.microsoft-login-button-title")}
                            </Text>
                        </Pressable>
                    </View>
                    <Text
                        style={[globalStyles.roboto]}
                        className=' text-xs text-secondary'
                    >
                        {t("login-form.create-account-small-title")}
                    </Text>
                </View>
            }
           
      </View>
    )
}

export default LoginForm