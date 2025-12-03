<template >
  <main class="main">

    <!-- Page Title -->
    <div class="page-title light-background">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">Detalles del Curso</h1>
        <nav class="breadcrumbs">
          <ol>
            <li><a href="/home">Inicio</a></li>
            <li><a href="/cursos">Cursos</a></li>
            <li class="current">Detalles del Curso</li>
          </ol>
        </nav>
      </div>
    </div><!-- End Page Title -->

    <!-- Course Details Section -->
    <section id="course-details" class="course-details section">

      <div class="container" data-aos="fade-up" data-aos-delay="100" v-if="Object.keys(cursoDetallado).length > 0" >

        <div class="row">
          <div class="col-lg-8">

            <!-- Course Hero -->  
            <div class="course-hero" data-aos="fade-up" data-aos-delay="200">
              <div class="hero-content">
                <div class="course-badge">
                  <span class="category" v-for="cate in cursoDetallado.categorias" :key="cate.id"> {{ cate.name }}
                  </span>
                  <span class="level"> {{ cursoDetallado.nivel }} </span>
                </div>
                <h1> {{ cursoDetallado.titulo }} </h1>
                <p class="course-subtitle"> {{ cursoDetallado.descripcion }} </p>

                <div class="instructor-card">
                  <img
                    :src="cursoDetallado.profesor.imagen_url" 
                    alt="Instructor" class="instructor-image">
                  <div class="instructor-details">
                    <h5> {{ cursoDetallado.profesor?.name }} </h5>
                    <span> {{ cursoDetallado.profesor?.profesion }} </span>

                  </div>
                </div>
              </div>
              <div class="hero-image">
                <img v-if="cursoDetallado.imagen_url"  :src="cursoDetallado.imagen_url" alt="Course Preview" class="img-fluid">

              </div>
            </div>End Course Hero 

            <!-- Course Navigation Tabs -->
            <div class="course-nav-tabs" data-aos="fade-up" data-aos-delay="300">
              <ul class="nav nav-tabs" id="course-detailsCourseTab" role="tablist">
                <li class="nav-item">
                  <button class="nav-link active" id="course-detailsoverview-tab" data-bs-toggle="tab"
                    data-bs-target="#course-detailsoverview" type="button" role="tab">
                    <i class="bi bi-layout-text-window-reverse"></i>
                    Overview
                  </button>
                </li>
                <li class="nav-item">
                  <button class="nav-link" id="course-detailscurriculum-tab" data-bs-toggle="tab"
                    data-bs-target="#course-detailscurriculum" type="button" role="tab">
                    <i class="bi bi-list-ul"></i>
                    Curriculum
                  </button>
                </li>
              </ul>

              <div class="tab-content" id="course-detailsCourseTabContent">

                <!-- Overview Tab -->
                <div class="tab-pane fade show active" id="course-detailsoverview" role="tabpanel">

                  <div class="overview-section">
                    <h3>Descripción del Curso</h3>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                      totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                      dicta sunt explicabo.</p>
                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                      magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                  </div>
                  <!-- Habilidades -->
                  <div class="skills-grid">
                    <h3>Habilidades a Adquirir</h3>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="skill-item">
                          <div class="skill-icon">
                            <i class="bi bi-code-slash"></i>
                          </div>
                          <div class="skill-content">
                            <h5>Frontend Development</h5>
                            <p>React, JavaScript ES6+, HTML5 &amp; CSS3</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="skill-item">
                          <div class="skill-icon">
                            <i class="bi bi-server"></i>
                          </div>
                          <div class="skill-content">
                            <h5>Backend Development</h5>
                            <p>Node.js, Express.js, RESTful APIs</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="skill-item">
                          <div class="skill-icon">
                            <i class="bi bi-database"></i>
                          </div>
                          <div class="skill-content">
                            <h5>Database Management</h5>
                            <p>MongoDB, Mongoose, Data Modeling</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="skill-item">
                          <div class="skill-icon">
                            <i class="bi bi-shield-check"></i>
                          </div>
                          <div class="skill-content">
                            <h5>Security &amp; Testing</h5>
                            <p>Authentication, JWT, Unit Testing</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Requerimientos -->
                  <div class="requirements-section">
                    <h3>Requisitos</h3>
                    <ul class="requirements-list">
                      <li><i class="bi bi-check2"></i>Basic understanding of HTML and CSS</li>
                      <li><i class="bi bi-check2"></i>Familiarity with JavaScript fundamentals</li>
                      <li><i class="bi bi-check2"></i>Computer with internet connection</li>
                      <li><i class="bi bi-check2"></i>Text editor or IDE installed</li>
                    </ul>
                  </div>

                </div><!-- End Overview Tab -->

                <!-- Curriculum Tab -->
                <div class="tab-pane fade" id="course-detailscurriculum" role="tabpanel">

                  <div class="curriculum-overview">
                    <div class="curriculum-stats">
                      <div class="stat">
                        <i class="bi bi-collection-play"></i>
                        <span>12 Sections</span>
                      </div>
                      <div class="stat">
                        <i class="bi bi-play-circle"></i>
                        <span>89 Lectures</span>
                      </div>
                      <div class="stat">
                        <i class="bi bi-clock"></i>
                        <span>45h 32m</span>
                      </div>
                    </div>
                  </div>

                  <div class="accordion" id="curriculumAccordion">

                    <div class="accordion-item curriculum-module">
                      <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                          data-bs-target="#module1">
                          <div class="module-info">
                            <span class="module-title">JavaScript Fundamentals &amp; ES6+</span>
                            <span class="module-meta">8 lessons • 4h 15m</span>
                          </div>
                        </button>
                      </h2>
                      <div id="module1" class="accordion-collapse collapse show" data-bs-parent="#curriculumAccordion">
                        <div class="accordion-body">
                          <div class="lessons-list">
                            <div class="lesson">
                              <i class="bi bi-play-circle"></i>
                              <span class="lesson-title">Variables, Functions and Scope</span>
                              <span class="lesson-time">28 min</span>
                            </div>
                            <div class="lesson">
                              <i class="bi bi-play-circle"></i>
                              <span class="lesson-title">Arrow Functions and Destructuring</span>
                              <span class="lesson-time">35 min</span>
                            </div>
                            <div class="lesson">
                              <i class="bi bi-file-earmark-text"></i>
                              <span class="lesson-title">Promises and Async/Await</span>
                              <span class="lesson-time">42 min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="accordion-item curriculum-module">
                      <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                          data-bs-target="#module2">
                          <div class="module-info">
                            <span class="module-title">React Development Deep Dive</span>
                            <span class="module-meta">12 lessons • 7h 45m</span>
                          </div>
                        </button>
                      </h2>
                      <div id="module2" class="accordion-collapse collapse" data-bs-parent="#curriculumAccordion">
                        <div class="accordion-body">
                          <div class="lessons-list">
                            <div class="lesson">
                              <i class="bi bi-play-circle"></i>
                              <span class="lesson-title">Components and JSX Syntax</span>
                              <span class="lesson-time">32 min</span>
                            </div>
                            <div class="lesson">
                              <i class="bi bi-play-circle"></i>
                              <span class="lesson-title">State Management with Hooks</span>
                              <span class="lesson-time">48 min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="accordion-item curriculum-module">
                      <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                          data-bs-target="#module3">
                          <div class="module-info">
                            <span class="module-title">Node.js &amp; Server Development</span>
                            <span class="module-meta">15 lessons • 8h 20m</span>
                          </div>
                        </button>
                      </h2>
                      <div id="module3" class="accordion-collapse collapse" data-bs-parent="#curriculumAccordion">
                        <div class="accordion-body">
                          <div class="lessons-list">
                            <div class="lesson">
                              <i class="bi bi-play-circle"></i>
                              <span class="lesson-title">Express.js Server Setup</span>
                              <span class="lesson-time">25 min</span>
                            </div>
                            <div class="lesson">
                              <i class="bi bi-file-earmark-text"></i>
                              <span class="lesson-title">Building RESTful APIs</span>
                              <span class="lesson-time">55 min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div><!-- End Curriculum Tab -->

              </div>
            </div><!-- End Course Navigation Tabs -->

          </div>

          <div class="col-lg-4">

            <!-- Enrollment Card -->
            <div class="enrollment-card" data-aos="fade-up" data-aos-delay="200">

              <div class="card-header">
                <div class="price-display">
                  <span class="current-price">$ {{ cursoDetallado.precio }} </span>
                  <!--   <span class="original-price">$249</span>
                  <span class="discount">40% OFF</span> -->
                </div>

              </div>

              <div class="card-body">
                <div class="course-highlights">
                  <div class="highlight-item">
                    <i class="bi bi-trophy"></i>
                    <span>Entrega de Certificado</span>
                  </div>
                  <div class="highlight-item">
                    <i class="bi bi-clock-history"></i>
                    <span> {{ cursoDetallado.duracion }} horas de contenido</span>
                  </div>
                  <div class="highlight-item">
                    <i class="bi bi-download"></i>
                    <span>Recursos Descargables</span>
                  </div>
                  <div class="highlight-item">
                    <i class="bi bi-infinity"></i>
                    <span>Acceso Ilimitado por 6 meses</span>
                  </div>
                  <div class="highlight-item">
                    <i class="bi bi-phone"></i>
                    <span>Acceso desde tu móvil</span>
                  </div>
                </div>

                <div class="action-buttons">
                  <router-link :to="`/inscripcion/${id}`" class="btn btn-secondary">
                    ¡Inscríbete Ahora!
                  </router-link>
                </div>

                <div class="guarantee">
                  <i class="bi bi-shield-check"></i>
                  <span>30-días de garantía para devolución del dinero</span>
                </div>
              </div>

            </div><!-- End Enrollment Card -->

          </div>

        </div>

      </div>

    </section><!-- /Course Details Section -->

  </main>

</template>



<script setup>

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

import { ref, onMounted } from 'vue'

const cursoDetallado = ref({}) // Variable reactiva para los cursos

const API_URL = import.meta.env.VITE_API_URL

async function listarCursoDetallado() {
  try {
    const response = await fetch(`${API_URL}/cursos/${props.id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        cursoDetallado.value = []
        return
      } else {
        throw new Error('Error inesperado al obtener los detalles del curso')
      }
    }

    const data = await response.json()
    cursoDetallado.value = data // Asume que data es un array de cursos
    console.log('Curso Detallado:', cursoDetallado.value)
  } catch (error) {
    console.error(error) 
    cursoDetallado.value = []
  }
}


onMounted(() => {
  listarCursoDetallado()
})


</script>




<style scoped>
    
</style>