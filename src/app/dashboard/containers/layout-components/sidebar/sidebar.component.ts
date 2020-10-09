import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { IUser } from '../../../../dashboard/models/user.model';
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  public getcurrentUser$: Subscription;
  public currentUser: IUser = null;
 
  constructor(
    private store: Store<any>) { }
 
  ngOnInit() {
    // TODO: Unsubscribe
    // this.getcurrentUser$ = this.store.pipe(select(fromAuth.getUser)).subscribe(
    //   user => this.currentUser = user);
  }
 
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
 
}