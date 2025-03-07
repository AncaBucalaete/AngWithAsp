import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
/* 
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
); */

export const isLoggedIn = createSelector(
    selectAuthState,
    auth =>  !!auth.user

);


export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn
)