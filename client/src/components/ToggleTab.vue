<script lang="ts" setup>

defineProps<{
  modelValue: "login" | "register"
}>()

defineEmits<{
  'update:modelValue': [value: "login" | "register"]
}>()
</script>

<template>
  <div class="border-r border-t border-l w-fit flex rounded-none border-white/20">
    <button class="p-3 bg-[#161413]" :class="modelValue === 'login'
      ? 'bg-[#171718] text-white font-medium'
      : 'opacity-20'" @click="$emit('update:modelValue', 'login')">
      Sign In
    </button>
    <button class="p-3" :class="modelValue === 'register'
      ? 'bg-[#171718] text-white font-medium'
      : 'opacity-20'" @click="$emit('update:modelValue', 'register')">
      Sign Up
    </button>
  </div>
</template>

<style scoped></style>
