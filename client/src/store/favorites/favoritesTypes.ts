export type Tag = {
  id: number | string;
  name: string;
};

export type Color = {
  id: number | string;
  hex: string;
  tags: Tag[];
};

export type Scheme = {
  id: number | string;
  colors: string[];
  tags: Tag[];
};
