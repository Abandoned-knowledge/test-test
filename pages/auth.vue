<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: "",
  password: "",
});

definePageMeta({
  layout: false,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { data: user } = await useFetch("/api/auth", {
    method: "POST",
    body: {
      email: state.email,
      password: state.password,
    },
  });

  if (!user.value) {
    toast.add({
      title: "Ошибка",
      description: "Пользователя не существует",
      color: "error",
    });
    return;
  }

  localStorage.setItem("user", JSON.stringify(user.value));

  toast.add({
    title: "Поздравляем",
    description: "Вы успешно авторизовались!",
    color: "success",
  });
  navigateTo("/");
}
</script>

<template>
  <section
    class="container mx-auto flex flex-col items-center justify-center h-screen gap-4"
  >
    <h1 class="text-3xl font-bold uppercase text-center">Форма авторизации</h1>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormField>

      <UButton type="submit"> Submit </UButton>
    </UForm>
  </section>
</template>
