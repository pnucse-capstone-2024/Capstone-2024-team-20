export interface Auth {
  isLogin: boolean;
  email: string;
  userType: 'CLIENT' | 'PROVIDER';
  accessToken: string;
}

export interface SignUpResponse {
  email: string;
}

export interface LoginResponse {
  email: string;
  authority: 'CLIENT' | 'PROVIDER';
}
