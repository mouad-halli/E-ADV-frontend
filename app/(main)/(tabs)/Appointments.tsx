import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, TextInputSubmitEditingEventData, NativeSyntheticEvent } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AppDataTable from '@/components/Appointments/AppDataTable';
import { globalStyles } from '../../../styles/globalStyles';
import colors from '@/styles/colors';
import CalendarIcon from '@/components/ui/icons/CalendarIcon';
import LocationIcon from '@/components/ui/icons/LocationIcons';
import DateRangePickerModal, { dateRangeType } from '@/components/Appointments/DateRangePickerModal';
import { useState } from 'react';
import ListSelectorModal from '@/components/Appointments/ListSelectorModal';

const Appointments = () => {

    const [isDatePickerModalVisible, setIsDatePickerModalVisible] = useState(false)
    const [isListSelectorModalVisible, setIsListSelectorModalVisible] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [selectedDateRange, setSelectedDateRange] = useState<dateRangeType>({ startDate: null, endDate: null })
    const [selectedLocation, setSelectedLocation] = useState("")

    const toggleDatePickerModal = () => {
        setIsDatePickerModalVisible(!isDatePickerModalVisible)
    }

    const toggleListSelectorModal = () => {
        setIsListSelectorModalVisible(!isListSelectorModalVisible)
    }
    
    const handleSelectLocation = (location: string) => {
        setSelectedLocation(location === selectedLocation ? "" : location)
        setIsListSelectorModalVisible(false)
    }

    const handleSelectedDateRange = (dateRange: dateRangeType) => {
        setSelectedDateRange(dateRange)
    }


    const handleEnterPress = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        if (searchText.trim() !== "") {
            console.log(searchText)
            setSearchText("")
        }
    }

    return (
        <SafeAreaView className=" pt-28 px-8 h-full flex bg-white">  
        <View className="h-full gap-y-4 pt-3">
            <View className='flex-row justify-between'>
                <View
                    className='w-2/6 h-min flex-row items-center border border-customGrey rounded-lg'
                >
                    <TextInput
                        style={styles.searchInputText}
                        className='w-11/12 placeholder:text-gray-500 placeholder:text-sm pl-4 py-1.5'
                        placeholder='search'
                        numberOfLines={1}
                        onChangeText={setSearchText}
                        returnKeyType="done"
                        value={searchText}
                        onSubmitEditing={handleEnterPress}
                    />
                    <Ionicons className='w-1/12' name="search" size={20} color={colors.grey}/>
                </View>
                <View className='flex-row border rounded-lg border-secondary px-5 py-2 gap-x-4'>
                    <TouchableOpacity
                        className='rounded flex-row items-center gap-x-2'
                        onPress={toggleListSelectorModal}
                    >
                        <LocationIcon />
                        <View className=''>
                            <Text style={styles.CallendarButtonTextTop}>Location</Text>
                            <Text style={styles.CallendarButtonTextBottom}>{selectedLocation}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: 1, height: '80%', backgroundColor: colors.secondary }} className=' self-center'></View>
                    <TouchableOpacity
                        className='rounded flex-row items-center gap-x-2'
                        onPress={toggleDatePickerModal}
                    >
                        <CalendarIcon />
                        <View className=''>
                            <Text style={styles.CallendarButtonTextTop}>Date</Text>
                            <Text style={styles.CallendarButtonTextBottom}>{
                            `${selectedDateRange.startDate?.toLocaleDateString('en-us', { month: 'short', day: 'numeric' })} / ${selectedDateRange.endDate?.toLocaleDateString('en-us', { month: 'short', day: 'numeric' })}`
                            }</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ListSelectorModal
                    isModalVisible={isListSelectorModalVisible}
                    toggleModal={toggleListSelectorModal}
                    data={['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10']}
                    handleSelectItem={handleSelectLocation}
                    selectedLocation={selectedLocation}
                    listTitle='Select appointment location'
                />
                <DateRangePickerModal
                    isModalVisible={isDatePickerModalVisible}
                    toggleModal={toggleDatePickerModal}
                    handleSetSelectedDateRange={handleSelectedDateRange}
                />
            </View>
            <View className="h-full">
                <AppDataTable
                    dateRange={selectedDateRange}
                    location={selectedLocation}
                    searchText={searchText}
                />
            </View>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    searchInputText: {
        fontSize: 14,
        lineHeight: 20,
        ...globalStyles.roboto
    },
    CallendarButtonTextTop: {
        color: colors.primary,
        ...globalStyles.roboto,
        fontSize: 8,
    },
    CallendarButtonTextBottom: {
        color: colors.primary,
        ...globalStyles.robotoMedium,
        fontSize: 11,
    },
})

export default Appointments