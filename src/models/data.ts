interface INewCatData {
  title: string;
  image?: string;
  description: string;
  brief: string;
}

interface INewCatDataArranged extends INewCatData {
  image: string;
  author: {
    uid: string;
    name: string;
  };
  likes: string[] | [];
}

interface IKittensData extends INewCatDataArranged {
  id: string;
  likes: string[];
  // title: string;
  // image: string;
  // author: {
  //   uid: string;
  //   name: string;
  // };
  // likes: string[];
  // description: string;
  // brief: string;
}

interface IKittensDataArranged extends IKittensData {
  key: React.Key;
  authorName: string;
  charm: number;
}

export type {
  INewCatData,
  IKittensData,
  IKittensDataArranged,
  INewCatDataArranged,
};
