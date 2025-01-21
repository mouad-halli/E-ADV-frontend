import { TouchableOpacity } from 'react-native'
import { Svg, Path } from 'react-native-svg'

interface PropTypes {
    onPress?: () => void
}

const PauseIcon = ({ onPress }: PropTypes) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Svg width="17" height="16" viewBox="0 0 17 16" fill="none">
                <Path d="M8.2998 0C3.88153 0 0.299805 3.58172 0.299805 8C0.299805 12.4183 3.88153 16 8.2998 16C12.7181 16 16.2998 12.4183 16.2998 8C16.2998 3.58172 12.7181 0 8.2998 0ZM7.0998 5V11C7.0998 11.3314 6.83118 11.6 6.4998 11.6C6.16843 11.6 5.8998 11.3314 5.8998 11V5C5.8998 4.66863 6.16843 4.4 6.4998 4.4C6.83118 4.4 7.0998 4.66863 7.0998 5ZM10.6998 5V11C10.6998 11.3314 10.4312 11.6 10.0998 11.6C9.76843 11.6 9.4998 11.3314 9.4998 11V5C9.4998 4.66863 9.76843 4.4 10.0998 4.4C10.4312 4.4 10.6998 4.66863 10.6998 5Z" fill="#27367B"/>
            </Svg>
        </TouchableOpacity>
    )
}

export default PauseIcon