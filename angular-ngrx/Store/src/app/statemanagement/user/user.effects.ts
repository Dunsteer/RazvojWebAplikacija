import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { UserService } from '../../data/user.service';
import { LoadUsers, UserActionTypes } from './user.actions';


@Injectable()
export class UserEffects {

  @Effect()
  fetchUsers$ = this.actions$.pipe(
    ofType(UserActionTypes.FetchUsers),
    take(1),
    switchMap(() => this.backend.getAll()),
    map(users => new LoadUsers({ users })),
  );

  constructor(
    private actions$: Actions,
    private backend: UserService,
  ) { }
}
