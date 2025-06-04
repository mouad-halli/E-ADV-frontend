import $api from "@/services/Api/API"
import { getUserProducts } from "@/services/Api/ExternalAPI"
import { externalProductType, productPresentationType } from "@/types/productPresentation"
import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { useAppContext } from "./appContext"

type presentationProductsContextType = {
    presentedProducts: presentedProductType[]
    isLoading: boolean
}

const presentationProductsContext = createContext<presentationProductsContextType>({} as presentationProductsContextType)

export const usePresentationProductsContext = () => useContext(presentationProductsContext)

type presentationProductsProviderProps = { children: ReactNode }

interface presentedProductDataType {
    latestPresentationDate: string
    feedback: number,
    presentationStatus: "not-presented" | "presented" | "continue"
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

    useEffect(() => {
        const fetchPresentationProducts = async () => {

            try {
                setIsLoading(true)
                const selectedDoctorId = getSelectedDoctor()?.id
                const products = await getUserProducts()

                await Promise.all(products.map(async (product) => {
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
        fetchPresentationProducts()
    }, [])

    const value = useMemo(
        () => ({
            presentedProducts,
            isLoading
        })
        , [presentedProducts, isLoading]
    )

    return (
        <presentationProductsContext.Provider value={value}>
            {children}
        </presentationProductsContext.Provider>
    )
}