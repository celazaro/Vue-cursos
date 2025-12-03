<template >
  <main class="main">

    <!-- Page Title -->
    <div class="page-title light-background">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">Cursos</h1>
        <nav class="breadcrumbs">
          <ol>
            <li><a href="/">Inicio</a></li>
            <li class="current">Cursos</li>
          </ol>
        </nav>
      </div>
    </div><!-- End Page Title -->

    <!-- Courses 2 Section -->
    <section id="courses-2" class="courses-2 section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row">
          <div class="col-lg-3">
            <div class="course-filters" data-aos="fade-right" data-aos-delay="100">
              <h4 class="filter-title">Filtrado de Cursos</h4>

              <div class="filter-group">
                <h5>Categorías</h5>
                <div class="filter-options">
                  <label class="filter-checkbox">
                    <input type="checkbox" v-model="allCategories" @click="toggleAllCategories">
                    <span class="checkmark"></span>
                    Todas las Categorías
                  </label>
                  <div class="filter-options">
                    <label v-for="cate in categorias" :key="cate.id" class="filter-checkbox">
                      <input type="checkbox" :value="cate.id" v-model="selectedCategories" />
                      <span class="checkmark"></span>
                      {{ cate.name }}
                    </label>
                  </div>
                </div>
              </div>

              <div class="filter-group">
                <h5>Nivel</h5>
                <div class="filter-options">
                  <label class="filter-checkbox">
                    <input type="checkbox" v-model="allLevels" @click="toggleAllLevels">
                    <span class="checkmark"></span>
                    Todos los niveles
                  </label>
                  <label v-for="level in levels" :key="level" class="filter-checkbox">
                    <input type="checkbox" :value="level" v-model="selectedLevels">
                    <span class="checkmark"></span>
                    {{ level }}
                  </label>
                </div>
              </div>
            </div><!-- End Course Filters -->
          </div>

          <div class="col-lg-9">
            <div class="courses-header" data-aos="fade-left" data-aos-delay="100">
              <div class="search-box">
                <i class="bi bi-search"></i>
                <input type="text" placeholder="Search courses...">
              </div>
            </div>

            <div class="courses-grid" data-aos="fade-up"  data-aos-delay="200" >
              <div class="row" v-if="cursos.length != 0">

                <div class="col-lg-6 col-md-6" v-for="c in paginatedCourses" :key="c.id"
                  v-if="filteredCourses.length != 0" style="cursor: pointer;" @click="goToCourse(c.id)" >
                  <div class="course-card">
                    <div class="course-image">
                      <img  v-if="c.imagen_url" :src="c.imagen_url" alt="Course" class="img-fluid">

                      <div class="course-price">$ {{ c.precio }} </div>
                    </div>
                    <div class="course-content">
                      <div class="course-meta">
                        <div v-if="c.categorias && c.categorias.length" v-for="cat in c.categorias" :key="cat.id">
                          <span class="level2"> {{ cat.name }} </span>
                        </div>
                        <div v-else>
                          <span class="level2">Categoría no especificada</span>
                        </div>
                        <span class="level"> {{ c.nivel }} </span>
                      </div>
                      <h3> {{ c.titulo }} </h3>
                      <p> {{ c.descripcion }} </p>
                      <div class="course-stats">
                        <div class="stat">
                          <i class="bi bi-clock"></i>
                          <span> {{ c.duracion }} semanas </span>
                        </div>

                      </div>
                      <div class="instructor-info">
                        <img  v-if="c.profesor.imagen_url" :src="c.profesor.imagen_url" alt="Instructor"
                          class="instructor-avatar">
                        <span class="instructor-name"> {{ c.profesor.name }} </span>
                      </div>
                      
                    </div>

                  </div><!-- End Course Card -->

                </div>
                <div v-else class="col-12 text-center ">
                  <h2>No se encontraron cursos que coincidan con los filtros</h2>
                </div>
              </div>

              <div v-else class="col-12 text-center">
                <h2>No se encuentran cursos disponibles</h2>
              </div>
            </div><!-- End Courses Grid -->

            <div class="pagination-wrapper" data-aos="fade-up" data-aos-delay="300">
              <nav aria-label="Courses pagination">
                <ul class="pagination justify-content-center">
                  <li class="page-item">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" @click="prevPage"
                      :disabled="page === 1">
                      <i class="bi bi-chevron-left"></i>
                    </a>
                  </li>
                  <li class="page-item" v-for="p in pageList" :key="p" @click="goToPage(p)"
                    :class="{ active: p === page }">
                    <a class="page-link" href="#"> {{ p }} </a>
                  </li>

                  <li class="page-item">
                    <a class="page-link" href="#" @click="nextPage" :disabled="page === totalPages">
                      <i class="bi bi-chevron-right"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div><!-- End Pagination -->
          </div>
        </div>
      </div>
    </section><!-- /Courses 2 Section -->
  </main>


</template>



<script setup>

import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const cursos = ref([]) // Variable reactiva para los cursos

const router = useRouter() // Importar el router para hacer la redirección

const allCategories = ref(true)
const selectedCategories = ref([])

const levels = ['Básico', 'Intermedio', 'Avanzado']
const allLevels = ref(true)
const selectedLevels = ref([])

// Paginación
const page = ref(1)         // página actual
const perPage = ref(4)      // cursos por página (ajusta a tu gusto)


const filteredCourses = computed(() => {
  return cursos.value.filter(curso => {
    const courseCatIds = (curso.categorias || []).map(cat => cat.id)
    const okCat = allCategories.value ||
      selectedCategories.value.some(id => courseCatIds.includes(id))
    const okNivel = allLevels.value ||
      selectedLevels.value.includes(curso.nivel)
    return okCat && okNivel
  })
})

const API_URL = import.meta.env.VITE_API_URL

// Inserción del watch 👇

watch(selectedCategories, newVal => {
  // Si el array NO tiene elementos, dejamos “Todas” activa
  allCategories.value = newVal.length === 0
})

watch(selectedLevels, newVal => {
  allLevels.value = newVal.length === 0
})


function toggleAllCategories() {
  if (allCategories.value) selectedCategories.value = []
}

function toggleAllLevels() {
  if (allLevels.value) selectedLevels.value = []
}

const totalPages = computed(() => {
  return Math.ceil(filteredCourses.value.length / perPage.value)
})

const paginatedCourses = computed(() => {
  const start = (page.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredCourses.value.slice(start, end)
})

const pageList = computed(() => {
  return Array.from({ length: totalPages.value }, (_, i) => i + 1)
})

async function listarCursos() {
  try {
    const response = await fetch(`${API_URL}/cursos/`, {
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
        throw new Error('Error inesperado al obtener los cursos')
      }
    }

    const data = await response.json()
    cursos.value = data // Asume que data es un array de cursos
    console.log('Cursos:', cursos.value)
  } catch (error) {
    console.error(error)
    cursos.value = []
  }
}

const categorias = ref([])

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
        throw new Error('Error inesperado al obtener los cursos destacados')
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

onMounted(() => {
  listarCursos(),
  listarCategorias()
})

function goToPage(n) {
  if (n >= 1 && n <= totalPages.value) {
    page.value = n
  }
}

function nextPage() {
  goToPage(page.value + 1)
}

function prevPage() {
  goToPage(page.value - 1)
}

function goToCourse(id) {
  console.log('El curso seleccionado tiene el id: ', id)

  router.push(`/cursodetalle/${id}`)
}

</script>




<style scoped>

    span.level2 {
  background:  #6466de;
  color: #f1efea;
}

</style>