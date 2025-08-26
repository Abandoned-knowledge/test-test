import type { IPost, PostResponse } from "~/types/post";
import type { UserResponse } from "~/types/user";

export async function usePosts() {
  const { data: posts } = await useAsyncData("posts", async () => {
    const [PostsResponse, UsersResponse] = await Promise.all([
      $fetch<{ posts: PostResponse[] }>("https://dummyjson.com/posts"),
      $fetch<{ users: UserResponse[] }>(
        "https://dummyjson.com/users?limit=208"
      ),
    ]);

    const result: IPost[] = PostsResponse.posts.map((post) => {
      const user = UsersResponse.users.find((user) => user.id === post.userId);

      return {
        id: post.id,
        title: post.title,
        reactions: post.reactions,
        views: post.views,
        user: user
          ? {
              name: `${user.firstName} ${user.lastName}`,
              image: user.image,
            }
          : null,
      };
    });

    return result;
  });

  return posts;
}
