<template >

    <!-- Botón para agregar nueva categoría -->
    <div class="d-flex justify-content-between align-items-center my-4">
        <h2 class="h4 mb-0">Categorías</h2>
        <button class="btn btn-primary" 
        @click="abrirModalCreacion">
            <i class="bi bi-plus-lg me-2"></i>Agregar categoría
        </button>
    </div>

    <!-- Tabla de categorías -->
    <div class="table-responsive">
        <table class="table table-striped align-middle" v-if="categorias.length!=0">
            <thead class="table-light">
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Imagen</th>
                    <th class="text-center">Editar</th>
                    <th class="text-center">Borrar</th>
                </tr>
            </thead>
            <tbody>
                <!-- Aquí iterarías dinámicamente con Vue, por ejemplo: v-for="cat in categories" -->
                <tr v-for="cat in categorias" :key="cat.id">
                    <td> {{ cat.id }} </td>
                    <td> {{ cat.name }} </td>
                    <td> {{ cat.descripcion }} </td>
                    <td style="width: 100px; text-align: center;">
                        <img v-if="cat.imagen_url" :src="cat.imagen_url" alt="Miniatura"
                            style="width: 60px; height: auto; object-fit: cover; border-radius: 4px; cursor: pointer;"
                            data-bs-toggle="modal" :data-bs-target="'#imgModal' + cat.id" />
                    </td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-secondary" 
                        @click="abrirModalEdicion(cat)"
                        >
                        <i class="bi bi-pencil-square"></i>
                        </button>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-danger" @click="eliminarCategoria(cat.id)">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else class="text-center">
            <h4>No se encuentran categorías en este momento</h4>
        </div>
        <!-- Modal para mostrar imagen -->
        <div v-for="cat in categorias" :key="'modal-' + cat.id">
            <div class="modal fade" :id="'imgModal' + cat.id" tabindex="-1" aria-labelledby="imgModalLabel"
            >
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="imgModalLabel">Imagen de {{ cat.name }}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Cerrar"></button>
                        </div>
                        <div class="modal-body text-center">
                            <img v-if="cat.imagen_url" :src="cat.imagen_url" alt="Imagen completa"
                                style="max-width: 100%; height: auto; border-radius: 6px;" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- Modal scrollable para crear categorías -->
    <div class="modal fade" id="crearcategoryModal" tabindex="-1" aria-labelledby="categoryModalLabel">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="categoryModalLabel">Agregar Categoría</h5>
                    <button type="button" class="btn-close" @click="cerrarModalCreacion"
                    aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="crearCategoria" enctype="multipart/form-data">
                        <div class="mb-3">
                            <label for="categoryName" class="form-label">Nombre</label>
                            <input type="text" v-model="name" class="form-control" id="categoryName" />
                        </div>
                        <div class="mb-3">
                            <label for="categoryDescription" class="form-label">Descripción</label>
                            <textarea class="form-control" id="categoryDescription" rows="2"
                                v-model="descripcion"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="categoryImage" class="form-label">Imagen Categoría</label>
                            <input type="file" class="form-control" id="categoryImage" @change="handleImagen" ref="categoriaImagenCrear" />
                        </div>

                        <div class="modal-footer justify-content-end">

                            <button type="button" class="btn btn-secondary" @click="cerrarModalCreacion"
                            >Cancelar</button>

                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" >Guardar</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>

    <!-- Modal scrollable para modificar categorías -->
    <div class="modal fade" id="editcategoryModal" tabindex="-1" aria-labelledby="categoryModalLabel">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="categoryModalLabel">Modificar Categoría</h5>
                    <button type="button" class="btn-close" 
                    @click="cerrarModalEdicion"
                    aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="editCategoria" enctype="multipart/form-data">
                        <div class="mb-3">
                            <label for="categoryName" class="form-label">Nombre</label>
                            <input type="text" v-model="name" class="form-control" id="categoryName"/>
                        </div>
                        <div class="mb-3">
                            <label for="categoryDescription" class="form-label">Descripción</label>
                            <textarea class="form-control" id="descripcion" rows="2"
                                v-model="descripcion"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="categoryImage" class="form-label">Imagen Categoría</label>
                            <input type="file" class="form-control" id="categoryImage" @change="handleImagen" ref="categoriaImagenEditar" />
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

const categorias = ref([])

const name = ref("")
const descripcion = ref("")
const imagenFile = ref(null)

const API_URL = import.meta.env.VITE_API_URL


function abrirModalEdicion(categoria) {
    seleccionarCategoria(categoria)
    const modalElement = document.getElementById('editcategoryModal')
    const modal = new Modal(modalElement)
    modal.show()
}

const categoriaImagenEditar = ref(null)

function cerrarModalEdicion() {
    const modalElement = document.getElementById('editcategoryModal')
    const modal = Modal.getInstance(modalElement)
    if (modal) modal.hide()

    // Limpiar el input file de creación usando ref
    if (categoriaImagenEditar.value) categoriaImagenEditar.value.value = ''

    name.value = ''
    descripcion.value = ''
    imagenFile.value = null
    categoriaSeleccionada.value = null

}

async function listarCategorias() {
    
  try {
    const response = await fetch(`${API_URL}/categorias`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        categorias.value = []
        return
      } else {
        throw new Error('Error inesperado al obtener las categorías buscadas')
      }
    }

    const data = await response.json()
    categorias.value = data // Asume que data es un array de cursos
    console.log('Categorias', categorias.value)
    
  } catch (error) {
    console.error(error)
    categorias.value = []
  }
}

function handleImagen(event) {
    imagenFile.value = event.target.files[0]
}

function abrirModalCreacion(categoria) {
    seleccionarCategoria(categoria)
    const modalElement = document.getElementById('crearcategoryModal')
    const modal = new Modal(modalElement)
    modal.show()
}

const categoriaImagenCrear = ref(null)

function cerrarModalCreacion() {
    const modalElement = document.getElementById('crearcategoryModal')
    const modal = Modal.getInstance(modalElement)
    if (modal) modal.hide()

    // Limpiar el input file de creación usando ref
    if (categoriaImagenCrear.value) categoriaImagenCrear.value.value = ''

    name.value = ''
    descripcion.value = ''
    imagenFile.value = null

}

async function crearCategoria() {

    if (!token) {
    console.error("❌ No hay token en sessionStorage")
    return}

    try {
        const formData = new FormData()

        formData.append('nombre', name.value)
        formData.append('descripcion', descripcion.value)
            
        if (imagenFile.value) {
            formData.append('imagen', imagenFile.value)
        }

        const response = await fetch (`${API_URL}/categorias`, {
            method: 'POST',
            headers: {
                Authorization: `${token_type.value} ${token.value}`
            },
            body: formData
        })

        if (!response.ok) throw new Error ('Error al crear la categoría')

        const data = await response.json()
        listarCategorias()
        cerrarModalCreacion()
        alert('Categoría creada exitosamente')
        

    } catch (error) {
        console.error(error)
        alert('Hubo un problema al crear la categoría')
    }
}

async function eliminarCategoria(id) {
    const response = await fetch(`${API_URL}/categorias/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `${token_type.value} ${token.value}`
        },
    })

    if (!response.ok) throw new Error('Error al eliminar la categoría')

      // Eliminarla del array local para que desaparezca de la tabla
    categorias.value = categorias.value.filter(categoria => categoria.id !== id)

    alert('Categoría borrada exitosamente')
}

const categoriaSeleccionada = ref(null)

// 🆕 Cargar datos al seleccionar categoría para editar
function seleccionarCategoria(categoria) {
  categoriaSeleccionada.value = categoria
  name.value = categoria.name || ''
  descripcion.value = categoria.descripcion || ''
  console.log('espero que salga', categoriaSeleccionada.value)
}


async function editCategoria() {
  if (!categoriaSeleccionada.value) {
    alert('No hay categoría seleccionada para editar')
    return
  }

  try {
    const formData = new FormData()
    formData.append('nombre', name.value)
    formData.append('descripcion', descripcion.value)

    if (imagenFile.value) formData.append('imagen', imagenFile.value)

    const id = categoriaSeleccionada.value.id
    const response = await fetch(`${API_URL}/categorias/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `${token_type.value} ${token.value}`
        },
        body: formData
    })

    if (!response.ok) throw new Error('Error al editar la categoría')

    listarCategorias()
    cerrarModalEdicion()
    alert('Categoría editada correctamente')

  } catch (error) {
    console.error(error)
    alert('Hubo un problema al editar la categoría')
  }
}

onMounted(() => {
  listarCategorias()
})

</script>



<style scoped>
 

</style>