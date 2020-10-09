import { SimCardsApiActions, SimCardsActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ISimCard } from '../models/sim-card.model';
import { AuthApiActions } from '../../auth/actions';

// state interface definition
export interface State extends EntityState<ISimCard> {
  selectedSimCardId: string | null;
}

// extend & export entity adapter
export const adapter: EntityAdapter<ISimCard> = createEntityAdapter<ISimCard>({
  selectId: (simCard: ISimCard) => simCard._id,
  sortComparer: false
});

// compose the initial state
export const initialState: State = adapter.getInitialState({
  selectedSimCardId: null
});

/**
 * reducer for the simCards state
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action:
    | SimCardsApiActions.SimCardsApiActionsUnion
    | SimCardsActions.SimCardsActionsUnion
    | AuthApiActions.AuthApiActionsUnion
): State {

  switch (action.type) {

    // load simCards success state
    case SimCardsApiActions.SimCardsApiActionTypes.LoadSimCardsSuccess:
      return adapter.upsertMany(action.payload.simCards, state);

    // add a new entity to the state in case creation is successful
    case SimCardsApiActions.SimCardsApiActionTypes.CreateSimCardSuccess:
      return adapter.addOne(action.payload.simCard, state);

    case SimCardsApiActions.SimCardsApiActionTypes.RefreshSimCardSuccess:
    case SimCardsApiActions.SimCardsApiActionTypes.EditSimCardSuccess:
      return adapter.upsertOne(action.payload.simCard, state);

    case SimCardsApiActions.SimCardsApiActionTypes.DeleteSimCardSuccess:
      return adapter.removeOne(action.payload, state)

    // case select simCard
    case SimCardsActions.SimCardsActionTypes.SelectSimCard:
      return {
        ...state,
        selectedSimCardId: action.payload._id
      };

    // clear selected simCard
    case (SimCardsActions.SimCardsActionTypes.DismissEditSimCard):
      return {
        ...state,
        selectedSimCardId: null
      }

    // reset state to initial state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
    case SimCardsActions.SimCardsActionTypes.ResetSimCardsState:
      return initialState;

    default:
      return state;
  }

}

/**
 * return the selected simCard id from the state
 * @param state
 * @param state the current state
 */
export const getSelectedSimCardId = (state: State) => state.selectedSimCardId;
