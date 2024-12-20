export class LoginRequest {
  username: string;
  password: string;
}

export class UserResponse {
  id: number;
  name: string;
  email: string;
  token?: string;
}
