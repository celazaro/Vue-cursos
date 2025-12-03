<template >

    <!-- Botón para agregar nueva profesor -->
    <div class="d-flex justify-content-between align-items-center my-4">
        <h2 class="h4 mb-0">Profesores</h2>
        <button class="btn btn-primary" 
        @click="abrirModalCreacion">
            <i class="bi bi-plus-lg me-2"></i>Agregar profesor
        </button>
    </div>

    <!-- Tabla de Profesores -->
    <div class="table-responsive">
        <table class="table table-striped align-middle" v-if="profesores.length!=0">
            <thead class="table-light">
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Profesión</th>
                    <th>Imagen</th>
                    <th class="text-center">Editar</th>
                    <th class="text-center">Borrar</th>
                </tr>
            </thead>
            <tbody>
                <!-- Aquí iterarías dinámicamente con Vue, por ejemplo: v-for="cat in categories" -->
                <tr v-for="prof in profesores" :key="prof.id">
                    <td> {{ prof.id }} </td>
                    <td> {{ prof.name }} </td>
                    <td> {{ prof.profesion }} </td>
                    <td style="width: 100px; text-align: center;">
                        <img v-if="prof.imagen_url" :src="prof.imagen_url" alt="Miniatura"
                            style="width: 60px; height: auto; object-fit: cover; border-radius: 4px; cursor: pointer;"
                            data-bs-toggle="modal" :data-bs-target="'#imgModal' + prof.id" />
                    </td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-secondary" 
                        @click="abrirModalEdicion(prof)"
                        >
                        <i class="bi bi-pencil-square"></i>
                        </button>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-danger" @click="eliminarProfesor(prof.id)">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else class="text-center">
            <h4>No se encuentran profesores en este momento</h4>
        </div>
        <!-- Modal para mostrar imagen -->
        <div v-for="prof in profesores" :key="'modal-' + prof.id">
            <div class="modal fade" :id="'imgModal' + prof.id" tabindex="-1" aria-labelledby="imgModalLabel"
            >
                <div class="modal-dialog modal-lg modal-dialog-centered  ">
                    <div class="modal-content ">
                        <div class="modal-header  ">
                            <h5 class="modal-title" id="imgModalLabel">Imagen de {{ prof.name }}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Cerrar"></button>
                        </div>
                        <div class="modal-body text-center">
                            <img v-if="prof.imagen_url" :src="prof.imagen_url" alt="Imagen completa"
                                style="max-width: 100%; max-height: 75vh; height: auto; border-radius: 6px;" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- Modal scrollable para crear profesores -->
    <div class="modal fade" id="crearprofesorModal" tabindex="-1" aria-labelledby="profesorModalLabel">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="profesorModalLabel">Agregar Profesor</h5>
                    <button type="button" class="btn-close" @click="cerrarModalCreacion"
                    aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="crearProfesor" enctype="multipart/form-data">
                        <div class="mb-3">
                            <label for="profesorName" class="form-label">Nombre</label>
                            <input type="text" v-model="name" class="form-control" id="profesorName" />
                        </div>
                        <div class="mb-3">
                            <label for="profesorProfesion" class="form-label">Profesión</label>
                            <textarea class="form-control" id="profesorProfesion" rows="2"
                                v-model="profesion"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="profesorImage" class="form-label">Imagen Profesor</label>
                            <input type="file" class="form-control" id="profesorImage" @change="handleImagen" ref="profesorImagenCrear" />
                        </div>

                        <div class="modal-footer justify-content-end">
                            <button type="button" class="btn btn-secondary" @click="cerrarModalCreacion"
                            >Cancelar</button>
                            <button type="submit" class="btn btn-primary" >Guardar</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>

    <!-- Modal scrollable para modificar profesores -->
    <div class="modal fade" id="editprofesorModal" tabindex="-1" aria-labelledby="profesorModalLabel">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="profesorModalLabel">Modificar Profesor</h5>
                    <button type="button" class="btn-close" 
                    @click="cerrarModalEdicion"
                    aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="editProfesor" enctype="multipart/form-data">
                        <div class="mb-3">
                            <label for="profesorName" class="form-label">Nombre</label>
                            <input type="text" v-model="name" class="form-control" id="profesorName"/>
                        </div>
                        <div class="mb-3">
                            <label for="profesorProfesion" class="form-label">Profesión</label>
                            <textarea class="form-control" id="profesion" rows="2"
                                v-model="profesion"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="profesorImage" class="form-label">Imagen Profesor</label>
                            <input type="file" class="form-control" id="profesorImage" @change="handleImagen" ref="profesorImagenEditar" />
                        </div> 

                        <div class="modal-footer justify-content-end">
                            <button type="button" class="btn btn-secondary" @click="cerrarModalEdicion"
                            >Cancelar</button>

                            <button type="submit" class="btn btn-primary" 
                            >Guardar</button>

                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>

</template>


<script setup>

import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'

const token = ref(sessionStorage.getItem('token') || '')
const token_type = ref(sessionStorage.getItem('token_type') || '')

const profesores = ref([])

const name = ref("")
const profesion = ref("")
const imagenFile = ref(null)

const profesorImagenEditar = ref(null)
const profesorImagenCrear = ref(null)

const API_URL = import.meta.env.VITE_API_URL

function abrirModalEdicion(profesor) {
    seleccionarProfesor(profesor)
    const modalElement = document.getElementById('editprofesorModal')
    const modal = new Modal(modalElement)
    modal.show()
}

function cerrarModalEdicion() {
    const modalElement = document.getElementById('editprofesorModal')
    const modal = Modal.getInstance(modalElement)
    if (modal) modal.hide()

     // Limpiar el input file de creación usando ref
    if (profesorImagenEditar.value) profesorImagenEditar.value.value = ''

    name.value = ''
    profesion.value = ''
    imagenFile.value = null
    profesorSeleccionado.value = null

}

async function listarProfesores() {
    
  try {
    const response = await fetch(`${API_URL}/profesores`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        profesores.value = []
        return
      } else {
        throw new Error('Error inesperado al obtener los profesores buscados')
      }
    }

    const data = await response.json()
    profesores.value = data // Asume que data es un array de cursos
    console.log('Profesores', profesores.value)
    
  } catch (error) {
    console.error(error)
    profesores.value = []
  }
}

function handleImagen(event) {
    imagenFile.value = event.target.files[0]
}

function abrirModalCreacion() {
    const modalElement = document.getElementById('crearprofesorModal')
    const modal = new Modal(modalElement)
    modal.show()
}

function cerrarModalCreacion() {
    const modalElement = document.getElementById('crearprofesorModal')
    const modal = Modal.getInstance(modalElement)
    if (modal) modal.hide()

         // Limpiar el input file de creación usando ref
    if (profesorImagenCrear.value) profesorImagenCrear.value.value = ''
    
    name.value = ''
    profesion.value = ''
    imagenFile.value = null
    profesorSeleccionado.value = null

}

async function crearProfesor() {

    if (!token) {
    console.error("❌ No hay token en sessionStorage")
    return}

    try {
        const formData = new FormData()

        formData.append('nombre', name.value)
        formData.append('profesion', profesion.value)
            
        if (imagenFile.value) {
            formData.append('imagen', imagenFile.value)
        }

        const response = await fetch (`${API_URL}/profesores`, {
            method: 'POST',
            headers: {
                Authorization: `${token_type.value} ${token.value}`
            },
            body: formData
        })

        if (!response.ok) throw new Error ('Error al crear el profesor')

        const data = await response.json()
        listarProfesores()
        cerrarModalCreacion()
        alert('Profesor creado exitosamente')
        

    } catch (error) {
        console.error(error)
        alert('Hubo un problema al crear el profesor')
    }
}

async function eliminarProfesor(id) {
    const response = await fetch(`${API_URL}/profesores/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `${token_type.value} ${token.value}`
        },
    })

    if (!response.ok) throw new Error('Error al eliminar el profesor')

      // Eliminarla del array local para que desaparezca de la tabla
    profesores.value = profesores.value.filter(profesor => profesor.id !== id)

    alert('Profesor borrado exitosamente')
}

const profesorSeleccionado = ref(null)

// 🆕 Cargar datos al seleccionar profesor para editar
function seleccionarProfesor(profesor) {
  profesorSeleccionado.value = profesor
  name.value = profesor.name || ''
  profesion.value = profesor.profesion || ''
  console.log('Datos Profesor', profesorSeleccionado.value)
}

async function editProfesor() {
  if (!profesorSeleccionado.value) {
    alert('No hay profesor seleccionado para editar')
    return
  }

  try {
    const formData = new FormData()
    formData.append('nombre', name.value)
    formData.append('profesion', profesion.value)

    if (imagenFile.value) formData.append('imagen', imagenFile.value)

    const id = profesorSeleccionado.value.id
    const response = await fetch(`${API_URL}/profesores/${id}`, {
        method: 'PATCH',
        headers: {
                Authorization: `${token_type.value} ${token.value}`
        },
        body: formData
        })

    if (!response.ok) throw new Error('Error al editar el profesor')

    listarProfesores()
    cerrarModalEdicion()
    alert('Profesor editado correctamente')

  } catch (error) {
    console.error(error)
    alert('Hubo un problema al editar el profesor')
  }
}

onMounted(() => {
  listarProfesores()
})

</script>



<style scoped>
 

</style>