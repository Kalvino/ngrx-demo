import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NavigationService } from "../../../../shared/services/navigation.service";
import { Subscription } from "rxjs";
import {IMenuItem } from '../../../../models/menu.model'


@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  public navMenu: IMenuItem[];
  private menuItemsSubscription: Subscription;

  constructor(private navService: NavigationService) { }

  ngOnInit() {
    //subscribe to the navigation service
    this.navMenu = this.navService.menu;
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
