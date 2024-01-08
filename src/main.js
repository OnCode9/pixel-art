import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import 'primevue/resources/themes/mira/theme.css'
import PrimeVue from 'primevue/config'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(PrimeVue, { ripple: true })

app.mount('#app')
