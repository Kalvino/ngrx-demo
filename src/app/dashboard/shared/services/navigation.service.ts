import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IMenuItem} from '../../models/menu.model'

@Injectable()
export class NavigationService {

  menu:IMenuItem[]= [
    {
      name: 'Dashboard',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'dashboard/blank'
    },
    {
      name: 'Users',
      type: 'link',
      tooltip: 'users',
      icon: 'person',
      state: 'dashboard/users'
    }
  ];

}