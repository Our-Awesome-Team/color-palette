export type Tag = {
  id: number | string;
  name: string;
};

export type Color = {
  id: number;
  hex: string;
  tags: Tag[];
};

export type Scheme = {
  id: string | number;
  colors: string[];
  tags: Tag[];
};
