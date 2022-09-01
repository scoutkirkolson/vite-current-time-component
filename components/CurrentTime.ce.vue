<template>
  <div class="current-time-component" v-on:timezonechange="changeTimeZone">
    <slot name="prefix" />
    {{ displayTime }} ...
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';

const props = defineProps({
  timeZone: {
    type: String,
    default: 'Europe/Amsterdam',
  },
});

const emit = defineEmits(['datechange']);

const currentDateTime = ref(new Date());
const currentTimeZone = ref(props.timeZone);

const displayTime = computed(() =>
  currentDateTime.value.toLocaleString('nl-NL', {
    timeZone: currentTimeZone.value,
  })
);

function changeTimeZone(event) {
  console.log(event.detail)
  currentTimeZone.value = event.detail?.timeZone || 'Europe/Amsterdam'
}

document.querySelector('current-time').addEventListener('timezonechange', changeTimeZone)

setInterval(() => {
  currentDateTime.value = new Date();
  emit('datechange', displayTime);
}, 1000);
</script>

<style>
.current-time-component {
  color: red;
}
</style>
