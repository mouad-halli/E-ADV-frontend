import { productSlideType, productSlideDTO } from "./productSlide"

export enum generalFeedbackEnum {
    None = 0,
    Bad = 1,
    Neutral = 2,
    Good = 3
}

export interface productPresentationType {
    id: string
    productId: string // external
    productSlides: productSlideType[]
}

export interface productPresentationDTO {
    productId: string // external
    productSlides?: productSlideDTO[]
}