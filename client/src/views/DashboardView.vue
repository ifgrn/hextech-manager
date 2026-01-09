<script lang="ts" setup>
import AccountCard from '@/components/dashboard/AccountCard.vue';
import AddAccountBtn from '@/components/dashboard/AddAccountBtn.vue';
import UserMenu from '@/components/dashboard/UserMenu.vue';
import { signoutHandler } from '@/service/auth-service';
import { noir } from '@/utils/const';
import { addAccountInputs } from '@/utils/form-consts';
import { useRouter } from 'vue-router';

const x = () => 'hola';
const router = useRouter();

const signOutAction = async () => {
  try {
    const result = await signoutHandler();
    if (result.success) router.push('/');
    else return;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <section class="flex flex-col mx-auto mt-5 sm:mt-10 gap-4 w-100 sm:w-300">
    <div class="flex justify-between">
      <UserMenu username="noir" @signout="signOutAction" />
      <AddAccountBtn @submit="x" :inputs="addAccountInputs" />
    </div>
    <div>
      <AccountCard :account="noir" />
    </div>
  </section>
</template>
<style scoped></style>
