import $api from "@/services/Api/API"
import { getUserProducts } from "@/services/Api/ExternalAPI"
import { externalProductType, productPresentationType } from "@/types/productPresentation"
import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { useAppContext } from "./appContext"
import productsMockData from '@/locales/mockData/products.json'

type presentationProductsContextType = {
    presentedProducts: presentedProductType[]
    isLoading: boolean
    updateProductPresentationData: (productId: string, feedback: number, latestPresentationDate: string, presentationStatus: ProductPresentationStatus) => void
}

const presentationProductsContext = createContext<presentationProductsContextType>({} as presentationProductsContextType)

export const usePresentationProductsContext = () => useContext(presentationProductsContext)

type presentationProductsProviderProps = { children: ReactNode }

export enum ProductPresentationStatus {
    NOT_PRESENTED = "not-presented",
    PRESENTED = "presented",
    CONTINUE = "continue",
    REPLAY = "replay"
}

interface presentedProductDataType {
    latestPresentationDate: string
    feedback: number,
    presentationStatus: ProductPresentationStatus
}

export interface presentedProductType extends presentedProductDataType {
    id: string
    name: string
    imgUrl: string
}
export const PresentationProductsProvider : FC<presentationProductsProviderProps> = ({ children }) => {

    const { getSelectedDoctor } = useAppContext()

    const [presentedProducts, setPresentedProducts] = useState<presentedProductType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const updateProductPresentationData = (
        productId: string,
        feedback: number,
        latestPresentationDate: string,
        presentationStatus: ProductPresentationStatus
    ) => {
        // setPresentedProducts(prevState => [
        //     ...prevState.map(item => item.id === productId
        //     ? {...item, feedback, presentationStatus, latestPresentationDate}
        //     : item
        // )])
        
        setPresentedProducts(prevState => [
            
            ...prevState.map(item => {
                if (String(item.id) === String(productId)) {
                    return {...item, feedback, presentationStatus, latestPresentationDate}
                }
                else
                    return item
            }
        )])
    }

    useEffect(() => {
        const fetchPresentationProducts = async () => {

            try {
                setIsLoading(true)
                if (presentedProducts)
                    setPresentedProducts([])
                const selectedDoctorId = getSelectedDoctor()?.id

                //TO BE REMOVED LATER: mocking products data
                // const products: externalProductType[] = await getUserProducts()
                const products: any = productsMockData

                await Promise.all(products.map(async (product: externalProductType) => {
                    try {

                        const data: presentedProductDataType = (await $api.get("productPresentation/summary", { params: { doctorId: (selectedDoctorId), productId: product.id } })).data
                        
                        const presentedProduct: presentedProductType = {...product, ...data}
                    
                        setPresentedProducts(prevState => [...prevState, presentedProduct])

                    } catch (error: any) {
                        const errResponse = (error?.response?.data) || error?.message
                        console.error('error getting presentedProducts data:', errResponse)
                    }
                }))
                setIsLoading(false)
            } catch (error: any) {
                setIsLoading(false)
                const errResponse = (error?.response?.data) || error?.message
                console.error('error getting products from external api:', errResponse)
            }

        }
        if (getSelectedDoctor()?.id)
            fetchPresentationProducts()
    }, [getSelectedDoctor()?.id])

    const value = useMemo(
        () => ({
            presentedProducts,
            isLoading,
            updateProductPresentationData,
        })
        , [presentedProducts, isLoading, getSelectedDoctor()?.id]
    )

    return (
        <presentationProductsContext.Provider value={value}>
            {children}
        </presentationProductsContext.Provider>
    )
}