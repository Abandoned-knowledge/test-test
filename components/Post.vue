<script setup lang="ts">
import { NuxtLink } from "#components";
import type { IPost } from "~/types/post";

const { post } = defineProps<{ post: IPost }>();
</script>

<template>
  <li>
    <NuxtLink :to="`/posts/${post.id}`">
      <article
        class="bg-gray-700 rounded-xl overflow-hidden grid grid-cols-2 text-center cursor-pointer hover:scale-105 transition pt-5 h-full gap-5"
      >
        <div class="flex flex-col items-center col-span-2">
          <img :src="post.user?.image" alt="" class="aspect-square" />
          <h2 class="font-bold col-span-2 text-xl">
            {{ post.user?.name }}
          </h2>
        </div>

        <p class="flex gap-2 items-center justify-end">
          <UIcon name="mdi:like" />
          <span>{{ post.reactions.likes }}</span>
        </p>
        <p class="flex gap-2 items-center">
          <UIcon name="mdi:dislike" />
          <span>{{ post.reactions.dislikes }}</span>
        </p>

        <footer
          class="flex flex-col items-center justify-center bg-gray-600 col-span-2 py-2"
        >
          <p class="font-bold">
            {{ post.title }}
          </p>

          <p class="flex items-center gap-2">
            <UIcon name="mdi:eye" />
            <span>{{ post.views }}</span>
          </p>
        </footer>
      </article>
    </NuxtLink>
  </li>
</template>
