import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Password from 'primevue/password';
import { createPinia } from 'pinia'
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import InputText from 'primevue/inputtext';
import router from './router'
import DataTable from 'primevue/datatable';
import Toolbar from 'primevue/toolbar';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/arya-orange/theme.css';
const pinia = createPinia()
const app = createApp(App);
app.use(PrimeVue);
app.use(pinia);
app.use(router);
app.use(ToastService);
app.component('Button', Button);
app.component('Card', Card);
app.component('InputText', InputText);
app.component('Password', Password);
app.component('Toolbar', Toolbar);
app.component('DataTable', DataTable);
app.use(ConfirmationService);
app.mount('#app');
