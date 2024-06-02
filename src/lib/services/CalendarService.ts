import type { Month } from "$lib/models/Calendar"
import type { CalendarRepository } from "$lib/repositories/CalendarRepository"
import LocalCalendarRepository from "$lib/repositories/local/LocalCalendarRepository"

export default class CalendarService {
    private calendarRepository: CalendarRepository

    constructor() {
        this.calendarRepository = new LocalCalendarRepository()
    }

    getMonth(year: number, month: number): Month {
        return this.calendarRepository.getMonth(year, month)
    }

    getNextMonth(year: number, month: number): Month {
        if (month < 11) {
            month++
        } else {
            year++
            month = 0
        }
        return this.calendarRepository.getMonth(year, month)
    }

    getPreviousMonth(year: number, month: number): Month {
        if (month > 0) {
            month--
        } else {
            year--
            month = 11
        }
        return this.calendarRepository.getMonth(year, month)
    }

    storeMonth(month: Month) {
        this.calendarRepository.save(month)
    }
}