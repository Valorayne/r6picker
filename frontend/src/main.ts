import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from "vue-query"

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(VueQueryPlugin)
app.mount('#app')
