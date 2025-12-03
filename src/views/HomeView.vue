
<template>

  <!-- Courses Hero Section -->
  <section id="courses-hero" class="courses-hero section light-background pt-4 ">

    <div class="hero-content">
      <div class="container">
        <div class="row align-items-center">

          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <div class="hero-text ">
              <h1>Transforma tu futuro con nuestros Cursos Online</h1>
              <p>Discover thousands of high-quality courses designed by industry professionals. Learn at your own pace,
                gain in-demand skills, and advance your career from anywhere in the world.</p>

              <div class="hero-stats">
                <div class="stat-item">
                  <span class="number purecounter" data-purecounter-start="0" data-purecounter-end="50000"
                    data-purecounter-duration="2"></span>
                  <span class="label">Students Enrolled</span>
                </div>
                <div class="stat-item">
                  <span class="number purecounter" data-purecounter-start="0" data-purecounter-end="1200"
                    data-purecounter-duration="2"></span>
                  <span class="label">Expert Courses</span>
                </div>
                <div class="stat-item">
                  <span class="number purecounter" data-purecounter-start="0" data-purecounter-end="98"
                    data-purecounter-duration="2"></span>
                  <span class="label">Success Rate %</span>
                </div>
              </div>

              <div class="hero-buttons">
                <a href="/cursos" class="btn btn-outline">Explorar Cursos</a>
                <a href="/about" class="btn btn-outline">Más Información</a>
              </div>

              <div class="hero-features">
                <div class="feature">
                  <i class="bi bi-shield-check"></i>
                  <span>Programas Certificados</span>
                </div>
                <div class="feature">
                  <i class="bi bi-clock"></i>
                  <span>Acceso todo el tiempo</span>
                </div>
                <div class="feature">
                  <i class="bi bi-people"></i>
                  <span>Instructores Expertos</span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <div class="hero-image">
              <div class="main-image">
                <img src="/src/assets/img/education/courses-13.webp" alt="Online Learning" class="img-fluid">
              </div>

              <div class="floating-cards">
                <div class="course-card">
                  <div class="card-icon">
                    <i class="bi bi-code-slash"></i>
                  </div>
                  <div class="card-content">
                    <h6>Web Development</h6>
                    <span>2,450 Students</span>
                  </div>
                </div>

                <div class="course-card">
                  <div class="card-icon">
                    <i class="bi bi-palette"></i>
                  </div>
                  <div class="card-content">
                    <h6>UI/UX Design</h6>
                    <span>1,890 Students</span>
                  </div>
                </div>

                <div class="course-card">
                  <div class="card-icon">
                    <i class="bi bi-graph-up"></i>
                  </div>
                  <div class="card-content">
                    <h6>Digital Marketing</h6>
                    <span>3,200 Students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="hero-background">
      <div class="bg-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>

  </section><!-- /Courses Hero Section -->

    <!-- Course Categories Section -->
  <section id="course-categories" class="course-categories section">

    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Categorías</h2>
      <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
    </div><!-- End Section Title -->

    <div class="container" data-aos="fade-up" data-aos-delay="100">

      <div class="specialties-grid" data-aos="fade-up" data-aos-delay="300">
        <div class="row align-items-center" v-if="categorias.length != 0"  >

          <div class="col-lg-3 col-md-6 my-2"  v-for="cat in categorias" :key="categorias.id">
            <div class="specialty-card">
              <div class="specialty-image">
                <img v-if="cat.imagen_url" :src="cat.imagen_url" alt="Maternal Care" class="img-fluid" loading="lazy">
              </div>
              <div class="specialty-content text-center my-2">
                <h5> {{ cat.name }} </h5>
                <p> {{ cat.descripcion }} </p>
              </div>
            </div>
          </div>

        </div>
        <div v-else class="col-12 text-center">
          <h2>No existen Categorías definidas</h2>
        </div>
      </div>
    </div>

  </section><!-- /Course Categories Section -->


  <!-- Featured Courses Section -->
  <section id="featured-courses" class="featured-courses section">

    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Cursos Destacados</h2>
      <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
    </div><!-- End Section Title -->

    <!-- Cards con cada uno de los cursos -->
    <div class="container" data-aos="fade-up" data-aos-delay="100">

      <div class="row gy-4">
        <div v-if="cursosDestacados.length === 0" class="col-12 text-center">
          <h2>No hay cursos destacados disponibles en este momento.</h2>
        </div>

        <div v-else class="col-lg-4 col-md-6" v-for="curso in cursosDestacados" :key="curso.id" data-aos="fade-up"
          data-aos-delay="200"  style="cursor: pointer;" @click="goToCourse(curso.id)" >
          <div class="course-card">
            <div class="course-image">
              <img  v-if="curso.imagen_url" :src="curso.imagen_url" alt="Course" class="img-fluid">
              <div class="badge featured">Destacado</div>
              <div class="price-badge">{{ curso.precio ? `$ ${curso.precio}` : 'Gratis' }}</div>
            </div>
            <div class="course-content">
              <div class="course-meta">
                <span class="level"> {{ curso.nivel || 'Nivel no especificado' }} </span>
                <span class="duration"> {{ curso.duracion || '' }} Semanas</span>
              </div>
              <div class="course-meta" >
                <div  v-if="curso.categorias && curso.categorias.length " v-for="cat in curso.categorias" :key="cat.id" >
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
          </div>
        </div><!-- End Course Item -->

      </div>

      <div class="more-courses text-center" data-aos="fade-up" data-aos-delay="500">
        <a href="/cursos" class="btn-more">Ver Todos los Cursos</a>
      </div>

    </div><!-- Fin Cards de cursos -->

  </section><!-- /Featured Courses Section -->



</template>



<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter() // Importar el router para hacer la redirección

const cursosDestacados = ref([]) // Variable reactiva para los cursos

const API_URL = import.meta.env.VITE_API_URL

async function listarCursosDestacados() {
  try {
    const response = await fetch(`${API_URL}/cursos/destacados`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        cursosDestacados.value = []
        return
      } else {
        throw new Error('Error inesperado al obtener los cursos destacados')
      }
    }

    const data = await response.json()
    cursosDestacados.value = data // Asume que data es un array de cursos
    console.log('Cursos destacados:', cursosDestacados.value)
  } catch (error) {
    console.error(error)
    cursosDestacados.value = []
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
  listarCursosDestacados(),
  listarCategorias()
})

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