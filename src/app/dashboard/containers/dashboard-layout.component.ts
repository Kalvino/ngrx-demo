import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { NavigationEnd, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  public isModuleLoading: Boolean = false;
  private moduleLoaderSub: Subscription;
  private layoutConfSub: Subscription;
  private routerEventSub: Subscription;
  private mediaSub: Subscription;
  // private sidebarPS: PerfectScrollbar;

  // private bodyPS: PerfectScrollbar;
  // private headerFixedBodyPS: PerfectScrollbar;
  public scrollConfig = {};
  public layoutConf: any = {};
  public sidebarStyle: string;
  public navPosition: string;
  public layoutInTransition: boolean;
  public topBarFixed: boolean;

  /**
   * device types: mobile
   */
  public isMobile: boolean;
  /**
   * device types: tablet
   */
  public isTablet: boolean;
  /**
   * device types: desktop
   */
  public isDesktop: boolean;

  deviceInfo = null;

  sideNavMode:string;
  sideNavOpened:boolean;

  constructor(
    private router: Router,
    public translate: TranslateService,
    private deviceService: DeviceDetectorService
  ) {
    // Translator init
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de/) ? browserLang : 'de');

    if(deviceService.isMobile()){
      this.sideNavMode = "over";
      this.sideNavOpened = false;
    }else if(deviceService.isTablet()){
      this.sideNavMode = "over";
      this.sideNavOpened = false
    }
    else{
      this.sideNavMode = "side";
      this.sideNavOpened = true
    }

    this.deviceInformation();
  }

  ngOnInit() {

    // FOR MODULE LOADER FLAG
    this.moduleLoaderSub = this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.isModuleLoading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.isModuleLoading = false;
      }
    });
  }


  ngAfterViewInit() {
  }
  scrollToTop(selector: string) {
    if (document) {
      const element = <HTMLElement>document.querySelector(selector);
      element.scrollTop = 0;
    }
  }

  deviceInformation() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    console.log(this.deviceInfo);
    console.log(this.isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(this.isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(this.isDesktop); // returns if the app is running on a Desktop browser.
  }

  ngOnDestroy() {
    if (this.moduleLoaderSub) {
      this.moduleLoaderSub.unsubscribe();
    }
    if (this.layoutConfSub) {
      this.layoutConfSub.unsubscribe();
    }
    if (this.routerEventSub) {
      this.routerEventSub.unsubscribe();
    }
  }


}
