import { View, Text, SafeAreaView, Pressable, StyleSheet, ImageBackground, TextInput } from 'react-native';
import ValiderButton from '@/components/ui/buttons/ValiderButton';
import AnnulerButton from '@/components/ui/buttons/AnnulerButton';
import ShowCommentsIcon from '@/components/ui/icons/ShowCommentsIcon';
import { globalStyles } from '@/styles/globalStyles';
import colors from '@/styles/colors';
import SlidesPlayer from '@/components/presentation/SlidesPlayer/SlidesPlayer';
import ActionModal from '@/components/ui/modals/ActionModal';
import LoadingScreen from '@/components/LoadingScreen';
import HideCommentsIcon from '@/components/ui/icons/HideCommentsIcon';
import FeedbackRating from '@/components/presentation/SlidesPlayer/FeedbackRating';
import { useProductPresentation } from '../../../../components/presentation/useProductPresentation';
import Comments from '@/components/presentation/Comments';

const productPresentation = () => {

    const {
        isTheaterMode, isLoading, setGeneralComment, productSlides,
        handleSetSlideComment, handleSetSlideFeedback,
        toggleAnnulerModal, toggleValiderModal, handleCancelPresentation,
        handleSetFeedbackRating, handleValidatePresentation, presentedProduct,
        setIsTheaterMode, setIsAnnulerModalOpen, isAnnulerModalOpen, setIsValiderModalOpen,
        isValiderModalOpen, generalFeedback, generalComment, handleSetSlideTimeSpent
    } = useProductPresentation()

    if ( isLoading || !presentedProduct )
        return <LoadingScreen />
    
    return (
        <ImageBackground source={require('@/assets/images/background.png')} style={globalStyles.backGroundimage} >
        <SafeAreaView className=" pt-28 pb-6 px-8 h-full flex">
            <View className='flex-1 flex-row gap-x-8 pt-4'>
                <View className={`h-full ${isTheaterMode ? 'flex-1' : 'w-[70%]'} gap-y-4`}>
                    <SlidesPlayer
                        slides={productSlides}
                        setSlideFeedback={handleSetSlideFeedback}
                        setSlideComment={handleSetSlideComment}
                        setTimeSpent={handleSetSlideTimeSpent}
                        isTheaterMode={isTheaterMode}
                        presentedSlides={presentedProduct.productSlides}
                    />
                </View>
                <View className={`h-full ${isTheaterMode ? 'w-min': 'w-[28%]'}`}>
                    <View className={`h-5/6 ${isTheaterMode ? 'bg-transparent' : 'bg-accent'} rounded-lg py-4 gap-y-4`}>
                        <View className='flex-row items-center justify-between px-4'>
                            {!isTheaterMode ?
                                <>
                                    <Text style={[styles.TextLg, globalStyles.robotoBold]}>
                                        Slides Feedback
                                    </Text>
                                    <HideCommentsIcon onPress={() => setIsTheaterMode(true)} />
                                </>
                                :
                                <Pressable
                                    className='rounded-full p-1.5 bg-primary'
                                    onPress={() => setIsTheaterMode(false)}
                                >
                                    <ShowCommentsIcon />
                                </Pressable>
                            }
                        </View>
                        {!isTheaterMode && <Comments productSlides={presentedProduct.productSlides} /> }
                    </View>
                    <View className={`h-1/6 ${isTheaterMode ? 'gap-y-2 items-center' : 'flex-row p-4 items-end'} justify-center gap-x-2`}>
                        <AnnulerButton onPress={() => setIsAnnulerModalOpen(true)} minimal={isTheaterMode} />
                        <ActionModal
                            isModalOpen={isAnnulerModalOpen}
                            toggleModal={toggleAnnulerModal}
                            onCancelPress={() => setIsAnnulerModalOpen(false)}
                            onAcceptPress={handleCancelPresentation}
                            cancelBtnText='Attendre'
                            acceptBtnText='Annuler'
                            displayBtnsLogo={false}
                            title='Annuler la Presentation ?'
                            description="Êtes-vous sûr de vouloir annuler cette présentation ? Cette action est irréversible."
                        />
                        <ValiderButton onPress={() => setIsValiderModalOpen(true)} minimal={isTheaterMode} />
                        <ActionModal
                            isModalOpen={isValiderModalOpen}
                            toggleModal={toggleValiderModal}
                            onCancelPress={() => setIsValiderModalOpen(false)}
                            onAcceptPress={handleValidatePresentation}
                            cancelBtnText='Attendre'
                            title='Feedback General'
                            description="Veuillez écrire un commentaire général et choisir un emoji pour décrire un feedback général"
                        >
                            <FeedbackRating
                                feedbackRating={generalFeedback}
                                handleSetFeedbackRating={handleSetFeedbackRating}
                            />
                            <TextInput
                                className=' min-h-[9rem] max-h-[10rem] border-2 border-primary bg-white rounded'
                                value={generalComment}
                                onChangeText={setGeneralComment}
                                style={[{
                                    textAlignVertical: 'top',
                                }, globalStyles.robotoBold]}
                                multiline={true}
                                numberOfLines={6}
                            />
                        </ActionModal>
                    </View>
                </View>
            </View>
        </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    shadowLg: {
        // only applied for IOS
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 6 }, // Position of the shadow
        shadowOpacity: 0.1, // Opacity of the shadow
        shadowRadius: 8, // How blurred the shadow looks
        // only applied for android
        elevation: 10, // Elevation for Android
    },
    TextLg: {
        fontSize: 20,
        color: colors.primary
    }
})

export default productPresentation