<template>

  <!-- Usuarios -->
  <div class="d-flex justify-content-between align-items-center my-4">
    <h2 class="h4 mb-0">Usuarios</h2>
  </div>
  <div class="table-responsive">
    <table class="table table-striped align-middle" v-if="usuarios.length != 0">
      <thead class="table-light">
        <tr>
          <th>Id</th>
          <th>Username</th>
          <th>Email</th>
          <th v-if="roleStore.role === 'superadmin'">Rol</th>
          <th>Imagen</th>
          <th class="text-center">Perfil Completo</th>
          <th v-if="roleStore.role === 'superadmin'" class="text-center">Borrar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in usuarios" :key="user.id">
          <td> {{ user.id }} </td>
          <td> {{ user.username }} </td>
          <td> {{ user.email }} </td>
          <td v-if="roleStore.role === 'superadmin'">
            <select v-model="user.role" @change="cambiarRol(user)">
              <option value="superadmin">Super Admin</option>
              <option value="admin">Administrador</option>
              <option value="profe">Profesor</option>
              <option value="user">Usuario</option>
            </select>
          </td>
          <td>
            <img v-if="user.perfilUsuario && user.perfilUsuario.imagen_url"
              :src="user.perfilUsuario.imagen_url" alt="Perfil" class="img-thumbnail"
              style="width: 48px; height: 48px; object-fit: cover; cursor: pointer;" data-bs-toggle="modal"
              :data-bs-target="'#imgModal' + user.id" />
            <img v-else src="@/assets/perfil_default.png" alt="Perfil por defecto" class="img-thumbnail"
              style="width: 48px; height: 48px; object-fit: cover;" />
          </td>

          <td class="text-center">
            <button class="btn btn-sm btn-outline-secondary" v-if="user.perfilUsuario && user.perfilUsuario.imagen_url"
              data-bs-toggle="modal" :data-bs-target="'#viewPerfilModal' + user.id">
              <i class="bi-person-lines-fill"></i>
            </button>
            <div v-else>
              <i class="bi-person-lines-fill"></i>
            </div>
          </td>
          <td v-if="roleStore.role === 'superadmin'" class="text-center">
            <button class="btn btn-sm btn-outline-danger" @click="eliminarUsuario(user.id)">
              <i class="bi bi-trash3"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="text-center">
      <h4>No se encuentra ningún usuario en este momento</h4>
    </div>
  </div>
  <!-- Profesores -->
  <div class="d-flex justify-content-between align-items-center my-4">
    <h2 class="h4 mb-0">Profesores</h2>
  </div>
  <div class="table-responsive">
    <table class="table table-striped align-middle" v-if="profesores.length != 0">
      <thead class="table-light">
        <tr>
          <th>Id</th>
          <th>Username</th>
          <th>Email</th>
          <th v-if="roleStore.role === 'superadmin'">Rol</th>
          <th>Imagen</th>
          <th class="text-center">Perfil Completo</th>
          <th v-if="roleStore.role === 'superadmin'" class="text-center">Borrar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in profesores" :key="user.id">
          <td> {{ user.id }} </td>
          <td> {{ user.username }} </td>
          <td> {{ user.email }} </td>
          <td v-if="roleStore.role === 'superadmin'">
            <select v-model="user.role" @change="cambiarRol(user)">
              <option value="superadmin">Super Admin</option>
              <option value="admin">Administrador</option>
              <option value="profe">Profesor</option>
              <option value="user">Usuario</option>
            </select>
          </td>
          <td>
            <img v-if="user.perfilUsuario && user.perfilUsuario.imagen_url"
              :src="user.perfilUsuario.imagen_url" alt="Perfil" class="img-thumbnail"
              style="width: 48px; height: 48px; object-fit: cover; cursor: pointer;" data-bs-toggle="modal"
              :data-bs-target="'#imgModal' + user.id" />
            <img v-else src="@/assets/perfil_default.png" alt="Perfil por defecto" class="img-thumbnail"
              style="width: 48px; height: 48px; object-fit: cover;" />
          </td>

          <td class="text-center">
            <button class="btn btn-sm btn-outline-secondary" v-if="user.perfilUsuario && user.perfilUsuario.imagen_url"
              data-bs-toggle="modal" :data-bs-target="'#viewPerfilModal' + user.id">
              <i class="bi-person-lines-fill"></i>
            </button>
            <div v-else>
              <i class="bi-person-lines-fill"></i>
            </div>
          </td>
          <td v-if="roleStore.role === 'superadmin'" class="text-center">
            <button class="btn btn-sm btn-outline-danger" @click="eliminarUsuario(user.id)">
              <i class="bi bi-trash3"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="text-center">
      <h4>No se encuentra ningún profesor en este momento</h4>
    </div>
  </div>
  <!-- Administradores -->
  <div v-if="roleStore.role === 'superadmin'" class="d-flex justify-content-between align-items-center my-4">
    <h2 class="h4 mb-0">Administradores</h2>
  </div>
  <div v-if="roleStore.role === 'superadmin'" class="table-responsive">
    <table class="table table-striped align-middle" v-if="administradores.length != 0">
      <thead class="table-light">
        <tr>
          <th>Id</th>
          <th>Username</th>
          <th>Email</th>
          <th v-if="roleStore.role === 'superadmin'">Rol</th>
          <th>Imagen</th>
          <th class="text-center">Perfil Completo</th>
          <th v-if="roleStore.role === 'superadmin'" class="text-center">Borrar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in administradores" :key="user.id">
          <td> {{ user.id }} </td>
          <td> {{ user.username }} </td>
          <td> {{ user.email }} </td>
          <td v-if="roleStore.role === 'superadmin'">
            <select v-model="user.role" @change="cambiarRol(user)">
              <option value="superadmin">Super Admin</option>
              <option value="admin">Administrador</option>
              <option value="profe">Profesor</option>
              <option value="user">Usuario</option>
            </select>
          </td>
          <td>
            <img v-if="user.perfilUsuario && user.perfilUsuario.imagen_url"
              :src="user.perfilUsuario.imagen_url" alt="Perfil" class="img-thumbnail"
              style="width: 48px; height: 48px; object-fit: cover; cursor: pointer;" data-bs-toggle="modal"
              :data-bs-target="'#imgModal' + user.id" />
            <img v-else src="@/assets/perfil_default.png" alt="Perfil por defecto" class="img-thumbnail"
              style="width: 48px; height: 48px; object-fit: cover;" />
          </td>

          <td class="text-center">
            <button class="btn btn-sm btn-outline-secondary" v-if="user.perfilUsuario && user.perfilUsuario.imagen_url"
              data-bs-toggle="modal" :data-bs-target="'#viewPerfilModal' + user.id">
              <i class="bi-person-lines-fill"></i>
            </button>
            <div v-else>
              <i class="bi-person-lines-fill"></i>
            </div>
          </td>
          <td v-if="roleStore.role === 'superadmin'" class="text-center">
            <button class="btn btn-sm btn-outline-danger" @click="eliminarUsuario(user.id)">
              <i class="bi bi-trash3"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="text-center">
      <h4>No se encuentra ningún administrador en este momento</h4>
    </div>
  </div>


  <!-- Modal para mostrar imagen -->
  <div v-for="user in filteredUsers" :key="'modal-' + user.id">
    <div class="modal fade" :id="'imgModal' + user.id" tabindex="-1" aria-labelledby="imgModalLabel"
      v-if="user.perfilUsuario && user.perfilUsuario.imagen_url">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="imgModalLabel">Imagen de {{ user.perfilUsuario.nombre }} </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body text-center">
            <img v-if="user.perfilUsuario.imagen_url" :src="user.perfilUsuario.imagen_url" alt="Imagen completa"
              style="width: 300px; height: auto; object-fit: cover; border-radius: 6px;" />
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- Modal scrollable para ver los perfiles de usuarios -->
  <div v-for="user in filteredUsers" :key="'modal-' + user.id">

    <div class="modal fade" :id="'viewPerfilModal' + user.id" tabindex="-1" aria-labelledby="viewPerfilLabel"
      v-if="user.perfilUsuario && user.perfilUsuario.imagen_url">
      <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="viewPerfilLabel">Perfil Usuario</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">

            <form>
              <!-- Mostrar imagen del usuario -->
              <div class="mb-1 text-center">
                <img v-if="user.perfilUsuario.imagen_url" :src="user.perfilUsuario.imagen_url" alt="Foto de usuario"
                  class="img-thumbnail" width="150">
                <p> {{ user.perfilUsuario.nombre }} {{ user.perfilUsuario.apellido }} </p>
              </div>

              <div class="row">
                <div class="mb-3 col-md-4">
                  <label for="usuario" class="form-label">Id Usuario</label>
                  <input type="integer" v-model="user.id" class="form-control" id="usuario">
                </div>
                <div class="mb-3 col-md-8">
                  <label for="bio" class="form-label">Biografía</label>
                  <input type="text" v-model="user.perfilUsuario.bio" class="form-control" id="bio">
                </div>
              </div>

              <div class="mb-3">
                <label for="direccion" class="form-label">Dirección</label>
                <input type="text" v-model="user.perfilUsuario.direccion" class="form-control" id="direccion">
              </div>
              <div class="row mb-3">
                <div class="mb-3 col-md-6">
                  <label for="departamento" class="form-label">Departamento</label>
                  <input type="text" v-model="user.perfilUsuario.departamento" class="form-control" id="departamento">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="provincia" class="form-label">Provincia</label>
                  <input type="text" v-model="user.perfilUsuario.provincia" class="form-control" id="provincia">
                </div>
              </div>

              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" v-model="user.perfilUsuario.is_active" id="is_active">
                <label class="form-check-label" for="is_active">
                  Activo
                </label>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>

  </div>


</template>


<script setup>

import { ref, onMounted, computed } from 'vue'

import { useRoleStore } from '@/stores/role'

const roleStore = useRoleStore() 

const token = ref(sessionStorage.getItem('token') || '')
const token_type = ref(sessionStorage.getItem('token_type') || '')


const users = ref([])
const listPerfiles = ref([])

const API_URL = import.meta.env.VITE_API_URL

async function listarUsuarios() {

  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        users.value = []
        return
      } else {
        throw new Error('Error inesperado al obtener los usuarios')
      }
    }

    const data = await response.json()
    users.value = data // Asume que data es un array de cursos
    console.log('Usuarios', users.value)


  } catch (error) {
    console.error(error)
    users.value = []
  }
}


async function listarPerfiles() {

  try {
    const response = await fetch(`${API_URL}/profile/listperfiles`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        listPerfiles.value = []
        return
      } else {
        throw new Error('Error inesperado al obtener los perfiles')
      }
    }

    const data = await response.json()
    listPerfiles.value = data // Asume que data es un array de perfiles
    console.log('Perfiles Usuarios', listPerfiles.value)


  } catch (error) {
    console.error(error)
    listPerfiles.value = []
  }
}

// Mapa de perfiles por user_id
const perfilesByUserId = computed(() => {
  const map = new Map()
  listPerfiles.value.forEach(p => map.set(p.user_id, p))
  return map
})

// Usuarios con su perfil asociado
const usersWithProfile = computed(() => {
  return users.value.map(user => ({
    ...user,
    perfilUsuario: perfilesByUserId.value.get(user.id) || null

  }))
})

// Si es data cargada de la API, simplemente filtramos aquí:
const filteredUsers = computed(() => {
  if (!usersWithProfile.value) return []   // seguridad extra

  if (roleStore.role === 'superadmin') {
    return usersWithProfile.value.filter(u => u?.id) 
  }
  if (roleStore.role === 'admin') {
    return usersWithProfile.value.filter(u => 
      (u?.role === 'user' || u?.role === 'profe') && u?.id
    )
  }
  return []
})


async function eliminarUsuario(id) {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `${token_type.value} ${token.value}`
        },
    })

    if (!response.ok) throw new Error('Error al eliminar el usuario')

      // Eliminarla del array local para que desaparezca de la tabla
    users.value = users.value.filter(user => user.id !== id)

    alert('Usuario borrado exitosamente')
}

async function cambiarRol(user) {
  try {
    const response = await fetch(`${API_URL}/users/${user.id}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token_type.value} ${token.value}`
      },
      body: JSON.stringify({ new_role: user.role }) // 👈 enviamos el nuevo rol
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el rol");
    }

    const data = await response.json();
    console.log(data);
    // Opcional: mostrar un toast de éxito
  } catch (error) {
    console.error("Error cambiando rol:", error);
    // Opcional: revertir el cambio en la UI
  }
}

const usuarios = computed(() => usersWithProfile.value.filter(u => u.role === "user"))
const profesores = computed(() => usersWithProfile.value.filter(u => u.role === "profe"))
const administradores = computed(() => usersWithProfile.value.filter(u => u.role === "admin"))

onMounted(() => {
  listarUsuarios()
  listarPerfiles()
})

</script>



<style scoped></style>