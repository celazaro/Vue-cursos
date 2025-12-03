<template>
  <div class="container-fluid d-flex col-11 ">
    

    <!-- Vista principal centrada -->
    <main class="flex-grow-1 d-flex justify-content-center ">
      <VistaPerfilComponent />
    </main>



  </div>
</template>



<script setup>


import VistaPerfilComponent from '@/components/VistaPerfilComponent.vue'

import { usePerfilStore } from '@/stores/perfil'


const perfilStore = usePerfilStore() // Importar el store del perfil  


</script>




<style scoped>
    
</style>