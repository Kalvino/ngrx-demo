import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidebarComponent } from './containers/layout-components/sidebar/sidebar.component';
import { HeaderComponent } from './containers/layout-components/header/header.component';
import { DashboardLayoutComponent } from './containers/dashboard-layout.component';
import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavMenuComponent } from './containers/layout-components/sidebar/sidenav-menu/sidenav-menu.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UsersComponent } from './components/users/users.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { StoreModule } from '@ngrx/store';
import * as fromDashboard from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './effects/users.effects';

/**
 * list of components in this module
 */
export const COMPONENTS = [
    DashboardLayoutComponent,
    SidebarComponent,
    HeaderComponent,
    SidenavMenuComponent,
    UsersComponent,
    UserFormComponent
];

/**
 * list of effects in this module
 */
export const EFFECTS = [
    UsersEffects
];

/**
 * Dashboard Module
 */
@NgModule({
    declarations: [COMPONENTS],
    imports: [
        CommonModule,
        TranslateModule,
        DashboardRoutingModule,
        PerfectScrollbarModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        FlexLayoutModule,
        NgxDatatableModule,
        StoreModule.forFeature('dashboard', fromDashboard.reducers),
        EffectsModule.forFeature(EFFECTS)
    ],
    exports: [
        DashboardLayoutComponent,
        DashboardRoutingModule
    ],
    providers: [
    ],
    entryComponents: [
        UserFormComponent
    ]
})
export class DashboardModule {
}
