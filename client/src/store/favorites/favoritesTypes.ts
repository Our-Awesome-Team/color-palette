export interface Tag {
  id: number | string;
  name: string;
}

export interface Color {
  id: number;
  hex: string;
  tags: Tag[];
}

export interface Scheme {
  id: string | number;
  colors: string[];
  tags: Tag[];
}
