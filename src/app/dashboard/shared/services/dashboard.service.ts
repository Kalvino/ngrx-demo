import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IMenuItem} from '../../models/menu.model'

@Injectable()
export class DashboardService {

  menu:IMenuItem[];

  constructor() { 
      this.menu = this.globalAdmin
  }
  
  // Global-Admin Menu
  globalAdmin: IMenuItem[] = [
    {
      name: 'Users',
      type: 'link',
      tooltip: 'users',
      icon: 'person',
      state: 'dashboard/users'
    }
  ]
}