<script setup lang="ts">
import type { IPost, PostResponse } from "~/types/post";
import type { UserResponse } from "~/types/user";

definePageMeta({
  middleware: "auth",
});

const { data: posts } = await useAsyncData(
  "posts",
  async () => {
    const [postsResponse, usersResponse] = await Promise.all([
      $fetch<{ posts: PostResponse[] }>(
        "https://dummyjson.com/posts?select=id,title,body,reactions,views,userId,tags"
      ),
      $fetch<{ users: UserResponse[] }>(
        "https://dummyjson.com/users?limit=208&select=id,firstName,lastName,image,email"
      ),
    ]);

    const result: IPost[] = postsResponse.posts.map((post) => {
      const user = usersResponse.users.find((user) => user.id === post.userId);

      return {
        id: post.id,
        title: post.title,
        body: post.body,
        reactions: post.reactions,
        views: post.views,
        tags: post.tags,
        user: user
          ? {
              name: `${user.firstName} ${user.lastName}`,
              image: user.image,
            }
          : null,
      };
    });

    return result;
  },
  {
    getCachedData(key, nuxtApp, context) {
      return nuxtApp.payload.data[key];
    },
  }
);

const page = ref(1);
const ITEMS_PER_PAGE = 6;
const visiblePosts = computed(() =>
  posts.value?.slice(
    (page.value - 1) * ITEMS_PER_PAGE,
    page.value * ITEMS_PER_PAGE
  )
);
</script>

<template>
  <section class="container mx-auto flex flex-col items-center gap-10">
    <h1 class="text-4xl font-bold uppercase">Посты</h1>

    <ul class="grid md:grid-cols-3 gap-5 auto-rows-[300px] w-full">
      <Post v-for="post in visiblePosts" :key="post.id" :post="post" />
    </ul>

    <UPagination
      v-model:page="page"
      :items-per-page="ITEMS_PER_PAGE"
      :total="posts?.length"
    />
  </section>
</template>

<style scoped></style>
