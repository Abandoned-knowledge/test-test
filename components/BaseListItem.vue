<!-- <script setup lang="ts">
interface Props {
  image: string;
  title: string;
  likes_count: number;
  dislikes_count: number;
  views_count: number;
}

const props = defineProps<Props>();
</script>

<template>
  <li>
    <article class="border">
      <div class="flex items-center">
        <img :src="props.image" alt="" />
        {{ props.title }}
      </div>
      <p>
        likes: <span>{{ props.likes_count }}</span>
      </p>
      <p>
        dislikes:
        <span>{{ props.dislikes_count }}</span>
      </p>

      <p>
        views:
        <span>{{ props.views_count }}</span>
      </p>
    </article>
  </li>
</template> -->