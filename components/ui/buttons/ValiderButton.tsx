import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import ConfirmerIcon from '../icons/ConfirmerIcon'
import { globalStyles } from '@/styles/globalStyles'

interface PropTypes {
    onPress?: () => void
    minimal?: boolean
    text?: string
    displayLogo?: boolean
}

const ValiderButton: FC<PropTypes> = ({
    onPress,
    minimal = false,
    text = "Valider",
    displayLogo = true
}) => {
  return (
    <Pressable
        className={`flex-row gap-x-2 items-center bg-blue-900 border-2 border-primary ${minimal ? 'p-2 rounded' : 'flex-row gap-x-2 items-center px-8 py-2 rounded'}`}
        onPress={onPress}
    >
        {displayLogo && <ConfirmerIcon />}
        {!minimal && <Text
            style={[globalStyles.robotoMedium, styles.text]}
        >
            {text}
        </Text>}
    </Pressable>
  )
}

export default ValiderButton

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 16,
        wordWrap: 'break-word',
        lineHeight: 20
    }
})