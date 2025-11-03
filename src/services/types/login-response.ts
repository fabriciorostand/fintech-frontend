export type LoginResponse = {
  success: boolean;
  message: string;
  userId: number | null;
  userName: string | null;
};