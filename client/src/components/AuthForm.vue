<template>
  <div>
    <div class="border-r border-t border-l w-fit flex rounded-none border-white/20">
      <button class="p-3 bg-[#161413]" :class="authMethod === 'login'
        ? 'bg-[#171718] text-white font-medium'
        : 'opacity-20'" @click="authMethod = 'login'">
        Sign In
      </button>
      <button class="p-3" :class="authMethod === 'register'
        ? 'bg-[#171718] text-white font-medium'
        : 'opacity-20'" @click="authMethod = 'register'">
        Sign Up
      </button>
    </div>
    <div class="border rounded-none border-white/20  w-85.5 p-6 flex flex-col gap-6 md:w-100 bg-[#0c0a09]">
      <div class="flex flex-col gap-2">
        <h3 class="text-2xl font-semibold">
          {{ authMethod === 'login' ? 'Sign In' : 'Sign Up' }}
        </h3>
        <p class="text-sm opacity-70">
          {{ authMethod === 'login' ? signInMsg : signUpmsg }}
        </p>
      </div>
      <form ref="authForm" @submit.prevent="submitForm" class="flex flex-col gap-6">
        <div v-for="input in formInputs" :key="input.id" class="flex flex-col gap-2">
          <label :for="input.id">{{ input.label }}</label>
          <input :id="input.id" :name="input.name" :type="input.type" :placeholder="input.placeholder"
            :required="input.required" v-model="formValues[input.id]" class="p-3 border rounded-none border-white/50" />
        </div>

        <a v-if="authMethod === 'login'" class="text-sm opacity-70 underline hover:opacity-100">
          Forgot your password?
        </a>

        <button class="border rounded-none bg-white text-black p-3 font-medium">
          {{ authMethod === 'login' ? 'Login' : 'Create account' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { loginHandler, signUpHandler } from '@/service/auth-service';
import { LoginInputs, registerInputs } from '@/utils/login-consts';
import { computed, reactive, ref, watch } from 'vue';

const signInMsg = "Enter your email below to login to your account"
const signUpmsg = "Enter your information to create an account"

const authMethod = ref<'login' | 'register'>('login')
const formInputs = computed(() =>
  authMethod.value === 'login' ? LoginInputs : registerInputs
)

const formValues = reactive<Record<string, string>>({});
const authForm = ref<HTMLFormElement | null>(null)


// Resetea los valores cada vez que cambias tab
watch(authMethod, () => {
  // Inicializa todos los campos en blanco
  Object.keys(formValues).forEach(key => delete formValues[key]);
  formInputs.value.forEach(input => {
    formValues[input.id] = '';
  });
});

async function submitForm() {
  if (!authForm.value) return;

  const formData = new FormData(authForm.value);

  const submit = authMethod.value === 'login'
    ? await loginHandler(formData)
    : await signUpHandler(formData);

  console.log(submit);

  formInputs.value.forEach(input => {
    return formValues[input.id] = ""
  })
  return submit
}
</script>

<style scoped></style>
