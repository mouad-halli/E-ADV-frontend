import colors from '@/styles/colors'
import { globalStyles } from '@/styles/globalStyles'
import { View, Text, FlatList, TouchableOpacity, Pressable, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'

interface PropTypes {
    isModalVisible: boolean
    toggleModal: () => void
    data: any[]
    listTitle?: string
    handleSelectItem: (item: any) => void
    selectedLocation: string | undefined
}

const ListSelectorModal = ({
    isModalVisible,
    toggleModal,
    data,
    listTitle = 'Select an item',
    handleSelectItem,
    selectedLocation
}: PropTypes) => {

    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            animationInTiming={0} animationOutTiming={0}
            backdropTransitionInTiming={1}
            backdropTransitionOutTiming={1}
            className='items-center'
        >
            <View className='p-5 gap-y-5 bg-white rounded-lg h-[29rem] w-[27rem]'>
                <Text style={[globalStyles.robotoBold]} className='text-lg '>{listTitle}</Text>
                <FlatList
                    className=''
                    data={data}
                    keyExtractor={(item, idx) => idx.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className={`p-4 ${item === selectedLocation && 'bg-secondary'}`}
                            style={{ borderRadius: 10 }}
                            onPress={() => handleSelectItem(item)}
                        >
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
                <TouchableOpacity 
                    className='py-2 bg-primary rounded-lg'
                    onPress={toggleModal}
                >
                    <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        color: colors.white,
        ...globalStyles.robotoMedium,
        fontSize: 16,
        wordWrap: 'break-word',
        lineHeight: 20,
        textAlign: 'center'
    },
})

export default ListSelectorModal