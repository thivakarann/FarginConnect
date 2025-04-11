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
import { FarginBankviewComponent } from './Main Master/Fargin Bank/fargin-bankview/fargin-bankview.component';
import { SMSHistoryComponent } from './SMS details/smshistory/smshistory.component';
import { EntitySmsViewallComponent } from './SMS details/entity-sms-viewall/entity-sms-viewall.component';
import { SMSHistoryViewComponent } from './SMS details/smshistory-view/smshistory-view.component';
import { SmsCostViewallComponent } from './Main Master/SMS Cost/sms-cost-viewall/sms-cost-viewall.component';
import { EntityAutoDebitGetallComponent } from './entity-auto-debit-getall/entity-auto-debit-getall.component';
import { EntityAutoDebitByIdComponent } from './entity-auto-debit-by-id/entity-auto-debit-by-id.component';
import { ViewAnnouncementComponent } from './Announcement/view-announcement/view-announcement.component';
import { PlanDetailsCustomerComponent } from './Overall-Customer/plan-details-customer/plan-details-customer.component';
import { CustomerSurveyquestionsComponent } from './Customer-Survey/customer-surveyquestions/customer-surveyquestions.component';
import { SurveyviewallComponent } from './Customer-Survey/surveyviewall/surveyviewall.component';
import { authGuard } from './auth.guard';
import { AlcotHistoryComponent } from './Plan Creation/Alacarte channels/alcot-history/alcot-history.component';
import { BouqutesRegionComponent } from './Plan Creation/Broadcaster Bouqutes/bouqutes-region/bouqutes-region.component';
import { SignerGetallComponent } from './Main Master/Fargin Signer Details/signer-getall/signer-getall.component';
import { AddagreementplanComponent } from './Main Master/Agreementplan/addagreementplan/addagreementplan.component';
import { AllagreementplansComponent } from './Main Master/Agreementplan/allagreementplans/allagreementplans.component';
import { EditagreementplanComponent } from './Main Master/Agreementplan/editagreementplan/editagreementplan.component';
import { ViewagreementplanComponent } from './Main Master/Agreementplan/viewagreementplan/viewagreementplan.component';
import { AggrementSignerOneComponent } from './aggrement-signer-one/aggrement-signer-one.component';
import { AgreementViewallComponent } from './agreement-viewall/agreement-viewall.component';
import { OfflineTransactionsComponent } from './Entity Onboard/Offline-Transactions/offline-transactions/offline-transactions.component';
import { FailureOfftransactionsComponent } from './Entity Onboard/Offline-Transactions/failure-offtransactions/failure-offtransactions.component';
import { OfflineSettlementComponent } from './Entity Onboard/Offline-Transactions/offline-settlement/offline-settlement.component';
import { SuccessOfftransactionsComponent } from './Entity Onboard/Offline-Transactions/success-offtransactions/success-offtransactions.component';
import { BranchViewallComponent } from './branch-viewall/branch-viewall.component';
import { AdditionalpaymentsComponent } from './Fargin Transtions/additionalpayments/additionalpayments.component';
import { BranchCustomerViewComponent } from './branch-customer-view/branch-customer-view.component';
import { RefundGetallComponent } from './Refund/refund-getall/refund-getall.component';
import { ViewStickerComponent } from './StickerCost/view-sticker/view-sticker.component';
import { BranchAddComponent } from './Entity Onboard/Branch/branch-add/branch-add.component';
import { BranchKycComponent } from './Entity Onboard/Branch/branch-kyc/branch-kyc.component';
import { BranchTerminalviewComponent } from './Entity Onboard/BranchTerminal/branch-terminalview/branch-terminalview.component';
import { EntityTerminalViewComponent } from './Entity Onboard/EntityTerminal/entity-terminal-view/entity-terminal-view.component';
import { TerminalTransactionsComponent } from './Entity Onboard/EntityTerminal/terminal-transactions/terminal-transactions.component';
import { BranchTransactionsComponent } from './Entity Onboard/BranchTerminal/branch-transactions/branch-transactions.component';
import { EntityPlanHistoryComponent } from './Entity Onboard/entity-plan-history/entity-plan-history.component';
import { RefundPeriodViewallComponent } from './Main Master/Refund Period/refund-period-viewall/refund-period-viewall.component';
import { ViewRecordcampaignsComponent } from './Campaign/view-recordcampaigns/view-recordcampaigns.component';
import { ViewCampaignsComponent } from './Campaign/view-campaigns/view-campaigns.component';
import { MaintenanceotherpayViewComponent } from './Fargin Transtions/Entity Trans/maintenanceotherpay-view/maintenanceotherpay-view.component';
import { DashboardMerchantcontentComponent } from './dashboard-merchantcontent/dashboard-merchantcontent.component';
import { BranchOnlinetransactionsComponent } from './Entity Onboard/branch-onlinetransactions/branch-onlinetransactions.component';
import { BranchWiseenitytransactionComponent } from './Entity Onboard/branch-onlinetransactions/branch-wiseenitytransaction/branch-wiseenitytransaction.component';

const routes: Routes = [


  { path: 'login-page', component: LoginPageComponent },
  { path: '', redirectTo: '/login-page', pathMatch: 'full' },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'otp', component: OtpVerificationComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  { path: 'addagreementplan', component: AddagreementplanComponent, canActivate: [authGuard] },
  { path: 'editagreementplan/:id', component: EditagreementplanComponent, canActivate: [authGuard] },
  { path: 'allagreementplan/:id', component: AllagreementplansComponent, canActivate: [authGuard] },
  { path: 'Agreement-signer-one', component: AggrementSignerOneComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard-content', component: DashboardContentComponent, canActivate: [authGuard] },
      { path: 'view-category', component: ViewcategoryComponent, canActivate: [authGuard] },
      { path: 'Business-kyc', component: BusinessKycComponent, canActivate: [authGuard] },
      { path: 'test', component: TestpageComponent, canActivate: [authGuard] },
      { path: 'roles', component: RolesComponent, canActivate: [authGuard] },
      { path: 'permission', component: PermissionComponent, canActivate: [authGuard] },
      { path: 'sub-permission', component: SubPermissionComponent, canActivate: [authGuard] },
      { path: 'dashboard-content', component: DashboardContentComponent, canActivate: [authGuard] },
      { path: 'entity-viewall', component: EntityViewallComponent, canActivate: [authGuard] },
      { path: 'entity-view/:id', component: EntityViewComponent, canActivate: [authGuard] },
      { path: 'entity-add', component: EntityAddComponent, canActivate: [authGuard] },
      { path: 'Terms-policy', component: AdminViewComponent, canActivate: [authGuard] },
      { path: 'Termspolicy-create', component: AdminCreateComponent, canActivate: [authGuard] },
      { path: 'policy-edit/:id', component: PolicyEditComponent, canActivate: [authGuard] },
      { path: 'admindetails', component: AdminComponent, canActivate: [authGuard] },
      { path: 'admincreate', component: AdminAddComponent, canActivate: [authGuard] },
      { path: 'adminedit/:id', component: AdminEditComponent, canActivate: [authGuard] },
      { path: 'testpage', component: TestpageComponent, canActivate: [authGuard] },
      { path: 'viewticket', component: ViewticketComponent, canActivate: [authGuard] },
      { path: 'view-role', component: ViewRoleComponent, canActivate: [authGuard] },
      { path: 'Region', component: RegionComponent, canActivate: [authGuard] },
      { path: "dashboard-content", component: DashboardComponent, canActivate: [authGuard] },
      { path: 'view-serviceprovider', component: ServiceProviderComponent, canActivate: [authGuard] },
      { path: 'view-admin/:id', component: AdmincreationViewComponent, canActivate: [authGuard] },
      { path: 'service-provider', component: ServiceProviderComponent, canActivate: [authGuard] },
      { path: "viewfacheckkey", component: ViewfacheckkeyComponent, canActivate: [authGuard] },
      { path: 'alacarte-viewall', component: AlacarteViewallComponent, canActivate: [authGuard] },
      { path: 'alcart-add', component: AlcartAddComponent, canActivate: [authGuard] },
      { path: 'alcart-view/:id', component: AlcartViewComponent, canActivate: [authGuard] },
      { path: 'alcart-edit/:id', component: AlcartEditComponent, canActivate: [authGuard] },
      { path: 'bouquatename-viewall', component: BouquatenameViewallComponent, canActivate: [authGuard] },
      { path: 'bouquets-viewall', component: BouquetsViewallComponent, canActivate: [authGuard] },
      { path: "bouqutes-view/:id", component: BouqutesViewComponent, canActivate: [authGuard] },
      { path: 'bouquete-plan-viewall', component: BouquetePlanViewallComponent, canActivate: [authGuard] },
      { path: "dpoviewall", component: DPOViewallComponent, canActivate: [authGuard] },
      { path: 'bouqutes-add', component: BouqutesAddComponent, canActivate: [authGuard] },
      { path: "dpo-view/:id", component: DpoViewComponent, canActivate: [authGuard] },
      { path: 'merchant-plan-viewall', component: MerchantPlanViewallComponent, canActivate: [authGuard] },
      { path: "pgsetup-view", component: PgsetupViewComponent, canActivate: [authGuard] },
      { path: 'Overall-Customer-view', component: OverallCustomerViewComponent, canActivate: [authGuard] },
      { path: 'Overall-IndividualCustomer-view/:id', component: OverallIndividualCustomerviewComponent, canActivate: [authGuard] },
      { path: 'entity-qrcode/:id', component: EntityQrcodeComponent, canActivate: [authGuard] },
      { path: 'entity-refund/:id', component: EntityRefundComponent, canActivate: [authGuard] },
      { path: 'entity-settlement/:id', component: EntitySettlementComponent, canActivate: [authGuard] },
      { path: 'settlement-view/:id', component: SettlementViewComponent, canActivate: [authGuard] },
      { path: "overall-transactions-viewall", component: OverallTransactionsViewallComponent, canActivate: [authGuard] },
      { path: 'viewwithdrawal', component: ViewwithdrawalComponent, canActivate: [authGuard] },
      { path: 'view-beneficiary', component: ViewbeneficiaryComponent, canActivate: [authGuard] },
      { path: 'add-beneficiary', component: AddbeneficiaryComponent, canActivate: [authGuard] },
      { path: 'edit-beneficiary/:id', component: EditbeneficiaryComponent, canActivate: [authGuard] },
      { path: 'viewprofile', component: ProfileComponent, canActivate: [authGuard] },
      { path: 'edit-personal/:id', component: EditPersonalInfoComponent, canActivate: [authGuard] },
      { path: 'entity-transaction/:id', component: EntityTransactionComponent, canActivate: [authGuard] },
      { path: 'entitycustomers/:id', component: EntityCustomersViewComponent, canActivate: [authGuard] },
      { path: 'entitycustomerviewAll/:id', component: EntityCustomersViewAllComponent, canActivate: [authGuard] },
      { path: "app-dues", component: DuesComponent, canActivate: [authGuard] },
      { path: 'manual-payment', component: UpdateManualpaymentComponent, canActivate: [authGuard] },
      { path: 'manual-transaction/:id', component: ManualTransactionComponent, canActivate: [authGuard] },
      { path: 'paymentlink-view/:id', component: PaymentlinkViewComponent, canActivate: [authGuard] },
      { path: 'view-policy', component: ViewPolicyComponent, canActivate: [authGuard] },
      { path: 'add-policy', component: AddPolicyComponent, canActivate: [authGuard] },
      { path: 'edit-policy/:id', component: EditPolicyComponent, canActivate: [authGuard] },
      { path: 'customer-viewall', component: CustomerViewallComponent, canActivate: [authGuard] },
      { path: 'bank-viewall', component: BankViewallComponent, canActivate: [authGuard] },
      { path: 'customer-trans-viewall', component: CustomerTransViewallComponent, canActivate: [authGuard] },
      { path: 'maintenance-trans-viewall', component: MaintenanceTransViewallComponent, canActivate: [authGuard] },
      { path: 'service-payments-viewall', component: ServicePaymentsViewallComponent, canActivate: [authGuard] },
      { path: 'otherpayments-viewall', component: OtherpaymentsViewallComponent, canActivate: [authGuard] },
      { path: 'otherpay-trans/:id', component: OtherpayTransComponent, canActivate: [authGuard] },
      { path: 'viewall-kyccategory', component: ViewallKyccategoryComponent, canActivate: [authGuard] },
      { path: 'fargin-viewall', component: FarginBankviewComponent, canActivate: [authGuard] },
      { path: "entity-sms-viewall", component: EntitySmsViewallComponent, canActivate: [authGuard] },
      { path: "smshistory", component: SMSHistoryComponent, canActivate: [authGuard] },
      { path: "smshistory-view/:id", component: SMSHistoryViewComponent, canActivate: [authGuard] },
      { path: 'sms-cost-viewall', component: SmsCostViewallComponent, canActivate: [authGuard] },
      { path: 'entity-auto-debit-getall', component: EntityAutoDebitGetallComponent, canActivate: [authGuard] },
      { path: 'entity-auto-debit-by-id/:id', component: EntityAutoDebitByIdComponent, canActivate: [authGuard] },
      { path: 'view-announcement', component: ViewAnnouncementComponent, canActivate: [authGuard] },
      { path: 'plan-details-customer/:id', component: PlanDetailsCustomerComponent, canActivate: [authGuard] },
      { path: 'surveyviewall', component: SurveyviewallComponent, canActivate: [authGuard] },
      { path: 'view-surveyquestions/:id', component: CustomerSurveyquestionsComponent, canActivate: [authGuard] },
      { path: 'alcot-history', component: AlcotHistoryComponent, canActivate: [authGuard] },
      { path: 'bouqutes-region/:id', component: BouqutesRegionComponent, canActivate: [authGuard] },
      { path: "signer-getall", component: SignerGetallComponent, canActivate: [authGuard] },
      { path: 'agreementplan', component: ViewagreementplanComponent, canActivate: [authGuard] },
      {path:'agreement-viewall',component:AgreementViewallComponent,canActivate: [authGuard]},
      {path:'offline-transactions/:id',component:OfflineTransactionsComponent,canActivate: [authGuard]},
      {path:'success-offtransactions',component:SuccessOfftransactionsComponent,canActivate: [authGuard]},
      {path:'failure-offtransactions',component:FailureOfftransactionsComponent,canActivate: [authGuard]},
      {path:'offline-settlement/:id',component:OfflineSettlementComponent,canActivate: [authGuard]},
      {path:'Branch-viewall', component: BranchViewallComponent, canActivate: [authGuard] },
      {path:'branch-customer-view/:id',component:BranchCustomerViewComponent,canActivate:[authGuard]},
      {path:'additional-payments',component:AdditionalpaymentsComponent,canActivate: [authGuard]},
      {path:'refund-getall',component:RefundGetallComponent,canActivate: [authGuard]},
      {path:'sticker-view',component:ViewStickerComponent,canActivate: [authGuard]},
      {path:'branch-add/:id',component:BranchAddComponent,canActivate: [authGuard]},
      {path:'branch-kyc/:id/:id1',component:BranchKycComponent,canActivate: [authGuard]},
      {path:'Terminalview/:id/:id1',component:BranchTerminalviewComponent,canActivate: [authGuard]},
      {path:'EntityTerminal/:id',component:EntityTerminalViewComponent,canActivate: [authGuard]},
      {path:'terminal-transactions/:id',component:TerminalTransactionsComponent,canActivate: [authGuard]},
      {path:'branch-transactions/:id',component:BranchTransactionsComponent,canActivate: [authGuard]},
      {path:'entity-plan-history/:id',component:EntityPlanHistoryComponent,canActivate:[authGuard]},
      {path:"refund-period-viewall",component:RefundPeriodViewallComponent,canActivate:[authGuard]},
      {path:'view-campaign',component:ViewCampaignsComponent,canActivate: [authGuard]},
      {path:'view-record/:id',component:ViewRecordcampaignsComponent,canActivate: [authGuard]},
      {path:'view-campaign',component:ViewCampaignsComponent,canActivate: [authGuard]},
      {path:'view-record/:id',component:ViewRecordcampaignsComponent,canActivate: [authGuard]},
      {path:'maintenanceotherpay-view/:id',component:MaintenanceotherpayViewComponent,canActivate: [authGuard]},
      {path:'dashboardmerchant',component:DashboardMerchantcontentComponent,canActivate: [authGuard]},
      
      {path:'branch-onlinetransactions/:id',component:BranchOnlinetransactionsComponent,canActivate: [authGuard]},
            
      {path:'branch-wiseenitytransaction/:id',component:BranchWiseenitytransactionComponent,canActivate: [authGuard]},
      // {path:'merchant-additional/:id',component:MercahntbasedadditionalComponent,canActivate: [authGuard]},
    ],

  },
]





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
