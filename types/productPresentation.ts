import { productSlideType, productSlideDTO, externalProductSlide } from "./productSlide"

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

export interface externalProductType {
    id: string
    name: string
    imgUrl: string
    // slides: externalProductSlide[]
}