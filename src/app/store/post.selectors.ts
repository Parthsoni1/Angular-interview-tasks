import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectPostState = createFeatureSelector<PostState>('post');
import { PostState } from './post.reducer';

export const selectPosts = createSelector(
  selectPostState,
  (state: PostState) => state.posts
);

export const selectLoading = createSelector(
  selectPostState,
  (state: PostState) => state.loading
);

export const selectError = createSelector(
  selectPostState,
  (state: PostState) => state.error
);