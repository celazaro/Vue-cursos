<template >

    <!-- Botón para agregar nueva curso -->
    <div class="d-flex justify-content-between align-items-center my-4">
        <h2 class="h4 mb-0">Cursos</h2>
        <button class="btn btn-primary" @click="abrirModalCreacion">
            <i class="bi bi-plus-lg me-2"></i>Agregar Nuevo Curso
        </button>
    </div>

    <!-- Tabla de Cursos -->
    <div class="table-responsive">
        <table class="table table-striped align-middle" v-if="cursos.length!=0">
            <thead class="table-light">
                <tr>
                    <th>Id</th>
                    <th>Titulo</th>
                    <th>Duración</th>
                    <th>Precio $</th>
                    <th>Nivel</th>
                    <th>Imagen</th>
                    <th class="text-center">Editar</th>
                    <th class="text-center">Borrar</th>
                </tr>
            </thead>
            <tbody>
                <!-- Aquí iterarías dinámicamente con Vue, por ejemplo: v-for="cur in cursos" -->
                <tr v-for="cur in cursos" :key="cur.id">
                    <td> {{ cur.id }} </td>
                    <td> {{ cur.titulo }} </td>
                    <td> {{ cur.duracion }} </td>
                    <td> {{ cur.precio }} </td>
                    <td> {{ cur.nivel }} </td>
                    <td style="width: 100px; text-align: center;">
                        <img v-if="cur.imagen_url" :src="cur.imagen_url" alt="Miniatura"
                            style="width: 60px; height: auto; object-fit: cover; border-radius: 4px; cursor: pointer;"
                            data-bs-toggle="modal" :data-bs-target="'#imgModal' + cur.id" />
                    </td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-secondary" @click="abrirModalEdicion(cur)">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-danger" @click="eliminarCurso(cur.id)">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else class="text-center">
            <h4>No se encuentran cursos en este momento</h4>
        </div>

        <!-- Modal para mostrar imagen -->
        <div v-for="cur in cursos" :key="'modal-' + cur.id">
            <div class="modal fade" :id="'imgModal' + cur.id" tabindex="-1" aria-labelledby="imgModalLabel">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="imgModalLabel">Imagen de {{ cur.titulo }}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Cerrar"></button>
                        </div>
                        <div class="modal-body text-center">
                            <img v-if="cur.imagen_url" :src="cur.imagen_url" alt="Imagen completa"
                                style="max-width: 100%; height: auto; border-radius: 6px;" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- Modal scrollable para crear cursos -->
    <div class="modal fade" id="crearCursoModal" tabindex="-1" aria-labelledby="cursoModalLabel">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cursoModalLabel">Agregar Curso</h5>
                    <button type="button" class="btn-close" @click="cerrarModalCreacion" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="crearCurso" enctype="multipart/form-data">
                        <div class="mb-3">
                            <label for="cursoTitulo" class="form-label">Título</label>
                            <input type="text" v-model="titulo" class="form-control" id="cursoTitulo" />
                        </div>
                        <div class="mb-3">
                            <label for="cursoDescripcion" class="form-label">Descripción</label>
                            <textarea class="form-control" id="cursoDescripcion" rows="2"
                                v-model="descripcion"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="cursoDuracion" class="form-label">Duración</label>
                            <input type="number" step="1" v-model.number="duracion" class="form-control"
                                id="cursoDuracion" />
                        </div>
                        <div class="mb-3">
                            <label for="cursoPrecio" class="form-label">Precio</label>
                            <input type="number" step="0.01" v-model.number="precio" class="form-control"
                                id="cursoPrecio" />
                        </div>
                        <div class="mb-3">
                            <label for="cursoNivel" class="form-label">Nivel</label>
                            <select v-model="nivel" class="form-select" id="cursoNivel">
                                <option value="">Seleccione un nivel</option>
                                <option value="Básico">Básico</option>
                                <option value="Intermedio">Intermedio</option>
                                <option value="Avanzado">Avanzado</option>
                            </select>
                        </div>
                        <div class="formform-check form-switch">
                            <input type="checkbox" id="cursoDestacado" v-model="destacado"
                                class="form-check-input my-2" />
                            <label for="cursoDestacado" class="form-check-label ms-3 my-2">Destacado</label>
                        </div>
                        <div class="mb-3">
                            <label for="cursoProfesor" class="form-label">Profesor</label>
                            <select v-model="profesorId" class="form-select" id="cursoProfesor">
                                <option disabled>Seleccione un profesor</option>
                                <option v-for="prof in profesores" :key="prof.id" :value="prof.id">
                                    {{ prof.name }}
                                </option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="cursoCategorias" class="form-label">Categorías</label>
                            <select v-model="categoriasSeleccionadas" multiple class="form-select" id="cursoCategorias">
                                <option v-for="cat in listaCategorias" :key="cat.id" :value="cat.id">
                                    {{ cat.name }}
                                </option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="cursoImagen" class="form-label">Imagen Curso</label>
                            <input type="file" class="form-control" id="cursoImagen" @change="handleImagen" ref="crearImagenInput"  />
                        </div>

                        <div class="modal-footer justify-content-end">
                            <button type="button" class="btn btn-secondary"
                                @click="cerrarModalCreacion">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>

    <!-- Modal scrollable para modificar cursos -->
    <div class="modal fade" id="editCursoModal" tabindex="-1" aria-labelledby="cursoModalLabel">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cursoModalLabel">Modificar Curso</h5>
                    <button type="button" class="btn-close" @click="cerrarModalEdicion" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <form ref="formEditarCurso" @submit.prevent="editarCurso" enctype="multipart/form-data">
                        <div class="mb-3">
                            <label for="cursoTitulo" class="form-label">Título</label>
                            <input type="text" v-model="titulo" class="form-control" id="cursoTitulo" />
                        </div>
                        <div class="mb-3">
                            <label for="cursoDescripcion" class="form-label">Descripción</label>
                            <textarea class="form-control" id="cursoDescripcion" rows="2"
                                v-model="descripcion"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="cursoDuracion" class="form-label">Duración</label>
                            <input type="number" step="1" v-model.number="duracion" class="form-control"
                                id="cursoDuracion" />
                        </div>
                        <div class="mb-3">
                            <label for="cursoPrecio" class="form-label">Precio</label>
                            <input type="number" step="0.01" v-model.number="precio" class="form-control"
                                id="cursoPrecio" />
                        </div>
                        <div class="mb-3">
                            <label for="cursoNivel" class="form-label">Nivel</label>
                            <select v-model="nivel" class="form-select" id="cursoNivel">
                                <option value="">Seleccione un nivel</option>
                                <option value="Básico">Básico</option>
                                <option value="Intermedio">Intermedio</option>
                                <option value="Avanzado">Avanzado</option>
                            </select>
                        </div>
                        <div class="formform-check form-switch">
                            <input type="checkbox" id="cursoDestacado" v-model="destacado"
                                class="form-check-input my-2" />
                            <label for="cursoDestacado" class="form-check-label ms-3 my-2">Destacado</label>
                        </div>
                        <div class="mb-3">
                            <label for="cursoProfesor" class="form-label">Profesor</label>
                            <select v-model="profesorId" class="form-select" id="cursoProfesor">
                                <option disabled>Seleccione un profesor</option>
                                <option v-for="prof in profesores" :key="prof.id" :value="prof.id">
                                    {{ prof.name }}
                                </option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="cursoCategorias" class="form-label">Categorías</label>
                            <select v-model="categoriasSeleccionadas" multiple class="form-select" id="cursoCategorias">
                                <option v-for="cat in listaCategorias" :key="cat.id" :value="cat.id">
                                    {{ cat.name }}
                                </option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="cursoImagen" class="form-label">Imagen Curso</label>
                            <input type="file" class="form-control" id="cursoImagenEdicion" @change="handleImagen" ref="editarImagenInput" />
                        </div>

                        <div class="modal-footer justify-content-end">
                            <button type="button" class="btn btn-secondary"
                                @click="cerrarModalEdicion">Cancelar</button>

                            <button type="submit" class="btn btn-primary">Guardar</button>

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

const cursos = ref([])

const profesores = ref([])
const profesorId = ref(null) // guarda el id del profesor seleccionado

const imagenFile = ref(null)

const titulo = ref("")
const descripcion = ref("")
const duracion = ref(null)
const precio = ref(null)
const nivel = ref("")
const destacado = ref(false)

const categoriasSeleccionadas = ref([]) // Array para almacenar los IDs de las categorías seleccionadas

const listaCategorias = ref([])

const API_URL = import.meta.env.VITE_API_URL


function handleImagen(event) {
    imagenFile.value = event.target.files[0]
}

function abrirModalCreacion() {
    const modalElement = document.getElementById('crearCursoModal')
    const modal = new Modal(modalElement)
    modal.show()
}

const crearImagenInput = ref(null)

function cerrarModalCreacion() {

    const modalElement = document.getElementById('crearCursoModal')
    const modal = Modal.getInstance(modalElement)
    if (modal) modal.hide()

    // Limpiar el input file de creación usando ref
    if (crearImagenInput.value) crearImagenInput.value.value = ''

    // Resetear estado reactivo (para que el UI quede consistente)
    titulo.value = ''
    descripcion.value = ''
    duracion.value = null
    precio.value = null
    nivel.value = ''
    destacado.value = false
    profesorId.value = null
    imagenFile.value = null
    categoriasSeleccionadas.value = []
    cursoSeleccionado.value = null
}

function abrirModalEdicion(curso) {
    seleccionarCurso(curso)
    const modalElement = document.getElementById('editCursoModal')
    const modal = new Modal(modalElement)
    modal.show()
}

const editarImagenInput = ref(null)

function cerrarModalEdicion() {
    // Obtener y cerrar el modal
    const modalElement = document.getElementById('editCursoModal')
    const modal = Modal.getInstance(modalElement)
    if (modal) modal.hide()

    // Limpiar el input file de edición usando ref
    if (editarImagenInput.value) editarImagenInput.value.value = ''

    // Limpiar variables del formulario
    titulo.value = ''
    descripcion.value = ''
    duracion.value = null
    precio.value = null
    nivel.value = ''
    destacado.value = false
    profesorId.value = null
    imagenFile.value = ''
    categoriasSeleccionadas.value = []
    cursoSeleccionado.value = null

}


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
    profesores.value = data // Asume que data es un array de categorías
    console.log('Profesores', profesores.value)
    
  } catch (error) {
    console.error(error)
    profesores.value = []
  }
}


/* Validación mínima antes de enviar */
function validarCampos() {
  const errores = []

  if (!titulo.value?.trim()) errores.push('Título es requerido.')
  if (!descripcion.value?.trim()) errores.push('Descripción es requerida.')
  if (duracion.value == null || Number.isNaN(Number(duracion.value))) errores.push('Duración debe ser un entero.')
  if (profesorId.value == null || Number.isNaN(Number(profesorId.value))) errores.push('Profesor es requerido.')
  if (precio.value == null || Number.isNaN(Number(precio.value))) errores.push('Precio debe ser numérico.')
  if (!nivel.value) errores.push('Nivel es requerido.')
  if (!Array.isArray(categoriasSeleccionadas.value) || categoriasSeleccionadas.value.length === 0) {
    errores.push('Seleccione al menos una categoría.')
  }

  return errores
}


async function crearCurso() {

    if (!token) {
    console.error("❌ No hay token en sessionStorage")
    return}

    try {

        const errores = validarCampos()
        if (errores.length) {
            alert('Corrige los siguientes campos:\n- ' + errores.join('\n- '))
            return
        }

        // Casts explícitos
        const duracionInt = parseInt(duracion.value, 10)
        const precioFloat = parseFloat(precio.value)
        const profesorInt = parseInt(profesorId.value, 10)

        // Asegurar array de enteros para categorías
        const catsInt = (categoriasSeleccionadas.value || []).map(v => parseInt(v, 10)).filter(v => !Number.isNaN(v))

        const formData = new FormData()

        formData.append('titulo', (titulo.value || '').trim())
        formData.append('descripcion', (descripcion.value || '').trim())
        formData.append('duracion', String(duracionInt))      // entero -> string
        formData.append('precio', String(precioFloat))        // float  -> string
        formData.append('nivel', nivel.value)
        formData.append('destacado', destacado.value ? 'True' : 'False')
        formData.append('profesor_id', String(profesorInt))   // entero -> string

        // 🔴 IMPORTANTE: enviar categorias_id REPITIENDO LA MISMA KEY por cada id
        // (NO usar categorias_id[] si tu backend espera sin corchetes)

        catsInt.forEach(id => formData.append('categorias_id', String(id)))
            
        if (imagenFile.value) {
            formData.append('imagen', imagenFile.value)
        }

        // Debug: mostrar lo que realmente va en el FormData
        console.log('📦 Datos a enviar (FormData):')
        for (const [k, v] of formData.entries()) console.log(k, v)

        const response = await fetch (`${API_URL}/cursos`, {
            method: 'POST',
            headers: {
                Authorization: `${token_type.value} ${token.value}`
            },
            body: formData
        })


        if (!response.ok) {
        console.error('❌ Backend respondió error', response.status)
        alert('Error al crear el curso. Revisa consola para detalles.')
        return
        }

        console.log('✅ Curso creado:')

        // Auxiliares si existen en tu componente:
        listarCursos()
        cerrarModalCreacion()

        alert('Curso creado exitosamente')

    } catch (err) {
        console.error('⚠️ Excepción al crear curso:', err)
        alert('Hubo un problema al crear el curso')
    }
}

async function eliminarCurso(id) {
    const response = await fetch(`${API_URL}/cursos/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `${token_type.value} ${token.value}`
        },
    })

    if (!response.ok) throw new Error('Error al eliminar el curso')

      // Eliminarla del array local para que desaparezca de la tabla
    cursos.value = cursos.value.filter(curso => curso.id !== id)

    alert('Curso borrado exitosamente')
}

const cursoSeleccionado = ref(null)

// 🆕 Cargar datos al seleccionar curso para editar
function seleccionarCurso(curso) {
  cursoSeleccionado.value = curso
  titulo.value = curso.titulo || ''
  descripcion.value = curso.descripcion || ''
  duracion.value = curso.duracion || ''
  precio.value = curso.precio ||''
  nivel.value = curso.nivel ||''
  destacado.value = curso.destacado ||''
  profesorId.value = curso.profesor.id ||''
  categoriasSeleccionadas.value = curso.categorias
  ? curso.categorias.map(cat => cat.id)
  : [];

  console.log('Datos Curso', cursoSeleccionado.value)
}

async function editarCurso() {

    // Asegurar array de enteros para categorías
  const catsInt = (categoriasSeleccionadas.value || []).map(v => parseInt(v, 10)).filter(v => !Number.isNaN(v))

  if (!cursoSeleccionado.value) {
    alert('No hay curso seleccionado para editar')
    return
  }

  try {
    const formData = new FormData()
    formData.append('titulo', titulo.value)
    formData.append('descripcion', descripcion.value)
    formData.append('duracion', duracion.value)
    formData.append('precio', precio.value)
    formData.append('nivel', nivel.value)
    formData.append('destacado', destacado.value)
    formData.append('profesorId', profesorId.value)

    catsInt.forEach(id => formData.append('categorias_id', String(id)))

    if (imagenFile.value) formData.append('imagen', imagenFile.value)

    const id = cursoSeleccionado.value.id
    const response = await fetch(`${API_URL}/cursos/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `${token_type.value} ${token.value}`
        },
        body: formData
    })

    if (!response.ok) throw new Error('Error al editar el curso')

    listarCursos()
    cerrarModalEdicion()
    alert('Curso editado correctamente')

  } catch (error) {
    console.error(error)
    alert('Hubo un problema al editar el curso')
  }
}

onMounted(async() => {
  listarCursos()
  listarProfesores()

// Cargar categorías al iniciar el componente para que estén disponibles al crear un curso
  try {
    const res = await fetch(`${API_URL}/categorias/`)
    if (!res.ok) throw new Error('Error al cargar categorías')
    listaCategorias.value = await res.json()
  } catch (err) {
    console.error('Error cargando categorías:', err)
  }

})

</script>



<style scoped>
 

</style>