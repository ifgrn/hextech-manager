<template>
  <header class="w-full border-b sticky top-0 z-50 border-white/20 mx-auto md:w-full">
    <div class="flex justify-between md:mx-auto max-w-500">
      <a href="/" class=" flex items-center gap-1 w-fit p-4">
        <HextechIcon class="size-7" />
        <p class="text-sm">HEXTECH MANAGER</p>
      </a>

      <div class="flex px-4 gap-4 md:hidden items-center">
        <a target="_blank" rel="noopener noreferrer" :href="githubRepo">
          <GithubIcon class="size-7" />
        </a>
        <a>
          <MenuIcon class="size-7" />
        </a>
      </div>

      <nav class="hidden md:flex">
        <a href="/auth" class="flex items-center justify-center px-7 border-l border-r border-white/20">
          login.
        </a>
        <a href="" class="flex items-center justify-center px-4 border-r border-white/20">
          changelogs.
        </a>
        <a :href="githubRepo" target="_blank" rel="noopener noreferrer"
          class="flex items-center justify-center px-4 bg-white/10">
          <GithubIcon class="size-7" />
        </a>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { githubRepo } from '@/utils/const';
import GithubIcon from './icons/GithubIcon.vue';
import HextechIcon from './icons/HextechIcon.vue';
import MenuIcon from './icons/MenuIcon.vue';

</script>

<style scoped></style>
