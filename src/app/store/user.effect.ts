import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
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
  deleteUserFailure
} from './user.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class UserEffects {
  private actions$ = inject(Actions); 
  private userService = inject(UserService); 

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      mergeMap(({ user }) =>
        this.userService.addUser(user).pipe(
          map((user) => addUserSuccess({ user })),
          catchError((error) => of(addUserFailure({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap(({ user }) =>
        this.userService.updateUser(user).pipe(
          map((user) => updateUserSuccess({ user })),
          catchError((error) => of(updateUserFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap(({ userId }) =>
        this.userService.deleteUser(userId).pipe(
          map(() => deleteUserSuccess({ userId })),
          catchError((error) => of(deleteUserFailure({ error })))
        )
      )
    )
  );
}
