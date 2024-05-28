import { defineStore } from "pinia";

export interface IEvent {
  id: string
  title: string
  date: string | Date
  allDay: boolean
}

export const useEventsStore = defineStore('eventsStore', () => {
  const events = reactive<IEvent[]>([])

  const addEvent = (event: IEvent) => {
    events.push(event)
  }

  const updateEvent = (updatedEvent: IEvent) => {
    const index = events.findIndex(event => event.id === updatedEvent.id)
    if (index !== -1) {
      events[index] = { ...events[index], ...updatedEvent }
    }
  }

  const removeEvent = (removedEvent: IEvent) => {
    const index = events.findIndex(event => event.id === removedEvent.id)
    if (index !== -1) {
      events.splice(index, 1)
    }
  }

  return {
    events,
    addEvent,
    updateEvent,
    removeEvent,
  }
})