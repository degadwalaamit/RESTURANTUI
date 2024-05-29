import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'table-details/:tId',
    loadChildren: () => import('./modules/tableDetails/tableDetails.module').then(m => m.tableDetails),
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'food-details',
    loadChildren: () => import('./modules/foodDetails/foodDetails.module').then(m => m.foodDetails),
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'resturant',
    loadChildren: () => import('./modules/resturant/resturant.module').then(m => m.ResturantModule),
    canActivate: [LoginAuthGuard]
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
