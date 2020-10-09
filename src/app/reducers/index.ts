import * as fromRouter from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer, createFeatureSelector } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { localStorageSync } from 'ngrx-store-localstorage';

import {ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

// basic gloabl reducer
export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer
};

// the logger function
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any): State => {
    // console.log('action', action);
    // console.log('state', state);
    return reducer(state, action);
  };
}

// use localstorage to save the state
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth'],
    rehydrate: true
  })(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, localStorageSyncReducer]
  : [localStorageSyncReducer];


// get router state
export const getRouterState = createFeatureSelector<
fromRouter.RouterReducerState<RouterStateUrl>>('router');


export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl{

    //url destructure the url from the routerState 
    //same as:
    // const url = routerState.url
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot =routerState.root;
    while(state.firstChild) {
      state = state.firstChild;
    }
    //const params = state.params;
    const { params } = state;

    return {url, queryParams, params};
  }
}