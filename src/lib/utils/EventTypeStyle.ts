import { EventType } from "../models/Calendar";

export type EventTypeUI = {
    event: EventType;
    text: string
    background: string
    ring: string
    shadow: string
    icon: string
}

export function eventTypes(): EventTypeUI[] {
    return Object.values(EventType).map(eventType => {
        const color: EventTypeColor = eventTypeColors.find(etc => etc.event == eventType) || UI_FREE

        return <EventTypeUI>{
            event: eventType,
            text: `text-${color.color}-700`,
            background: `bg-${color.color}-100`,
            ring: `ring-${color.color}-700`,
            shadow: `shadow-${color.color}-300`,
            icon: color.icon
        }
    })
}

////////////////////////////////////////////////////
type EventTypeColor = {
    event: EventType
    color: string
    icon: string
}

const UI_FREE: EventTypeColor = {
    event: EventType.FREE,
    color: "green",
    icon: "home.svg"
}
const UI_REGULAR: EventTypeColor = {
    event: EventType.REGULAR,
    color: "gray",
    icon: "cordoba.svg"
}
const UI_BASE_NATIONAL: EventTypeColor = {
    event: EventType.BASE_NATIONAL,
    color: "yellow",
    icon: "national.svg"
}
const UI_TRANSITION_NATIONAL: EventTypeColor = {
    event: EventType.TRANSIT_NATIONAL,
    color: "red",
    icon: "t_nacional.svg"
}
const UI_BASE_INTERNATIONAL: EventTypeColor = {
    event: EventType.BASE_INTERNATIONAL,
    color: "blue",
    icon: "international.svg"
}

const UI_TRANSITION_INTERNATIONAL: EventTypeColor = {
    event: EventType.TRANSIT_INTERNATIONAL,
    color: "orange",
    icon: "t_internacional.svg"
}

const eventTypeColors: EventTypeColor[] = [UI_FREE, UI_REGULAR, UI_BASE_NATIONAL, UI_TRANSITION_NATIONAL, UI_BASE_INTERNATIONAL, UI_TRANSITION_INTERNATIONAL]