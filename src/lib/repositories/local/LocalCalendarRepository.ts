import type { Calendar, Month } from "$lib/models/Calendar";
import { CalendarRepository } from "../CalendarRepository";

const LS_KEY = "CALENDAR"

export default class LocalCalendarRepository extends CalendarRepository {
    retrieveMonth(year: number, month: number): Month | undefined {
        const saved = localStorage.getItem(LS_KEY)
        if (saved) {
            const calendar: Calendar = JSON.parse(saved)
            return calendar.months.find(m => m.year == year && m.number == month)
        } else {
            return undefined
        }
    }

    save(month: Month): void {
        const saved = localStorage.getItem(LS_KEY)

        if (saved) {
            let calendar: Calendar = JSON.parse(saved)
            const monthPos: number = calendar.months.findIndex(m => m.year == month.year && m.number == month.number)
            console.log(monthPos)
            if (monthPos < 0) {
                calendar.months.push(month)
            } else {
                calendar.months[monthPos] = month
            }

            localStorage.setItem(LS_KEY, JSON.stringify(calendar))
        } else {
            const calendar: Calendar = {
                months: [month]
            }
            localStorage.setItem(LS_KEY, JSON.stringify(calendar))
        }
    }
}