<template>

  <!-- Contenedor principal -->
  <div class="container d-flex flex-column ">

    <!-- Page Title -->
    <div class="page-title light-background">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">Crear Perfil de Usuario</h1>
        <nav class="breadcrumbs">
          <ol>
            <li><a href="#" @click="handleLogout">Cerrar Sesión</a></li>
          </ol>
        </nav>
      </div>
    </div><!-- End Page Title -->

    <div class="flex-grow-1 d-flex justify-content-center align-items-center my-5">

      <div class="card shadow p-4" style="width: 100%; max-width: 800px; ">

        <form @submit.prevent="crearPerfil" enctype="multipart/form-data">

          <div class="mb-3">
            <label for="imagen" class="form-label">Foto de perfil</label>
            <input type="file" class="form-control" id="imagen" @change="handleImagen">
          </div>

          <div class="row">
            <div class="mb-3 col-md-6">
              <label for="nombre" class="form-label">Nombre</label>
              <input type="text" v-model="nombre" class="form-control" id="nombre">
            </div>
            <div class="mb-3 col-md-6">
              <label for="apellido" class="form-label">Apellido</label>
              <input type="text" v-model="apellido" class="form-control" id="apellido">
            </div>
          </div>

          <div class="row ">
            <div class="form-check mb-3 col-md-4 pt-5 ">
              <label class="form-check-label ms-0 px-2" for="is_active">
                Activo
              </label>
              <input class="form-check-input ms-5" type="checkbox" v-model="is_active" id="is_active">
            </div>
            <div class="mb-3 col-md-8">
              <label for="bio" class="form-label">Biografía</label>
              <input type="text" v-model="bio" class="form-control" id="bio">
            </div>
          </div>


          <div class="mb-3">
            <label for="direccion" class="form-label">Dirección</label>
            <input type="text" v-model="direccion" class="form-control" id="direccion">
          </div>
          <div class="row mb-3">
            <div class="mb-3 col-md-6">
              <label for="departamento" class="form-label">Departamento</label>
              <input type="text" v-model="departamento" class="form-control" id="departamento">
            </div>
            <div class="mb-3 col-md-6">
              <label for="provincia" class="form-label">Provincia</label>
              <input type="text" v-model="provincia" class="form-control" id="provincia">
            </div>
          </div>



          <button type="submit" class="btn btn-primary w-100 mt-3">Guardar Perfil</button>

        </form>

      </div>

    </div>


  </div>

</template>



<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'
import { usePerfilStore } from '@/stores/perfil'

import { logout } from '@/services/logout' // Importar la función de logout

const token = ref('')
const token_type = ref('')

const router = useRouter() // Importamos el router para redirigir

const nombre = ref('')
const apellido = ref('')  
const bio = ref('')
const direccion = ref('')
const departamento = ref('')
const provincia = ref('')
const is_active = ref(true)

const imagenFile = ref(null)

const perfilStore = usePerfilStore()
const userStore = useUserStore() 

const API_URL = import.meta.env.VITE_API_URL

function handleImagen(event) {
  imagenFile.value = event.target.files[0]
}

token.value = sessionStorage.getItem('token')  // ← Obtener el token del usuario
token_type.value = sessionStorage.getItem('token_type') // ← Obtener el tipo de token del usuario

async function crearPerfil() {
  try {
    const formData = new FormData()
  
    formData.append('nombre', nombre.value)
    formData.append('apellido', apellido.value)
    formData.append('direccion', direccion.value)
    formData.append('departamento', departamento.value)
    formData.append('provincia', provincia.value)
    formData.append('bio', bio.value)
    formData.append('is_active', is_active.value)

    if (imagenFile.value) {
      formData.append('imagen', imagenFile.value)  // campo "imagen" según tu API en el endpoint
    }

    const response = await fetch(`${API_URL}/profile/`, {
      method: 'POST',
      headers: {
        Authorization: `${token_type.value} ${token.value}`
      },
      body: formData
    })

    if (!response.ok) throw new Error('Error al crear el perfil')

    const data = await response.json()
    alert('Perfil creado exitosamente')
    console.log(data)

    // Redirigir al usuario al login o dashboard según sea necesario
    router.push('/login') // Ajusta la ruta según tu proyecto

  } catch (error) {
    console.error(error)
    alert('Hubo un problema al crear el perfil')
  }
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