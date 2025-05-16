export interface User {
  id: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  user: {
    id: User['id'];
    email: User['email'];
  };
  token: string;
}

export interface LoginResponse extends SignupResponse {
  success: boolean;
}
