import { ServicePartnersApiActions, ServicePartnersActions } from '../actions';

export interface State {
  error: string | null;
  pending: boolean;
  createServicePartnerError: string | null;
  createServicePartnerPending: boolean;
  editServicePartnerError: string | null;
  editServicePartnerPending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
  createServicePartnerError: null,
  createServicePartnerPending: false,
  editServicePartnerError: null,
  editServicePartnerPending: false
};

/**
 * reducer for nursingHomes page
 *
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action: ServicePartnersApiActions.ServicePartnersApiActionsUnion
    | ServicePartnersActions.ServicePartnersActionsUnion): State {
  switch (action.type) {

    case (ServicePartnersActions.ServicePartnersActionTypes.LoadServicePartners):
    case (ServicePartnersActions.ServicePartnersActionTypes.EditServicePartner):
      return {
        ...state,
        pending: true,
        error: null
      };

    case (ServicePartnersApiActions.ServicePartnersApiActionTypes.LoadServicePartnersSuccess):
    case (ServicePartnersApiActions.ServicePartnersApiActionTypes.CreateServicePartnerSuccess):
    case (ServicePartnersApiActions.ServicePartnersApiActionTypes.EditServicePartnerSuccess):
      return {
        ...state,
        pending: false,
        error: null
      };

    case (ServicePartnersActions.ServicePartnersActionTypes.DismissEditServicePartner):
      return {
        ...state,
        error: null
      }

    case (ServicePartnersApiActions.ServicePartnersApiActionTypes.LoadServicePartnersFailure):
    case (ServicePartnersApiActions.ServicePartnersApiActionTypes.CreateServicePartnerFailure):
    case (ServicePartnersApiActions.ServicePartnersApiActionTypes.EditServicePartnerFailure):
      return {
        ...state,
        pending: false,
        error: action.payload.message
      };

    default:
      return state;

  }
}

/**
 * get the current error state for nursingHome pages
 * @param state
 */
export const getError = (state: State) => state.error;

/**
 * get the pending state for the nursingHome pages
 * @param state
 */
export const getPending = (state: State) => state.pending;

/**
 * get the current error state when creating patient
 * @param state
 */
export const getCreateServicePartnerError = (state: State) => state.createServicePartnerError;

/**
 * get the pending state when creating patient
 * @param state
 */
export const getCreateServicePartnerPending = (state: State) => state.createServicePartnerPending;

/**
 * get the current error state when editing patient
 * @param state
 */
export const getEditServicePartnerError = (state: State) => state.editServicePartnerError;

/**
 * get the pending state when editing patient
 * @param state
 */
export const getEditServicePartnerPending = (state: State) => state.editServicePartnerPending;
