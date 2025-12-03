<template >

  <div class="container d-flex flex-column">
    <!-- Page Title -->
    <div class="page-title light-background">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">Editar Perfil de Usuario</h1>
        <nav class="breadcrumbs">
          <ol>
            <li><a href="/verperfil">Mi Perfil</a></li>
            <li><a href="/cambiarpassword">Modificar Contraseña</a></li>
            <li><a href="#" @click="handleLogout" >Cerrar Sesión</a></li>
          </ol>
        </nav>
      </div>
    </div><!-- End Page Title -->

    <div class="flex-grow-1 d-flex justify-content-center align-items-center my-5">

      <div class="card shadow p-4" style="width: 100%; max-width: 800px;">

        <form @submit.prevent="editarPerfil" enctype="multipart/form-data">
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

          <div class="mb-3">
            <label for="imagen" class="form-label">Foto de perfil</label>
            <input type="file" class="form-control" id="imagen" @change="handleImagen">
          </div>

          <div class="row">

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

          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" v-model="is_active" id="is_active">
            <label class="form-check-label" for="is_active">
              Activo
            </label>
          </div>

          <button type="submit" class="btn btn-primary w-100 mt-3">Guardar Cambios</button>

        </form>

      </div>

    </div>

  </div>

</template>



<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'
import { usePerfilStore } from '@/stores/perfil'

import { logout } from '@/services/logout' // Importar la función de logout

const token = ref('')
const token_type = ref('')

const router = useRouter() // Importamos el router para redirigir



const id = ref(0)
const nombre = ref('')
const apellido = ref('')
const imagen_url = ref('')  
const direccion = ref('') 
const departamento = ref('')
const provincia = ref('')
const bio = ref('')
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


async function listarPerfilUsuario() {

  try {
    const response = await fetch(`${API_URL}/profile/`, { // Reemplaza con la URL de tu API
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${token_type.value} ${token.value}`
      }
    })


    if (!response.ok) {
      if (response.status === 404) {
        // No hay datos: puede ser que el usuario no haya creado perfil
       // alert('No se encontró el perfil del usuario')
        return null
      } else if (response.status === 401) {
        throw new Error('No autorizado. Por favor, inicia sesión.')
      } else {
        throw new Error('Error inesperado al obtener el perfil del usuario')
      }
    }
    
    const data = await response.json()
  
    id.value = data.id
    nombre.value = data.nombre
    apellido.value = data.apellido    
    imagen_url.value = data.imagen_url 

    direccion.value = data.direccion
    departamento.value = data.departamento
    provincia.value = data.provincia
    bio.value = data.bio
    is_active.value = data.is_active

    console.log('Datos del perfil del usuario:', data)

    
    perfilStore.setImagenUrl(imagen_url.value)

  } catch (error) {
    console.error('Error:', error)
    alert('Error en la conexión.')
  }
}

onMounted(() => {
  listarPerfilUsuario()
})

async function editarPerfil() {
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
      method: 'PATCH',
      headers: {
        'Authorization': `${token_type.value} ${token.value}`
      },
      body: formData
    })

    if (!response.ok) throw new Error('Error al editar el perfil')

    const data = await response.json()
    alert('Perfil editado correctamente')
    console.log(data)
    

    perfilStore.setImagenUrl(data.imagen_url)  // Que esta mutación sea reactiva
    perfilStore.refreshImagen() // Forzar recarga de la imagen con timestamp

    // Redirigir al usuario al login o dashboard según sea necesario
    router.push('/verperfil') // Ajusta la ruta según tu proyecto

  } catch (error) {
    console.error(error)
    alert('Hubo un problema al editar el perfil')
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

