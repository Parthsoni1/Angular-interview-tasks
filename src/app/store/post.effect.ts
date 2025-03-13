import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { PostService } from '../services/post.service';
import * as PostActions from './post.actions';
@Injectable({
  providedIn: 'root'
})
export class PostEffects {
    constructor(private actions$: Actions, private postService: PostService) {}

    loadPostsByUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(PostActions.loadPostsSuccess),
        mergeMap((action: any) =>
          this.postService.getPostsByUser(action.userId).pipe(
            map((posts) => PostActions.loadPostsSuccess({ posts })),
            catchError((error) => of(PostActions.loadPostsFailure({ error: error.message })))
          )
        )
      )
    );
  }