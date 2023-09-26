interface IKittensData {
  id: string;
  title: string;
  image: string;
  author: {
    uid: string;
    name: string;
  };
  likes: string[];
  description: string;
  brief: string;
}

interface IKittensDataArranged extends IKittensData {
  key: React.Key;
  authorName: string;
  charm: number;
}

export type { IKittensData, IKittensDataArranged };
