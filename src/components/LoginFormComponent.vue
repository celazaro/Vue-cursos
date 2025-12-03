<template>

  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow " style="width: 100%; max-width: 400px;">
      <div>
        <div class="card shadow">
          <div class="card-body">
            <a href="/home" class="logo-img text-center d-block px-0 m-0">
              <img src="../assets/Logo_Learner.jpg" alt="" style="width: 40% ">
            </a>
            <p class="text-center">El futuro en tus manos</p>
            <br>
            <h3 class="card-title mb-4 text-center">Iniciar Sesión</h3>
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" required />
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

              <button type="submit" class="btn btn-primary w-100">Ingresar</button>
            </form>

            <div class="mt-3 text-center">
              <p>¿No tienes una cuenta?
                <RouterLink to="/register">Regístrate aquí</RouterLink>
              </p>
            </div>
            <div class="mt-3 text-center">
              <p>
                <RouterLink to="/home">Regresar a Inicio</RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>



<script setup>

import { login } from '@/services/auth' 
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'
import { usePerfilStore } from '@/stores/perfil'
import { useRoleStore } from '@/stores/role'

const email = ref('')
const password = ref('')
const showPassword = ref(false)


const router = useRouter() // Importar el router para hacer la redirección

const userStore = useUserStore()
const perfilStore = usePerfilStore()
const roleStore = useRoleStore()

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

async function handleLogin() {
  const data = await login(email.value, password.value);


  if (!data) {
    alert('Error al iniciar sesión. Verifica tus credenciales.')
    return
  }

  const username = data.username
  const userEmail = data.email
  const userId = String(data.id)
  const role = data.role
  //userStore.setUsername(username)
  userStore.setUserData({ username, email: userEmail, id:userId })
  roleStore.setRole(role)

  console.log(typeof userId, userId)
  console.log(username, userEmail, role)

  const imagen_url = data.imagen_url
  perfilStore.setImagenUrl(imagen_url)
  perfilStore.refreshImagen() // Forzar recarga de la imagen con timestamp

  // Guardamos la autenticación en localStorage o sessionStorage:

  //localStorage.setItem('isAuthenticated', 'true')
  sessionStorage.setItem('isAuthenticated', 'true')
  //localStorage.setItem('username', data.username) 
  sessionStorage.setItem('token', data.access_token) // Guardar token
  sessionStorage.setItem('token_type', data.token_type) // Guardar tipo de token
  sessionStorage.setItem('role', data.role)
  //sessionStorage.setItem('email', data.email)
  //sessionStorage.setItem('imagen_url', data.imagen_url) // Guardar URL de imagen
  // Redirigir a la página principal o dashboard

  router.push('/home') // Ajusta la ruta según tu proyecto

}

</script>