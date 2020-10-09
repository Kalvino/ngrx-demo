import { SimCardsApiActions, SimCardsActions } from '../actions';

export interface State {
  error: string | null;
  pending: boolean;
  createSimCardError: string | null;
  createSimCardPending: boolean;
  editSimCardError: string | null;
  editSimCardPending: boolean;
  loadSimCardPatientsPending: boolean;
  loadSimCardPatientsError: null;
}

export const initialState: State = {
  error: null,
  pending: false,
  createSimCardError: null,
  createSimCardPending: false,
  editSimCardError: null,
  editSimCardPending: false,
  loadSimCardPatientsPending: false,
  loadSimCardPatientsError: null
};

/**
 * reducer for simCards page
 *
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action: SimCardsApiActions.SimCardsApiActionsUnion
    | SimCardsActions.SimCardsActionsUnion): State {
  switch (action.type) {

    case (SimCardsActions.SimCardsActionTypes.LoadSimCards):
      return {
        ...state,
        pending: true,
        error: null
      };

    case (SimCardsActions.SimCardsActionTypes.EditSimCard):
      return {
        ...state,
        editSimCardPending: true,
        editSimCardError: null
      };

    case (SimCardsActions.SimCardsActionTypes.LoadSimCardPatients):
      return {
        ...state,
        loadSimCardPatientsPending: true,
        loadSimCardPatientsError: null
      };

    case (SimCardsActions.SimCardsActionTypes.CreateSimCard):
      return {
        ...state,
        createSimCardPending: true
      };

    case (SimCardsApiActions.SimCardsApiActionTypes.CreateSimCardFailure):
      return {
        ...state,
        createSimCardPending: false,
        createSimCardError: action.payload.messages
      };

    case (SimCardsApiActions.SimCardsApiActionTypes.CreateSimCardSuccess):
      return {
        ...state,
        createSimCardPending: false,
        createSimCardError: null
      };

    case (SimCardsApiActions.SimCardsApiActionTypes.LoadSimCardsSuccess):
      return {
        ...state,
        pending: false,
        error: null
      };

    case (SimCardsApiActions.SimCardsApiActionTypes.LoadSimCardPatientsSuccess):
      return {
        ...state,
        loadSimCardPatientsPending: false,
        loadSimCardPatientsError: null
      };

    case (SimCardsApiActions.SimCardsApiActionTypes.LoadSimCardPatientsFailure):
      return {
        ...state,
        loadSimCardPatientsPending: false,
        loadSimCardPatientsError: action.payload.message
      };

    case (SimCardsApiActions.SimCardsApiActionTypes.EditSimCardSuccess):
      return {
        ...state,
        editSimCardPending: false,
        editSimCardError: null
      };

    case (SimCardsActions.SimCardsActionTypes.DismissEditSimCard):
      return {
        ...state,
        error: null
      }

    case (SimCardsApiActions.SimCardsApiActionTypes.LoadSimCardsFailure):
      return {
        ...state,
        pending: false,
        error: action.payload.message
      };

    case (SimCardsApiActions.SimCardsApiActionTypes.RefreshSimCardFailure):
    case (SimCardsApiActions.SimCardsApiActionTypes.EditSimCardFailure):
      return {
        ...state,
        editSimCardPending: false,
        editSimCardError: action.payload.message
      };

    default:
      return state;

  }
}

/**
 * get the current error state for simCard pages
 * @param state
 */
export const getError = (state: State) => state.error;

/**
 * get the pending state for the simCard pages
 * @param state
 */
export const getPending = (state: State) => state.pending;

/**
 * get the current error state when creating simCard
 * @param state
 */
export const getCreateSimCardError = (state: State) => state.createSimCardError;

/**
 * get the pending state when creating simCard
 * @param state
 */
export const getCreateSimCardPending = (state: State) => state.createSimCardPending;

/**
 * get the current error state when editing simCard
 * @param state
 */
export const getEditSimCardError = (state: State) => state.editSimCardError;

/**
 * get the pending state when editing simCard
 * @param state
 */
export const getEditSimCardPending = (state: State) => state.editSimCardPending;

/**
 * get the pending state when loading simCard patients
 * @param state
 */
export const getLoadSimCardPatientsPending = (state: State) => state.loadSimCardPatientsPending;

/**
 * get the error state when loading simCard patients
 * @param state
 */
export const getLoadSimCardPatientsError = (state: State) => state.loadSimCardPatientsError;

