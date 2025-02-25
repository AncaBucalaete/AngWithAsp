import { User } from "../../model/user.model";

export interface AuthState {
    user: User | undefined;
  }
  
  export const initialAuthState: AuthState = {    
    user: undefined
  };
  