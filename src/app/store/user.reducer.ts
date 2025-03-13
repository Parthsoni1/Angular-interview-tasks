import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  addUser,
  addUserSuccess,
  addUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
  setSearchQuery
} from './user.actions';
import { Post } from '../models/post';

export interface UserState {
  users: User[];
  error: string | null;
  loading: boolean;
  post: Post[];
  searchQuery: string;
}

export const initialState: UserState = {
  users: [],
  error: null,
  loading: false,
  post: [],
  searchQuery: ''
};

export const userReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(addUser, (state) => ({ ...state, loading: true })),
  on(addUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    loading: false,
  })),
  on(addUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(updateUser, (state) => ({ ...state, loading: true })),
  on(updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
    loading: false,
  })),
  on(updateUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(deleteUser, (state) => ({ ...state, loading: true })),
  on(deleteUserSuccess, (state, { userId }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== userId),
    loading: false,
  })),
  on(deleteUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(setSearchQuery, (state, { query }) => ({
    ...state,
    searchQuery: query,
  }))
);
