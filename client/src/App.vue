<script setup lang="ts">
import HeaderLayout from './components/HeaderLayout.vue'
</script>

<template>
  <div>
    <HeaderLayout />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
