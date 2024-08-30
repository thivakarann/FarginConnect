import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { TestpageComponent } from './testpage/testpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntityViewallComponent } from './Entity Onboard/entity-viewall/entity-viewall.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { EntityViewComponent } from './Entity Onboard/entity-view/entity-view.component';
import { EntityAddComponent } from './Entity Onboard/entity-add/entity-add.component';

const routes: Routes = [


  { path: 'login-page', component: LoginPageComponent },
  { path: '', redirectTo: '/login-page', pathMatch: 'full' },


  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'dashboard-content', component: DashboardContentComponent },
      { path: 'entity-viewall', component: EntityViewallComponent },
      { path: 'entity-view/:id', component: EntityViewComponent },
      { path: 'entity-add', component: EntityAddComponent },
      { path: 'testpage', component: TestpageComponent },
     ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}


