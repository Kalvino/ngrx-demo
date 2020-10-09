import { ServicePartnersApiActions, ServicePartnersActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IServicePartner } from '../models/service-partner.model';
import { AuthApiActions } from '../../auth/actions';

// state interface definition
export interface State extends EntityState<IServicePartner> {
  selectedServicePartnerId: string | null;
}

// extend & export entity adapter
export const adapter: EntityAdapter<IServicePartner> = createEntityAdapter<IServicePartner>({
  selectId: (servicePartner: IServicePartner) => servicePartner._id,
  sortComparer: false
});

// compose the initial state
export const initialState: State = adapter.getInitialState({
  selectedServicePartnerId: null
});

/**
 * reducer for the servicePartners state
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action:
    | ServicePartnersApiActions.ServicePartnersApiActionsUnion
    | ServicePartnersActions.ServicePartnersActionsUnion
    | AuthApiActions.AuthApiActionsUnion
): State {

  switch (action.type) {

    // load servicePartners success state
    case ServicePartnersApiActions.ServicePartnersApiActionTypes.LoadServicePartnersSuccess:
      // console.log(action.payload.servicePartners);
      return adapter.upsertMany(action.payload.servicePartners, state);

    // add a new entity to the state in case creation is successful
    case ServicePartnersApiActions.ServicePartnersApiActionTypes.CreateServicePartnerSuccess:
      return adapter.addOne(action.payload.servicePartner, state);

    case ServicePartnersApiActions.ServicePartnersApiActionTypes.EditServicePartnerSuccess:
      return adapter.upsertOne(action.payload.servicePartner, state);

    case ServicePartnersApiActions.ServicePartnersApiActionTypes.DeleteServicePartnerSuccess:
      return adapter.removeOne(action.payload, state)

    // case select servicePartner
    case ServicePartnersActions.ServicePartnersActionTypes.SelectServicePartner:
      return {
        ...state,
        selectedServicePartnerId: action.payload._id
      };

    // reset state to initial state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
    case ServicePartnersActions.ServicePartnersActionTypes.ResetServicePartnersState:
      return initialState;

    default:
      return state;
  }

}

/**
 * return the selected servicePartner id from the state
 * @param state
 */
export const getSelectedServicePartnerId = (state: State) => state.selectedServicePartnerId;
