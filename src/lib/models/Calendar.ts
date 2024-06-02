export type Calendar = {
    months: Month[]
}

export type Month = {
    year: number;
    number: number;
    weeks: Week[]
}

// Each week should have 7 days
export type Week = {
    days: Day[]
}

export type Day = {
    number: number;
    eventType: EventType
}

export enum EventType {
    FREE = "Descanso",
    REGULAR = "Córdoba",
    BASE_NATIONAL = "Base Nacional",
    TRANSIT_NATIONAL = "Tránsito Nacional",
    BASE_INTERNATIONAL = "Base Internacional",
    TRANSIT_INTERNATIONAL = "Tránsito Internacional",
}