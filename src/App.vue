

<template>

  <NavbarComponent v-if="!hideNavbar" />
  <RouterView />
  <FooterComponent v-if="!hideNavbar" />

  
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavbarComponent from '@/components/NavbarComponent.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import FooterComponent from '@/components/FooterComponent.vue'


const route = useRoute()

const hideNavbar = computed(() => route.meta.hideNavbar)

</script>



<style scoped>


</style>
