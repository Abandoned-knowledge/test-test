import type { UserResponse } from "./user";

export interface CommentResponse {
  id: number;
  body: string;
  user: {
    id: number;
  };
}

export interface IComment {
  id: number;
  body: string;
  user: UserResponse;
}
