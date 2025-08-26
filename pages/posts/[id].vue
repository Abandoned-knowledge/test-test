<script setup lang="ts">
import type { CommentResponse, IComment } from "~/types/comment";
import type { IPost } from "~/types/post";
import type { UserResponse } from "~/types/user";

definePageMeta({
  middleware: "auth",
});

const route = useRoute();

const { data: postsRef } = useNuxtData<IPost[]>("posts");

const post = computed(() =>
  postsRef.value?.find((post) => post.id === Number(route.params.id))
);

const { data: comments } = await useAsyncData("comments", async () => {
  const [commentsResponse, usersResponse] = await Promise.all([
    $fetch<{ comments: CommentResponse[] }>(
      `https://dummyjson.com/posts/${route.params.id}/comments?select=id,body,user`
    ),
    $fetch<{ users: UserResponse[] }>(
      "https://dummyjson.com/users?limit=208&select=id,firstName,lastName,image,email"
    ),
  ]);

  const result: IComment[] = commentsResponse.comments.map((comment) => {
    const user = usersResponse.users.find(
      (user) => user.id === comment.user?.id
    ) as UserResponse;

    return {
      id: comment.id,
      body: comment.body,
      user: user,
    };
  });

  return result;
});
</script>

<template>
  <section class="w-11/12 md:w-1/3 mx-auto">
    <h1 class="text-3xl font-bold uppercase text-center">Пост</h1>

    <article class="bg-gray-800 mx-auto mt-10 rounded-xl overflow-hidden">
      <div class="p-4 grid grid-cols-2 gap-4">
        <h3 class="text-xl col-span-2">{{ post?.title }}</h3>
        <p class="col-span-2">{{ post?.body }}</p>
        <p class="flex gap-2 items-center justify-end">
          <UIcon name="mdi:like" />
          <span>{{ post?.reactions.likes }}</span>
        </p>
        <p class="flex gap-2 items-center">
          <UIcon name="mdi:dislike" />
          <span>{{ post?.reactions.dislikes }}</span>
        </p>

        <div class="flex items-center gap-4 col-span-2">
          <span>Теги:</span>
          <ul class="flex gap-2">
            <UBadge
              v-for="(tag, index) in post?.tags"
              :key="`${index}-${tag}`"
              :label="tag"
              color="neutral"
            />
          </ul>
        </div>
      </div>

      <footer class="flex items-center bg-gray-700 p-4">
        <p class="flex items-center gap-2">
          <UIcon name="mdi:eye" />
          <span>{{ post?.views }}</span>
        </p>

        <img
          :src="post?.user?.image"
          alt="Автор"
          class="ml-auto h-full max-h-10 aspect-square"
        />
        <p>
          {{ post?.user?.name }}
        </p>
      </footer>
    </article>
  </section>

  <section class="w-11/12 md:w-1/2 mx-auto">
    <h2 class="text-xl font-bold uppercase text-center mt-5">Комментарии</h2>
    <ul class="mt-4 flex flex-col gap-4">
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :body="comment.body"
        :user="comment.user"
      />
    </ul>
  </section>
</template>
