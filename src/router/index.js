import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/area',
    name: 'area',
    component: () => import(/* webpackChunkName: "area" */ '../views/Area.vue')
  },
  {
    path: '/area/:id',
    name: 'areaUpdate',
    component: () => import(/* webpackChunkName: "areaUpdate" */ '../views/AreaUpdate.vue')
  },
  {
    path: '/activo',
    name: 'activo',
    component: () => import(/* webpackChunkName: "activo" */ '../views/Activo.vue')
  },
  {
    path: '/activo/:id',
    name: 'activoUpdate',
    component: () => import(/* webpackChunkName: "activoUpdate" */ '../views/ActivoUpdate.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router