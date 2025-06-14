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
import { useTranslation } from 'react-i18next';
import { usePresentationContext } from '@/contexts/presentationContext';

const productPresentation = () => {

    const { t } = useTranslation("presentation")

    const {
        isTheaterMode, setGeneralComment,
        toggleAnnulerModal, toggleValiderModal, handleCancelPresentation,
        handleSetFeedbackRating, handleValidatePresentation,
        setIsTheaterMode, setIsAnnulerModalOpen, isAnnulerModalOpen, setIsValiderModalOpen,
        isValiderModalOpen, generalFeedback, generalComment,
    } = useProductPresentation()

    const {presentedProduct, isLoading} = usePresentationContext()

    if ( isLoading || !presentedProduct )
        return <LoadingScreen />
    
    return (
        <ImageBackground source={require('@/assets/images/background.png')} style={globalStyles.backGroundimage} >
        <SafeAreaView className=" pt-28 pb-6 px-8 h-full flex">
            <View className='flex-1 flex-row gap-x-8 pt-4'>
                <View className={`h-full ${isTheaterMode ? 'flex-1' : 'w-[70%]'} gap-y-4`}>
                    <SlidesPlayer
                        isTheaterMode={isTheaterMode}
                    />
                </View>
                <View className={`h-full ${isTheaterMode ? 'w-min': 'w-[28%]'}`}>
                    <View className={`h-5/6 ${isTheaterMode ? 'bg-transparent' : 'bg-accent'} rounded-lg py-4 gap-y-4`}>
                        <View className='flex-row items-center justify-between px-4'>
                            {!isTheaterMode ?
                                <>
                                    <Text style={[styles.TextLg, globalStyles.robotoBold]}>
                                        {t("slides-feedback-title")}
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
                        <AnnulerButton
                            text={t("cancel-button-title")}
                            onPress={() => setIsAnnulerModalOpen(true)} minimal={isTheaterMode}
                        />
                        <ActionModal
                            isModalOpen={isAnnulerModalOpen}
                            toggleModal={toggleAnnulerModal}
                            onCancelPress={() => setIsAnnulerModalOpen(false)}
                            onAcceptPress={handleCancelPresentation}
                            cancelBtnText={t("cancel-modal-accept-button-title")}
                            acceptBtnText={t("cancel-modal-cancel-button-title")}
                            displayBtnsLogo={false}
                            title={t("cancel-modal-title")}
                            description={t("cancel-modal-description")}
                        />
                        <ValiderButton
                            text={t("validate-button-title")}
                            onPress={() => setIsValiderModalOpen(true)} minimal={isTheaterMode}
                        />
                        <ActionModal
                            isModalOpen={isValiderModalOpen}
                            toggleModal={toggleValiderModal}
                            onCancelPress={() => setIsValiderModalOpen(false)}
                            onAcceptPress={handleValidatePresentation}
                            cancelBtnText={t("validate-modal-cancel-button-title")}
                            acceptBtnText={t("validate-modal-accept-button-title")}
                            title={t("validate-modal-title")}
                            description={t("validate-modal-description")}
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