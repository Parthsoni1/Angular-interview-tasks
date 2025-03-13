import { createReducer, on } from '@ngrx/store';
import {
  loadPosts,
  loadPostsSuccess,
  loadPostsFailure,
  loadComments,
  loadCommentsSuccess,
  loadCommentsFailure
} from './post.actions';

import { Post } from '../models/post';

export interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null
};

export const postReducer = createReducer(
  initialState,
  
  on(loadPosts, (state) => ({
    ...state,
    loading: true
  })),
  
  on(loadPostsSuccess, (state, { posts }) => ({
    ...state,
    posts,
    loading: false
  })),
  
  on(loadPostsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(loadComments, (state) => ({
    ...state,
    loading: true
  })),
  
  on(loadCommentsSuccess, (state, { comments }) => ({
    ...state,
    loading: false
  })),
  
  on(loadCommentsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
