export type Error = {
  message: string;
};

export type User = {
  userId: number;
  username: string;
};

export type Favorites = {
  userId: number;
  recipesId: number;
};

export type ComponentProps {
  className?: string;
  label: string;
}
