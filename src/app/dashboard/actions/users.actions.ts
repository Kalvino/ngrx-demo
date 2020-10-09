import { Action } from '@ngrx/store';
import { IUser } from '../models/user.model';
import { Update } from '@ngrx/entity';

export enum UsersActionTypes {
  SelectUser = '[User] Select Current User',
  ClearSelectedUser = '[User] Clear Current User',
  InitializeUser = '[User] Initialize Current User',
  CreateUserFormDialog = '[Users] Pop Up User Form',
  CreateUser = '[User] Create User',
  DismissUserFormDialog = '[User] Dismiss User Form Dialog',
  LoadUsers = '[User] Load Users',
  SearchUser = '[User] Search User',
  SearchUserComplete = '[User] Search User Complete',
  EditUser = '[User] Edit User',
  DismissEditUser = '[User] Dismiss Edit User',
  ResetUsersState = '[Users] Reset Users State',
  DeleteUser = '[Users] Delete User',
  LoadUserPatients = '[User] Load User Patients'
}


/**
 * Select user Action
 */
export class SelectUser implements Action {
  readonly type = UsersActionTypes.SelectUser;

  constructor(public payload: IUser) { }
}

/**
 * Clear selected ser Action
 */
export class ClearSelectedUser implements Action {
  readonly type = UsersActionTypes.ClearSelectedUser;
}

/**
 * Initialize user Action
 */
export class InitializeUser implements Action {
  readonly type = UsersActionTypes.InitializeUser;
}

/**
 * action to pop up user form
 */
export class CreateUserFormDialog implements Action {
  readonly type = UsersActionTypes.CreateUserFormDialog;
}

/**
 * Create user Action
 */
export class CreateUser implements Action {
  readonly type = UsersActionTypes.CreateUser;

  constructor(public payload: { user: IUser }) { }
}

/**
 * CreateUser Dialog window dismissed
 */
export class DismissUserFormDialog implements Action {
  readonly type = UsersActionTypes.DismissUserFormDialog;
}

/**
 * Load users Action
 */
export class LoadUsers implements Action {
  readonly type = UsersActionTypes.LoadUsers;
}

/**
 * Search user action
 */
export class SearchUser implements Action {
  readonly type = UsersActionTypes.SearchUser;

  constructor(public payload: string) { }
}

/**
 * Search user complete action
 */
export class SearchUserComplete implements Action {
  readonly type = UsersActionTypes.SearchUserComplete;

  constructor(public payload: IUser[]) { }
}

/**
 * action to submit and edit user
 */
export class EditUser implements Action {
  readonly type = UsersActionTypes.EditUser;

  constructor(public payload: IUser) {
  }
}

/**
 * User Edit dismissed action
 */
export class DismissEditUser implements Action {
  readonly type = UsersActionTypes.DismissEditUser;
}

/**
 * reset the user state
 */
export class ResetUsersState implements Action {
  readonly type = UsersActionTypes.ResetUsersState;
}

/**
 * action to delete a user
 */
export class DeleteUser implements Action {
  readonly type = UsersActionTypes.DeleteUser;

  constructor(public payload: string) {
  }
}

/**
 * Load user patients action
 */
export class LoadUserPatients implements Action {
  readonly type = UsersActionTypes.LoadUserPatients;
  constructor(public payload: string ) { }
}


/**
 * Export union of user Action
 */
export type UsersActionsUnion
  = SelectUser
  | ClearSelectedUser
  | InitializeUser
  | CreateUserFormDialog
  | CreateUser
  | DismissUserFormDialog
  | LoadUsers
  | SearchUser
  | SearchUserComplete
  | EditUser
  | DismissEditUser
  | ResetUsersState
  | LoadUserPatients
  | DeleteUser;
