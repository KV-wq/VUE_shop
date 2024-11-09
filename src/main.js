import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'
import Profile from './pages/Profile.vue'
import Product from './pages/Product.vue'
import NotFound from './pages/NotFound.vue'
import OrderIsCreated from './pages/OrderIsCreated.vue'
import Admin from './pages/Admin.vue'

const app = createApp(App)
const routes = [
  { path: '/', component: Home },
  { path: '/favorites', component: Favorites },
  { path: '/profile', component: Profile },
  { path: '/product', component: Product },
  { path: '/order-created', component: OrderIsCreated },
  { path: '/:catchAll(.*)', component: NotFound },
  { path: '/admin', component: Admin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)

app.use(autoAnimatePlugin)

app.mount('#app')
