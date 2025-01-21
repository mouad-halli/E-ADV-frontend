import { TouchableOpacity } from 'react-native'
import { Svg, Path } from 'react-native-svg'

interface PropTypes {
    onPress?: () => void
}

const NextArrowIcon = ({ onPress }: PropTypes) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <Path d="M0.463669 10.9881C0.236154 11.229 0.246995 11.6087 0.487885 11.8362C0.728774 12.0637 1.10849 12.0529 1.33601 11.812L6.43582 6.41239C6.65419 6.18118 6.65421 5.81974 6.43585 5.58852L1.33604 0.188042C1.10854 -0.052866 0.728827 -0.0637388 0.48792 0.163756C0.247012 0.391253 0.23614 0.770968 0.463635 1.01188L5.17444 6.0004L0.463669 10.9881Z" fill="#27367B"/>
            </Svg>
        </TouchableOpacity>
    )
}

export default NextArrowIcon