import { OrganizationsApiActions, OrganizationsActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IOrganization } from '../models/organization.model';
import { AuthApiActions } from '../../auth/actions';

// state interface definition
export interface State extends EntityState<IOrganization> {
  selectedOrganizationId: string | null;
}

// extend & export entity adapter
export const adapter: EntityAdapter<IOrganization> = createEntityAdapter<IOrganization>({
  selectId: (organization: IOrganization) => organization._id,
  sortComparer: false
});

// compose the initial state
export const initialState: State = adapter.getInitialState({
  selectedOrganizationId: null
});

/**
 * reducer for the organizations state
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action:
    | OrganizationsApiActions.OrganizationsApiActionsUnion
    | OrganizationsActions.OrganizationsActionsUnion
    | AuthApiActions.AuthApiActionsUnion
): State {

  switch (action.type) {

    // load organizations success state
    case OrganizationsApiActions.OrganizationsApiActionTypes.LoadOrganizationsSuccess:
      return adapter.upsertMany(action.payload.organizations, state);

    // add a new entity to the state in case creation is successful
    case OrganizationsApiActions.OrganizationsApiActionTypes.CreateOrganizationSuccess:
      return adapter.addOne(action.payload.organization, state);

    case OrganizationsApiActions.OrganizationsApiActionTypes.EditOrganizationSuccess:
      return adapter.upsertOne(action.payload.organization, state);

    // case select organization
    case OrganizationsActions.OrganizationsActionTypes.SelectOrganization:
      return {
        ...state,
        selectedOrganizationId: action.payload._id
      };

    case OrganizationsApiActions.OrganizationsApiActionTypes.DeleteOrganizationSuccess:
      return adapter.removeOne(action.payload, state)

    // clear selected organization
    case (OrganizationsActions.OrganizationsActionTypes.DismissEditOrganization):
      return {
        ...state,
        selectedOrganizationId: null
      }

    // reset state to initial state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
    case OrganizationsActions.OrganizationsActionTypes.ResetOrganizationsState:
      return initialState;

    default:
      return state;
  }

}

/**
 * return the selected organization id from the state
 * @param state
 * @param state the current state
 */
export const getSelectedOrganizationId = (state: State) => state.selectedOrganizationId;
