// This module is to extend the functionality of Express
export {}

export type User = {
    user_id: string,
    name: string,
    email: string,
    role: string
}

declare global {
  namespace Express {
    export interface Request {
      action?: string;
			user?: User;
    }
  }
}
