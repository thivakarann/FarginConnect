import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { TestpageComponent } from './testpage/testpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewcategoryComponent } from './Main Master/businesscategory/viewcategory/viewcategory.component';
import { BusinessKycComponent } from './Main Master/businesscategory/business-kyc/business-kyc.component';
import { PermissionComponent } from './RolesandPermission/RolePermission/permission/permission.component';
import { SubPermissionComponent } from './RolesandPermission/RolePermission/sub-permission/sub-permission.component';
import { RolesComponent } from './RolesandPermission/roles/roles.component';
import { EntityViewallComponent } from './Entity Onboard/entity-viewall/entity-viewall.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { EntityViewComponent } from './Entity Onboard/entity-view/entity-view.component';
import { EntityAddComponent } from './Entity Onboard/entity-add/entity-add.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [


  { path: 'login-page', component: LoginPageComponent },
  { path: '', redirectTo: '/login-page', pathMatch: 'full' },
 { path:'forgot',component:ForgotPasswordComponent},
  { path:'otp',component:OtpVerificationComponent},
  {path:'reset',component:ResetPasswordComponent},
  {path:'changepassword',component:ChangePasswordComponent},

 
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {path:'view-category',component: ViewcategoryComponent},
      {path:'Business-kyc',component: BusinessKycComponent},
      {path:'test',component: TestpageComponent},
      {path:'roles',component: RolesComponent},
      {path:'permission',component: PermissionComponent},
      {path:'sub-permission',component: SubPermissionComponent},
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


