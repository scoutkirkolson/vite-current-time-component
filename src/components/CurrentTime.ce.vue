<template>
  <div class="current-time-component" :id="id">
    <slot name="prefix" />
    {{ displayTime }} ...
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  timeZone: {
    type: String,
    default: 'Europe/Amsterdam',
  },
});

const emit = defineEmits(['datechange']);

const currentDateTime = ref(new Date());
const currentTimeZone = ref(props.timeZone);

console.log('props', props)

const displayTime = computed(() =>
  currentDateTime.value.toLocaleString('nl-NL', {
    timeZone: currentTimeZone.value || 'Europe/Amsterdam',
  })
);

function changeTimeZone(event) {
  console.log('changeTimeZone', event.detail)
  currentTimeZone.value = event.detail?.timeZone || 'Europe/Amsterdam'
}

function listenEvents() {
  console.log('listenEvents', props)
  document
    .querySelector(props.id ? ('#' + props.id) : 'current-time')
    .addEventListener('timezonechange', changeTimeZone)
  //document.addEventListener('timezonechange', changeTimeZone)
}

onMounted(listenEvents)

setInterval(() => {
  currentDateTime.value = new Date();
  emit('datechange', displayTime);
}, 1000);
</script>

<style>
.current-time-component {
  color: purple;
}
</style>
