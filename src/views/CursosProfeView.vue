<template >
  <div class="container d-flex flex-column">
    <!-- Page Title -->
    <div class="page-title light-background">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">Mis Cursos</h1>
        <nav class="breadcrumbs">
          <ol>
            <li><a href="#">Mis Cursos</a></li>
            <li><a href="#">Otro Enlace</a></li>
            <li><a href="#" @click="handleLogout" >Cerrar Sesión</a></li>
          </ol>
        </nav>
      </div>
    </div><!-- End Page Title -->

    <div class="flex-grow-1 d-flex justify-content-center align-items-center my-5">

      <div class="card shadow p-4" style="width: 100%; max-width: 800px;">

        <h1>Detalle de cursos impartidos</h1>

      </div>

    </div>

  </div>
</template>



<script setup>

import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'
import { usePerfilStore } from '@/stores/perfil'

import { logout } from '@/services/logout' // Importar la función de logout


const perfilStore = usePerfilStore()
const userStore = useUserStore() 

const router = useRouter() // Importamos el router para redirigir

function handleLogout() {
    logout()
    userStore.clearUser()
    perfilStore.clearPerfil() // Limpiar el estado del perfil si es necesario
    router.push('/home') // Redirigir al inicio
}

</script>




<style scoped>
    




</style>