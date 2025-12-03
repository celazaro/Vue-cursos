<template>

    <body>
        <div class="page-title light-background">
            <div class="container d-lg-flex justify-content-between align-items-center">
                <h1 class="mb-2 mb-lg-0">Administración</h1>
                <div>
                    <p class="nav-link mb-0 fs-5">{{ userStore.username }}</p>
                    <img v-if="perfilStore.imagen_url"
                        :src="`${API_URL}` / `${perfilStore.imagen_url}`"
                        alt="Perfil" class="rounded-circle ms-2" width="40" height="40" />
                    <img v-else src="@/assets/perfil_default.png" alt="Perfil por defecto" class="rounded-circle ms-2"
                        width="40" height="40" />

                </div>

                <nav class="breadcrumbs">
                    <ol>
                        <li><a href="/home">Ir a Inicio</a></li>
                        <li><a href="#" @click="handleLogout">Cerrar Sesión</a></li>
                    </ol>
                </nav>
            </div>
        </div><!-- End Page Title -->

        <div class="container-fluid">

            <!-- Botón toggle visible solo en móvil -->
            <button class="btn btn-outline-secondary btn-sm d-md-none mt-2 ms-2" type="button"
                data-bs-toggle="offcanvas" data-bs-target="#sidebarMobile" aria-controls="sidebarMobile">
                <i class="bi bi-list"></i> Menú
            </button>

            <div class="row">

                <!-- Sidebar fijo en escritorio -->
                <nav class="col-md-2 d-none d-md-block bg-light sidebar py-3">
                    <div class="position-sticky pt-3">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <a class="nav-link active" href="#" @click.prevent="setComponent('Usuarios')">
                                    <i class="bi bi-people"></i> Usuarios
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" @click.prevent="setComponent('Categorias')">
                                    <i class="bi bi-tags"></i> Categorías
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" @click.prevent="setComponent('Profesores')">
                                    <i class="bi bi-person-video3"></i> Profesores
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" @click.prevent="setComponent('Cursos')">
                                    <i class="bi bi-journal-bookmark"></i> Cursos Impartidos
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" @click.prevent="setComponent('Cursos_Comprados')">
                                    <i class="bi bi-currency-dollar"></i> Cursos Comprados
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <!-- Contenido principal -->
                <main class="col-12 col-md-10 px-3 py-4">
                    <component :is="activeComponent" />


                </main>

                <!-- Sidebar como offcanvas para móvil -->
                <nav id="sidebarMobile" class="offcanvas offcanvas-start bg-light" tabindex="-1"
                    aria-labelledby="sidebarMobileLabel">
                    <div class="offcanvas-header">
                        <h5 id="sidebarMobileLabel">Menú</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                            aria-label="Cerrar"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <a class="nav-link active" href="#" @click.prevent="setComponent('Usuarios')">
                                    <i class="bi bi-speedometer2"></i> Usuarios
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" @click.prevent="setComponent('Categorias')">
                                    <i class="bi bi-people"></i> Categorías
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" @click.prevent="setComponent('Profesores')">
                                    <i class="bi bi-gear"></i> Profesores
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" @click.prevent="setComponent('Cursos')">
                                    <i class="bi bi-journal-bookmark"></i> Cursos
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

            </div>

        </div>

    </body>


</template>



<script setup>

import { ref, computed, defineAsyncComponent } from 'vue'

import { logout } from '@/services/logout' // Importar la función de logout
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'
import { usePerfilStore } from '@/stores/perfil'

const router = useRouter() // Importar el router para hacer la redirección

const perfilStore = usePerfilStore()
const userStore = useUserStore()  

const currentView = ref('Usuarios')

const componentMap = {
  Usuarios: defineAsyncComponent(() => import('@/components/administracion/UsuarioAdminComponent.vue')),
  Categorias: defineAsyncComponent(() => import('@/components/administracion/CategoriaAdminComponent.vue')),
  Profesores: defineAsyncComponent(() => import('@/components/administracion/ProfesorAdminComponent.vue')),
  Cursos: defineAsyncComponent(() => import('@/components/administracion/CursoAdminComponent.vue')),
  Cursos_Comprados: defineAsyncComponent(() => import('@/components/administracion/PaymentsAdminComponent.vue')),
}

const activeComponent = computed(() => componentMap[currentView.value])
const setComponent = (viewName) => {
  currentView.value = viewName
}


function handleLogout() {
    logout()
    userStore.clearUser()
    perfilStore.clearPerfil() // Limpiar el estado del perfil si es necesario
    
    router.push('/home') // Redirigir al inicio
}

</script>



<style scoped>
    
</style>