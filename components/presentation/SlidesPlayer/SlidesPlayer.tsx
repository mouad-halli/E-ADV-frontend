import { useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputSubmitEditingEventData, TouchableOpacity, View, Image } from 'react-native';
import PreviousArrowIcon from '../../ui/icons/PreviousArrowIcon';
import PauseIcon from '@/components/ui/icons/PauseIcon';
import NextArrowIcon from '@/components/ui/icons/NextArrowIcon';
import { VideoView, useVideoPlayer } from 'expo-video'
import { globalStyles } from '@/styles/globalStyles';
import colors from '@/styles/colors';
import { externalProductSlide, FeedbackTypeEnum, productSlideType } from '@/types/productSlide';
import useSlideTimeTracker from './useSlideTimeTracker';
import { AntDesign } from '@expo/vector-icons';
import { usePresentationContext } from '@/contexts/presentationContext';

interface PropTypes {
    isTheaterMode: boolean
}

const SlidesPlayer = ({
    isTheaterMode,
}: PropTypes) => {
    const {
        slideStartIndex,
        productSlides: slides,
        presentedProduct,
        handleSetSlideTimeSpent: setTimeSpent,
        handleSetSlideComment: setSlideComment,
        handleSetSlideFeedback: setSlideFeedback,
    } = usePresentationContext()

    const [currentSlideIndex, setCurrentSlideIndex] = useState(slideStartIndex)
    const [comment, setComment] = useState("")
    const [isPaused, setIsPaused] = useState(false)
    const {
        pauseTimer,
        resumeTimer
    } = useSlideTimeTracker(currentSlideIndex, slides, presentedProduct?.productSlides, setTimeSpent)

    const handleEnterPress = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        if (comment.trim() !== "") {
            setSlideComment(slides[currentSlideIndex].id, comment)
            setComment("")
        }
    }

    const player = useVideoPlayer(slides[currentSlideIndex].slideUrl, player => {
        player.play()
    })

    
    const handlePlayButtonPress = () => {
        setIsPaused(false)
        resumeTimer()

    }

    const handleStopButtonPress = () => {
        setIsPaused(true)
        pauseTimer()
    }

    const handleSlideChange = (direction: "next" | "previous") => {
        if (direction === "next" && currentSlideIndex + 1 < slides.length)
            setCurrentSlideIndex(currentSlideIndex + 1)
        else if (direction === "previous" && currentSlideIndex > 0 )
            setCurrentSlideIndex(currentSlideIndex - 1)
    }

    const handleFeedbackClick = (feedback: FeedbackTypeEnum) => {
        setSlideFeedback(slides[currentSlideIndex].id, feedback)
        handleSlideChange("next")
    }

    return (
        <>
        <View
            style={[styles.shadowLg]}
            className='flex-1 flex-row bg-white rounded-lg overflow-hidden'
        >
            <View className='w-[97%]'>
                <View className='h-[92%]'>
                { slides[currentSlideIndex].type === "video" ?
                    <VideoView
                        player={player}
                        style={{height: "100%", width: "100%"}}
                        nativeControls={false}

                    />
                    :
                    <Image
                        source={{ uri: slides[currentSlideIndex].slideUrl }}
                        style={{ height: "100%", width: "100%" }}
                        resizeMode="contain"
                    />
                }
                </View>
                <View className=' w-full flex-row h-[8%] bg-accent'>
                    <View className='h-full w-1/6 px-4 py-2 '>
                        <View className='flex-row items-center justify-center gap-x-4 w-full h-full bg-white rounded-2xl'>
                            <PreviousArrowIcon onPress={() => handleSlideChange("previous")} />
                            {isPaused ?
                                <AntDesign name="caretright" size={15} color="black" onPress={handlePlayButtonPress} />
                                :
                                <PauseIcon onPress={handleStopButtonPress} />
                            }
                            <NextArrowIcon onPress={() => handleSlideChange("next")} />
                        </View>
                    </View>
                    <View className='h-full w-5/6 px-3 py-2'>
                        <View className=' h-full w-full justify-center bg-primary rounded-2xl'>
                            <Text className='text-center text-white'>{`${currentSlideIndex + 1}/${slides.length}`}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className=' w-[3%] h-full'>
                <TouchableOpacity
                    onPress={() => handleFeedbackClick(FeedbackTypeEnum.Good)} className='h-1/3 bg-primary'>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleFeedbackClick(FeedbackTypeEnum.Neutral)} className='h-1/3 bg-secondary'>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleFeedbackClick(FeedbackTypeEnum.Bad)} className='h-1/3 bg-accent opacity-80'>
                </TouchableOpacity>
            </View>
        </View>
        {!isTheaterMode && <View
                style={[styles.shadowLg]}
                className=' h-[23%] bg-accent rounded-lg p-4 flex gap-y-2'
            >
                <Text
                    style={[globalStyles.robotoBold, { fontSize: 20, color: colors.primary }]}
                >
                        Commentaire
                </Text>
                <TextInput
                    className="border-2 border-primary bg-white rounded"
                    style={[
                        { flex: 1, textAlignVertical: 'top', padding: 8 },
                        globalStyles.robotoBold
                    ]}
                    multiline={true}
                    numberOfLines={4}
                    value={comment}
                    onChangeText={setComment}
                    returnKeyType="done"
                    blurOnSubmit={true}
                    onSubmitEditing={handleEnterPress}
                />
        </View>}
        </>
    )
}

const styles = StyleSheet.create({
    shadowLg: {
        // only applied for IOS
        shadowColor: '#000', // shadow color
        shadowOffset: { width: 0, height: 6 }, // position of the shadow
        shadowOpacity: 0.1, // opacity of the shadow
        shadowRadius: 8, // how blurred the shadow looks
        // only applied for android
        elevation: 10, // elevation for Android
    },
})

export default SlidesPlayer