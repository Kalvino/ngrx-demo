import { Routes } from '@angular/router';

import { DashboardLayoutComponent } from './containers/dashboard-layout.component';
import { UsersComponent } from './components/users/users.component';

export const dashboardRoutes: Routes = [
    {
      path: 'dashboard',
      component: DashboardLayoutComponent,
      data: {
        title: 'Dashboard',
        breadcrumb: 'Dashboard'
      },
      children: [
        {
          path: '',
          redirectTo: 'users',
          pathMatch: 'full'
        },
        {
          path: 'users',
          component: UsersComponent,
          data: {
            title: 'Users',
            breadcrumb: 'Users'
          }
        },
      ]
    }
  ];