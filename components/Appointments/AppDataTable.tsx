import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';
import colors from '@/styles/colors';
import { globalStyles } from '@/styles/globalStyles';
import useDataTable from './useDataTable';
import LoadingScreen from '../LoadingScreen';
import AntDesign from '@expo/vector-icons/build/AntDesign';
import { appointment } from './useAppointments';

interface PropTypes {
    appointmentsList: appointment[]
    searchText: string
    displayNotVisited: boolean
}


const AppDataTable = ({
    appointmentsList,
    searchText,
    displayNotVisited
}: PropTypes) => {
    const {
        page,
        from,
        to,
        numberOfPages,
        handlePageChange,
        filteredAppointmentsList,
        handleRowPres,
    } = useDataTable(appointmentsList, searchText, displayNotVisited)

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
                <DataTable.Row onPress={() => handleRowPres(appointment)} style={[appointment.isVisited ? styles.visitedAppointmentRow : styles.row]} key={appointment.id}>
                    <DataTable.Cell textStyle={[appointment.isVisited ? styles.visitedAppointmentRowText : styles.text]}>{appointment.doctor.name}</DataTable.Cell>
                    <DataTable.Cell textStyle={[appointment.isVisited ? styles.visitedAppointmentRowText : styles.text]}>{appointment.doctor.speciality}</DataTable.Cell>
                    <DataTable.Cell textStyle={[appointment.isVisited ? styles.visitedAppointmentRowText : styles.text]}>{appointment.doctor.contact}</DataTable.Cell>
                    <DataTable.Cell textStyle={[appointment.isVisited ? styles.visitedAppointmentRowText : styles.text]}>{appointment.doctor.city}</DataTable.Cell>
                    <DataTable.Cell textStyle={[appointment.isVisited ? styles.visitedAppointmentRowText : styles.text]}>{appointment.doctor.workPlace}</DataTable.Cell>
                    <DataTable.Cell textStyle={[appointment.isVisited ? styles.visitedAppointmentRowText : styles.text]}>{appointment.doctor.workPlace}</DataTable.Cell>
                    <DataTable.Cell textStyle={[appointment.isVisited ? styles.visitedAppointmentRowText : styles.text]}>{new Date(appointment.appointmentDate).toLocaleDateString()}</DataTable.Cell>
                    <DataTable.Cell textStyle={[styles.text]}>
                        <AntDesign
                            name={appointment.isVisited ? "check" : "close"}
                            color={appointment.isVisited ? "green" : "black" }
                            size={24}
                        />
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
    visitedAppointmentRow: {
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
    },
    text: {
        color: colors.black,
        fontSize: 14,
        ...globalStyles.roboto
    },
    visitedAppointmentRowText: {
        color: "green",
        fontSize: 14,
        ...globalStyles.roboto
    },
})

export default AppDataTable