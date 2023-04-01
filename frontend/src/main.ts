import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from "vue-query"

import App from './App.vue'
import '../index.css'

const app = createApp(App)

app.use(createPinia())
VueQueryPlugin.install(app)
app.mount('#app')
