<script setup lang="ts">
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'
// import { useEventsStore, type IEvent } from '~/store/eventsStore'

const eventsStore = useEventsStore()
const dateFormat = useDateFormat()

const showModal = ref<boolean>(false)
const eventTitle = ref<string>()
const date = ref<string | null>(null)
const time = ref<string | null>(null)

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  dateClick: handleSelect,
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
}

function addEvent() {
  if (eventTitle.value && date.value) {
    const dateTime = dateFormat.combineDateAndTime(date.value, time.value)

    const newEvent: IEvent = {
      title: eventTitle.value,
      date: dateTime,
      allDay: !time.value,
    }

    eventsStore.addEvent(newEvent)
    resetForm()
    closeModal()
  }
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
        <VField :id="'event-title'" :label="`Event's name`">
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
      </div>
    </template>
    <template #action>
      <VButton :color="'success'" @click="addEvent">Add Event</VButton>
    </template>
  </VModal>
</template>

<style scoped lang="scss"></style>