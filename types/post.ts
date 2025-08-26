interface IReaction {
  likes: number;
  dislikes: number;
}

export interface IPost {
  id: number;
  title: string;
  body: string;
  reactions: IReaction;
  views: number;
  userId: number;
}

export interface ResultPost extends Omit<IPost, "userId"> {
  userImage: string;
}
