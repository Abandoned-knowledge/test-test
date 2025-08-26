<script setup lang="ts">
import type { UserResponse } from "~/types/user";

interface Props {
  user: UserResponse;
  body: string;
}

const props = defineProps<Props>();

const fullName = computed(
  () => `${props.user.firstName} ${props.user.lastName} (${props.user.email})`
);
</script>

<template>
  <li class="bg-gray-800 rounded-xl overflow-hidden">
    <header class="bg-gray-700 flex items-center gap-2 p-2">
      <UAvatar :src="props.user.image" />
      <p>{{ fullName }}</p>
    </header>
    <div class="p-4">
      <p>{{ props.body }}</p>
    </div>
  </li>
</template>

<style scoped></style>
