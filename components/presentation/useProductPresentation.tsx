import { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '@/contexts/appContext';
import {SlidesInteractionTracker} from '@/services/SlidesInteractionTracker';
import { productPresentationType, generalFeedbackEnum } from '@/types/productPresentation';
import { externalProductSlide, FeedbackTypeEnum } from '@/types/productSlide';
import { getProductSlides } from '@/services/Api/ExternalAPI';
import { addProductPresentation, getProductPresentation, updateProductPresentation } from '@/services/Api/productPresentation';
import { calcAverageOfArray } from '@/utils/calculations';
import { ProductPresentationStatus, usePresentationProductsContext } from '@/contexts/presentationProductsContext';
import productSlidesMockData from '@/locales/mockData/productSlides.json'
import { usePresentationContext } from '@/contexts/presentationContext';

export const useProductPresentation = () => {

    // const { productId } = useLocalSearchParams()

    // const {
    //     getSelectedAppointmentId,
    //     isAppointmentSelected,
    // } = useAppContext()

    // const {
    //     updateProductPresentationData
    // } = usePresentationProductsContext()
    const { updateLocalProductPresentationSummary } = usePresentationContext()

    const { presentedProduct } = usePresentationContext()

    const [isTheaterMode, setIsTheaterMode] = useState(true)
    const [isAnnulerModalOpen, setIsAnnulerModalOpen] = useState(false)
    const [isValiderModalOpen, setIsValiderModalOpen] = useState(false)
    // const [isLoading, setIsLoading] = useState(false)
    const [slideStartIndex, setSlideStartIndex] = useState(0)

    const [generalComment, setGeneralComment] = useState("")
    const [generalFeedback, setGeneralFeedback] = useState(generalFeedbackEnum.None)

    // const [presentedProduct, setPresentedProduct] = useState<productPresentationType>()
    // const [productSlides, setProductSlides] = useState<externalProductSlide[]>([])

    // const handleSetSlideComment = (slideId: string, comment: string) => {
    //     // console.log('setting comment for slide {', selectedProduct.slides.findIndex(slide => slide.id === slideId) + 1, "} ", comment);

    //     // if a comment is added we go trough presentedProduct.slides to find the slide and update it
    //     setPresentedProduct(prevPresentedProduct => {
    //         if (!prevPresentedProduct) return prevPresentedProduct
    //         const updatedSlides = prevPresentedProduct.productSlides.map(slide => {
    //             if (String(slide.slideId) === String(slideId)) {
    //                 return { ...slide, comment }
    //             }
    //             return slide
    //         }) 

    //         const slide = updatedSlides.find(slide => String(slide.slideId) === String(slideId))

    //         if (slide)
    //             SlidesInteractionTracker.saveProductSlideToStorage(slide)

    //         return { ...prevPresentedProduct, productSlides: updatedSlides }
    //     })
    // }

    // const handleSetSlideFeedback = (slideId: string, feedback: FeedbackTypeEnum) => {
    //     // if a feedback is added we go trough presentedProduct.slides to find the slide and update it
    //     setPresentedProduct(prevPresentedProduct => {
    //         if (!prevPresentedProduct) return prevPresentedProduct

    //         const updatedSlides = prevPresentedProduct.productSlides.map(slide => {
    //             if (String(slide.slideId) === String(slideId)) {
    //                 return { ...slide, feedback }
    //             }
    //             return slide
    //         })

    //         const slide = updatedSlides.find(slide => String(slide.slideId) === String(slideId))

    //         if (slide)
    //             SlidesInteractionTracker.saveProductSlideToStorage(slide)

    //         return { ...prevPresentedProduct, productSlides: updatedSlides }
    //     })
    // }

    // const handleSetSlideTimeSpent = (slideId: string, timeSpent: number) => {
    //     // if a timespent is added we go trough presentedProduct.slides to find the slide and update it
    //     setPresentedProduct(prevPresentedProduct => {
    //         if (!prevPresentedProduct) return prevPresentedProduct
    //         const updatedSlides = prevPresentedProduct.productSlides.map(slide => {
    //             if (String(slide.slideId) === String(slideId)) {
    //                 return { ...slide, timeSpent: slide.timeSpent + timeSpent }
    //             }
    //             return slide
    //         })

    //         // const slide = updatedSlides.find(slide => String(slide.slideId) === String(slideId))

    //         // if (slide)
    //         //     SlidesInteractionTracker.saveProductSlideToStorage(slide)

    //         return { ...prevPresentedProduct, productSlides: updatedSlides }
    //     })
    // }

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

    const calculateSlidesFeedbackRating = () => {
        if (!presentedProduct) return 0

        const feedback = presentedProduct.productSlides.filter((slide) => slide.feedback)
            .map(slide => slide.feedback === 2 ? 2.5 : slide.feedback)
            
        // return feedback.reduce((a, b) => a + b, 0) / feedback.length
        return calcAverageOfArray(feedback)
    }

    // const updateLocalProductPresentationSummary = () => {
    //     const feedback = calculateSlidesFeedbackRating()
    //     const lastPresentationDate = new Date().toLocaleDateString()
    //     let presentationStatus = ProductPresentationStatus.NOT_PRESENTED

    //     console.log(presentedProduct?.productSlides.map(s => s.timeSpent))
    //     console.log(presentedProduct?.productSlides.some(slide => slide.timeSpent >= 3 || slide.timeSpent === -1));
        
    //     if (presentedProduct?.productSlides.every(slide => slide.timeSpent >= 3 || slide.timeSpent === -1))
    //         presentationStatus = ProductPresentationStatus.PRESENTED
    //     else if (presentedProduct?.productSlides.some(slide => slide.timeSpent >= 3 || slide.timeSpent === -1))
    //         presentationStatus = ProductPresentationStatus.CONTINUE
    //     updateProductPresentationData(String(productId), feedback, lastPresentationDate, presentationStatus)
    // }

    // useEffect(() => {
    //     if (isAppointmentSelected() && productId ) {
    //         const fetchData = async () => {
    //             try {
    //                 setIsLoading(true)
    //                 const selectedAppointmentId = getSelectedAppointmentId()

    //                 //TO BE REMOVED LATER: mocking slides data
    //                 // const slides: externalProductSlide[] = await getProductSlides(String(productId))
    //                 const slides: externalProductSlide[] = productSlidesMockData

    //                 let responseBody = await getProductPresentation(selectedAppointmentId, String(productId))
    //                 if (!responseBody.productPresentation) {
    //                     responseBody = await addProductPresentation(selectedAppointmentId, String(productId), slides)
    //                 }
                    
    //                 if (responseBody.slideIdToContinueFrom) {
    //                     const idx = slides.findIndex(slide => String(slide.id) === String(responseBody.slideIdToContinueFrom))
    //                     if (idx !== -1)
    //                         setSlideStartIndex(idx)
    //                 }
                    
    //                 if (slides)
    //                     setProductSlides(slides)
    //                 if (responseBody.productPresentation)
    //                     setPresentedProduct(responseBody.productPresentation)
    //                 setIsLoading(false)
    //                 console.log(responseBody.slideIdToContinueFrom);
                    
    //             } catch (error: any) {
    //                 const errResponse = (error && error.response && error.response.data) || (error && error.message)
    //                 console.log(errResponse)
    //                 setIsLoading(false)
    //             }
    //         }
    //         fetchData()
    //         SlidesInteractionTracker.startSyncing()
    //     }
    //     return () => {
    //         setTimeout(async () => {
    //         SlidesInteractionTracker.syncInteractions()
    //         SlidesInteractionTracker.stopSyncing();
    //         }, 500);
    //     }
    // }, [productId])

    return {
        isTheaterMode, setGeneralComment,
        toggleAnnulerModal,
        toggleValiderModal, handleCancelPresentation, handleSetFeedbackRating,
        handleValidatePresentation, setIsTheaterMode,
        setIsAnnulerModalOpen, isAnnulerModalOpen, setIsValiderModalOpen,
        isValiderModalOpen, generalFeedback, generalComment,
        slideStartIndex
    }
}