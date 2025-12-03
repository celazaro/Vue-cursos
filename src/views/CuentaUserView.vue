<template >
  <div class="container d-flex flex-column">
    <!-- Page Title -->
    <div class="page-title light-background">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">Cursos Adquiridos</h1>
        <nav class="breadcrumbs">
          <ol>
            <li><a href="#">Cursos Adquiridos</a></li>
            <li><a href="#">Detalle de Facturación</a></li>
            <li><a href="#" @click="handleLogout">Cerrar Sesión</a></li>
          </ol>
        </nav>
      </div>
    </div><!-- End Page Title -->

    <section id="featured-courses" class="featured-courses section">
      <!-- Cards con cada uno de los cursos -->
      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row gy-4">
          <div v-if="cursosAprobadosOrdenados.length === 0" class="col-12 text-center my-5">
            <h2>No tiene cursos comprados hasta el momento.</h2>
          </div>
          <div v-else class="col-lg-4 col-md-6" v-for="curso in cursosAprobadosOrdenados" :index="curso.id"
            data-aos="fade-up" data-aos-delay="200">

            <div class="course-card">
              <div class="course-image">
                <img v-if="curso.imagen_url" :src="curso.imagen_url" alt="Course" class="img-fluid">
                <div class="price-badge">{{ curso.precio ? `$ ${curso.precio}` : 'Gratis' }}</div>
              </div>
              <div class="course-content">
                <div class="course-meta">
                  <span class="level"> {{ curso.nivel || 'Nivel no especificado' }} </span>
                  <span class="duration"> {{ curso.duracion || '' }} Semanas</span>
                </div>
                <div class="course-meta">
                  <div v-if="curso.categorias && curso.categorias.length " v-for="cat in curso.categorias"
                    :key="cat.id">
                    <span class="level2"> {{ cat.name }} </span>
                  </div>
                  <div v-else>
                    <span class="level2">Categoría no especificada</span>
                  </div>
                </div>
                <h3><a href="#"> {{ curso.titulo }} </a></h3>
                <p> {{ curso.descripcion }} </p>
                <div class="instructor">
                  <img v-if="curso.profesor.imagen_url" :src="curso.profesor.imagen_url" alt="Instructor"
                    class="instructor-img">
                  <div class="instructor-info">
                    <h6> {{ curso.profesor.name }} </h6>
                    <span> {{ curso.profesor.profesion }} </span>
                  </div>
                </div>
              </div>
              <button class="btn btn-primary" :disabled="curso.status === 'caducado'">Empezar Curso</button>
              <!-- Cartel superpuesto si está caducado -->
              <div v-if="curso.status === 'caducado'"
                class="overlay-expired d-flex justify-content-center align-items-center">
                <span class="text-black fw-bold">⏳ Curso Expirado</span>
              </div>

            </div>


          </div><!-- End Course Item -->

        </div>




      </div><!-- Fin Cards de cursos -->

    </section>

  </div>

</template>



<script setup>

import { ref, onMounted, computed } from 'vue'

import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'
import { usePerfilStore } from '@/stores/perfil'

import { logout } from '@/services/logout' // Importar la función de logout

const perfilStore = usePerfilStore()
const userStore = useUserStore() 

const router = useRouter() // Importamos el router para redirigir

const cursos = ref([])
const cursosPagados = ref([])


const userId = computed(()=> userStore.id)  // id del usuario logueado

const API_URL = import.meta.env.VITE_API_URL

function handleLogout() {
    logout()
    userStore.clearUser()
    perfilStore.clearPerfil() // Limpiar el estado del perfil si es necesario
    router.push('/home') // Redirigir al inicio
}

async function listarCursos() {
    
  try {
    const response = await fetch(`${API_URL}/cursos`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
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
    
  } catch (error) {
    console.error(error)
    cursos.value = []
  }
}

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

    
  } catch (error) {
    console.error(error)
    cursosPagados.value = []
  }
}


const cursosAprobados = computed(() => {
  if (!userId.value) return []

  const pagos = cursosPagados.value.filter(p =>
    String(p.user_id) === String(userId.value) &&
    String(p.status).toLowerCase() === 'approved'
  )

  return cursos.value.filter(curso =>
    pagos.some(p => String(p.curso_id) === String(curso.id))
  )
})


const cursosAprobadosOrdenados = computed(() => {
  if (!userId.value) return []

  const pagos = cursosPagados.value.filter(p =>
    String(p.user_id) === String(userId.value) &&
    ['approved', 'caducado'].includes(String(p.status).toLowerCase())
  )

  const cursosMatch = cursos.value
    .map(curso => {
      const pago = pagos.find(p => String(p.curso_id) === String(curso.id))
      if (!pago) return null
      return {
        ...curso,
        status: String(pago.status).toLowerCase(), // importante para el template
        fecha_compra: pago.created_at // ajusta el nombre del campo
      }
    })
    .filter(Boolean)
  
  console.log('Ver', cursosAprobadosOrdenados)
  // ordenar de más antiguo a más reciente
  return cursosMatch.sort((a, b) => new Date(a.fecha_compra) - new Date(b.fecha_compra))
})


onMounted(async() => {
  listarCursosPagados()
  listarCursos()
  
})

</script>




<style scoped>
    
span.level2 {
  background:  #6466de;
  color: #f1efea;
}

.course-card {
  position: relative;
  overflow: hidden;
}

.overlay-expired {
  position: absolute;
  top: 60%;
  left: 0;
  width: 100%;
  height: 20%;
  background: rgba(0, 0, 0, 0.4);
  font-size: 1.5rem;
  z-index: 10;
}

</style>