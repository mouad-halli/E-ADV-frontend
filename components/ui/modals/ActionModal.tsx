import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import AnnulerButton from '@/components/ui/buttons/AnnulerButton';
import ValiderButton from '@/components/ui/buttons/ValiderButton';
import colors from '@/styles/colors';
import { globalStyles } from '@/styles/globalStyles';

interface PropTypes {
    title?: string
    description?: string
    children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
    isModalOpen: boolean
    toggleModal: () => void
    onCancelPress?: () => void
    onAcceptPress?: () => void
    cancelBtnText?: string
    acceptBtnText?: string
    displayBtnsLogo?: boolean
}

const ActionModal = ({
    title,
    description,
    children,
    isModalOpen,
    toggleModal,
    onCancelPress,
    onAcceptPress,
    cancelBtnText,
    acceptBtnText,
    displayBtnsLogo = true
}: PropTypes) => {

    return (
        <Modal
            isVisible={isModalOpen}
            onBackdropPress={toggleModal}
            animationInTiming={1} animationOutTiming={1}
        >
            <View className=' bg-white mx-auto py-4 px-5 gap-y-8 max-w-xl rounded-xl'>
                <Text
                    style={[styles.textLg]}
                    className='self-start border-b-4 border-b-secondary'
                >
                    {title}
                </Text>
                <Text
                    style={[styles.text]}
                >
                    {description}
                </Text>
                <View className=''>
                    <>
                        {children}
                    </>
                </View>
                <View className='flex-row justify-center items-center gap-x-4'>
                    <AnnulerButton
                        onPress={onCancelPress}
                        text={cancelBtnText}
                        displayLogo={displayBtnsLogo}
                    />
                    <ValiderButton
                        onPress={onAcceptPress}
                        text={acceptBtnText}
                        displayLogo={displayBtnsLogo}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    textLg: {
        color: colors.primary,
        ...globalStyles.robotoBold,
        fontSize: 20,
    },
    text: {
        color: colors.primary,
        ...globalStyles.roboto,
        fontSize: 16,
    },
})

export default ActionModal