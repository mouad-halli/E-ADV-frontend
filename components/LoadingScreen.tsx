import colors from '@/styles/colors'
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native'

const LoadingScreen = () => {
    return(
        <View className='flex-1 h-full items-center justify-center'>
            <ActivityIndicator size={"large"}  color={colors.primary}/>
            <Text style={{ color: colors.primary }} className='pt-4 text-lg'>chargement...</Text>
        </View>
    )

}

export default LoadingScreen

const styles = StyleSheet.create({})