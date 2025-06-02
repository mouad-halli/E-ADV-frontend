import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';
import colors from '@/styles/colors';
import { globalStyles } from '@/styles/globalStyles';
import useDataTable from './useDataTable';
import { dateRangeType } from './DateRangePickerModal';
import LoadingScreen from '../LoadingScreen';
import ConfirmerIcon from '../ui/icons/ConfirmerIcon';
import Checkmark from '../ui/icons/Checkmark';
import AntDesign from '@expo/vector-icons/build/AntDesign';
import { appointment } from './useAppointments';

export interface Filters {
    selectedDateRange: dateRangeType
}

interface PropTypes {
    appointmentsList: appointment[]
    location: string | undefined
    searchText: string
    appointmentDisplayStatus: "visited" | "notVisited" | undefined
    isLoading: boolean
}


const AppDataTable = ({
    isLoading,
    appointmentsList,
    location,
    searchText,
    appointmentDisplayStatus
}: PropTypes) => {
    const {
        page,
        from,
        to,
        numberOfPages,
        handlePageChange,
        filteredAppointmentsList,
        handleRowPres,
        // isLoading
    } = useDataTable(appointmentsList, location, searchText, appointmentDisplayStatus)

    if (isLoading)
        return <LoadingScreen />

    return (
        <DataTable>
            <DataTable.Header style={[styles.header, styles.row]}>
                <DataTable.Title textStyle={styles.title} >Nom</DataTable.Title>
                <DataTable.Title textStyle={styles.title} >Spécialité</DataTable.Title>
                <DataTable.Title textStyle={styles.title} >Contact</DataTable.Title>
                <DataTable.Title textStyle={styles.title} >Ville</DataTable.Title>
                <DataTable.Title textStyle={styles.title} >lieu de travail</DataTable.Title>
                <DataTable.Title textStyle={styles.title} >Date</DataTable.Title>
                <DataTable.Title textStyle={styles.title} >Visité</DataTable.Title>
            </DataTable.Header> 
            {Array.isArray(filteredAppointmentsList) && filteredAppointmentsList.slice(from, to).map((appointment) => (
                <DataTable.Row onPress={() => handleRowPres(appointment)} style={styles.row} key={appointment.id}>
                    <DataTable.Cell textStyle={styles.text}>{appointment.doctor.name}</DataTable.Cell>
                    <DataTable.Cell textStyle={styles.text}>{appointment.doctor.speciality}</DataTable.Cell>
                    <DataTable.Cell textStyle={styles.text}>{appointment.doctor.contact}</DataTable.Cell>
                    <DataTable.Cell textStyle={styles.text}>{appointment.doctor.city}</DataTable.Cell>
                    <DataTable.Cell textStyle={styles.text}>{appointment.doctor.workPlace}</DataTable.Cell>
                    <DataTable.Cell textStyle={styles.text}>{appointment.doctor.workPlace}</DataTable.Cell>
                    <DataTable.Cell textStyle={styles.text}>{new Date(appointment.appointmentDate).toLocaleDateString()}</DataTable.Cell>
                    <DataTable.Cell textStyle={[styles.text]}>
                        {appointment.isVisited ?
                            <Checkmark />
                            :
                            <AntDesign name="close" size={24} color="black" />
                        }
                    </DataTable.Cell>
                </DataTable.Row>
            ))} 
            <DataTable.Pagination
                page={page}
                numberOfPages={numberOfPages}
                onPageChange={handlePageChange}
                label={`${from + 1}-${to} of ${filteredAppointmentsList.length}`}
                // numberOfItemsPerPageList={numberOfItemsPerPageList}
                // numberOfItemsPerPage={itemsPerPage}
                // onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                selectPageDropdownLabel={'Rows per page'}
            />
        </DataTable>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.third,
    },
    title: {
        color: colors.primary,
        fontSize: 16,
        ...globalStyles.robotoBold
    },
    row: {
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
    },
    text: {
        color: colors.black,
        fontSize: 14,
        ...globalStyles.roboto
    },
})

export default AppDataTable