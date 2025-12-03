<template >

  <div class="d-flex justify-content-between align-items-center my-4">
    <h2 class="h4 mb-0">Cursos Comprados</h2>
  </div>

  <!-- Tabla de Cursos -->
  <div class="table-responsive">
    <table class="table table-striped align-middle" v-if="cursosPagados.length!=0">
      <thead class="table-light">
        <tr>
          <th>Id</th>
          <th class=" text-center">User Id</th>
          <th>Perfil</th>
          <th class=" text-center">Curso Id</th>
          <th>Curso</th>
          <th>Precio $</th>
          <th>Estatus</th>
          <th>Orden de Compra</th>
          <th>Id de Pago</th>
          <th>Fecha de Pago</th>
        </tr>
      </thead>
      <tbody>
        <!-- Aquí iterarías dinámicamente con Vue, por ejemplo: v-for="cur in cursos" -->
        <tr v-for="curpa in cursosPagados" :key="curpa.id">
          <td> {{ curpa.id }} </td>
          <td class=" text-center"> {{ curpa.user_id }} </td>
          <td class="text-center">
            <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal"
              v-if="perfilesByUserId.has(curpa.user_id)" :data-bs-target="`#viewPerfilModal${curpa.user_id}`">
              <i class="bi-person-lines-fill"></i>
            </button>
            <div v-else>
              <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal"
                :data-bs-target="`#viewUserModal${curpa.user_id}`">
                <i class="bi-person-lines-fill"></i>
              </button>
            </div>

          </td>
          <td class=" text-center">{{ curpa.curso_id }} </td>
          <td class="text-center">
            <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal"
              :data-bs-target="`#viewCursoModal${curpa.curso_id}`">
              <i class="bi bi-newspaper"></i>
            </button>
          </td>
          <td> {{ curpa.amount }} </td>
          <td>
            <select v-model="curpa.status" @change="cambiarStatus(curpa)" class="py-2">
              <option value="approved">Pago Aprobado</option>
              <option value="pending">Pago Pendiente</option>
              <option value="rejected">Pago Rechazado</option>
              <option value="caducado">Tiempo Cumplido</option>
            </select>
          </td>

          <td> {{ curpa.merchant_order_id }} </td>
          <td> {{ curpa.payment_id }} </td>
          <td> {{ curpa.created_at }} </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="text-center">
      <h4>No se encuentran cursos en este momento</h4>
    </div>
  </div>

  <!-- Modal scrollable para ver los perfiles de usuarios -->
  <div v-for="user in usersWithProfile" :key="'modal-' + user.id">

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

  <!-- Modal scrollable para ver los usuarios -->
  <div v-for="user in usersWithProfile" :key="'modal-' + user.id">

    <div class="modal fade" :id="'viewUserModal' + user.id" tabindex="-1" aria-labelledby="viewUserLabel">

      <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="viewUserLabel">Perfil Usuario</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <form>
              <!-- Mostrar imagen del usuario -->
              <div class="mb-1 text-center">
                <img src="@/assets/perfil_default.png" alt="Perfil por defecto" class="img-thumbnail" width="150">
                <p> {{ user.username }} </p>
                <p> {{ user.email }} </p>
                <h3>Usuario sin perfil creado</h3>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>

  </div>

  <!-- Modal para ver detalles del curso -->

  <div v-for="cur in cursos" :key="'modal-' + cur.id">

    <div class="modal fade" :id="'viewCursoModal' + cur.id" tabindex="-1" aria-labelledby="viewCursoLabel">

      <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="viewUserLabel">Curso Comprado</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <form>

              <!-- Mostrar imagen del curso -->
              <div class="mb-1 text-center">
                <img  v-if="cur.imagen_url" :src="cur.imagen_url" alt="Foto del curso}`" class="img-thumbnail"
                  width="250">
                <h3> {{ cur.titulo}} </h3>
              </div>

              <div class="row">
                <div class="mb-3 col-md-4">
                  <label for="curso" class="form-label">Id Curso</label>
                  <input type="integer" v-model="cur.id" class="form-control" id="curso">
                </div>
                <div class="mb-3 col-md-8">
                  <label for="descripcion" class="form-label">Descripción</label>
                  <input type="text" v-model="cur.descripcion" class="form-control" id="descripcion">
                </div>
              </div>

              <div class="row mb-3">
                <div class="mb-3 col-md-4">
                  <label for="duracion" class="form-label">Duración</label>
                  <input type="text" v-model="cur.duracion" class="form-control" id="duracion">
                </div>
                <div class="mb-3 col-md-4">
                  <label for="precio" class="form-label">Precio $</label>
                  <input type="text" v-model="cur.precio" class="form-control" id="precio">
                </div>
                <div class="mb-3 col-md-4">
                  <label for="nivel" class="form-label">Nivel</label>
                  <input type="text" v-model="cur.nivel" class="form-control" id="nivel">
                </div>
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

const cursosPagados = ref([])
const cursos = ref([])

const API_URL = import.meta.env.VITE_API_URL

async function listarCursosPagados() {
    
  try {
    const response = await fetch(`${API_URL}/userpayments/user_payments`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        cursosPagados.value = []
        return
      } else {
        throw new Error('Error inesperado al obtener los cursos pagados buscados')
      }
    }

    const data = await response.json()
    cursosPagados.value = data // Asume que data es un array de cursos
    console.log('Cursos Pagados', cursosPagados.value)
    
  } catch (error) {
    console.error(error)
    cursosPagados.value = []
  }
}

async function cambiarStatus(curpa) {
  try {
    const response = await fetch(`${API_URL}/userpayments/${curpa.id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: curpa.status }) // 👈 enviamos el nuevo status
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el status de pago");
    }

    const data = await response.json();
    console.log(data);
    // Opcional: mostrar un toast de éxito
  } catch (error) {
    console.error("Error cambiando status de pago:", error);
    // Opcional: revertir el cambio en la UI
  }
}


const users = ref([])
const listPerfiles = ref([])


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


async function listarCursos() {
    
  try {
    const response = await fetch(`${API_URL}/cursos`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        cursos.value = []
        return
      } else {
        throw new Error('Error inesperado al obtener los cursos buscados')
      }
    }

    const data = await response.json()
    cursos.value = data // Asume que data es un array de cursos
    console.log('Cursos', cursos.value)
    
  } catch (error) {
    console.error(error)
    cursos.value = []
  }
}



onMounted(async() => {
  listarCursosPagados()
  listarUsuarios()
  listarPerfiles()
  listarCursos()
})

</script>




<style scoped>
    
</style>