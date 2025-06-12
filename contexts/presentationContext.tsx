import { productPresentationType } from "@/types/productPresentation"
import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { useAppContext } from "./appContext"
import { ProductPresentationStatus, usePresentationProductsContext } from "./presentationProductsContext"
import { externalProductSlide, FeedbackTypeEnum } from "@/types/productSlide"
import productSlidesMockData from '@/locales/mockData/productSlides.json'
import { addProductPresentation, getProductPresentation } from "@/services/Api/productPresentation"
import { SlidesInteractionTracker } from "@/services/SlidesInteractionTracker"
import { calcAverageOfArray } from "@/utils/calculations"

type presentationContextType = {
    presentedProduct: productPresentationType | undefined
    isLoading: boolean
    slideStartIndex: number
    productSlides: externalProductSlide[]
    handleSetSlideFeedback: (slideId: string, feedback: FeedbackTypeEnum) => void
    handleSetSlideComment: (slideId: string, comment: string) => void
    handleSetSlideTimeSpent: (slideId: string, timeSpent: number) => void
    updateLocalProductPresentationSummary: () => void
    handleSetSelectedProductId: (productId: string) => void
}

const presentationContext = createContext<presentationContextType>({} as presentationContextType)

export const usePresentationContext = () => useContext(presentationContext)

type presentationProviderProps = { children: ReactNode }

export const PresentationProvider : FC<presentationProviderProps> = ({ children }) => {

    const {
        getSelectedAppointmentId,
        isAppointmentSelected,
    } = useAppContext()
    
    const {
        updateProductPresentationData
    } = usePresentationProductsContext()
    
    const [presentedProduct, setPresentedProduct] = useState<productPresentationType>()
    const [isLoading, setIsLoading] = useState(false)
    const [slideStartIndex, setSlideStartIndex] = useState(0)
    const [productSlides, setProductSlides] = useState<externalProductSlide[]>([])
    const [selectedProductId, setSelectedProductId] = useState<string | undefined>()

    const handleSetSelectedProductId = (productId: string) => setSelectedProductId(productId)

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

            return { ...prevPresentedProduct, productSlides: updatedSlides }
        })
    }

    const calculateSlidesFeedbackRating = () => {
        if (!presentedProduct) return 0

        const feedback = presentedProduct.productSlides.filter((slide) => slide.feedback)
            .map(slide => slide.feedback === 2 ? 2.5 : slide.feedback)
            
        // return feedback.reduce((a, b) => a + b, 0) / feedback.length
        return calcAverageOfArray(feedback)
    }

    const updateLocalProductPresentationSummary = () => {
        console.log("updating product summary")
        // SlidesInteractionTracker.syncInteractions()
        // setTimeout(() => {
        //     SlidesInteractionTracker.stopSyncing();
        // }, 500);
        let presentationStatus = ProductPresentationStatus.NOT_PRESENTED

        if (presentedProduct?.productSlides.every(slide => slide.timeSpent >= 3 || slide.timeSpent === -1))
            presentationStatus = ProductPresentationStatus.PRESENTED
        else if (presentedProduct?.productSlides.some(slide => slide.timeSpent >= 3 || slide.timeSpent === -1))
            presentationStatus = ProductPresentationStatus.CONTINUE

        if (presentationStatus !== ProductPresentationStatus.NOT_PRESENTED)
            updateProductPresentationData(
                String(selectedProductId),
                calculateSlidesFeedbackRating(),
                new Date().toLocaleDateString(),
                presentationStatus
            )
        setSelectedProductId(undefined)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const selectedAppointmentId = getSelectedAppointmentId()
                //TO BE REMOVED LATER: mocking slides data
                // const slides: externalProductSlide[] = await getProductSlides(String(productId))
                const slides: externalProductSlide[] = productSlidesMockData
                let responseBody = await getProductPresentation(selectedAppointmentId, String(selectedProductId))
                if (!responseBody.productPresentation) {
                    responseBody = await addProductPresentation(selectedAppointmentId, String(selectedProductId), slides)
                }
                
                if (responseBody.slideIdToContinueFrom) {
                    const idx = slides.findIndex(slide => String(slide.id) === String(responseBody.slideIdToContinueFrom))
                    if (idx !== -1)
                        setSlideStartIndex(idx)
                }
                else
                    setSlideStartIndex(0)

                console.log("slide -> ", responseBody.slideIdToContinueFrom)
                
                if (slides)
                    setProductSlides(slides)
                if (responseBody.productPresentation)
                    setPresentedProduct(responseBody.productPresentation)
                setIsLoading(false)
                
            } catch (error: any) {
                const errResponse = (error && error.response && error.response.data) || (error && error.message)
                console.log(errResponse)
                setIsLoading(false)
            }
        }
            
        if (isAppointmentSelected() && selectedProductId ) {
            console.log("fetching product presentation data")
            fetchData()
            // SlidesInteractionTracker.startSyncing()
        }
        // else {
        //     console.log("reinitializing product presentation data");
        //     setPresentedProduct(undefined)
        //     setProductSlides([])
        //     setSlideStartIndex(0)
        // }

        // return () => {
        //     console.log("presentationContext clean up called")
        //     // setTimeout(async () => {
        //     //     SlidesInteractionTracker.syncInteractions()
        //     //     SlidesInteractionTracker.stopSyncing();
        //     // }, 500);
        // }
    }, [selectedProductId/*, getSelectedAppointmentId()*/])

    const value = useMemo(
        () => ({
            presentedProduct,
            isLoading,
            slideStartIndex,
            productSlides,
            handleSetSlideComment,
            handleSetSlideFeedback,
            handleSetSlideTimeSpent,
            updateLocalProductPresentationSummary,
            handleSetSelectedProductId
        })
        , [
            presentedProduct,
            isLoading,
            slideStartIndex,
            productSlides,
            handleSetSlideFeedback,
            handleSetSlideComment,
            handleSetSlideTimeSpent,
            updateLocalProductPresentationSummary,
            handleSetSelectedProductId,
            selectedProductId,
        ]
    )

    return (
        <presentationContext.Provider value={value}>
            {children}
        </presentationContext.Provider>
    )
}