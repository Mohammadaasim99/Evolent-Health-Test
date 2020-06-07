import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EditDetailsComponent } from './components/add/edit-details/edit-details.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: HomeComponent
  },
  {
    path: 'dashboard/add',
    component: EditDetailsComponent
  },
  {
    path: 'dashboard/:id/edit',
    component: EditDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
