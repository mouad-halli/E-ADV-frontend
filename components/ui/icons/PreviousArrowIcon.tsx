import { TouchableOpacity } from 'react-native'
import { Svg, Path } from 'react-native-svg'

interface PropTypes {
    onPress?: () => void
}

const PreviousArrowIcon = ({ onPress }: PropTypes) => {
  return (
    <TouchableOpacity onPress={onPress}>
        <Svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <Path d="M6.13594 1.01191C6.36346 0.771021 6.35261 0.391304 6.11172 0.163789C5.87084 -0.0637257 5.49112 -0.0528835 5.2636 0.188006L0.163788 5.58761C-0.0545832 5.81882 -0.0545976 6.18026 0.163755 6.41148L5.26357 11.812C5.49107 12.0529 5.87078 12.0637 6.11169 11.8362C6.3526 11.6087 6.36347 11.229 6.13597 10.9881L1.42517 5.9996L6.13594 1.01191Z" fill="#27367B"/>
        </Svg>
    </TouchableOpacity>
  )
}

export default PreviousArrowIcon