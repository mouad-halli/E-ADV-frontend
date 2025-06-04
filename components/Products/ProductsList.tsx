import { FlatList, View } from "react-native"
import ProductsItem from "./ProductsItem"
import { externalProductType } from "@/types/productPresentation"
import { presentedProductType } from "@/contexts/presentationProductsContext"

interface PropTypes {
    products: presentedProductType[]
    // startProductPresentation: (productId: string) => void
}

const ProductsList = ({ products/*, startProductPresentation*/ }: PropTypes) => {

    return (
        // <View className="flex-row justify-center flex-wrap gap-y-2 gap-x-28">
        // {products.map((item) => (
        //     <ProductsItem
        //         key={item.id}
        //         product={item}
        //         // startProductPresentation={startProductPresentation}
        //     />
        // ))}
        // </View>
        <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <ProductsItem
                  product={item}
                />
            )}
            numColumns={3}
            // contentContainerStyle={{ paddingVertical: 10 }}
            columnWrapperStyle={{ justifyContent: "space-evenly", marginBottom: 16 }}
            showsVerticalScrollIndicator={true}
        />
    )
}

export default ProductsList