import { EventType, type Month, type Week } from "$lib/models/Calendar";

export abstract class CalendarRepository {
    abstract save(month: Month): void
    abstract retrieveMonth(year: number, month: number): Month | undefined

    getMonth(year: number, month: number): Month {
        const saved = this.retrieveMonth(year, month)
        if (saved) {
            return saved
        }

        return this._defaultMonth(year, month)
    }

    _defaultMonth(year: number, month: number): Month {
        const weeks: Week[] = []

        let week: Week = {
            days: []
        }

        for (let day = 1; day <= 32; day++) {
            const date = new Date(year, month, day)
            // Spanish day based on Monday as first day
            const dayOfTheWeek = (date.getDay() + 7 - 1) % 7

            if (date.getMonth() != month) {
                if (week.days.length > 0) {
                    weeks.push(week)
                }
                break
            }

            week.days[dayOfTheWeek] = {
                number: day,
                eventType: dayOfTheWeek < 5 ? EventType.REGULAR : EventType.FREE
            }

            // When the week is over (Sunday), end it
            if (dayOfTheWeek == 6) {
                weeks.push(week)
                week = {
                    days: []
                }
            }
        }

        return {
            year: year,
            number: month,
            weeks: weeks
        }
    }
}