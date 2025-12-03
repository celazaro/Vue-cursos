<template>
  <header id="header" class="header sticky-top">
    <nav class="navbar  navbar-expand-xl navbar-dark">
      <div class="container-fluid container-xl d-flex align-items-center">

        <!-- LOGO -->
        <a class="navbar-brand ps-3" href="/">
          <h1>Learner</h1>
        </a>

        <!-- TOGGLER -->
        <button class="navbar-toggler border border-white border-2 ms-auto" type="button" data-bs-toggle="collapse"
          data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <i class="bi bi-list fs-3"></i>

        </button>

        <!-- MENÚ COLAPSABLE -->
        <div class="collapse navbar-collapse  col-9" id="mainNav">
          <!-- MENÚ PRINCIPAL -->
          <ul class="navbar-nav justify-content-center w-100 mb-2 mb-xl-0">
            <li class="nav-item  fs-5 custom-underline">
              <RouterLink to="/home" class="nav-link ">Inicio</RouterLink>
            </li>
            <li class="nav-item fs-5 custom-underline ">
              <RouterLink to="/about" class="nav-link">Acerca de</RouterLink>
            </li>
            <li class="nav-item  fs-5 custom-underline"><a class="nav-link" href="/cursos">Cursos</a></li>
            <li class="nav-item fs-5 custom-underline"><a class="nav-link" href="/contact">Contacto</a></li>
          </ul>

          <!-- NO AUTH -->
          <ul v-if="!userStore.username" class="navbar-nav justify-content-end w-100">
            <li class="nav-item  fs-5 custom-underline"><a class="nav-link" href="/register">Crear Cuenta</a></li>
            <li class="nav-item  fs-5 custom-underline"><a class="nav-link" href="/login">Ingresar</a></li>
          </ul>

          <!-- AUTH -->
          <ul v-else class="navbar-nav align-items-center justify-content-end w-100">
            <li class="nav-item d-flex align-items-center pe-3">
              <span class="nav-link mb-0 fs-5">Bienvenid@ {{ userStore.username }}</span>
              <img v-if="perfilStore.imagen_url"
                :src="perfilStore.imagen_url"  alt="Perfil"
                class="rounded-circle ms-2" width="40" height="40" />
              <img v-else src="@/assets/perfil_default.png" alt="Perfil por defecto" class="rounded-circle ms-2"
                width="40" height="40" />
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle p-0" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">

              </a>
              
              <ul v-if="perfilStore.imagen_url" class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="/verperfil">Mi Perfil</a></li>
                <li v-if="roleStore.role === 'user'" ><a class="dropdown-item" href="/micuenta">Mi Cuenta</a></li>
                <li v-if="roleStore.role === 'profe'" ><a class="dropdown-item" href="/miscursos">Mis Cursos</a></li>
                <li v-if="['admin','superadmin'].includes(roleStore.role)" ><a class="dropdown-item" href="/admin">Administración</a></li>
                <li><a class="dropdown-item" href="#" @click="handleLogout">Cerrar Sesión</a></li>
              </ul>
             
              <ul v-else class="dropdown-menu dropdown-menu-end">
                <li v-if="['admin','superadmin'].includes(roleStore.role)" ><a class="dropdown-item" href="/admin">Administración</a></li>
                <li><a class="dropdown-item" href="/crearperfil">Crear Perfil</a></li>
                <li><a class="dropdown-item" href="#" @click="handleLogout">Cerrar Sesión</a></li>
              </ul>
              
            </li>
          </ul>
        </div>
      </div>
    </nav>

  </header>
</template>



<script setup>

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'
import { usePerfilStore } from '@/stores/perfil'
import { useRoleStore } from '@/stores/role'

import { logout } from '@/services/logout' // Importar la función de logout

const perfilStore = usePerfilStore()
const userStore = useUserStore()  
const roleStore = useRoleStore()

const router = useRouter() // Importar el router para hacer la redirección

function handleLogout() {
    logout()
    userStore.clearUser()
    perfilStore.clearPerfil() // Limpiar el estado del perfil si es necesario
    router.push('/home') // Redirigir al inicio
}

onMounted(() => {
  document.body.classList.add('index-page')
    // Cargar y ejecutar el JS de la plantilla luego del montaje

  const script = document.createElement('script')
  script.src = '/js/main.js'
  script.async = true
  document.body.appendChild(script)

})

</script>




<style scoped>
  
  .custom-underline {
    position: relative;
    transition: color 0.2s;
  }
  .custom-underline:hover::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.2em;
    height: 1px;
    background-color: currentColor;
    border-radius: 1px;
  }

</style>
