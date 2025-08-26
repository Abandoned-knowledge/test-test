<script setup lang="ts">
import { getPaginationRowModel } from "@tanstack/vue-table";
import type { TableColumn } from "@nuxt/ui";

const table = useTemplateRef("table");

import type { IPost } from "~/types/post";
import { UAvatar } from "#components";

const { data } = await useAsyncData("posts", async () => {
  const posts = await $fetch<{ posts: IPost[] }>("https://dummyjson.com/posts");
  const users = await $fetch<{ users: any[] }>(
    "https://dummyjson.com/users?limit=208"
  );

  const result = posts.posts.map((post) => ({
    id: post.id,
    title: post.title,
    reactions: post.reactions,
    views: post.views,
    userImage: users.users.find((user) => user.id === post.userId).image,
  }));

  return result;
});

const columns: TableColumn<IPost>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "title",
    header: "User",
    cell: ({ row }) => {
      return h("div", {}, [
        h(UAvatar, { src: row.original.userImage }),
        h("span", row.original.title),
      ]);
    },
  },
  {
    accessorKey: "likes",
    header: "Likes",
    cell: ({ row }) => `Likes: ${row.original.reactions.likes}`,
  },
  {
    accessorKey: "dislikes",
    header: "Dislikes",
    cell: ({ row }) => `Dislikes: ${row.original.reactions.dislikes}`,
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => `Views: ${row.original.views}`,
  },
];

const pagination = ref({
  pageIndex: 0,
  pageSize: 6,
});
</script>

<template>
  <div class="w-full space-y-4 pb-4">
    <UTable
      ref="table"
      v-model:pagination="pagination"
      :data="data"
      :columns="columns"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
      class="flex-1"
    />

    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        :default-page="
          (table?.tableApi?.getState().pagination.pageIndex || 0) + 1
        "
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
  </div>
</template>
