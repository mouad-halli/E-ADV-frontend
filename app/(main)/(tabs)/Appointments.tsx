import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, TextInputSubmitEditingEventData, NativeSyntheticEvent, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AppDataTable, { Filters } from '@/components/Appointments/AppDataTable';
import { globalStyles } from '../../../styles/globalStyles';
import colors from '@/styles/colors';
import CalendarIcon from '@/components/ui/icons/CalendarIcon';
import LocationIcon from '@/components/ui/icons/LocationIcons';
import DateRangePickerModal, { dateRangeType } from '@/components/Appointments/DateRangePickerModal';
import { useState } from 'react';
import ListSelectorModal from '@/components/Appointments/ListSelectorModal';
import { RadioButton } from 'react-native-paper';
import useAppointments from '@/components/Appointments/useAppointments';

const Appointments = () => {

    const {
        searchText,
        setSearchText,
        handleEnterPress,
        toggleListSelectorModal,
        selectedLocation,
        appointmentDisplayStatus,
        setAppointmentDisplayStatus,
        toggleDatePickerModal,
        filters,
        isListSelectorModalVisible,
        handleSelectLocation,
        isDatePickerModalVisible,
        handleSelectedDateRange,
        handleApplyFilters,
        appointmentsList,
        isLoading,
    } = useAppointments()

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
                            <Text style={styles.CallendarButtonTextTop}>Territoire</Text>
                            <Text style={styles.CallendarButtonTextBottom}>{selectedLocation ?? "aucun"}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: 1, height: '80%', backgroundColor: colors.secondary }} className=' self-center'></View>
                    <View className='flex-row items-center'>
                        <Text style={styles.CallendarButtonTextBottom} >non visité</Text>
                        <RadioButton
                            value='notVisited'
                            onPress={() => setAppointmentDisplayStatus(appointmentDisplayStatus === "notVisited" ? undefined : "notVisited")}
                            status={appointmentDisplayStatus === "notVisited" ? 'checked' : 'unchecked' }
                            uncheckedColor={colors.secondary}
                            color={colors.primary}
                        />
                    </View>
                    <View style={{ width: 1, height: '80%', backgroundColor: colors.secondary }} className=' self-center'></View>
                    <View className='flex-row items-center'>
                        <Text style={styles.CallendarButtonTextBottom} >visité</Text>
                        <RadioButton
                            value='visited'
                            onPress={() => setAppointmentDisplayStatus(appointmentDisplayStatus === "visited" ? undefined : "visited")}
                            status={appointmentDisplayStatus === "visited" ? 'checked' : 'unchecked' }
                            uncheckedColor={colors.secondary}
                            color={colors.primary}
                        />
                    </View>
                </View>
                <View className='flex-row border rounded-lg border-secondary px-5 py-2 gap-x-4'>
                    {/* <TouchableOpacity
                        className='rounded flex-row items-center gap-x-2'
                        onPress={toggleListSelectorModal}
                    >
                        <LocationIcon />
                        <View className=''>
                            <Text style={styles.CallendarButtonTextTop}>Territoire</Text>
                            <Text style={styles.CallendarButtonTextBottom}>{selectedLocation ?? "aucun"}</Text>
                        </View>
                    </TouchableOpacity> */}
                    {/* <View style={{ width: 1, height: '80%', backgroundColor: colors.secondary }} className=' self-center'></View> */}
                    <TouchableOpacity
                        className='rounded flex-row items-center gap-x-2'
                        onPress={toggleDatePickerModal}
                    >
                        <CalendarIcon />
                        <View className=''>
                            <Text style={styles.CallendarButtonTextTop}>Date</Text>
                            <Text style={styles.CallendarButtonTextBottom}>{
                                filters.selectedDateRange.startDate && filters.selectedDateRange.endDate ?
                                `${filters.selectedDateRange.startDate?.toLocaleDateString('en-us', { month: 'short', day: 'numeric' })} / ${filters.selectedDateRange.endDate?.toLocaleDateString('en-us', { month: 'short', day: 'numeric' })}`
                                :
                                // "aucune date sélectionnée"
                                "no date"
                            }</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: 1, height: '80%', backgroundColor: colors.secondary }} className=' self-center'></View>
                    <Pressable
                        className={`flex-row items-center bg-blue-900 rounded px-2 m-0.5`}
                        onPress={handleApplyFilters}
                    >
                        <Text
                            style={[globalStyles.robotoMedium, styles.ApplyFiltersButtonText]}
                        >
                            appliquer
                        </Text>
                    </Pressable>
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
            <View className="h-full pt-3">
                <AppDataTable
                    isLoading={isLoading}
                    appointmentsList={appointmentsList}
                    location={selectedLocation}
                    searchText={searchText}
                    appointmentDisplayStatus={appointmentDisplayStatus}
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
    CheckboxText: {
        color: colors.primary,
        ...globalStyles.robotoBold,
        fontSize: 11,
    },
    ApplyFiltersButtonText: {
        color: colors.white,
        fontSize: 11,
        wordWrap: 'break-word',
        lineHeight: 20
    }
})

export default Appointments