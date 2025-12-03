import { createRouter, createWebHistory } from 'vue-router'


import HomeView from '../views/HomeView.vue'
import ContactView from '../views/ContactView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import VerPerfilView from '../views/VerPerfilView.vue'
import CrearPerfilView from '../views/CrearPerfilView.vue'
import EditarPerfilView from '../views/EditarPerfilView.vue'
import PasswordPerfilView from '../views/PasswordPerfilView.vue'
import CursosView from '../views/CursosView.vue'
import PrincipalAdminView from '../views/Administracion/PrincipalAdminView.vue'
import CursoDetalleView from '../views/CursoDetalleView.vue'
import InscripcionView from '../views/InscripcionView.vue'
import SuccessView from '../views/SuccessView.vue'
import FailureView from '../views/FailureView.vue'
import PendingView from '../views/PendingView.vue'
import CursosProfeView from '../views/CursosProfeView.vue'
import CuentaUserView from '../views/CuentaUserView.vue'
import NotAuthorized from '@/views/NotAuthorized.vue'

import { useRoleStore } from '@/stores/role'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { hideNavbar: true }

    },
    {
      path: '/register',
      name: 'registro',
      component: RegisterView,
      meta: { hideNavbar: true }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,

    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: { requiresAuth: false },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
      meta: { hideNavbar: true } // opcional
    },
    {
      path: '/noautorizado',
      name: 'not-authorized',
      component: NotAuthorized,
      meta: { hideNavbar: true } // opcional
    },
    {
      path: '/verperfil',
      name: 'verperfil',
      component: VerPerfilView,
      meta: { requiresAuth: true },
    },
    {
      path: '/crearperfil',
      name: 'crearperfil',
      component: CrearPerfilView,
      meta: { requiresAuth: true },
    },
    {
      path: '/editarperfil',
      name: 'editarperfil',
      component: EditarPerfilView,
      meta: { requiresAuth: true },
    },
    {
      path: '/cambiarpassword',
      name: 'cambiarpassword',
      component: PasswordPerfilView,
      meta: { requiresAuth: true },
    },
        {
      path: '/cursos',
      name: 'cursos',
      component: CursosView,
      meta: { requiresAuth: false },
    },
    {
      path: '/admin',
      name: 'admin',
      component: PrincipalAdminView,
      meta: { requiresAuth: true, allowedRoles: ['superadmin', 'admin'],
  hideNavbar: true },
    },
    {
      path: '/cursodetalle/:id',
      name: 'cursodetalle',
      component: CursoDetalleView,
      props: true, // 👈 esto permite pasar el id como prop
      meta: { requiresAuth: false, hideNavbar: false },
    },
    {
      path: '/inscripcion/:id',
      name: 'inscripcion',
      props: true,
      component: InscripcionView,
      meta: { requiresAuth: false, hideNavbar: false },
    },
    {
      path: '/success',
      name: 'pago_exitoso',
      component: SuccessView,
      meta: { requiresAuth: false, hideNavbar: true },
    },
    {
      path: '/failure',
      name: 'pago_fallido',
      component: FailureView,
      meta: { requiresAuth: false, hideNavbar: true },
    },
    {
      path: '/pending',
      name: 'pago_pendiente',
      component: PendingView,
      meta: { requiresAuth: false, hideNavbar: true },
    },
        {
      path: '/miscursos',
      name: 'miscursos',
      component: CursosProfeView,
      meta: { requiresAuth: false, hideNavbar: false },
    },
            {
      path: '/micuenta',
      name: 'micuenta',
      component: CuentaUserView,
      meta: { requiresAuth: false, hideNavbar: false },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
  // 🔝 Siempre empezar desde arriba
  return { left: 0, top: 0 }
  },
})


// 🚀 Validación basada en autenticación desde BD
router.beforeEach((to, from, next) => {
  const roleStore = useRoleStore()  // pinia ya está activo

  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true'

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login') // Si no está autenticado, redirigir al login
  } 
  if (
    to.meta.allowedRoles &&
    !to.meta.allowedRoles.includes(roleStore.role)  // Si no está autorizado, redirigir a página con esa información
  ) {
    next('/noautorizado')
  }


   else {
    next() // Permitir acceso
  }
})



export default router
