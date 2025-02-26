import './assets/main.css'
import 'ant-design-vue/dist/reset.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { DefaultApolloClient } from '@vue/apollo-composable';
import App from './App.vue'
import router from './router'
import apolloClient from './utils/graphql/apollo-client';
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.provide(DefaultApolloClient, apolloClient);



app.mount('#app')
