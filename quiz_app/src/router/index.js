import { createRouter, createWebHistory } from 'vue-router'

// Importa tus vistas (las crearemos en el siguiente paso)
import Inicio from '../views/Inicio.vue'
import Quiz from '../views/Quiz.vue'
import Resultado from '../views/Resultado.vue'

const routes = [
  { path: '/', component: Inicio },
  { path: '/quiz', component: Quiz },
  { path: '/resultado', component: Resultado }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
