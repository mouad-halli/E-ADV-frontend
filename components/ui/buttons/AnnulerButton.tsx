import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import AnnulerIcon from '../icons/AnnulerIcon'
import { globalStyles } from '@/styles/globalStyles'
import colors from '@/styles/colors'

interface PropTypes {
    onPress?: () => void
    minimal?: boolean
    text?: string
    displayLogo?: boolean
}

const AnnulerButton: FC<PropTypes> = ({
    onPress,
    minimal = false,
    text = "Annuler",
    displayLogo = true
}) => {
  return (
    <Pressable
        className={`border border-primary  ${minimal ? 'p-2 rounded' : 'flex-row gap-x-2 items-center px-8 py-2 rounded'}`}
        onPress={onPress}
    >
        {displayLogo && <AnnulerIcon />}
        {!minimal && <Text
            style={[globalStyles.robotoMedium, styles.text]}
        >
            {text}
        </Text>}
    </Pressable>
  )
}

export default AnnulerButton

const styles = StyleSheet.create({
    text: {
        color: colors.primary,
        fontSize: 16,
        wordWrap: 'break-word',
        lineHeight: 20
    }
})