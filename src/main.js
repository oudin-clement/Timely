import './assets/base.css'
import '@/assets/tailwind.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import piniaPersist from "pinia-plugin-persist"

import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersist)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
