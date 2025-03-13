import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(selectUserState, (state) => state.users);
export const selectUserError = createSelector(selectUserState, (state) => state.error);
export const selectPostsByUser = createSelector(selectUserState, (state) => state.post);

export const selectSearchQuery = createSelector(
    selectUserState,
    
    (state) => state.searchQuery
);

export const selectFilteredUsers = createSelector(
    selectUserState,
    selectSearchQuery,
    (state, searchQuery) => {
        console.log('searchQuery', searchQuery);
        
      if (!searchQuery) return state.users;
      return state.users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  );
