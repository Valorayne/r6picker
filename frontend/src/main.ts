import { createApp, Plugin } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from "vue-query"

import App from './App.vue'
import '../index.css'

const app = createApp(App)

app.use(createPinia())
app.use(VueQueryPlugin as Plugin)
app.mount('#app')
