import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import Unicon from 'vue-unicons'
import * as allIcons from 'vue-unicons/dist/icons'
Unicon.add(Object.values(allIcons))

const app = createApp(App)
installElementPlus(app)
app.config.globalProperties.$axios = Axios;
app
    .use(store)
    .use(router)
    .use(Unicon)
    .mount('#app')