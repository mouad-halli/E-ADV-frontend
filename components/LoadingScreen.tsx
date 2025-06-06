import colors from '@/styles/colors'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native'

const LoadingScreen = () => {

    const { t } = useTranslation("common")

    return(
        <View className='flex-1 h-full items-center justify-center'>
            <ActivityIndicator size={"large"}  color={colors.primary}/>
            <Text style={{ color: colors.primary }} className='pt-4 text-lg'>{t("loading")}...</Text>
        </View>
    )

}

export default LoadingScreen

const styles = StyleSheet.create({})