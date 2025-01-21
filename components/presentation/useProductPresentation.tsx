import { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '@/contexts/appContext';
import {SlidesInteractionTracker} from '@/services/SlidesInteractionTracker';
import { productPresentationType, generalFeedbackEnum } from '@/types/productPresentation';
import { externalProductSlide, FeedbackTypeEnum } from '@/types/productSlide';
import { getProductSlides } from '@/services/Api/ExternalAPI';
import { addProductPresentation, getProductPresentation, updateProductPresentation } from '@/services/Api/productPresentation';

export const useProductPresentation = () => {

    const { productId } = useLocalSearchParams()

    const {
        getSelectedAppointmentId,
        isAppointmentSelected,
    } = useAppContext()

    const [isTheaterMode, setIsTheaterMode] = useState(true)
    const [isAnnulerModalOpen, setIsAnnulerModalOpen] = useState(false)
    const [isValiderModalOpen, setIsValiderModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [generalComment, setGeneralComment] = useState("")
    const [generalFeedback, setGeneralFeedback] = useState(generalFeedbackEnum.None)

    const [presentedProduct, setPresentedProduct] = useState<productPresentationType>()
    const [productSlides, setProductSlides] = useState<externalProductSlide[]>([])

    const handleSetSlideComment = (slideId: string, comment: string) => {
        // console.log('setting comment for slide {', selectedProduct.slides.findIndex(slide => slide.id === slideId) + 1, "} ", comment);

        // if a comment is added we go trough presentedProduct.slides to find the slide and update it
        setPresentedProduct(prevPresentedProduct => {
            if (!prevPresentedProduct) return prevPresentedProduct
            const updatedSlides = prevPresentedProduct.productSlides.map(slide => {
                if (String(slide.slideId) === String(slideId)) {
                    return { ...slide, comment }
                }
                return slide
            }) 

            const slide = updatedSlides.find(slide => String(slide.slideId) === String(slideId))

            if (slide)
                SlidesInteractionTracker.saveProductSlideToStorage(slide)

            return { ...prevPresentedProduct, productSlides: updatedSlides }
        })
    }

    const handleSetSlideFeedback = (slideId: string, feedback: FeedbackTypeEnum) => {
        // if a feedback is added we go trough presentedProduct.slides to find the slide and update it
        setPresentedProduct(prevPresentedProduct => {
            if (!prevPresentedProduct) return prevPresentedProduct

            const updatedSlides = prevPresentedProduct.productSlides.map(slide => {
                if (String(slide.slideId) === String(slideId)) {
                    return { ...slide, feedback }
                }
                return slide
            })

            const slide = updatedSlides.find(slide => String(slide.slideId) === String(slideId))

            if (slide)
                SlidesInteractionTracker.saveProductSlideToStorage(slide)

            return { ...prevPresentedProduct, productSlides: updatedSlides }
        })
    }

    const handleSetSlideTimeSpent = (slideId: string, timeSpent: number) => {

        // if a timespent is added we go trough presentedProduct.slides to find the slide and update it
        setPresentedProduct(prevPresentedProduct => {
            if (!prevPresentedProduct) return prevPresentedProduct
            const updatedSlides = prevPresentedProduct.productSlides.map(slide => {
                if (String(slide.slideId) === String(slideId)) {
                    return { ...slide, timeSpent: slide.timeSpent + timeSpent }
                }
                return slide
            })

            // const slide = updatedSlides.find(slide => String(slide.slideId) === String(slideId))

            // if (slide)
            //     SlidesInteractionTracker.saveProductSlideToStorage(slide)

            return { ...prevPresentedProduct, productSlides: updatedSlides }
        })
    }

    const toggleAnnulerModal = () => {
        setIsAnnulerModalOpen(!isAnnulerModalOpen)
    }

    const toggleValiderModal = () => {
        setIsValiderModalOpen(!isValiderModalOpen)
    }

    const handleCancelPresentation = () => {
        router.back()
    }

    const handleSetFeedbackRating = (feedbackRating: generalFeedbackEnum) => {
        setGeneralFeedback(feedbackRating)
    }

    const handleValidatePresentation = async (
    ) => {
        if (presentedProduct) {
            try {
                await updateProductPresentation(presentedProduct.id, generalComment, generalFeedback)
                
            } catch (error: any) {
                const errResponse = (error && error.response && error.response.data) || (error && error.message)
                console.log(errResponse)
            }
        }
        router.back()
    }

    useEffect(() => {
        if (isAppointmentSelected() && productId ) {
            const fetchData = async () => {
                try {
                    setIsLoading(true)
                    const selectedAppointmentId = getSelectedAppointmentId()

                    const slides: externalProductSlide[] = await getProductSlides(String(productId))
                    
                    let productPresentation: productPresentationType = await getProductPresentation(selectedAppointmentId, String(productId))
                    if (!productPresentation) {
                        productPresentation = await addProductPresentation(selectedAppointmentId, String(productId), slides)
                        productPresentation.productSlides.sort((a, b) => a.orderNumber - b.orderNumber)
                    }

                    setProductSlides(slides)
                    setPresentedProduct(productPresentation)
                    setIsLoading(false)
                } catch (error: any) {
                    const errResponse = (error && error.response && error.response.data) || (error && error.message)
                    console.log(errResponse)
                    setIsLoading(false)
                }
            }
            fetchData()
            SlidesInteractionTracker.startSyncing()
        }
        return () => {
            setTimeout(async () => {
            SlidesInteractionTracker.syncInteractions()
            SlidesInteractionTracker.stopSyncing();
            }, 500);
        }
    }, [productId])


    return {
        isTheaterMode, isLoading, setGeneralComment, productSlides,
        handleSetSlideComment, handleSetSlideFeedback, toggleAnnulerModal,
        toggleValiderModal, handleCancelPresentation, handleSetFeedbackRating,
        handleValidatePresentation, presentedProduct, setIsTheaterMode,
        setIsAnnulerModalOpen, isAnnulerModalOpen, setIsValiderModalOpen,
        isValiderModalOpen, generalFeedback, generalComment, handleSetSlideTimeSpent
    }
}