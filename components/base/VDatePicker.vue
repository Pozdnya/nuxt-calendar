<script setup lang="ts">
export interface VDatePickerProps {
  modelValue?: null | string
  type: 'date' | 'time'
}

const props = defineProps<VDatePickerProps>();

const { id } = useVFieldContext({
  create: false,
  help: 'VDatePicker',
});

const selectedDate = ref<Date | string>(props.modelValue || '');
const dateFormat = useDateFormat()

const classes = computed(() => {
  return ['input', 'v-datepicker'];
});

// const formatedDate = computed(() => {
//   if (props.type === 'date') {
//     return dateFormat.formatDate(new Date(selectedDate.value));
//   }
// });

const emit = defineEmits(['update:modelValue'])

function updateInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div>
    <input
      :type="props.type" 
      :value="props.modelValue"
      @input="updateInput"
      :id="id" 
      :class="classes"
      style="width: fit-content; font-size: 1.2rem;"
      :min="props.type === 'date' ? props.modelValue?.toString(): ''"
    />
  </div>
</template>