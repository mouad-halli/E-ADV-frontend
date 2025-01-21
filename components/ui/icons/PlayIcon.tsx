import { View } from 'react-native'
import { Svg, Path } from 'react-native-svg'

const PlayIcon = () => {
  return (
    <View className=' bg-accent rounded-full items-center justify-center p-3'>
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <Path d="M8.85563 6.15498C8.02249 5.69354 7 6.29608 7 7.24847V12.7516C7 13.704 8.0225 14.3065 8.85563 13.8451L14.6134 10.6561C14.852 10.524 15 10.2727 15 10C15 9.7273 14.852 9.47607 14.6134 9.34393L8.85563 6.15498ZM10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM1.5 10C1.5 5.30558 5.30558 1.5 10 1.5C14.6944 1.5 18.5 5.30558 18.5 10C18.5 14.6944 14.6944 18.5 10 18.5C5.30558 18.5 1.5 14.6944 1.5 10Z" fill="#27367B"/>
        </Svg>
    </View>
  )
}

export default PlayIcon