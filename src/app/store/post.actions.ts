import { createAction, props } from '@ngrx/store';
import { Post } from '../models/post';
import { Comment } from '../models/comments';

export const loadPosts = createAction('[Post] Load Posts');

export const loadPostsSuccess = createAction(
  '[Post] Load Posts Success',
  props<{ posts: Post[] }>()
);

export const loadPostsFailure = createAction(
  '[Post] Load Posts Failure',
  props<{ error: string }>()
);

export const loadComments = createAction(
  '[Post] Load Comments',
  props<{ postId: number }>()
);

export const loadCommentsSuccess = createAction(
  '[Post] Load Comments Success',
  props<{ comments: Comment[] }>()
);

export const loadCommentsFailure = createAction(
  '[Post] Load Comments Failure',
  props<{ error: string }>()
);
