import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useAuthentificationStore} from "@/stores/authentification.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/inscription',
      name: 'inscription',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Inscription.vue')
    },
    {
      path: '/connexion',
      name: 'connexion',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Connexion.vue')
    },
    {
      path: '/activite/creer',
      name: 'creer-activite',
      component: () => import('../components/CreerActivite.vue')
    },
    {
      path: '/activite',
        name: 'activite',
        component: () => import('../views/Activites.vue')
    },
    {
        path: '/profil',
        name: 'profil',
        component: () => import('../views/Profil.vue')
    },
    {
        path: '/modif/activite/:id',
        name: 'modifierActivite',
        component: () => import('../components/ModiferActivite.vue')
    },
    {
      path: '/modif/projet/:id',
      name: 'modifierProjet',
      component: () => import('../components/ModiferProjet.vue')
    },
    {
      path: '/projet',
      name: 'projet',
      component: () => import('../views/Projects.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'connexion' && to.name !== 'inscription') {
    const store = useAuthentificationStore()
    if (!store.key) {
      next({name: 'connexion'})
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
