import { externalProductType } from '@/types/productPresentation'
import { externalProductSlide } from '@/types/productSlide'
import axios from 'axios'

const $external_api = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_EXTERNAL_API}`,
})

export const getUserProducts = async (): Promise<externalProductType[]> => {
    return (await $external_api.get("/user/products", {params: { employeeNumber: 1234, key: "82082af0" }})).data
}

export const getProductSlides = async (productId: string): Promise<externalProductSlide[]> => {
    return (await $external_api.get("/product/slides",  { params: { productId, employeeNumber: 1234, key: "82082af0" }})).data
}

export default $external_api