<script setup lang="ts">
const user = ref();

onMounted(() => {
  const storageUser = JSON.parse(localStorage.getItem("user") || "");

  user.value = storageUser;
});

const toast = useToast();

function onClick() {
  localStorage.removeItem("user");
  navigateTo("/auth");

  toast.add({
    title: "Выход",
    description: "Вы вышли из аккаунта",
    color: "info",
  });
}
</script>

<template>
  <header class="mt-4">
    <div v-if="user" class="flex flex-col items-center gap-2 justify-center">
      <p class="text-2xl">
        Текущий пользователь:
        <span class="text-green-500">{{ user?.email }}</span>
      </p>
      <UButton color="error" @click="onClick">Выйти</UButton>
    </div>

    <p v-else>Пользователь не авторизирован!</p>
  </header>
  <main class="mt-10">
    <slot />
  </main>
</template>

<style scoped></style>
