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
import { MerchantPlanViewallComponent } from './Merchant Plan/merchant-plan-viewall/merchant-plan-viewall.component';
import { DPOViewallComponent } from './Plan Creation/DPO Bouquet Creation/dpoviewall/dpoviewall.component';
import { DpoViewComponent } from './Plan Creation/DPO Bouquet Creation/dpo-view/dpo-view.component';
import { PgsetupViewComponent } from './Main Master/PgSetup/pgsetup-view/pgsetup-view.component';
import { OverallCustomerViewComponent } from './Overall-Customer/overall-customer-view/overall-customer-view.component';
import { OverallIndividualCustomerviewComponent } from './Overall-Customer/overall-individual-customerview/overall-individual-customerview.component';
import { EntityQrcodeComponent } from './entity-qrcode/entity-qrcode/entity-qrcode.component';
import { EntityRefundComponent } from './entity-refund/entity-refund.component';
import { EntitySettlementComponent } from './entity-settlement/entity-settlement.component';
import { SettlementViewComponent } from './settlement-view/settlement-view/settlement-view.component';
import { EntityCustomersViewComponent } from './Entity-Customers/entity-customers-view/entity-customers-view/entity-customers-view.component';
import { EntityCustomersViewAllComponent } from './Entity-Customers/entity-customers-view-all/entity-customers-view-all.component';
import { OverallTransactionsViewallComponent } from './Overall-Transactions/overall-transactions-viewall/overall-transactions-viewall.component';
import { ViewwithdrawalComponent } from './Main Master/WIthdrawal/viewwithdrawal/viewwithdrawal.component';
import { ViewbeneficiaryComponent } from './Beneficiary/viewbeneficiary/viewbeneficiary.component';
import { AddbeneficiaryComponent } from './Beneficiary/addbeneficiary/addbeneficiary.component';
import { EditbeneficiaryComponent } from './Beneficiary/editbeneficiary/editbeneficiary.component';
import { ProfileComponent } from './profile/profile.component';
import { BouqutesAddComponent } from './Plan Creation/Broadcaster Bouqutes/bouqutes-add/bouqutes-add.component';
import { EditPersonalInfoComponent } from './Entity Onboard/edit-personal-info/edit-personal-info.component';
import { EntityTransactionComponent } from './entity-transaction/entity-transaction.component';
import { DuesComponent } from './dues/dues.component';
import { UpdateManualpaymentComponent } from './Entity Onboard/update-manualpayment/update-manualpayment.component';
import { ManualTransactionComponent } from './Entity Onboard/manual-transaction/manual-transaction.component';
import { PaymentlinkViewComponent } from './Entity Onboard/paymentlink-view/paymentlink-view.component';
import { ViewPolicyComponent } from './Fargin-policy/view-policy/view-policy.component';
import { AddPolicyComponent } from './Fargin-policy/add-policy/add-policy.component';
import { EditPolicyComponent } from './Fargin-policy/edit-policy/edit-policy.component';
import { CustomerViewallComponent } from './Tickets/customer-viewall/customer-viewall.component';
import { BankViewallComponent } from './Main Master/Bank Details/bank-viewall/bank-viewall.component';
import { MaintenanceTransViewallComponent } from './Fargin Transtions/Entity Trans/maintenance-trans-viewall/maintenance-trans-viewall.component';
import { ServicePaymentsViewallComponent } from './Fargin Transtions/Entity Trans/service-payments-viewall/service-payments-viewall.component';
import { CustomerTransViewallComponent } from './Fargin Transtions/Customer Trans/customer-trans-viewall/customer-trans-viewall.component';
import { OtherpaymentsViewallComponent } from './Fargin Transtions/Other Payments/otherpayments-viewall/otherpayments-viewall.component';
import { OtherpaymentsViewComponent } from './Fargin Transtions/Other Payments/otherpayments-view/otherpayments-view.component';
import { OtherpayTransComponent } from './Entity Onboard/otherpay-trans/otherpay-trans.component';
import { ViewallKyccategoryComponent } from './Main Master/kyccategory/viewall-kyccategory/viewall-kyccategory.component';

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
      { path: 'dashboard-content', component: DashboardContentComponent },
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
      { path: "dashboard-content", component: DashboardComponent },
      { path: 'view-serviceprovider', component: ServiceProviderComponent },
      { path: 'view-admin/:id', component: AdmincreationViewComponent },
      { path: 'service-provider', component: ServiceProviderComponent },
      { path: "viewfacheckkey", component: ViewfacheckkeyComponent },
      { path: 'alacarte-viewall', component: AlacarteViewallComponent },
      { path: 'alcart-add', component: AlcartAddComponent },
      { path: 'alcart-view/:id', component: AlcartViewComponent },
      { path: 'alcart-edit/:id', component: AlcartEditComponent },
      { path: 'bouquatename-viewall', component: BouquatenameViewallComponent },
      { path: 'bouquets-viewall', component: BouquetsViewallComponent },
      { path: "bouqutes-view/:id", component: BouqutesViewComponent },
      { path: 'bouquete-plan-viewall', component: BouquetePlanViewallComponent },
      { path: "dpoviewall", component: DPOViewallComponent },
      { path: 'bouqutes-add', component: BouqutesAddComponent },
      { path: "dpo-view/:id", component: DpoViewComponent },
      { path: 'merchant-plan-viewall', component: MerchantPlanViewallComponent },
      { path: "pgsetup-view", component: PgsetupViewComponent },
      { path: 'Overall-Customer-view', component: OverallCustomerViewComponent },
      { path: 'Overall-IndividualCustomer-view/:id', component: OverallIndividualCustomerviewComponent },
      { path: 'entity-qrcode/:id', component: EntityQrcodeComponent },
      { path: 'entity-refund/:id', component: EntityRefundComponent },
      { path: 'entity-settlement/:id', component: EntitySettlementComponent },
      { path: 'settlement-view/:id', component: SettlementViewComponent },
      { path: "overall-transactions-viewall", component: OverallTransactionsViewallComponent },
      { path: 'viewwithdrawal', component: ViewwithdrawalComponent },
      { path: 'view-beneficiary', component: ViewbeneficiaryComponent },
      { path: 'add-beneficiary', component: AddbeneficiaryComponent },
      { path: 'edit-beneficiary/:id', component: EditbeneficiaryComponent },
      { path: 'viewprofile', component: ProfileComponent },
      { path: 'edit-personal/:id', component: EditPersonalInfoComponent },
      { path: 'entity-transaction/:id', component: EntityTransactionComponent },
      { path: 'entitycustomers/:id', component: EntityCustomersViewComponent },
      { path: 'entitycustomerviewAll/:id', component: EntityCustomersViewAllComponent },
      { path: "app-dues", component: DuesComponent },
      { path: 'manual-payment', component: UpdateManualpaymentComponent },
      { path: 'manual-transaction/:id', component: ManualTransactionComponent },
      { path: 'paymentlink-view/:id', component: PaymentlinkViewComponent },
      { path: 'view-policy', component: ViewPolicyComponent },
      { path: 'add-policy', component: AddPolicyComponent },
      { path: 'edit-policy/:id', component: EditPolicyComponent },
      { path: 'customer-viewall', component: CustomerViewallComponent },
      { path: 'bank-viewall', component: BankViewallComponent },
      { path: 'customer-trans-viewall', component: CustomerTransViewallComponent },
      { path: 'maintenance-trans-viewall', component: MaintenanceTransViewallComponent },
      { path: 'service-payments-viewall', component: ServicePaymentsViewallComponent },
      {path:'otherpayments-viewall',component:OtherpaymentsViewallComponent},
      {path:'otherpay-trans/:id',component:OtherpayTransComponent},
      { path: 'viewall-kyccategory', component: ViewallKyccategoryComponent }



    ],
  },
];







@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
