export interface User {
  id: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  user: {
    id: number;
    email: User['email'];
  };
  token: string;
}
