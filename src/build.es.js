import { defineCustomElement } from 'vue';

import CurrentTime from './components/CurrentTime.ce.vue';

const CurrentTimeComponent = defineCustomElement(CurrentTime)

if (!customElements.get('current-time')) {
    customElements.define('current-time', CurrentTimeComponent)
}

export { CurrentTime }
