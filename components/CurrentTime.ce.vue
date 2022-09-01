<template>
  <div class="current-time-component">
    <slot name="prefix" />
    {{ displayTime }}
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  timeZone: {
    type: String,
    default: 'Europe/Amsterdam',
  },
});

const emit = defineEmits(['datechange']);

const currentDateTime = ref(new Date());
const displayTime = computed(() =>
  currentDateTime.value.toLocaleString('nl-NL', {
    timeZone: props.timeZone,
  })
);

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
