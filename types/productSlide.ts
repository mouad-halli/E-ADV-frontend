export enum FeedbackTypeEnum {
    "None" = 0,
    "Bad" = 1,
    "Neutral" = 2,
    "Good" = 5
}

export interface productSlideType {
    id: string
    slideId: string // external
    comment: string
    feedback: FeedbackTypeEnum
    timeSpent: number
    updatedAt: string
    orderNumber: number
}

export interface productSlideDTO{
    slideId: string // external
    comment: string
    feedback: FeedbackTypeEnum
    timeSpent: number
    orderNumber: number
}


export interface externalProductSlide {
    id: string
    type: string
    slideUrl: string
    orderNumber: number
}