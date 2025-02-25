import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure, logout } from './auth.actions';
import { initialAuthState, AuthState } from './auth.state';
import { AuthActions } from './actions-type';

export const authReducer = createReducer(
    initialAuthState,
    on(AuthActions.login, (state, action) => {
        {
            return {
                user: action.user
            }
        }
    }),
    /*     ...state, error: null })), // Clear errors on login attempt */
    /* on(loginSuccess, (state, { username }) => ({
      isAuthenticated: true,
      user: username,
      error: null,
    })),
    on(loginFailure, (state, { error }) => ({
      ...state,
      isAuthenticated: false,
      user: null,
      error,
    })), */
    on(logout, () => initialAuthState)
);
