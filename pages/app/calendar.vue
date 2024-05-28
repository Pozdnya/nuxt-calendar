<script setup lang="ts">
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEventsStore, type IEvent } from '~/store/eventsStore'
import { v4 as uuidv4 } from 'uuid';

const eventsStore = useEventsStore()
const dateFormat = useDateFormat()

const showModal = ref<boolean>(false)
const eventTitle = ref<string>()
const date = ref<string | null>(null)
const time = ref<string | null>(null)
const selectedEvent = ref<IEvent | null>(null)
const isEditing = ref<boolean>(false)

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  dateClick: handleSelect,
  eventClick: handleClick,
  editable: true,
  selectable: true,
  events: eventsStore.events,
  headerToolbar: {
    left: 'prev today next',
    center: 'title',
    right: 'dayGridMonth timeGridWeek timeGridDay'
  },
})

function handleSelect(args: any) {
  date.value = dateFormat.formatDate(args.date)
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  isEditing.value = false
}

function handleClick(info: any) {
  isEditing.value = true
  const event = info.event
  selectedEvent.value = eventsStore.events.find(e => e.id === event.id) || null

  if (selectedEvent.value) {
    eventTitle.value = selectedEvent.value.title
    date.value = dateFormat.formatDate(selectedEvent.value.date.toString())
    time.value = selectedEvent.value.allDay ? null : dateFormat.formatTime(selectedEvent.value.date.toString())
    showModal.value = true
  }
}

function addEventHandler() {
  isEditing.value = false

  if (eventTitle.value && date.value) {
    const dateTime = dateFormat.combineDateAndTime(date.value, time.value)
    const newEvent: IEvent = {
      id: uuidv4(),
      title: eventTitle.value,
      date: dateTime,
      allDay: !time.value,
    }

    eventsStore.addEvent(newEvent)
    resetForm()
    closeModal()
  }
}

function editEventHandler() {
  const dateTime = dateFormat.combineDateAndTime(date.value, time.value)
  isEditing.value = true
  if (selectedEvent.value) {
    selectedEvent.value.title = eventTitle.value!
    selectedEvent.value.date = dateTime
    selectedEvent.value.allDay = !time.value
    eventsStore.updateEvent(selectedEvent.value)
  }

  closeModal()
  resetForm()
}

function removeEventHandler() {
  if (selectedEvent.value) {
    eventsStore.removeEvent(selectedEvent.value)
    selectedEvent.value = null
  }

  closeModal()
}

function resetForm() {
  eventTitle.value = ''
  date.value = null
  time.value = null
}
</script>

<template>
  <FullCalendar :options="calendarOptions" />
  <VModal title="Add event" :open="showModal" :noscroll="true" @close="closeModal">
    <template #content>
      <div class="modal-form">
        <VField :id="'event-title'" :label="isEditing ? `Set new event's name ` :`Event's name`">
          <VLabel :id="'event-title'" />
          <VInput v-model="eventTitle" />
        </VField>

        <VFlex :columnGap="'2rem'" :justifyContent="'flex-end'">
          <VField>
            <VDatePicker :type="'date'" v-model="date" />
          </VField>

          <VField>
            <VDatePicker type="time" v-model="time" />
          </VField>
        </VFlex>
        <VFlex v-if="isEditing" :justifyContent="'flex-end'">
          <VIconButton 
            :color="'warning'" 
            :icon="'lucide:recycle'"
            :outlined="true"
            :circle="true"
            @click="removeEventHandler"
          />
        </VFlex>
      </div>
    </template>
    <template #action>
      <VButton v-if="!isEditing" :color="'success'" @click="addEventHandler">Add Event</VButton>
      <VButton v-if="isEditing" :color="'success'" @click="editEventHandler">Edit Event</VButton>
    </template>
  </VModal>
</template>

<style scoped lang="scss"></style>