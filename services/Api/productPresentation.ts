import $api from '@/services/Api/API';
import { generalFeedbackEnum, productPresentationDTO, productPresentationType } from '@/types/productPresentation';
import { externalProductSlide, FeedbackTypeEnum } from '@/types/productSlide';

export const updateProductPresentation = async (
    id: string,
    generalComment: string,
    generalFeedback: generalFeedbackEnum,
) => {

    return (await $api.put(`productPresentation/${id}`, {
        generalComment,
        generalFeedback
    })).data
}

export const getProductPresentation = async (appointmentId: string, productId: string): Promise<productPresentationType> => {
    return (await $api.get(`/productPresentation`, { params: { visiteId: appointmentId, productId: productId } })).data
}

export const addProductPresentation = async (appointmentId: string, productId: string, slides: externalProductSlide[]) => {
    const body: productPresentationDTO = {
        productId: String(productId),
        productSlides: slides.map(slide => ({
            slideId: String(slide.id),
            comment: "",
            feedback: FeedbackTypeEnum.None,
            timeSpent: 0,
            orderNumber: slide.orderNumber
        }))
    }
    return (await $api.post(`/productPresentation`, body, { params: { visiteId: appointmentId } })).data
}