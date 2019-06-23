import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
  path:"users",
  component:UserTableComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
