import { OrganizationsApiActions, OrganizationsActions } from '../actions';

export interface State {
  error: string | null;
  pending: boolean;
  createOrganizationError: string | null;
  createOrganizationPending: boolean;
  editOrganizationError: any | null;
  editOrganizationPending: boolean;
  loadOrganizationReportsPending: boolean;
  loadOrganizationReportsError: null;
}

export const initialState: State = {
  error: null,
  pending: false,
  createOrganizationError: null,
  createOrganizationPending: false,
  editOrganizationError: null,
  editOrganizationPending: false,
  loadOrganizationReportsPending: false,
  loadOrganizationReportsError: null
};

/**
 * reducer for users page
 *
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action: OrganizationsApiActions.OrganizationsApiActionsUnion
    | OrganizationsActions.OrganizationsActionsUnion): State {
  switch (action.type) {

    case (OrganizationsActions.OrganizationsActionTypes.LoadOrganizations):
      return {
        ...state,
        pending: true,
        error: null
      };

    case (OrganizationsActions.OrganizationsActionTypes.EditOrganization):
      return {
        ...state,
        editOrganizationPending: true,
        editOrganizationError: null
      };

    case (OrganizationsActions.OrganizationsActionTypes.CreateOrganization):
      return {
        ...state,
        createOrganizationPending: true
      };

    case (OrganizationsApiActions.OrganizationsApiActionTypes.CreateOrganizationFailure):
      return {
        ...state,
        createOrganizationPending: false,
        createOrganizationError: action.payload.message
      };

    case (OrganizationsApiActions.OrganizationsApiActionTypes.CreateOrganizationSuccess):
      return {
        ...state,
        createOrganizationPending: false,
        createOrganizationError: null
      };

    case (OrganizationsApiActions.OrganizationsApiActionTypes.LoadOrganizationsSuccess):
      return {
        ...state,
        pending: false,
        error: null
      };

    case (OrganizationsApiActions.OrganizationsApiActionTypes.EditOrganizationSuccess):
      return {
        ...state,
        editOrganizationPending: false,
        editOrganizationError: null
      };

    case (OrganizationsActions.OrganizationsActionTypes.DismissEditOrganization):
      return {
        ...state,
        error: null
      }

    case (OrganizationsApiActions.OrganizationsApiActionTypes.LoadOrganizationsFailure):
      return {
        ...state,
        pending: false,
        error: action.payload.message
      };

    case (OrganizationsApiActions.OrganizationsApiActionTypes.EditOrganizationFailure):
      return {
        ...state,
        editOrganizationPending: false,
        editOrganizationError: action.payload
      };

    default:
      return state;

  }
}

/**
 * get the current error state for user pages
 * @param state
 */
export const getError = (state: State) => state.error;

/**
 * get the pending state for the user pages
 * @param state
 */
export const getPending = (state: State) => state.pending;

/**
 * get the current error state when creating user
 * @param state
 */
export const getCreateOrganizationError = (state: State) => state.createOrganizationError;

/**
 * get the pending state when creating user
 * @param state
 */
export const getCreateOrganizationPending = (state: State) => state.createOrganizationPending;

/**
 * get the current error state when editing user
 * @param state
 */
export const getEditOrganizationError = (state: State) => state.editOrganizationError;

/**
 * get the pending state when editing user
 * @param state
 */
export const getEditOrganizationPending = (state: State) => state.editOrganizationPending;

/**
 * get the pending state when loading user patients
 * @param state
 */
export const getLoadOrganizationReportsPending = (state: State) => state.loadOrganizationReportsPending;

/**
 * get the error state when loading user patients
 * @param state
 */
export const getLoadOrganizationReportsError = (state: State) => state.loadOrganizationReportsError;

