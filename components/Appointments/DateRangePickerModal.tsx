import colors from '@/styles/colors'
import { globalStyles } from '@/styles/globalStyles'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Calendar, DateData } from 'react-native-calendars'
import Modal from 'react-native-modal'

export interface dateRangeType {
    startDate: Date | null
    endDate: Date | null
}

interface PropTypes {
    isModalVisible: boolean
    toggleModal: () => void
    handleSetSelectedDateRange: (dateRange: dateRangeType) => void
}

const DateRangePickerModal = ({
    isModalVisible,
    toggleModal,
    handleSetSelectedDateRange
}: PropTypes) => {

  const [selectedRange, setSelectedRange] = useState<dateRangeType>({ startDate: null, endDate: null })

    const onDayPress = (day: DateData) => {

        const { dateString } = day
    
        if (!selectedRange.startDate) {
            setSelectedRange({ startDate: new Date(dateString), endDate: null })
        }
        else if (!selectedRange.endDate) {
            // If start date exists and no end date, set the end date
            if (new Date(dateString) > new Date(selectedRange.startDate))
            {
                setSelectedRange({ ...selectedRange, endDate: new Date(dateString) })
            }
            else {
                // Reset if user selects a date before the start date
                setSelectedRange({ startDate: new Date(dateString), endDate: null })
            }
        }
        else {
            // Reset the date selection if both start and end are selected
            setSelectedRange({ startDate: new Date(dateString), endDate: null })
        }
    }

    const getMarkedDates = () => {
        const markedDates: { [key: string]: any } = {}
        const { startDate, endDate } = selectedRange

        if (startDate) {
            markedDates[startDate.toISOString().split('T')[0]] = { startingDay: true, color: colors.secondary, textColor: colors.black }
        }

        if (endDate) {
            markedDates[endDate.toISOString().split('T')[0]] = { endingDay: true, color: colors.secondary, textColor: colors.black }
        }

        if (startDate && endDate) {
            let currentDate = new Date(startDate)
            const lastDate = new Date(endDate)

            while (currentDate < lastDate) {
                const formattedDate = currentDate.toISOString().split('T')[0]
                markedDates[formattedDate] = { color: colors.secondary, textColor: colors.black }
                currentDate.setDate(currentDate.getDate() + 1)
            }
        }

        return markedDates
    }

    const handleDonePress = () => {
        if (selectedRange.startDate && selectedRange.endDate)
            handleSetSelectedDateRange(selectedRange)
        toggleModal()
    }

  return (
    <Modal 
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationInTiming={1} animationOutTiming={1}
        className='items-center'
    >
        <View className='p-5 gap-y-2 bg-white rounded-lg h-auto w-[27rem]'>
            <Calendar
                onDayPress={onDayPress}
                markingType="period"
                markedDates={getMarkedDates()}
                theme={{
                    arrowColor: colors.primary,
                    // backgroundColor: colors.primary,
                    // // calendarBackground: colors.primary,
                    // textSectionTitleColor: colors.primary,
                    // selectedDayBackgroundColor: colors.primary,
                    // selectedDayTextColor: colors.primary,
                    // todayTextColor: colors.primary,
                    // dayTextColor: colors.primary,
                    // textDisabledColor: colors.primary,
                    // dotColor: colors.primary,
                    // selectedDotColor: colors.primary,
                    // disabledArrowColor: colors.primary,
                    // monthTextColor: colors.primary,
                    // indicatorColor: colors.primary,
                }}
            />
            <TouchableOpacity 
                className='py-2 bg-primary rounded-lg'
                onPress={handleDonePress}
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

export default DateRangePickerModal
