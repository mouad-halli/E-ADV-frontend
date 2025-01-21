import colors from '@/styles/colors'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

const LoadingScreen = () => {
    return(
        <View className='flex-1 items-center justify-center'>
            <ActivityIndicator size={"large"}  color={colors.secondary}/>
        </View>
    )

}

export default LoadingScreen

const styles = StyleSheet.create({})