import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntityLoginpageComponent } from './entity-loginpage/entity-loginpage.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ViewadminComponent } from './Admin/viewadmin/viewadmin.component';
import { AddadminComponent } from './Admin/addadmin/addadmin.component';
import { ViewemployeeComponent } from './Employee/viewemployee/viewemployee.component';
import { AddemployeeComponent } from './Employee/addemployee/addemployee.component';
import { EditadminComponent } from './Admin/editadmin/editadmin.component';
import { ViewtermsComponent } from './Terms & Policy/viewterms/viewterms.component';
import { ViewdisclaimerComponent } from './Terms & Policy/viewdisclaimer/viewdisclaimer.component';
import { ViewprivacyComponent } from './Terms & Policy/viewprivacy/viewprivacy.component';
import { ViewrefundComponent } from './Terms & Policy/viewrefund/viewrefund.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewemailverfiyComponent } from './Verfication/viewemailverfiy/viewemailverfiy.component';
import { ViewServiceticketComponent } from './servicetickets/view-serviceticket/view-serviceticket.component';
import { AddServiceticketComponent } from './servicetickets/add-serviceticket/add-serviceticket.component';
import { ViewRoleComponent } from './Roles-Permission/view-role/view-role.component';
import { ViewcustomerComponent } from './Customer/viewcustomer/viewcustomer.component';
import { AddcustomerComponent } from './Customer/addcustomer/addcustomer.component';
import { EditcustomerComponent } from './Customer/editcustomer/editcustomer.component';
import { PersonalviewComponent } from './Customer/personalview/personalview.component';
import { SetupComponent } from './Onetimesetup/setup/setup.component';
import { DashboardcontentComponent } from './dashboard/dashboardcontent/dashboardcontent.component';
import { ViewwithdrawalComponent } from './Quickwithdrawal/viewwithdrawal/viewwithdrawal.component';
import { EditServiceticketComponent } from './servicetickets/edit-serviceticket/edit-serviceticket.component';
import { AddBeneficiaryComponent } from './Beneficiary/add-beneficiary/add-beneficiary.component';
import { EditBeneficiaryComponent } from './Beneficiary/edit-beneficiary/edit-beneficiary.component';
import { ViewRegionComponent } from './main-master/region/view-region/view-region.component';
import { ViewRouteComponent } from './main-master/route/view-route/view-route.component';
import { ViewBeneficiaryComponent } from './Beneficiary/view-beneficiary/view-beneficiary.component';
import { ViewSetupboxComponent } from './main-master/setupbox/view-setupbox/view-setupbox.component';
import { TransactionViewComponent } from './Transaction/transaction-view/transaction-view.component';
import { ReturnsuccessComponent } from './Onetimesetup/returnsuccess/returnsuccess.component';
import { ReturnfailureComponent } from './Onetimesetup/returnfailure/returnfailure.component';
import { ChannelConfigurationComponent } from './Channels-Packages/channel-configuration/channel-configuration.component';
import { PlanConfigurationComponent } from './Channels-Packages/plan-configuration/plan-configuration.component';
import { LCOPviewallComponent } from './Channels-Packages/LCOP-Plan-creation/lcopviewall/lcopviewall.component';
import { LCOPAddComponent } from './Channels-Packages/LCOP-Plan-creation/lcopadd/lcopadd.component';
import { LCOPViewComponent } from './Channels-Packages/LCOP-Plan-creation/lcopview/lcopview.component';
import { MobileVerficationComponent } from './Customer Transtions/mobile-verfication/mobile-verfication.component';
import { CustomerPaymentsViewComponent } from './Customer Transtions/customer-payments-view/customer-payments-view.component';
import { CustomerPaymentsInfoComponent } from './Customer Transtions/customer-payments-info/customer-payments-info.component';
import { CustomerPaymentSuccessComponent } from './Customer Transtions/customer-payment-success/customer-payment-success.component';
import { CustomerPaymentFailureComponent } from './Customer Transtions/customer-payment-failure/customer-payment-failure.component';
import { ViewBulkComponent } from './main-master/setupbox/setupbox-bulkupload/view-bulk/view-bulk.component';
import { ResponseBulkComponent } from './main-master/setupbox/setupbox-bulkupload/response-bulk/response-bulk.component';
import { OnetimesetupComponent } from './Transaction/onetimesetup/onetimesetup.component';
import { PlanConfigurationDetailsComponent } from './Channels-Packages/plan-configuration-details/plan-configuration-details.component';
import { TestPageComponent } from './test-page/test-page.component';
import { MerchantViewallComponent } from './Merchant-Dues/merchant-viewall/merchant-viewall.component';
import { MerchantduesSuccessComponent } from './Merchant-Dues/merchantdues-success/merchantdues-success.component';
import { MerchantduesFailureComponent } from './Merchant-Dues/merchantdues-failure/merchantdues-failure.component';
import { ChannelconfigurationSingleviewComponent } from './Channels-Packages/channelconfiguration-singleview/channelconfiguration-singleview.component';
import { CustomerTermsandpolicyComponent } from './Customer Transtions/customer-termsandpolicy/customer-termsandpolicy.component';
import { CustomerPrivacyPolicyComponent } from './Customer Transtions/customer-privacy-policy/customer-privacy-policy.component';
import { CustomerDisclaimerComponent } from './Customer Transtions/customer-disclaimer/customer-disclaimer.component';
import { CustomerRefundPolicyComponent } from './Customer Transtions/customer-refund-policy/customer-refund-policy.component';
import { CustomerTransactionviewsComponent } from './Customer Transtions/customer-transactionviews/customer-transactionviews.component';
import { CustomerVerifyViewComponent } from './Customer Transtions/customer-verify-view/customer-verify-view.component';
import { CusticketsViewallComponent } from './Customer Transtions/customer Tickets/custickets-viewall/custickets-viewall.component';
import { CustomerSolutionsComponent } from './Customer Transtions/customer-solutions/customer-solutions.component';
import { CustomerFarginPolicyComponent } from './Customer Transtions/customer-fargin-policy/customer-fargin-policy.component';
import { SetupboxHistoryComponent } from './Customer/setupbox-history/setupbox-history.component';
import { CustomerViewallComponent } from './servicetickets/customer-viewall/customer-viewall.component';
import { ByRedirectComponent } from './by-redirect/by-redirect.component';
import { OtherPaymentsSuccessComponent } from './Other Payments/other-payments-success/other-payments-success.component';
import { OtherpaymentsFailureComponent } from './Other Payments/otherpayments-failure/otherpayments-failure.component';
import { CustomerBulkresponseComponent } from './Customer/customer-bulkresponse/customer-bulkresponse.component';
import { ViewrenewalComponent } from './Renewal/viewrenewal/viewrenewal.component';
import { SetupformComponent } from './Renewal/setupform/setupform.component';
import { ServiceProviderLinkViewallComponent } from './Service Provide Link/service-provider-link-viewall/service-provider-link-viewall.component';
import { CustomerOtpVerifyComponent } from './Customer Transtions/customer-otp-verify/customer-otp-verify.component';
import { PlanParticularSetupboxComponent } from './Customer/plan-particular-setupbox/plan-particular-setupbox.component';
import { ViewsmsComponent } from './SMSDetails/viewsms/viewsms.component';
import { SmshistoryComponent } from './SMSDetails/smshistory/smshistory.component';
import { OtherPaymentsViewallComponent } from './Other Payments/other-payments-viewall/other-payments-viewall.component';
import { CustomerresponseCreateComponent } from './CustomerResponse/customerresponse-create/customerresponse-create.component';
import { ViewCustomerResponseComponent } from './CustomerResponse/view-customer-response/view-customer-response.component';
import { AddSurveyquestionsComponent } from './Servey/add-surveyquestions/add-surveyquestions.component';
import { ViewSurveyquestionsComponent } from './Servey/view-surveyquestions/view-surveyquestions.component';
import { CustomerSurveyViewComponent } from './Customer Transtions/Customersurvey/customer-survey-view/customer-survey-view.component';
import { authGuard } from './auth.guard';
import { AdmincustomerdetailsComponent } from './main-master/route/admincustomerdetails/admincustomerdetails.component';
import { AdmincustomertransactionComponent } from './main-master/route/admincustomertransaction/admincustomertransaction.component';
import { AllcustomerrouteComponent } from './main-master/route/allcustomerroute/allcustomerroute.component';
import { AreaViewComponent } from './main-master/route/area-view/area-view.component';
import { CustomertransactionrouteComponent } from './main-master/route/customertransactionroute/customertransactionroute.component';
import { CustomerviewrouteComponent } from './main-master/route/customerviewroute/customerviewroute.component';
import { StreetViewComponent } from './main-master/route/street-view/street-view.component';
import { PascustomerdetailsComponent } from './main-master/route/pascustomerdetails/pascustomerdetails.component';
import { CustomersetupboxhistoryComponent } from './Customer/customersetupboxhistory/customersetupboxhistory.component';
import { AdminViewComponent } from './Admin/admin-view/admin-view.component';
import { AggrementSignerTwoComponent } from './aggrement-signer-two/aggrement-signer-two.component';
import { ViewagreementsComponent } from './Agreement/viewagreements/viewagreements.component';
import { CustomersetupboxbulkresponseComponent } from './Customer/customersetupboxbulkresponse/customersetupboxbulkresponse.component';
import { SetupboxCustomerviewComponent } from './main-master/setupbox/setupbox-bulkupload/setupbox-customerview/setupbox-customerview.component';
import { OfflineTransactionsComponent } from './Offline-Transaction/offline-transactions/offline-transactions.component';
import { PlanConfigurationChannelviewComponent } from './Channels-Packages/plan-configuration-channelview/plan-configuration-channelview/plan-configuration-channelview.component';
import { ViewduesreportsComponent } from './Reports/Duesreports/viewduesreports/viewduesreports.component';
import { ViewcustomerreportsComponent } from './Reports/Customerreports/viewcustomerreports/viewcustomerreports.component';
import { ViewsetupboxreportsComponent } from './Reports/Setupboxreports/viewsetupboxreports/viewsetupboxreports.component';
import { CusduelogsbymerchantComponent } from './Transaction/cusduelogsbymerchant/cusduelogsbymerchant.component';
import { UpdatedDuesdetailsComponent } from './Transaction/updated-duesdetails/updated-duesdetails.component';
import { AreaViewallComponent } from './main-master/Area/area-viewall/area-viewall.component';
import { PincodeComponent } from './main-master/Pincode/pincode/pincode.component';
import { StreetViewallComponent } from './main-master/Street/street-viewall/street-viewall.component';
import { DashboardviewactivecustomerComponent } from './dashboard/dashboardviewactivecustomer/dashboardviewactivecustomer.component';
import { DashboardviewactiveempolyeeComponent } from './dashboard/dashboardviewactiveempolyee/dashboardviewactiveempolyee.component';
import { DashboardviewbookingComponent } from './dashboard/dashboardviewbooking/dashboardviewbooking.component';
import { DashboardviewfaultyComponent } from './dashboard/dashboardviewfaulty/dashboardviewfaulty.component';
import { DashboardviewfreeComponent } from './dashboard/dashboardviewfree/dashboardviewfree.component';
import { DashboardviewinactivecustomerComponent } from './dashboard/dashboardviewinactivecustomer/dashboardviewinactivecustomer.component';
import { DashboardviewinactiveemployeeComponent } from './dashboard/dashboardviewinactiveemployee/dashboardviewinactiveemployee.component';
import { DashboardviewpendingcustomerComponent } from './dashboard/dashboardviewpendingcustomer/dashboardviewpendingcustomer.component';
import { AdditionalpayViewComponent } from './Customer Transtions/Additional-Payment-transaction/additionalpay-view/additionalpay-view.component';
import { AdditionaLTransactionhistoryComponent } from './Customer Transtions/Additional-Payment-transaction/additional-transactionhistory/additiona-l-transactionhistory.component';
import { FailureForAdditionalComponent } from './Customer Transtions/failure-for-additional/failure-for-additional.component';
import { SuccessForAdditionalComponent } from './Customer Transtions/success-for-additional/success-for-additional.component';
import { AdditionalCustomerpayinfoComponent } from './Customer Transtions/Additional-Payment-transaction/additional-customerpayinfo/additional-customerpayinfo.component';
import { AdditionalTransactionsComponent } from './Additional-Transactions/additional-transactions/additional-transactions.component';
import { CategoryViewallComponent } from './main-master/Category/category-viewall/category-viewall.component';
import { DashboardviewclosedticketComponent } from './dashboard/dashboardviewclosedticket/dashboardviewclosedticket.component';
import { DashboardviewholdticketComponent } from './dashboard/dashboardviewholdticket/dashboardviewholdticket.component';
import { DashboardviewopenticketComponent } from './dashboard/dashboardviewopenticket/dashboardviewopenticket.component';
import { BranchesViewallComponent } from './Branches/branches-viewall/branches-viewall.component';
import { BranchCustomerViewComponent } from './Branches/branch-customer-view/branch-customer-view.component';
import { OffstatusComponent } from './dashboard/offstatus/offstatus.component';
import { OnstatusComponent } from './dashboard/onstatus/onstatus.component';
import { YesterdayoffstatusComponent } from './dashboard/yesterdayoffstatus/yesterdayoffstatus.component';
import { YesterdayonoffstatusComponent } from './dashboard/yesterdayonoffstatus/yesterdayonoffstatus.component';
import { RoutebulkresponseComponent } from './main-master/route/routebulkresponse/routebulkresponse.component';
import { DuestatushistoryComponent } from './Due History/duestatushistory/duestatushistory.component';
import { HistoryforreminderComponent } from './Customer/historyforreminder/historyforreminder.component';
import { BookedCustomerViewComponent } from './dashboard/booked-customer-view/booked-customer-view.component';
import { DamagedCustomerViewComponent } from './dashboard/damaged-customer-view/damaged-customer-view.component';
import { DuestatusoffdetailsComponent } from './dashboard/duestatusoffdetails/duestatusoffdetails.component';
import { RefundForMerchantComponent } from './Refund/refund-for-merchant/refund-for-merchant.component';
import { SetupboxHistoryviewComponent } from './Customer/setupbox-historyview/setupbox-historyview.component';
import { CustomerStatusHistoryComponent } from './Customer/customer-status-history/customer-status-history.component';
import { LcopchannelviewComponent } from './Customer/lcopchannelview/lcopchannelview.component';



const routes: Routes = [
  { path: 'admin/login', component: EntityLoginpageComponent },
  { path: 'by-redirect', component: ByRedirectComponent },
  { path: '', redirectTo: '/by-redirect', pathMatch: 'full' },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin/login', component: EntityLoginpageComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'otp', component: OtpPageComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  { path: 'return-success', component: ReturnsuccessComponent },
  { path: 'return-failure', component: ReturnfailureComponent },
  { path: 'test-page', component: TestPageComponent },
  { path: "customer/login", component: MobileVerficationComponent },
  { path: "customer-payments-view/:id", component: CustomerPaymentsViewComponent },
  { path: "customer-payments-info/:id", component: CustomerPaymentsInfoComponent },
  { path: 'customer-payment-success', component: CustomerPaymentSuccessComponent },
  { path: "customer-payment-failure", component: CustomerPaymentFailureComponent },
  { path: "merchantdues-success", component: MerchantduesSuccessComponent },
  { path: "merchantdues-failure", component: MerchantduesFailureComponent },
  { path: "customer-termsandpolicy", component: CustomerTermsandpolicyComponent },
  { path: "customer-privacy-policy", component: CustomerPrivacyPolicyComponent },
  { path: "customer-refund-policy", component: CustomerRefundPolicyComponent },
  { path: "customer-disclaimer", component: CustomerDisclaimerComponent },
  { path: "customer-transactionviews/:id", component: CustomerTransactionviewsComponent },
  { path: "customer-verify-view/:id", component: CustomerVerifyViewComponent },
  { path: "custickets-viewall/:id", component: CusticketsViewallComponent },
  { path: "customer-solutions", component: CustomerSolutionsComponent },
  { path: "customer-fargin-policy/:id", component: CustomerFarginPolicyComponent },
  { path: 'other-payments-success', component: OtherPaymentsSuccessComponent },
  { path: 'otherpayments-failure', component: OtherpaymentsFailureComponent },
  { path: 'customer-otp-verify/:id', component: CustomerOtpVerifyComponent },
  { path: 'customer-survey-view/:id', component: CustomerSurveyViewComponent },
  { path: 'Agreement-signer-two', component: AggrementSignerTwoComponent, },
  { path: 'Additional-pay/:id', component: AdditionalpayViewComponent },
  { path: 'Additional-transactionhistory/:id', component: AdditionaLTransactionhistoryComponent },
  { path: 'success-for-additional', component: SuccessForAdditionalComponent },
  { path: "failure-for-additional", component: FailureForAdditionalComponent },
  { path: "Additional-customerpay-info/:id", component: AdditionalCustomerpayinfoComponent },


  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'content', component: DashboardcontentComponent, canActivate: [authGuard] },
      { path: 'view-admin', component: ViewadminComponent, canActivate: [authGuard] },
      { path: 'add-admin', component: AddadminComponent, canActivate: [authGuard] },
      { path: 'edit-admin/:id', component: EditadminComponent, canActivate: [authGuard] },
      { path: 'view-employee', component: ViewemployeeComponent, canActivate: [authGuard] },
      { path: 'add-employee', component: AddemployeeComponent, canActivate: [authGuard] },
      { path: 'view-terms', component: ViewtermsComponent, canActivate: [authGuard] },
      { path: 'view-disclaimer', component: ViewdisclaimerComponent, canActivate: [authGuard] },
      { path: 'view-privacy', component: ViewprivacyComponent, canActivate: [authGuard] },
      { path: 'view-refund', component: ViewrefundComponent, canActivate: [authGuard] },
      { path: 'view-profile', component: ProfileComponent, canActivate: [authGuard] },
      { path: 'view-email', component: ViewemailverfiyComponent, canActivate: [authGuard] },
      { path: 'view-serviceticket', component: ViewServiceticketComponent, canActivate: [authGuard] },
      { path: 'view-role', component: ViewRoleComponent, canActivate: [authGuard] },
      { path: 'view-customer', component: ViewcustomerComponent, canActivate: [authGuard] },
      { path: 'add-customer', component: AddcustomerComponent, canActivate: [authGuard] },
      { path: 'editcustomer/:id', component: EditcustomerComponent, canActivate: [authGuard] },
      { path: 'personal-view/:id', component: PersonalviewComponent, canActivate: [authGuard] },
      { path: 'setup', component: SetupComponent, canActivate: [authGuard] },
      { path: 'view-withdrawal', component: ViewwithdrawalComponent, canActivate: [authGuard] },
      { path: 'view-serviceticket', component: ViewServiceticketComponent, canActivate: [authGuard] },
      { path: 'add-serviceticket', component: AddServiceticketComponent, canActivate: [authGuard] },
      { path: 'view-role', component: ViewRoleComponent, canActivate: [authGuard] },
      { path: 'view-setupbox', component: ViewSetupboxComponent, canActivate: [authGuard] },
      { path: 'view-beneficiary', component: ViewBeneficiaryComponent, canActivate: [authGuard] },
      { path: 'view-admin', component: ViewadminComponent, canActivate: [authGuard] },
      { path: 'add-admin', component: AddadminComponent, canActivate: [authGuard] },
      { path: 'edit-admin/:id', component: EditadminComponent, canActivate: [authGuard] },
      { path: 'add-beneficiary', component: AddBeneficiaryComponent, canActivate: [authGuard] },
      { path: 'edit-beneficiary/:id', component: EditBeneficiaryComponent, canActivate: [authGuard] },
      { path: 'view-region', component: ViewRegionComponent, canActivate: [authGuard] },
      { path: 'view-route', component: ViewRouteComponent, canActivate: [authGuard] },
      { path: 'view-bulk', component: ViewBulkComponent, canActivate: [authGuard] },
      { path: 'response-bulk', component: ResponseBulkComponent, canActivate: [authGuard] },
      { path: 'transaction-view', component: TransactionViewComponent, canActivate: [authGuard] },
      { path: 'channel-configuration', component: ChannelConfigurationComponent, canActivate: [authGuard] },
      { path: 'plan-configuration', component: PlanConfigurationComponent, canActivate: [authGuard] },
      { path: "lcopviewall", component: LCOPviewallComponent, canActivate: [authGuard] },
      { path: 'lcopadd', component: LCOPAddComponent, canActivate: [authGuard] },
      { path: "lcopview/:id", component: LCOPViewComponent, canActivate: [authGuard] },
      { path: 'customer-viewall', component: CustomerViewallComponent, canActivate: [authGuard] },
      { path: 'viewwithdrawal', component: ViewwithdrawalComponent, canActivate: [authGuard] },
      { path: 'view-onetimetransaction', component: OnetimesetupComponent, canActivate: [authGuard] },
      { path: "plan-configuration-details/:id", component: PlanConfigurationDetailsComponent, canActivate: [authGuard] },
      { path: "Merchant-view", component: MerchantViewallComponent, canActivate: [authGuard] },
      { path: 'channelconfiguration-singleview/:id', component: ChannelconfigurationSingleviewComponent, canActivate: [authGuard] },
      { path: 'setupboxhistory', component: SetupboxHistoryComponent, canActivate: [authGuard] },
      { path: 'customer-bulkresponse', component: CustomerBulkresponseComponent, canActivate: [authGuard] },
      { path: 'viewrenewal', component: ViewrenewalComponent, canActivate: [authGuard] },
      { path: 'setupform', component: SetupformComponent, canActivate: [authGuard] },
      { path: "service-provider-link-viewall", component: ServiceProviderLinkViewallComponent, canActivate: [authGuard] },
      { path: 'plan-particular-setupbox/:id', component: PlanParticularSetupboxComponent, canActivate: [authGuard] },
      { path: 'viewsms', component: ViewsmsComponent, canActivate: [authGuard] },
      { path: 'smshistory', component: SmshistoryComponent, canActivate: [authGuard] },
      { path: 'other-payments-viewall', component: OtherPaymentsViewallComponent, canActivate: [authGuard] },
      { path: 'view-surveyquestions', component: ViewSurveyquestionsComponent, canActivate: [authGuard] },
      { path: 'add-surveyquestions', component: AddSurveyquestionsComponent, canActivate: [authGuard] },
      { path: 'view-customer-response/:id', component: ViewCustomerResponseComponent, canActivate: [authGuard] },
      { path: 'customerresponse-create', component: CustomerresponseCreateComponent, canActivate: [authGuard] },
      { path: 'customerviewroute/:id', component: CustomerviewrouteComponent, canActivate: [authGuard] },
      { path: 'areaviewroute/:id', component: AreaViewComponent, canActivate: [authGuard] },
      { path: 'streetviewroute/:id', component: StreetViewComponent, canActivate: [authGuard] },
      { path: 'allcustomerviewroute/:id', component: AllcustomerrouteComponent, canActivate: [authGuard] },
      { path: 'customertransactionroute/:id', component: CustomertransactionrouteComponent, canActivate: [authGuard] },
      { path: 'admincustomerdetailsroute/:id', component: AdmincustomerdetailsComponent, canActivate: [authGuard] },
      { path: 'admincustomertransactionroute/:id', component: AdmincustomertransactionComponent, canActivate: [authGuard] },
      { path: 'customersdetails/:id', component: PascustomerdetailsComponent, canActivate: [authGuard] },
      { path: 'setupboxhistorys', component: CustomersetupboxhistoryComponent, canActivate: [authGuard] },
      { path: 'admin-view/:id', component: AdminViewComponent, canActivate: [authGuard] },
      { path: 'viewagreements', component: ViewagreementsComponent, canActivate: [authGuard] },
      { path: 'setupboxresponse', component: CustomersetupboxbulkresponseComponent, canActivate: [authGuard] },
      { path: 'setupbox-customerview/:id', component: SetupboxCustomerviewComponent, canActivate: [authGuard] },
      { path: 'offline-transactions', component: OfflineTransactionsComponent, canActivate: [authGuard] },
      { path: 'channel-view/:id', component: PlanConfigurationChannelviewComponent, canActivate: [authGuard] },
      { path: 'view-setupboxreports', component: ViewsetupboxreportsComponent, canActivate: [authGuard] },
      { path: 'view-customerreports', component: ViewcustomerreportsComponent, canActivate: [authGuard] },
      { path: 'view-duesreports', component: ViewduesreportsComponent, canActivate: [authGuard] },
      { path: 'cusduelogsbymerchant', component: CusduelogsbymerchantComponent, canActivate: [authGuard] },
      { path: 'updated-duesdetails', component: UpdatedDuesdetailsComponent, canActivate: [authGuard] },
      { path: 'app-pincode', component: PincodeComponent, canActivate: [authGuard] },
      { path: 'area-viewall', component: AreaViewallComponent, canActivate: [authGuard] },
      { path: 'street-viewall', component: StreetViewallComponent, canActivate: [authGuard] },
      { path: 'setupboxresponse', component: CustomersetupboxbulkresponseComponent, canActivate: [authGuard] },
      { path: 'view-setupboxreports', component: ViewsetupboxreportsComponent, canActivate: [authGuard] },
      { path: 'view-customerreports', component: ViewcustomerreportsComponent, canActivate: [authGuard] },
      { path: 'view-duesreports', component: ViewduesreportsComponent, canActivate: [authGuard] },
      { path: 'view-booking', component: DashboardviewbookingComponent, canActivate: [authGuard] },
      { path: 'view-free', component: DashboardviewfreeComponent, canActivate: [authGuard] },
      { path: 'view-faulty', component: DashboardviewfaultyComponent, canActivate: [authGuard] },
      { path: 'view-active', component: DashboardviewactivecustomerComponent, canActivate: [authGuard] },
      { path: 'view-inactive', component: DashboardviewinactivecustomerComponent, canActivate: [authGuard] },
      { path: 'view-pending', component: DashboardviewpendingcustomerComponent, canActivate: [authGuard] },
      { path: 'view-activecustomer', component: DashboardviewactiveempolyeeComponent, canActivate: [authGuard] },
      { path: 'view-inactivecustomer', component: DashboardviewinactiveemployeeComponent, canActivate: [authGuard] },
      { path: 'category-viewall', component: CategoryViewallComponent, canActivate: [authGuard] },
      { path: 'additional-transactions', component: AdditionalTransactionsComponent, canActivate: [authGuard] },
      {path:'view-openticket',component:DashboardviewopenticketComponent,canActivate:[authGuard]},
      {path:'view-holdticket',component:DashboardviewholdticketComponent,canActivate:[authGuard]},
      {path:'view-closedticket',component:DashboardviewclosedticketComponent,canActivate:[authGuard]},
      {path:'branches-viewall',component:BranchesViewallComponent,canActivate:[authGuard]},
      {path:'branch-customer-view/:id',component:BranchCustomerViewComponent,canActivate:[authGuard]},
      {path:'onstatus',component:OnstatusComponent,canActivate:[authGuard]},
      {path:'offstatus',component:OffstatusComponent,canActivate:[authGuard]},
      {path:'yesterdayonstatus',component:YesterdayonoffstatusComponent,canActivate:[authGuard]},
      {path:'yesterdayoffstatus',component:YesterdayoffstatusComponent,canActivate:[authGuard]},
      {path:'route-bulkresponse',component:RoutebulkresponseComponent,canActivate:[authGuard]},
      {path:'historyforremainder/:id',component:HistoryforreminderComponent,canActivate:[authGuard]},
      {path:'duestatushistory',component:DuestatushistoryComponent,canActivate:[authGuard]},
      {
        path:'booked-customer-view/:id',component:BookedCustomerViewComponent,canActivate:[authGuard]
      },
      {path:'damaged-customer-view/:id',component:DamagedCustomerViewComponent,canActivate:[authGuard]},
      {path:'duestatusoff',component:DuestatusoffdetailsComponent,canActivate:[authGuard]},
      {path:'refund-for-merchant',component:RefundForMerchantComponent,canActivate:[authGuard]},
      {path:'setupbox-history/:id/:id',component:SetupboxHistoryviewComponent,canActivate:[authGuard]},
      {path:'setupbox-history/:id/:id',component:SetupboxHistoryviewComponent,canActivate:[authGuard]},
      {path:'customer-status-history/:id',component:CustomerStatusHistoryComponent,canActivate:[authGuard]},
      {path:'Lcop-Channel/:id',component:LcopchannelviewComponent,canActivate:[authGuard]},

    ],

  },

  // Add a wildcard route for 404
  { path: '**', component: ByRedirectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
