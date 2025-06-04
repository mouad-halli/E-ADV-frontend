import { dateRangeType } from "@/components/Appointments/DateRangePickerModal"

// takes a date and returns monday and friday dates of its week
export const getWeekStartAndEnd = (now: Date): dateRangeType => {
    //[sunday, monday, thuesday, wednesday, thursday, friday, saturday]
    //[   0  ,    1  ,     2   ,      3   ,     4   ,    5  ,     6   ]
    
    const nowDayNbr = now.getDay()
    const diffDaysToMonday = nowDayNbr === 0 ? -6 : 1 - nowDayNbr
    
    const mondayDate = new Date(now)
    mondayDate.setDate(now.getDate() + diffDaysToMonday)
    const fridayDate = new Date(mondayDate)
    fridayDate.setDate(mondayDate.getDate() + 4)
    
    return {
        startDate: mondayDate,
        endDate: fridayDate
    }
}