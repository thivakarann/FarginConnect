import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { TestpageComponent } from './testpage/testpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewticketComponent } from './Tickets/viewticket/viewticket.component';
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
import { AdminComponent } from './Admin-Creation/admin/admin.component';
import { AdminAddComponent } from './Admin-Creation/admin-add/admin-add.component';
import { AdminEditComponent } from './Admin-Creation/admin-edit/admin-edit.component';

import { AdminViewComponent } from './Admin-policy/admin-view/admin-view.component';
import { AdminCreateComponent } from './Admin-policy/admin-create/admin-create.component';
import { ViewRoleComponent } from './Roles-Permission/view-role/view-role.component';
import { PolicyEditComponent } from './Admin-policy/policy-edit/policy-edit.component';
import { RegionComponent } from './Main Master/region/region.component';
import { ServiceProviderComponent } from './Main Master/ServiceProvider/service-provider/service-provider.component';
import { AdmincreationViewComponent } from './Admin-Creation/admincreation-view/admincreation-view.component';
import { ViewfacheckkeyComponent } from './Main Master/Facheckkeys/viewfacheckkey/viewfacheckkey.component';
import { AlacarteViewallComponent } from './Plan Creation/Alacarte channels/alacarte-viewall/alacarte-viewall.component';
import { AlcartAddComponent } from './Plan Creation/Alacarte channels/alcart-add/alcart-add.component';
import { AlcartViewComponent } from './Plan Creation/Alacarte channels/alcart-view/alcart-view.component';
import { AlcartEditComponent } from './Plan Creation/Alacarte channels/alcart-edit/alcart-edit.component';
import { BouquatenameViewallComponent } from './Plan Creation/Bouquetname Creation/bouquatename-viewall/bouquatename-viewall.component';
import { BouquetsViewallComponent } from './Plan Creation/Broadcaster Bouqutes/bouquets-viewall/bouquets-viewall.component';
import { BouqutesViewComponent } from './Plan Creation/Broadcaster Bouqutes/bouqutes-view/bouqutes-view.component';
import { BouquetePlanViewallComponent } from './Plan Creation/Bouquete plan Name/bouquete-plan-viewall/bouquete-plan-viewall.component';

const routes: Routes = [


  { path: 'login-page', component: LoginPageComponent },
  { path: '', redirectTo: '/login-page', pathMatch: 'full' },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'otp', component: OtpVerificationComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'changepassword', component: ChangePasswordComponent },


  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'view-category', component: ViewcategoryComponent },
      { path: 'Business-kyc', component: BusinessKycComponent },
      { path: 'test', component: TestpageComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'permission', component: PermissionComponent },
      { path: 'sub-permission', component: SubPermissionComponent },
      { path: 'dashboard-content', component: DashboardContentComponent },
      { path: 'entity-viewall', component: EntityViewallComponent },
      { path: 'entity-view/:id', component: EntityViewComponent },
      { path: 'entity-add', component: EntityAddComponent },
      { path: 'Terms-policy', component: AdminViewComponent },
      { path: 'Termspolicy-create', component: AdminCreateComponent },
      { path: 'policy-edit/:id', component: PolicyEditComponent },
      { path: 'admindetails', component: AdminComponent },
      { path: 'admincreate', component: AdminAddComponent },
      { path: 'adminedit/:id', component: AdminEditComponent },
      { path: 'testpage', component: TestpageComponent },
      { path: 'viewticket', component: ViewticketComponent },
      { path: 'view-role', component: ViewRoleComponent },
      { path: 'Region', component: RegionComponent },
      { path: 'view-serviceprovider', component: ServiceProviderComponent },
      { path: 'view-admin/:id', component: AdmincreationViewComponent },
      { path: 'service-provider', component: ServiceProviderComponent },
      { path: "viewfacheckkey", component: ViewfacheckkeyComponent },
      { path: 'alacarte-viewall', component: AlacarteViewallComponent },
      { path: 'alcart-add', component: AlcartAddComponent },
      { path: 'alcart-view/:id', component: AlcartViewComponent },
      { path: 'alcart-edit/:id', component: AlcartEditComponent },
      {path:'bouquatename-viewall',component:BouquatenameViewallComponent},
      {path:'bouquets-viewall',component:BouquetsViewallComponent},
      {path:"bouqutes-view/:id",component:BouqutesViewComponent},
      {path:'bouquete-plan-viewall',component:BouquetePlanViewallComponent}
    ],
  },
];







@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
