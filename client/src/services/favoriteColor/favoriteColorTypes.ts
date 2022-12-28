export type Tag = {
  id: number;
  name: string;
};

export type FavoriteColor = {
  id: number;
  hex: string;
  tags: Tag[];
};
