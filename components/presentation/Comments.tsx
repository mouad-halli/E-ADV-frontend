import colors from '@/styles/colors'
import { globalStyles } from '@/styles/globalStyles'
import { productSlideType } from '@/types/productSlide'
import { View, Text, StyleSheet, FlatList } from 'react-native'

interface PropTypes {
    productSlides: productSlideType[]
}

const Comments = ({productSlides}: PropTypes) => {
    return (
        <FlatList
            className='pt-4 px-4'
            data={productSlides.filter((slide) => slide.comment.trim() !== '')}
            keyExtractor={(slide, idx) => idx.toString()}
            renderItem={({ item }) => (
                <View style={styles.commentContainer}>
                    <View style={styles.commentHeader}>
                        <Text style={[styles.commentHeaderText, globalStyles.roboto]} >
                            Slide {productSlides.findIndex(slide => String(slide.id) === String(item.slideId)) + 1}
                        </Text>
                    </View>
                    <View style={styles.comment}>
                        <Text style={[styles.commentText, globalStyles.roboto]}>
                            {item.comment}
                        </Text>
                    </View>
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: 'white',
        borderRadius: 4,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#1e3a8a',
        position: 'relative',
    },
    commentHeader: {
        position: 'absolute',
        top: -12,
        left: 16,
        backgroundColor: 'white',
        paddingHorizontal: 8,
        borderRadius: 10,
        zIndex: 10
    },
    commentHeaderText: {
        fontSize: 10,
        color: colors.primary
    },
    comment: {
        paddingHorizontal: 16,
        paddingVertical: 10
    },
    commentText: {
        fontSize: 12,
        lineHeight: 20,
    }
})

export default Comments