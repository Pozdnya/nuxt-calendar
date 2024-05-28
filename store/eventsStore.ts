import { defineStore } from "pinia";

export interface IEvent {
  title: string
  date: string | Date
  allDay: boolean
}
// export interface IEvent {
//   title: string;
//   start: Date | string;
//   end: Date | null;
//   startTime: Date | null;
//   endTime: Date | null;
//   allDay: true;
// }

export const useEventsStore = defineStore('eventsStore', () => {
  const events = reactive<IEvent[]>([])

  const addEvent = (event: IEvent) => {
    events.push(event)
  }

  return {
    events,
    addEvent,
  }
})