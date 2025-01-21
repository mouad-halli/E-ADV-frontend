import { Svg, Path } from 'react-native-svg'

interface PropTypes {
    className?: string
}

const MicrosoftIcon = ({ className }: PropTypes) => {
    return (
        <Svg
            className={className}
            // xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
        >
            <Path fill="#f35325" d="M0 0h10v10H0z"/>
            <Path fill="#81bc06" d="M11 0h10v10H11z"/>
            <Path fill="#05a6f0" d="M0 11h10v10H0z"/>
            <Path fill="#ffba08" d="M11 11h10v10H11z"/>
        </Svg>
    )
}

export default MicrosoftIcon