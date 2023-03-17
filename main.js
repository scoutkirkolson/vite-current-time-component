import './style.css';
import { defineCustomElement } from 'vue';
import CurrentTime from './components/CurrentTime.ce.vue';

const CurrentTimeComponent = defineCustomElement(CurrentTime);

customElements.define('current-time', CurrentTimeComponent);

export default CurrentTime