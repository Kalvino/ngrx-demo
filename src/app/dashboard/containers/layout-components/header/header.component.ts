import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 
  @Output() public sidenavToggle = new EventEmitter();
  currentLang = 'de';

  public availableLangs = [{
    name: 'English',
    code: 'en',
  }, {
    name: 'Deutsch',
    code: 'de',
  }];
 
  constructor(
    private store: Store<any>,
    private translate: TranslateService) { 

    }
 
  ngOnInit() {
    // this.translate.use(this.currentLang);
  }

  setLang(event) {
    // change language
    this.currentLang = event.value
    this.translate.use(this.currentLang);
  }
 
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  } 
}