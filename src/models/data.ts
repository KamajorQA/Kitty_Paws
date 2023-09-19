interface IKittensData {
  id: number;
  title: string;
  image: string;
  author: {
    uid: number;
    name: string;
  };
  likes: number[];
  description: string;
  brief: string;
}

export type { IKittensData };
