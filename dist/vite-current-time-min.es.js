import { ref, computed, onMounted, openBlock, createElementBlock, renderSlot, createTextVNode, toDisplayString, unref, defineCustomElement } from 'vue';

var style = '';

var _style_0 = ".current-time-component{color:green}\n";

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _hoisted_1 = { class: "current-time-component" };


const _sfc_main = {
  __name: 'CurrentTime.ce',
  props: {
  id: {
    type: String,
    default: '',
  },
  timeZone: {
    type: String,
    default: 'Europe/Amsterdam',
  },
},
  emits: ['datechange'],
  setup(__props, { emit }) {

const props = __props;





const currentDateTime = ref(new Date());
const currentTimeZone = ref(props.timeZone);

const displayTime = computed(() =>
  currentDateTime.value.toLocaleString('nl-NL', {
    timeZone: currentTimeZone.value,
  })
);

function changeTimeZone(event) {
  console.log('changeTimeZone', event.detail);
  currentTimeZone.value = event.detail?.timeZone || 'Europe/Amsterdam';
}

function listenEvents() {
  console.log('listenEvents', props);
  document
    .querySelector(props.id ? ('#' + props.id) : 'current-time')
    .addEventListener('timezonechange', changeTimeZone);
  //document.addEventListener('timezonechange', changeTimeZone)
}

onMounted(listenEvents);

setInterval(() => {
  currentDateTime.value = new Date();
  emit('datechange', displayTime);
}, 1000);

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "prefix"),
    createTextVNode(" " + toDisplayString(unref(displayTime)) + " ... ", 1)
  ]))
}
}

};
var CurrentTime = /*#__PURE__*/_export_sfc(_sfc_main, [['styles',[_style_0]]]);

const CurrentTimeComponent = defineCustomElement(CurrentTime);

customElements.define('current-time', CurrentTimeComponent);

export { CurrentTime as default };
//# sourceMappingURL=vite-current-time-min.es.js.map
