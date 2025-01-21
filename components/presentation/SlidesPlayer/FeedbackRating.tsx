import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { generalFeedbackEnum } from '@/types/productPresentation'
import { Entypo } from '@expo/vector-icons'
import colors from '@/styles/colors'

interface PropTypes {
    feedbackRating: generalFeedbackEnum
    handleSetFeedbackRating : (feebackRating: generalFeedbackEnum) => void
}

const FeedbackRating = ({
    feedbackRating,
    handleSetFeedbackRating
}: PropTypes) => {



    return (
        <View className='flex-row pb-10 justify-evenly'>
            <TouchableOpacity
                onPress={() => handleSetFeedbackRating(generalFeedbackEnum.Good)}
                className='rounded-full'
            >
                <Entypo name="emoji-happy" size={70} color={feedbackRating === generalFeedbackEnum.Good ? "green" : colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleSetFeedbackRating(generalFeedbackEnum.Neutral)}
            >
                <Entypo name="emoji-neutral" size={70} color={feedbackRating === generalFeedbackEnum.Neutral ? "grey" : colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleSetFeedbackRating(generalFeedbackEnum.Bad)}
            >
                <Entypo name="emoji-sad" size={70} color={feedbackRating === generalFeedbackEnum.Bad ? "red" : colors.primary} />
            </TouchableOpacity>
        </View>
    )
}

export default FeedbackRating