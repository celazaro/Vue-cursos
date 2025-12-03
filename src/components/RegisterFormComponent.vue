<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow p-4" style="width: 100%; max-width: 500px;">
      <a href="/home" class="logo-img text-center d-block px-0 m-0" >
                  <img src="../assets/Logo_Learner.jpg" alt="" style="width: 40% " >
      </a>
      <p class="text-center">El futuro en tus manos</p>


      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" v-model="username" class="form-control" id="username" required>
        </div>
        
        <div class="mb-3">
          <label for="email" class="form-label">Correo electrónico</label>
          <input type="email" v-model="email" class="form-control" id="email" required>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <div class="input-group">
                  <input :type="showPassword ? 'text' : 'password'" type="password" class="form-control" id="password"
                    v-model="password" required />

                  <button class="btn btn-outline-secondary" type="button"
                    @mousedown="showPassword = true"   
                    @mouseup="showPassword = false" 
                    @mouseleave="showPassword = false"
                    @touchstart="showPassword = true" 
                    @touchend="showPassword = false"
                    :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                    >
                    <span v-if="showPassword"> <i class="bi bi-eye-slash"></i> </span>
                    <span v-else> <i class="bi bi-eye"></i> </span>
                  </button>
                </div>
        </div>

        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Confirmar contraseña</label>
          <div class="input-group">
            <input :type="showPassword ? 'text' : 'password'" type="confirmPassword" class="form-control" id="confirmPassword"
              v-model="confirmPassword" required />

            <button class="btn btn-outline-secondary" type="button"
              @mousedown="showPassword = true"   
              @mouseup="showPassword = false" 
              @mouseleave="showPassword = false"
              @touchstart="showPassword = true" 
              @touchend="showPassword = false"
              :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              >
              <span v-if="showPassword"> <i class="bi bi-eye-slash"></i> </span>
              <span v-else> <i class="bi bi-eye"></i> </span>
            </button>
          </div>
        </div>

        <button type="submit" class="btn btn-primary w-100">Registrarse</button>
      </form>

      <div class="mt-3 text-center">
        <RouterLink to="/login">¿Ya tienes cuenta? Inicia sesión</RouterLink>
      </div>
            <div class="mt-3 text-center">
        <RouterLink to="/">Regresar a Inicio</RouterLink>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')  
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)

const router = useRouter() // Importamos el router para redirigir

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const API_URL = import.meta.env.VITE_API_URL

async function handleRegister() {
  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden')
    return
  }

  try {
    const response = await fetch(`${API_URL}/users/`, { // Reemplaza con la URL de tu API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value
      })
    })

    if (!response.ok) {
      throw new Error('Error en el registro')
    }

    const data = await response.json()
    console.log('Registro exitoso:', data)
    alert('Registro exitoso!!')


    // Redirigir al usuario al login o dashboard según sea necesario
    router.push('/login') // Ajusta la ruta según tu proyecto

  } catch (error) {
    console.error('Error:', error)
    alert('Error al registrar usuario. Inténtalo de nuevo.')
  }
}
</script>