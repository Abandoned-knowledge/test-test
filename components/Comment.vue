<script setup lang="ts">
import type { UserResponse } from "~/types/user";

interface Props {
  user: UserResponse;
  body: string;
}

const props = defineProps<Props>();

const fullName = computed(
  () => `${props.user.firstName} ${props.user.lastName}`
);
</script>

<template>
  <li class="bg-gray-800 rounded-xl overflow-hidden">
    <header
      class="bg-gray-700 grid grid-cols-[auto_1fr] items-center gap-x-2 p-2"
    >
      <UAvatar :src="props.user.image" />
      <p class="text-xl font-bold">{{ fullName }}</p>
      <span class="col-span-2 text-gray-400">{{ props.user.email }}</span>
    </header>
    <div class="p-4">
      <p>{{ props.body }}</p>
    </div>
  </li>
</template>

<style scoped></style>
