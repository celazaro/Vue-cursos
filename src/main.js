
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

// Importa solo CSS si no usas JS de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// Opcional: importa los scripts JS de Bootstrap (si usas tooltips, modals, etc.)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
