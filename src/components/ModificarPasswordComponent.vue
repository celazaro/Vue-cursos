<template>

  <div class="container d-flex flex-column ">

    <!-- Page Title -->
    <div class="page-title light-background">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">Modificar Contraseña</h1>
        <nav class="breadcrumbs">
          <ol>
            <li><a href="/verperfil">Mi Perfil</a></li>
            <li><a href="/editarperfil">Editar Perfil</a></li>
            <li><a href="#" @click="handleLogout" >Cerrar Sesión</a></li>
          </ol>
        </nav>
      </div>
    </div><!-- End Page Title -->

    <div class="flex-grow-1 d-flex justify-content-center align-items-center my-5">
      <div class="card shadow p-4" style="width: 100%; max-width: 500px;" >
        <form @submit.prevent="changePassword">
          <div class="mb-3">
            <label for="currentPassword" class="form-label">Contraseña actual</label>
            <input id="currentPassword" type="password" v-model="currentPassword" class="form-control" required
              autocomplete="current-password" />
          </div>

          <div class="mb-3">
            <label for="newPassword" class="form-label">Nueva Contraseña</label>
            <input id="newPassword" type="password" v-model="newPassword" class="form-control"
              :class="{ invalid: mismatch }" required minlength="8" autocomplete="new-password" />
          </div>

          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirmar nueva contraseña</label>
            <input id="confirmPassword" type="password" v-model="confirmPassword" class="form-control" required />
            <p v-if="mismatch" class="error">
              Las contraseñas no coinciden.
            </p>
          </div>

          <button type="submit" class="btn btn-primary w-100" :disabled="loading || mismatch">
            {{ loading ? 'Actualizando...' : 'Guardar Cambios' }}
          </button>
        </form>
      </div>


    </div>

  </div>

</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'
import { usePerfilStore } from '@/stores/perfil'

import { logout } from '@/services/logout' // Importar la función de logout

const currentPassword = ref('')
const newPassword     = ref('')
const confirmPassword = ref('')
const loading         = ref(false)

const mismatch = computed(
  () => newPassword.value && newPassword.value !== confirmPassword.value
)

const token      = sessionStorage.getItem('token')      || ''
const token_type = sessionStorage.getItem('token_type') || ''

const router = useRouter()

const API_URL = import.meta.env.VITE_API_URL

async function changePassword() {
  if (mismatch.value) return

  loading.value = true
  try {
    const res = await fetch(
      `${API_URL}/users/change-password`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token_type} ${token}`,
        },
        body: JSON.stringify({
          current_password: currentPassword.value,
          new_password: newPassword.value,
        }),
      }
    )

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.detail || 'Error al cambiar contraseña')
    }

    alert('Contraseña actualizada correctamente')
    currentPassword.value = ''
    newPassword.value     = ''
    confirmPassword.value = ''
    router.push('/verperfil')
  } catch (err) {
    alert(err.message)
  } finally {
    loading.value = false
  }
}

const perfilStore = usePerfilStore()
const userStore = useUserStore() 

function handleLogout() {
    logout()
    userStore.clearUser()
    perfilStore.clearPerfil() // Limpiar el estado del perfil si es necesario
    router.push('/home') // Redirigir al inicio
}

</script>

<style scoped>
.error {
  color: red;
  font-size: 0.9em;
}
.invalid {
  border-color: red;
}
</style>