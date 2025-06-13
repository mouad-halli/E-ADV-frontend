import { useEffect, useState } from 'react'
import { router } from 'expo-router';
import {SlidesInteractionTracker} from '@/services/SlidesInteractionTracker';
import { generalFeedbackEnum } from '@/types/productPresentation';
import { updateProductPresentation } from '@/services/Api/productPresentation';
import { usePresentationContext } from '@/contexts/presentationContext';

export const useProductPresentation = () => {


    const { presentedProduct } = usePresentationContext()

    const [isTheaterMode, setIsTheaterMode] = useState(true)
    const [isAnnulerModalOpen, setIsAnnulerModalOpen] = useState(false)
    const [isValiderModalOpen, setIsValiderModalOpen] = useState(false)
    const [generalComment, setGeneralComment] = useState("")
    const [generalFeedback, setGeneralFeedback] = useState(generalFeedbackEnum.None)

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
        console.log("presentation render");
        SlidesInteractionTracker.startSyncing()
        
        return () => {
            console.log("presentation cleanup")
            setTimeout(() => {
                SlidesInteractionTracker.syncInteractions()
                SlidesInteractionTracker.stopSyncing();
            }, 500);
        }
    }, [])

    return {
        isTheaterMode, setGeneralComment,
        toggleAnnulerModal,
        toggleValiderModal, handleCancelPresentation, handleSetFeedbackRating,
        handleValidatePresentation, setIsTheaterMode,
        setIsAnnulerModalOpen, isAnnulerModalOpen, setIsValiderModalOpen,
        isValiderModalOpen, generalFeedback, generalComment,
    }
}