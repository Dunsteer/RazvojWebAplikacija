import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';
import { HomeComponent } from './components/home/home.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { LoginComponent } from './components/login/login.component';
import { OtherAuthGuardService } from '@shared/services/other-auth-guard.service';
import { LoginAuthGuardService } from '@shared/services/login-auth-guard.service';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate:[OtherAuthGuardService]
  },
  {
    path: "users",
    component: UserTableComponent,
    canActivate:[OtherAuthGuardService]
  },
  {
    path:"orders",
    component:OrdersListComponent,
    canActivate:[OtherAuthGuardService]
  },
  {
    path:"login",
    component:LoginComponent,
    canActivate:[LoginAuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
