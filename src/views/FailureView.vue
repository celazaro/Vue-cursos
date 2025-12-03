<template >
    <div class="container d-flex flex-column">
        <!-- Page Title -->
        <div class="page-title light-background">
            <div class="container d-lg-flex justify-content-between align-items-center">
                <h1 class="mb-2 mb-lg-0">Resultado del Pago</h1>
                <nav class="breadcrumbs">
                    <ol>
                        <li><a href="/home">Regresar a Inicio</a></li>
                    </ol>
                </nav>
            </div>
        </div><!-- End Page Title -->
    </div>

    <div class="flex-grow-1 d-flex justify-content-center align-items-center my-5">

        <div v-if="!userStore.username" class="card shadow p-4  text-center " style="width: 100%; max-width: 800px;">

            <h2>Tu usuario ha sido cargado pero el proceso de pago no se ha realizado. Por favor prueba nuevamente
                ingresando previamente a tu cuenta. ¡Muchas gracias!</h2>

        </div>

        <div v-else class="card shadow p-4  text-center " style="width: 100%; max-width: 800px;">

            <h2>El proceso de pago no se ha realizado con éxito. Por favor prueba nuevamente. ¡Muchas gracias!</h2>

        </div>

    </div>
</template>



<script setup>

import { useUserStore } from '@/stores/user'

const userStore = useUserStore() 



</script>




<style scoped>
    
</style>