export enum Role {
  Admin = 'admin',
  user = 'user',
}


export interface AuthRequest extends Request {
  user: {
    userId: string;
  };
}
