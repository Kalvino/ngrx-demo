import * as fromUsersPage from './users-page.reducer';
import * as fromUsers from './users.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

/**
 * compose dashboard state for global store
 */
export interface DashboardState {
  usersPage: fromUsersPage.State;
  users: fromUsers.State;
}

/**
 * assign state to global store
 */
export interface State {
  dashboard: DashboardState;
}

/**
 * compose action reducers
 */
export const reducers: ActionReducerMap<DashboardState, any> = {
  usersPage: fromUsersPage.reducer,
  users: fromUsers.reducer
};

// create feature selectors
export const getDashboardState = createFeatureSelector<State, DashboardState>('dashboard');

// ****************** USERS PAGE *************
export const getUsersPageState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.usersPage
);

// get error state of the usersPage from the store
export const getUsersPageError = createSelector(
  getUsersPageState,
  fromUsersPage.getError
);

// get pending state of the usersPage from the store
export const getUsersPagePending = createSelector(
  getUsersPageState,
  fromUsersPage.getPending
);

// get error state when creating user from the store
export const getUserCreationError = createSelector(
  getUsersPageState,
  fromUsersPage.getCreateUserError
);

// get pending state when creating a user from the store
export const getUserCreationPending = createSelector(
  getUsersPageState,
  fromUsersPage.getCreateUserPending
);

// get error state when editing a user from the store
export const getUserEditionError = createSelector(
  getUsersPageState,
  fromUsersPage.getEditUserError
);

// get pending state when editing a user from the store
export const getUserEditionPending = createSelector(
  getUsersPageState,
  fromUsersPage.getEditUserPending
);

// ****************** USERS *************
export const getUsersState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.users
);

// get the selected user id from state
export const getSelectedUserId = createSelector(
  getUsersState,
  fromUsers.getSelectedUserId
);

// deconstruct several functions from ngrx/entity
export const {
  selectIds: getUsersIds,
  selectEntities: getUserEntities,
  selectAll: getAllUsers,
  selectTotal: getTotalUsers
} = fromUsers.adapter.getSelectors(getUsersState);

// get the selected user from the state / users collection
export const getSelectedUser = createSelector(
  getUserEntities,
  getSelectedUserId,
  (entities, id) => entities[id]
);



