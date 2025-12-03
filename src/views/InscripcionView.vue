<template>

    <main class="main">
        <!-- Page Title -->
        <div class="page-title light-background">
            <div class="container d-lg-flex justify-content-between align-items-center">
                <h1 class="mb-2 mb-lg-0">Inscripción</h1>
                <nav class="breadcrumbs">
                    <ol>
                        <li><a href="/home">Inicio</a></li>
                        <li><a href="/cursos">Cursos</a></li>
                        <li class="current">Inscripción</li>
                    </ol>
                </nav>
            </div>
        </div><!-- End Page Title -->

        <!-- Enroll Section -->
        <section id="enroll" class="enroll section">

            <div class="container" data-aos="fade-up" data-aos-delay="100">

                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <div v-if="!userStore.username" class="enrollment-form-wrapper">

                            <div class="enrollment-header text-center mb-5" data-aos="fade-up" data-aos-delay="200">
                                <h2>Inscríbete en el curso de tus sueños</h2>
                                <p>Da el siguiente paso en tu trayectoria educativa. Completa el formulario a continuación para reservar tu plaza en nuestro completo programa de aprendizaje en línea.</p>
                            </div>

                            <form class="enrollment-form" data-aos="fade-up" data-aos-delay="300" @submit.prevent="registerAndPay" >

                                <div class="row mb-4">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="username" class="form-label">Username *</label>
                                            <input type="text" v-model="username" id="username" name="username"
                                                class="form-control" required="" autocomplete="username">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="email" class="form-label">Correo Electrónico *</label>
                                            <input type="email" v-model="email" id="email" name="email"
                                                class="form-control" required="" autocomplete="email">
                                        </div>
                                    </div>
                                </div>

                                <div class="row mb-4">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="password" class="form-label">Contraseña *</label>
                                            <div class="input-group">
                                                <input :type="showPassword ? 'text' : 'password'" type="password"
                                                    v-model="password" id="password" name="password"
                                                    class="form-control" required="" autocomplete="password" />
                                                <button class="btn btn-outline-secondary" type="button"
                                                    @mousedown="showPassword = true" @mouseup="showPassword = false"
                                                    @mouseleave="showPassword = false" @touchstart="showPassword = true"
                                                    @touchend="showPassword = false"
                                                    :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'">
                                                    <span v-if="showPassword"> <i class="bi bi-eye-slash"></i> </span>
                                                    <span v-else> <i class="bi bi-eye"></i> </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="confirmPassword" class="form-label">Confirmar contraseña
                                                *</label>
                                            <div class="input-group">
                                                <input :type="showPassword ? 'text' : 'password'" type="confirmPassword"
                                                    v-model="confirmPassword" id="confirmPassword"
                                                    name="confirmPassword" class="form-control"
                                                    autocomplete="confirmPassword">
                                                <button class="btn btn-outline-secondary" type="button"
                                                    @mousedown="showPassword = true" @mouseup="showPassword = false"
                                                    @mouseleave="showPassword = false" @touchstart="showPassword = true"
                                                    @touchend="showPassword = false"
                                                    :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'">
                                                    <span v-if="showPassword"> <i class="bi bi-eye-slash"></i> </span>
                                                    <span v-else> <i class="bi bi-eye"></i> </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mb-4">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <div class="agreement-section">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="terms"
                                                        name="terms" required="">
                                                    <label class="form-check-label" for="terms">
                                                        Estoy de acuerdo con los <a href="#">Términos del Servicio</a> y la <a
                                                            href="#">Política de Privacidad</a> *
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="newsletter"
                                                        name="newsletter">
                                                    <label class="form-check-label" for="newsletter">
                                                        Me gustaría recibir actualizaciones del curso y contenido educativo por correo electrónico.
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12 text-center">
                                        <button type="submit" class="btn btn-primary w-50">  
                                            Continuar con el Pago
                                        </button>
                                        <p class="enrollment-note mt-3">
                                            <i class="bi bi-shield-check"></i>
                                            Su información está segura y nunca será compartida con terceros.
                                        </p>
                                    </div>
                                </div>

                            </form>

                        </div>
                        <div v-else class="enrollment-form-wrapper">

                            <div class="enrollment-header text-center mb-5" data-aos="fade-up" data-aos-delay="200">
                                <h2>Inscríbete en el curso de tus sueños</h2>
                                <h3>Bienvenid@ {{ userStore.username }} </h3>
                            </div>

                            <form class="enrollment-form" data-aos="fade-up" data-aos-delay="300" @submit.prevent="directPayment">

                                <div class="row mb-4">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <div class="agreement-section">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="terms"
                                                        name="terms" required="">
                                                    <label class="form-check-label" for="terms">
                                                        Estoy de acuerdo con los <a href="#">Términos del Servicio</a> y la <a
                                                            href="#">Política de Privacidad</a> *
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="newsletter"
                                                        name="newsletter">
                                                    <label class="form-check-label" for="newsletter">
                                                        Me gustaría recibir actualizaciones del curso y contenido educativo por correo electrónico.
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12 text-center">
                                        <button type="submit" class="btn btn-primary w-50">Continuar con el pago</button>
                                        <p class="enrollment-note mt-3">
                                            <i class="bi bi-shield-check"></i>
                                            Su información está segura y nunca será compartida con terceros.
                                        </p>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div><!-- End Form Column -->



                    <div class="col-lg-4 d-none d-lg-block">

                        <div class="enrollment-benefits" data-aos="fade-left" data-aos-delay="400">
                            <div class="course-card">
                                <div class="course-image">
                                    <img v-if="cursoDetallado.imagen_url" :src="cursoDetallado.imagen_url" alt="Course"
                                        class="img-fluid">

                                    <div class="course-price mt-2">Precio $ {{ cursoDetallado.precio }} </div>
                                </div>
                                <div class="course-content mt-3">
                                    <h3> {{ cursoDetallado.titulo }} </h3>
                                </div>
                            </div><!-- End Course Card -->
                            <hr>
                            </hr>
                            <h3 class="my-5">¿Porqué elegir nuestros cursos?</h3>
                            <div class="benefit-item">
                                <div class="benefit-icon">
                                    <i class="bi bi-trophy"></i>
                                </div>
                                <div class="benefit-content">
                                    <h4>Profesores Expertos</h4>
                                    <p>Learn from industry professionals with years of real-world experience</p>
                                </div>
                            </div><!-- End Benefit Item -->

                            <div class="benefit-item">
                                <div class="benefit-icon">
                                    <i class="bi bi-clock"></i>
                                </div>
                                <div class="benefit-content">
                                    <h4>Aprendizaje Flexible</h4>
                                    <p>Study at your own pace with 24/7 access to course materials</p>
                                </div>
                            </div><!-- End Benefit Item -->

                            <div class="benefit-item">
                                <div class="benefit-icon">
                                    <i class="bi bi-award"></i>
                                </div>
                                <div class="benefit-content">
                                    <h4>Certificación</h4>
                                    <p>Earn industry-recognized certificates upon course completion</p>
                                </div>
                            </div><!-- End Benefit Item -->

                            <div class="benefit-item">
                                <div class="benefit-icon">
                                    <i class="bi bi-people"></i>
                                </div>
                                <div class="benefit-content">
                                    <h4>Comunidad de soporte</h4>
                                    <p>Connect with fellow students and get help when you need it</p>
                                </div>
                            </div><!-- End Benefit Item -->

                        </div>
                    </div><!-- End Benefits Column -->

                </div>

            </div>

        </section><!-- /Enroll Section -->

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
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore() 

console.log('userStore',userStore.id)

const cursoDetallado = ref([]) // Variable reactiva para los cursos
const showPassword = ref(false)

const username = ref('')  
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const router = useRouter() // Importamos el router para redirigir

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



async function registerAndPay() {
  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden')
    return
  }

  try {
    
    // 1️⃣ Crear y registrar usuario en el backend
    const resUser = await fetch(`${API_URL}/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value
      })
    })

    if (!resUser.ok) {
      alert("Error al crear el usuario. Puede que el usuario o email estén usados.")
      return
    }

    const newUser = await resUser.json()
    console.log("✅ Usuario creado:", newUser)
    alert("Usuario creado. El pago continua al hacer click.")

    // 2️⃣ Guardar en tu store (para reuso futuro)
    userStore.username = newUser.username
    userStore.email = newUser.email
    userStore.id = newUser.id

    // 3️⃣ Iniciar el pago normalmente
    await directPayment()

  } catch (err) {
    console.error("Error en registerAndPay:", err)
  } 
}

async function directPayment() {

    try {
        const response = await fetch(`${API_URL}/mp/create_preference`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                // 👇 acá debes enviar los datos que espera tu backend
                username: userStore.username,
                email: userStore.email,
                curso_titulo: cursoDetallado.value.titulo,
                precio: cursoDetallado.value.precio,
                cantidad: 1,
                user_id: userStore.id,
                curso_id: cursoDetallado.value.id
            }),

        })

        if (!response.ok) {
            //throw new Error("Error en la respuesta del servidor")
            alert('Error en la respuesta del servidor.  Por favor pruebe más tarde.  ¡Muchas gracias!')
            return
        }

        const data = await response.json()

        console.log("Respuesta backend:", data) // 👈 debug

        // 👇 Siempre redirige al sandbox
        if (data.sandbox_init_point) {
            window.location.href = data.sandbox_init_point
        } else {
            alert("No se encontró sandbox_init_point en la respuesta")
        }
    } catch (error) {
        console.error("Error al iniciar pago:", error)
    }
}



onMounted(() => {
    listarCursoDetallado()
})

</script>



<style scoped></style>