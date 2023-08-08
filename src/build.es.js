import { defineCustomElement } from 'vue'

import CurrentTime from './components/CurrentTime.ce.vue'

import './style.css'

const CurrentTimeComponent = defineCustomElement(CurrentTime)

if (!customElements.get('current-time')) {
    customElements.define('current-time', CurrentTimeComponent)
}

export { CurrentTime }
