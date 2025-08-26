import type { IReaction } from "./reaction";

export interface PostResponse {
  id: number;
  title: string;
  body: string;
  reactions: IReaction;
  views: number;
  userId: number;
  tags: string[];
}

export interface IPost extends Omit<PostResponse, "userId"> {
  user: {
    name: string;
    image: string;
  } | null;
}
