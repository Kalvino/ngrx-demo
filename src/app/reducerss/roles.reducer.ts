import { RolesApiActions, RolesActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IRole } from '../models/role.model';
import { AuthApiActions } from '../../auth/actions';

// state interface definition
export interface State extends EntityState<IRole> {
  selectedRoleId: number | null;
}

// extend & export entity adapter
export const adapter: EntityAdapter<IRole> = createEntityAdapter<IRole>({
  selectId: (role: IRole) => role._id,
  sortComparer: false
});

// compose the initial state
export const initialState: State = adapter.getInitialState({
  selectedRoleId: null
});

/**
 * reducer for the roles state
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action:
    | RolesApiActions.RolesApiActionsUnion
    | RolesActions.RolesActionsUnion
    | AuthApiActions.AuthApiActionsUnion
): State {

  switch (action.type) {

    // load roles success state
    case RolesApiActions.RolesApiActionTypes.LoadRolesSuccess:
      return adapter.upsertMany(action.payload.roles, state);

    // add a new entity to the state in case creation is successful
    case RolesApiActions.RolesApiActionTypes.CreateRoleSuccess:
      return adapter.addOne(action.payload.role, state);

    case RolesApiActions.RolesApiActionTypes.EditRoleSuccess:
      return adapter.upsertOne(action.payload.role, state);

    // case select role
    case RolesActions.RolesActionTypes.SelectRole:
      return {
        ...state,
        selectedRoleId: action.payload._id
      };

    // clear selected role
    case (RolesActions.RolesActionTypes.DismissEditRole):
      return {
        ...state,
        selectedRoleId: null
      }

    // reset state to initial state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
    case RolesActions.RolesActionTypes.ResetRolesState:
      return initialState;

    default:
      return state;
  }

}

/**
 * return the selected role id from the state
 * @param state
 * @param state the current state
 */
export const getSelectedRoleId = (state: State) => state.selectedRoleId;
