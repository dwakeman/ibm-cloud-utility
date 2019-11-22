import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilityHomeComponent } from './utility-home/utility-home.component';
import { LoginComponent } from './login/login.component';
import { ResourceInstancesComponent } from './resource-instances/resource-instances.component';
import { ResourceInstanceComponent } from './resource-instance/resource-instance.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    { path: 'home', component: UtilityHomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'instances', component: ResourceInstancesComponent },
    { path: 'instances/:resourceId', component: ResourceInstanceComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
