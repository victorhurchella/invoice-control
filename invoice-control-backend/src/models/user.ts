export interface User {
  id: number;
  email: string;
  password: string;
}

export type sanitizedUser = Omit<User, "password">;
