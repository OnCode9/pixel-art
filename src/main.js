import './index.css'

import { createApp } from 'vue'
import App from './App.vue'

import 'primevue/resources/themes/mira/theme.css'
import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(PrimeVue, { ripple: true })

app.mount('#app')
