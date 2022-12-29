export type Tag = {
  id: number;
  name: string;
};

export type Color = {
  id: number;
  hex: string;
  tags: Tag[];
};

export type ColorScheme = {
  id: number;
  // ...
};
