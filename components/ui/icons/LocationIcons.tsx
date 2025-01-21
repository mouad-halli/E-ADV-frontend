import { Svg, Path } from 'react-native-svg'
import { View} from 'react-native'

const LocationIcon = () => {
  return (
    <View className='p-2 bg-secondary rounded-full'>
        <Svg width="10" height="11" viewBox="0 0 10 11" fill="none" >
            <Path d="M8.21545 8.21904C10.0949 6.33882 10.0949 3.29038 8.21545 1.41016C6.33605 -0.470055 3.28895 -0.470055 1.40955 1.41016C-0.46985 3.29038 -0.46985 6.33882 1.40955 8.21904L2.45526 9.24951L3.85968 10.6143L3.951 10.6952C4.48366 11.127 5.26366 11.1 5.76545 10.6144L7.44036 8.98502L8.21545 8.21904ZM4.8125 6.875C3.67341 6.875 2.75 5.95159 2.75 4.8125C2.75 3.67341 3.67341 2.75 4.8125 2.75C5.95159 2.75 6.875 3.67341 6.875 4.8125C6.875 5.95159 5.95159 6.875 4.8125 6.875Z" fill="#27367B"/>
        </Svg>
    </View>
  )
}

export default LocationIcon