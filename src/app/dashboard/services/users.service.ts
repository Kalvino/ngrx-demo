import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IUser } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { Update } from '@ngrx/entity';

/**
 * user service
 * encapsulates api interactions for
 * working with 'users'
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  /**
   * get all users from the app-cloud api
   */
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.apiHost}/api/leveloneusers`);
  }

  /**
   * create a new user
   * @param user User
   */
  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.apiHost}/api/leveloneusers`, user);
  }

  /**
   * delete a user
   * @param id user id
   */
  deleteUser(id: string): Observable<{}> {
    return this.http.delete<IUser>(`${environment.apiHost}/api/leveloneusers/${id}`);
  }

  /**
   * update a user
   * @param user object:User
   */
  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${environment.apiHost}/api/leveloneusers/${user._id}`, user);
  }

  /**
   * edit a user
   * @param changed
   */
  editUser(changed: Update<IUser>): Observable<IUser> {
    return this.http
      .put<IUser>(`${environment.apiHost}/api/users/${changed.id}`, { ...changed.changes });
  }


}
