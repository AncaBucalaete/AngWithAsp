import { createAction, props } from '@ngrx/store';
import { User } from '../../model/user.model';

export const login = createAction(
  '[Auth] Login',
  props<{ user: User }>()
);

export const logout = createAction('[Auth] Logout');

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ username: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);


