import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './Loading Interceptor/loading.interceptor.spec';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntityLoginpageComponent } from './entity-loginpage/entity-loginpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatCommonModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { AddadminComponent } from './Admin/addadmin/addadmin.component';
import { ViewadminComponent } from './Admin/viewadmin/viewadmin.component';
import { EditadminComponent } from './Admin/editadmin/editadmin.component';
import { ViewemployeeComponent } from './Employee/viewemployee/viewemployee.component';
import { AddemployeeComponent } from './Employee/addemployee/addemployee.component';
import { EditemployeeComponent } from './Employee/editemployee/editemployee.component';
import { ViewtermsComponent } from './Terms & Policy/viewterms/viewterms.component';
import { ViewdisclaimerComponent } from './Terms & Policy/viewdisclaimer/viewdisclaimer.component';
import { ViewprivacyComponent } from './Terms & Policy/viewprivacy/viewprivacy.component';
import { ViewrefundComponent } from './Terms & Policy/viewrefund/viewrefund.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewemailverfiyComponent } from './Verfication/viewemailverfiy/viewemailverfiy.component';
import { OtpemailverfiyComponent } from './Verfication/otpemailverfiy/otpemailverfiy.component';
import { AddServiceticketComponent } from './servicetickets/add-serviceticket/add-serviceticket.component';
import { ViewServiceticketComponent } from './servicetickets/view-serviceticket/view-serviceticket.component';
import { EditServiceticketComponent } from './servicetickets/edit-serviceticket/edit-serviceticket.component';
import { ViewTicketcommentComponent } from './servicetickets/view-ticketcomment/view-ticketcomment.component';
import { ViewTicketdescriptionComponent } from './servicetickets/view-ticketdescription/view-ticketdescription.component';
import { ViewTicketimageComponent } from './servicetickets/view-ticketimage/view-ticketimage.component';
import { ViewRoleComponent } from './Roles-Permission/view-role/view-role.component';
import { AddRoleComponent } from './Roles-Permission/add-role/add-role.component';
import { EditRoleComponent } from './Roles-Permission/edit-role/edit-role.component';

import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ViewcustomerComponent } from './Customer/viewcustomer/viewcustomer.component';
import { PersonalviewComponent } from './Customer/personalview/personalview.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ViewlogoComponent } from './Customer/viewlogo/viewlogo.component';
import { SetupComponent } from './Onetimesetup/setup/setup.component';
import { ReturnsuccessComponent } from './Onetimesetup/returnsuccess/returnsuccess.component';
import { ReturnfailureComponent } from './Onetimesetup/returnfailure/returnfailure.component';
import { DashboardcontentComponent } from './dashboard/dashboardcontent/dashboardcontent.component';
import { ViewwithdrawalComponent } from './Quickwithdrawal/viewwithdrawal/viewwithdrawal.component';
import { AddwithdrawalComponent } from './Quickwithdrawal/addwithdrawal/addwithdrawal.component';

import { AddBeneficiaryComponent } from './Beneficiary/add-beneficiary/add-beneficiary.component';
import { EditBeneficiaryComponent } from './Beneficiary/edit-beneficiary/edit-beneficiary.component';
import { ViewBeneficiaryComponent } from './Beneficiary/view-beneficiary/view-beneficiary.component';
import { AddSetupboxComponent } from './main-master/setupbox/add-setupbox/add-setupbox.component';
import { ViewSetupboxComponent } from './main-master/setupbox/view-setupbox/view-setupbox.component';
import { EditSetupboxComponent } from './main-master/setupbox/edit-setupbox/edit-setupbox.component';
import { ViewRouteComponent } from './main-master/route/view-route/view-route.component';
import { AddRouteComponent } from './main-master/route/add-route/add-route.component';
import { EditRouteComponent } from './main-master/route/edit-route/edit-route.component';
import { ViewRegionComponent } from './main-master/region/view-region/view-region.component';
import { TransactionViewComponent } from './Transaction/transaction-view/transaction-view.component';
import { TransactionViewbyidComponent } from './Transaction/transaction-viewbyid/transaction-viewbyid.component';
import { ChannelConfigurationComponent } from './Channels-Packages/channel-configuration/channel-configuration.component';
import { PlanConfigurationComponent } from './Channels-Packages/plan-configuration/plan-configuration.component';
import { LCOPviewallComponent } from './Channels-Packages/LCOP-Plan-creation/lcopviewall/lcopviewall.component';
import { LCOPAddComponent } from './Channels-Packages/LCOP-Plan-creation/lcopadd/lcopadd.component';
import { LCOPViewComponent } from './Channels-Packages/LCOP-Plan-creation/lcopview/lcopview.component';
import { SearchPipe } from './search.pipe';
import { LcopChannelListComponent } from './Channels-Packages/LCOP-Plan-creation/lcop-channel-list/lcop-channel-list.component';
import { MobileVerficationComponent } from './Customer Transtions/mobile-verfication/mobile-verfication.component';
import { CustomerPaymentsViewComponent } from './Customer Transtions/customer-payments-view/customer-payments-view.component';
import { CustomerPaymentsInfoComponent } from './Customer Transtions/customer-payments-info/customer-payments-info.component';
import { CustomerPaymentSuccessComponent } from './Customer Transtions/customer-payment-success/customer-payment-success.component';
import { CustomerPaymentFailureComponent } from './Customer Transtions/customer-payment-failure/customer-payment-failure.component';
import { CreateBulkComponent } from './main-master/setupbox/setupbox-bulkupload/create-bulk/create-bulk.component';
import { ResponseBulkComponent } from './main-master/setupbox/setupbox-bulkupload/response-bulk/response-bulk.component';
import { ViewBulkComponent } from './main-master/setupbox/setupbox-bulkupload/view-bulk/view-bulk.component';
import { StreetViewComponent } from './main-master/route/street-view/street-view.component';
import { AreaViewComponent } from './main-master/route/area-view/area-view.component';
import { AddcustomerComponent } from './Customer/addcustomer/addcustomer.component';
import { OtpmobileverifyComponent } from './Verfication/otpmobileverify/otpmobileverify.component';
import { ViewPermissionComponent } from './Roles-Permission/view-permission/view-permission.component';
import { ViewSubpermissionComponent } from './Roles-Permission/view-subpermission/view-subpermission.component';
import { OnetimesetupComponent } from './Transaction/onetimesetup/onetimesetup.component';
import { PlanConfigurationDetailsComponent } from './Channels-Packages/plan-configuration-details/plan-configuration-details.component';
import { TestPageComponent } from './test-page/test-page.component';
import { EditcustomerComponent } from './Customer/editcustomer/editcustomer.component';
import { ChannelViewComponent } from './Customer/channel-view/channel-view.component';
import { MerchantViewallComponent } from './Merchant-Dues/merchant-viewall/merchant-viewall.component';
import { MerchantViewbyidComponent } from './Merchant-Dues/merchant-viewbyid/merchant-viewbyid.component';
import { MerchantduesFailureComponent } from './Merchant-Dues/merchantdues-failure/merchantdues-failure.component';
import { MerchantduesSuccessComponent } from './Merchant-Dues/merchantdues-success/merchantdues-success.component';
import { ChannelconfigurationSingleviewComponent } from './Channels-Packages/channelconfiguration-singleview/channelconfiguration-singleview.component';
import { LcopEditComponent } from './Channels-Packages/LCOP-Plan-creation/lcop-edit/lcop-edit.component';
import { TransactionManualpayComponent } from './Transaction/transaction-manualpay/transaction-manualpay.component';
import { CustomerPrivacyPolicyComponent } from './Customer Transtions/customer-privacy-policy/customer-privacy-policy.component';
import { CustomerDisclaimerComponent } from './Customer Transtions/customer-disclaimer/customer-disclaimer.component';
import { CustomerRefundPolicyComponent } from './Customer Transtions/customer-refund-policy/customer-refund-policy.component';
import { CustomerTermsandpolicyComponent } from './Customer Transtions/customer-termsandpolicy/customer-termsandpolicy.component';
import { CustomerTransactionviewsComponent } from './Customer Transtions/customer-transactionviews/customer-transactionviews.component';
import { CustomerTransactionIndividualviewComponent } from './Customer Transtions/customer-transaction-individualview/customer-transaction-individualview.component';
import { CusticketsViewallComponent } from './Customer Transtions/customer Tickets/custickets-viewall/custickets-viewall.component';
import { CusTicketeCreateComponent } from './Customer Transtions/customer Tickets/cus-tickete-create/cus-tickete-create.component';
import { CusTicketEditComponent } from './Customer Transtions/customer Tickets/cus-ticket-edit/cus-ticket-edit.component';
import { CustomerSolutionsComponent } from './Customer Transtions/customer-solutions/customer-solutions.component';
import { CustomerFarginPolicyComponent } from './Customer Transtions/customer-fargin-policy/customer-fargin-policy.component';
import { ByRedirectComponent } from './by-redirect/by-redirect.component';
import { SetupboxHistoryComponent } from './Customer/setupbox-history/setupbox-history.component';
import { CustLogoComponent } from './Customer Transtions/customer Tickets/cust-logo/cust-logo.component';
import { CustomerViewallComponent } from './servicetickets/customer-viewall/customer-viewall.component';
import { CustomerTicketraiseComponent } from './servicetickets/customer-ticketraise/customer-ticketraise.component';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { AddAlcotComponent } from './Customer/add-alcot/add-alcot.component';
import { BouquetaddComponent } from './Customer/bouquetadd/bouquetadd.component';
import { LcopaddComponent } from './Customer/lcopadd/lcopadd.component';
import { CustomerDiscriptionComponent } from './Customer Transtions/customer-discription/customer-discription.component';
import { ViewDiscriptioncustomerComponent } from './servicetickets/view-discriptioncustomer/view-discriptioncustomer.component';
import { MatBadgeModule } from '@angular/material/badge';
import { OtherPaymentsViewallComponent } from './Other Payments/other-payments-viewall/other-payments-viewall.component';
import { OtherPaymentsSuccessComponent } from './Other Payments/other-payments-success/other-payments-success.component';
import { OtherpaymentsFailureComponent } from './Other Payments/otherpayments-failure/otherpayments-failure.component';
import { ReturnDuesComponent } from './Transaction/return-dues/return-dues.component';
import { CustomerBulkuploadComponent } from './Customer/customer-bulkupload/customer-bulkupload.component';
import { CustomerBulkresponseComponent } from './Customer/customer-bulkresponse/customer-bulkresponse.component';
import { ViewrenewalComponent } from './Renewal/viewrenewal/viewrenewal.component';
import { RenewaltransactiondetailsComponent } from './Renewal/renewaltransactiondetails/renewaltransactiondetails.component';
import { ReturnrewealfailureComponent } from './Renewal/returnrewealfailure/returnrewealfailure.component';
import { ReturnrewealsuccessComponent } from './Renewal/returnrewealsuccess/returnrewealsuccess.component';
import { SetupformComponent } from './Renewal/setupform/setupform.component';
import { AddsettopboxPlanComponent } from './Customer/addsettopbox-plan/addsettopbox-plan.component';
import { ServiceProviderLinkViewallComponent } from './Service Provide Link/service-provider-link-viewall/service-provider-link-viewall.component';
import { CustomerOtpVerifyComponent } from './Customer Transtions/customer-otp-verify/customer-otp-verify.component';
import { CustomerStatusComponent } from './Customer/customer-status/customer-status.component';
import { AddSetupboxPlanComponent } from './Customer/add-setupbox-plan/add-setupbox-plan.component';
import { PlanParticularSetupboxComponent } from './Customer/plan-particular-setupbox/plan-particular-setupbox.component';
import { SmshistoryComponent } from './SMSDetails/smshistory/smshistory.component';
import { SmsviewhistoryComponent } from './SMSDetails/smsviewhistory/smsviewhistory.component';
import { SmsapprovalComponent } from './SMSDetails/viewsms/smsapproval/smsapproval.component';
import { ViewsmsComponent } from './SMSDetails/viewsms/viewsms.component';
import { CustomerresponseCreateComponent } from './CustomerResponse/customerresponse-create/customerresponse-create.component';
import { ViewCustomerResponseComponent } from './CustomerResponse/view-customer-response/view-customer-response.component';
import { AddSurveyquestionsComponent } from './Servey/add-surveyquestions/add-surveyquestions.component';
import { UpdateSurveyquestionsComponent } from './Servey/update-surveyquestions/update-surveyquestions.component';
import { ViewQuestionsComponent } from './Servey/view-questions/view-questions.component';
import { ViewSurveyquestionsComponent } from './Servey/view-surveyquestions/view-surveyquestions.component';
import { CustomersurveyIndividualviewComponent } from './Customer Transtions/Customersurvey/customersurvey-individualview/customersurvey-individualview.component';
import { CustomerSurveyViewComponent } from './Customer Transtions/Customersurvey/customer-survey-view/customer-survey-view.component';
import { ServicecustomerTicketImageComponent } from './servicetickets/servicecustomer-ticket-image/servicecustomer-ticket-image.component';
import { OtherpayViewComponent } from './Other Payments/otherpay-view/otherpay-view.component';
import { CustomerviewrouteComponent } from './main-master/route/customerviewroute/customerviewroute.component';
import { ExtraaddrouteComponent } from './main-master/route/extraaddroute/extraaddroute.component';
import { AllcustomerrouteComponent } from './main-master/route/allcustomerroute/allcustomerroute.component';
import { ExtraareaComponent } from './main-master/route/extraarea/extraarea.component';
import { ExtrastreetComponent } from './main-master/route/extrastreet/extrastreet.component';
import { ExtracustomerComponent } from './main-master/route/extracustomer/extracustomer.component';
import { CustomertransactionrouteComponent } from './main-master/route/customertransactionroute/customertransactionroute.component';
import { AdmincustomerdetailsComponent } from './main-master/route/admincustomerdetails/admincustomerdetails.component';
import { AdmincustomertransactionComponent } from './main-master/route/admincustomertransaction/admincustomertransaction.component';
import { PascustomerdetailsComponent } from './main-master/route/pascustomerdetails/pascustomerdetails.component';
import { CustomersetupboxhistoryComponent } from './Customer/customersetupboxhistory/customersetupboxhistory.component';
import { AggrementSignerTwoComponent } from './aggrement-signer-two/aggrement-signer-two.component';
import { AdminViewComponent } from './Admin/admin-view/admin-view.component';
import { ViewagreementsComponent } from './Agreement/viewagreements/viewagreements.component';
import { AggrementSignerTwoOtpComponent } from './aggrement-signer-two-otp/aggrement-signer-two-otp.component';
import { AggrementLocationTwoTrackerComponent } from './aggrement-location-two-tracker/aggrement-location-two-tracker.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CustomersetupboxbulkresponseComponent } from './Customer/customersetupboxbulkresponse/customersetupboxbulkresponse.component';
import { CustomerextrasetupboxbulkComponent } from './Customer/customerextrasetupboxbulk/customerextrasetupboxbulk.component';
import { SetupboxCustomerviewComponent } from './main-master/setupbox/setupbox-bulkupload/setupbox-customerview/setupbox-customerview.component';
import { FinalPaymentComponent } from './Customer Transtions/final-payment/final-payment.component';
import { FailureTransactionsComponent } from './Offline-Transaction/failure-transactions/failure-transactions.component';
import { OfflineTransactionsComponent } from './Offline-Transaction/offline-transactions/offline-transactions.component';
import { SuccessTransactionsComponent } from './Offline-Transaction/success-transactions/success-transactions.component';
import { CusduelogsbymerchantComponent } from './Transaction/cusduelogsbymerchant/cusduelogsbymerchant.component';
import { UpdateCusduesComponent } from './Transaction/update-cusdues/update-cusdues.component';
import { UpdatedDuesdetailsComponent } from './Transaction/updated-duesdetails/updated-duesdetails.component';
import { PlanConfigurationChannelviewComponent } from './Channels-Packages/plan-configuration-channelview/plan-configuration-channelview/plan-configuration-channelview.component';
import { SuccessForAdditionalComponent } from './Customer Transtions/success-for-additional/success-for-additional.component';
import { FailureForAdditionalComponent } from './Customer Transtions/failure-for-additional/failure-for-additional.component';
import { ManuvalpayWithoutOtpComponent } from './Transaction/manuvalpay-without-otp/manuvalpay-without-otp.component';
import { StbStatusComponent } from './main-master/setupbox/setupbox-bulkupload/stb-status/stb-status.component';
import { ViewsetupboxreportsComponent } from './Reports/Setupboxreports/viewsetupboxreports/viewsetupboxreports.component';
import { ViewcustomerreportsComponent } from './Reports/Customerreports/viewcustomerreports/viewcustomerreports.component';
import { ViewduesreportsComponent } from './Reports/Duesreports/viewduesreports/viewduesreports.component';
import { AreaViewallComponent } from './main-master/Area/area-viewall/area-viewall.component';
import { CreateAreaComponent } from './main-master/Area/create-area/create-area.component';
import { EditAreaComponent } from './main-master/Area/edit-area/edit-area.component';
import { CreatePincodeComponent } from './main-master/Pincode/create-pincode/create-pincode.component';
import { EditPincodeComponent } from './main-master/Pincode/edit-pincode/edit-pincode.component';
import { PincodeViewComponent } from './main-master/Pincode/pincode-view/pincode-view.component';
import { PincodeComponent } from './main-master/Pincode/pincode/pincode.component';
import { EditStreetComponent } from './main-master/Street/edit-street/edit-street.component';
import { StreetCreateComponent } from './main-master/Street/street-create/street-create.component';
import { StreetViewallComponent } from './main-master/Street/street-viewall/street-viewall.component';
import { SMSDescriptionComponent } from './SMSDetails/smsdescription/smsdescription.component';
import { ViewReasonComponent } from './Transaction/view-reason/view-reason.component';

import { DashboardviewbookingComponent } from './dashboard/dashboardviewbooking/dashboardviewbooking.component';
import { DashboardviewfreeComponent } from './dashboard/dashboardviewfree/dashboardviewfree.component';
import { DashboardviewfaultyComponent } from './dashboard/dashboardviewfaulty/dashboardviewfaulty.component';
import { DashboardviewactivecustomerComponent } from './dashboard/dashboardviewactivecustomer/dashboardviewactivecustomer.component';
import { DashboardviewinactivecustomerComponent } from './dashboard/dashboardviewinactivecustomer/dashboardviewinactivecustomer.component';
import { DashboardviewpendingcustomerComponent } from './dashboard/dashboardviewpendingcustomer/dashboardviewpendingcustomer.component';
import { DashboardviewactiveempolyeeComponent } from './dashboard/dashboardviewactiveempolyee/dashboardviewactiveempolyee.component';
import { DashboardviewinactiveemployeeComponent } from './dashboard/dashboardviewinactiveemployee/dashboardviewinactiveemployee.component';
import { AdditinalFinalpayComponent } from './Customer Transtions/Additional-Payment-transaction/additinal-finalpay/additinal-finalpay.component';
import { AdditionalCustomerpayinfoComponent } from './Customer Transtions/Additional-Payment-transaction/additional-customerpayinfo/additional-customerpayinfo.component';
import { AdditionalpayViewComponent } from './Customer Transtions/Additional-Payment-transaction/additionalpay-view/additionalpay-view.component';
import { AdditionaLTransactionhistoryComponent } from './Customer Transtions/Additional-Payment-transaction/additional-transactionhistory/additiona-l-transactionhistory.component';
import { AdditionaltransactionIndividualviewComponent } from './Customer Transtions/Additional-Payment-transaction/additionaltransaction-individualview/additionaltransaction-individualview.component';
import { AddCategoryComponent } from './main-master/Category/add-category/add-category.component';
import { CategoryViewallComponent } from './main-master/Category/category-viewall/category-viewall.component';
import { UpdateCategoryComponent } from './main-master/Category/update-category/update-category.component';
import { CreateAdditionalComponent } from './Customer/Additional-Payments/create-additional/create-additional.component';
import { UpdateAdditionalComponent } from './Customer/Additional-Payments/update-additional/update-additional.component';
import { AdditionalTransactionsComponent } from './Additional-Transactions/additional-transactions/additional-transactions.component';
import { AdditionalPayviewComponent } from './Additional-Transactions/additional-payview/additional-payview.component';
import { DashboardviewopenticketComponent } from './dashboard/dashboardviewopenticket/dashboardviewopenticket.component';
import { DashboardviewclosedticketComponent } from './dashboard/dashboardviewclosedticket/dashboardviewclosedticket.component';
import { DashboardviewholdticketComponent } from './dashboard/dashboardviewholdticket/dashboardviewholdticket.component';
import { ManualduesgenerateComponent } from './Customer/manualduesgenerate/manualduesgenerate.component';
import { BranchesViewallComponent } from './Branches/branches-viewall/branches-viewall.component';
import { BranchesIndividualViewComponent } from './Branches/branches-individual-view/branches-individual-view.component';
import { EditcustomerSetupboxComponent } from './Customer/editcustomer-setupbox/editcustomer-setupbox.component';
import { BranchCustomerIndividualviewComponent } from './Branches/branch-customer-individualview/branch-customer-individualview.component';
import { BranchCustomerViewComponent } from './Branches/branch-customer-view/branch-customer-view.component';
import { InactiveStatusComponent } from './Customer/inactive-status/inactive-status.component';
import { RemainderstatusComponent } from './Customer/remainderstatus/remainderstatus.component';
import { DuestatusonoffComponent } from './Customer/duestatusonoff/duestatusonoff.component';
import { OnstatusComponent } from './dashboard/onstatus/onstatus.component';
import { OffstatusComponent } from './dashboard/offstatus/offstatus.component';
import { YesterdayoffstatusComponent } from './dashboard/yesterdayoffstatus/yesterdayoffstatus.component';
import { YesterdayonoffstatusComponent } from './dashboard/yesterdayonoffstatus/yesterdayonoffstatus.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateroutebulkComponent } from './main-master/route/createroutebulk/createroutebulk.component';
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
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


export function HttpLoaderFactory(http: HttpClient) { return new TranslateHttpLoader(http, './assets/Translate/', '.json'); }


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SpinnerComponent,
    DashboardComponent,
    EntityLoginpageComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    OtpPageComponent,
    ChangePasswordComponent,
    AddadminComponent,
    ViewadminComponent,
    EditadminComponent,
    ViewemployeeComponent,
    AddemployeeComponent,
    EditemployeeComponent,
    ViewtermsComponent,
    ViewdisclaimerComponent,
    ViewprivacyComponent,
    ViewrefundComponent,
    ProfileComponent,
    ViewemailverfiyComponent,
    OtpemailverfiyComponent,
    AddServiceticketComponent,
    ViewServiceticketComponent,
    EditServiceticketComponent,
    ViewTicketimageComponent,
    ViewTicketcommentComponent,
    ViewTicketdescriptionComponent,
    ViewRoleComponent,
    AddRoleComponent,
    EditRoleComponent,
    ViewcustomerComponent,
    PersonalviewComponent,
    ViewlogoComponent,
    SetupComponent,
    ReturnsuccessComponent,
    ReturnfailureComponent,
    DashboardcontentComponent,
    ViewwithdrawalComponent,
    AddwithdrawalComponent,
    AddBeneficiaryComponent,
    ViewBeneficiaryComponent,
    EditBeneficiaryComponent,
    AddSetupboxComponent,
    ViewSetupboxComponent,
    EditSetupboxComponent,
    ViewRouteComponent,
    AddRouteComponent,
    EditRouteComponent,
    ViewRegionComponent,
    TransactionViewComponent,
    TransactionViewbyidComponent,
    ChannelConfigurationComponent,
    PlanConfigurationComponent,
    LCOPviewallComponent,
    LCOPAddComponent,
    LCOPViewComponent,
    SearchPipe,
    LcopChannelListComponent,
    MobileVerficationComponent,
    CustomerPaymentsViewComponent,
    CustomerPaymentsInfoComponent,
    CustomerPaymentSuccessComponent,
    CustomerPaymentFailureComponent,
    CreateBulkComponent,
    ResponseBulkComponent,
    ViewBulkComponent,
    StreetViewComponent,
    AreaViewComponent,
    AddcustomerComponent,
    OtpmobileverifyComponent,
    ViewPermissionComponent,
    ViewSubpermissionComponent,
    ViewwithdrawalComponent,
    AddwithdrawalComponent,
    OnetimesetupComponent,
    PlanConfigurationDetailsComponent,
    TestPageComponent,
    EditcustomerComponent,
    ChannelViewComponent,
    MerchantViewallComponent,
    MerchantViewbyidComponent,
    MerchantduesFailureComponent,
    MerchantduesSuccessComponent,
    ChannelconfigurationSingleviewComponent,
    LcopEditComponent,
    TransactionManualpayComponent,
    CustomerTermsandpolicyComponent,
    CustomerPrivacyPolicyComponent,
    CustomerRefundPolicyComponent,
    CustomerDisclaimerComponent,
    CustomerTransactionviewsComponent,
    CustomerTransactionIndividualviewComponent,
    CusticketsViewallComponent,
    CusTicketeCreateComponent,
    CusTicketEditComponent,
    CustomerSolutionsComponent,
    CustomerFarginPolicyComponent,
    ByRedirectComponent,
    SetupboxHistoryComponent,
    CustLogoComponent,
    CustomerViewallComponent,
    CustomerTicketraiseComponent,
    ProfileViewComponent,
    AddAlcotComponent,
    ReturnDuesComponent,
    BouquetaddComponent,
    LcopaddComponent,
    CustomerDisclaimerComponent,
    CustomerDiscriptionComponent,
    ViewDiscriptioncustomerComponent,
    OtherPaymentsViewallComponent,
    OtherPaymentsSuccessComponent,
    OtherpaymentsFailureComponent,
    CustomerBulkuploadComponent,
    CustomerBulkresponseComponent,
    ViewrenewalComponent,
    SetupformComponent,
    ReturnrewealsuccessComponent,
    ReturnrewealfailureComponent,
    RenewaltransactiondetailsComponent,
    AddsettopboxPlanComponent,
    ServiceProviderLinkViewallComponent,
    CustomerOtpVerifyComponent,
    CustomerStatusComponent,
    AddSetupboxPlanComponent,
    PlanParticularSetupboxComponent,
    ViewsmsComponent,
    SmsapprovalComponent,
    SmsviewhistoryComponent,
    SmshistoryComponent,
    AddSurveyquestionsComponent,
    ViewSurveyquestionsComponent,
    UpdateSurveyquestionsComponent,
    ViewQuestionsComponent,
    CustomerresponseCreateComponent,
    ViewCustomerResponseComponent,
    CustomerSurveyViewComponent,
    CustomersurveyIndividualviewComponent,
    ServicecustomerTicketImageComponent,
    OtherpayViewComponent,
    CustomerviewrouteComponent,
    ExtraaddrouteComponent,
    AllcustomerrouteComponent,
    ExtraareaComponent,
    ExtrastreetComponent,
    ExtracustomerComponent,
    CustomertransactionrouteComponent,
    AdmincustomerdetailsComponent,
    AdmincustomertransactionComponent,
    PascustomerdetailsComponent,
    AdminViewComponent,
    CustomersetupboxhistoryComponent,
    AggrementSignerTwoComponent,
    ViewagreementsComponent,
    AggrementSignerTwoOtpComponent,
    AggrementLocationTwoTrackerComponent,
    CustomersetupboxbulkresponseComponent,
    CustomerextrasetupboxbulkComponent,
    SetupboxCustomerviewComponent,
    FinalPaymentComponent,
    OfflineTransactionsComponent,
    FailureTransactionsComponent,
    SuccessTransactionsComponent,
    CusduelogsbymerchantComponent,
    UpdateCusduesComponent,
    UpdatedDuesdetailsComponent,
    PlanConfigurationChannelviewComponent,
    SuccessForAdditionalComponent,
    FailureForAdditionalComponent,
    ManuvalpayWithoutOtpComponent,
    StbStatusComponent,
    ViewsetupboxreportsComponent,
    ViewcustomerreportsComponent,
    ViewduesreportsComponent,
    PincodeComponent,
    CreatePincodeComponent,
    EditPincodeComponent,
    CreateAreaComponent,
    AreaViewallComponent,
    EditAreaComponent,
    StreetViewallComponent,
    StreetCreateComponent,
    EditStreetComponent,
    PincodeViewComponent,
    SMSDescriptionComponent,
    ViewReasonComponent,
    DashboardviewbookingComponent,
    DashboardviewfreeComponent,
    DashboardviewfaultyComponent,
    DashboardviewactivecustomerComponent,
    DashboardviewinactivecustomerComponent,
    DashboardviewpendingcustomerComponent,
    DashboardviewactiveempolyeeComponent,
    DashboardviewinactiveemployeeComponent,
    AdditinalFinalpayComponent,
    AdditionalCustomerpayinfoComponent,
    AdditionalpayViewComponent,
    AdditionaLTransactionhistoryComponent,
    AdditionaltransactionIndividualviewComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    CategoryViewallComponent,
    CreateAdditionalComponent,
    UpdateAdditionalComponent,
    AdditionalTransactionsComponent,
    AdditionalPayviewComponent,
    DashboardviewopenticketComponent,
    DashboardviewclosedticketComponent,
    DashboardviewholdticketComponent,
    InactiveStatusComponent,
    ManualduesgenerateComponent,
    BranchesViewallComponent,
    BranchesIndividualViewComponent,
    EditcustomerSetupboxComponent,
    BranchCustomerIndividualviewComponent,
    BranchCustomerViewComponent,
    RemainderstatusComponent,
    DuestatusonoffComponent,
    OnstatusComponent,
    OffstatusComponent,
    YesterdayonoffstatusComponent,
    YesterdayoffstatusComponent,
    CreateroutebulkComponent,
    RoutebulkresponseComponent,
    HistoryforreminderComponent,
    DuestatushistoryComponent,
    BookedCustomerViewComponent,
    DamagedCustomerViewComponent,
    DuestatusoffdetailsComponent,
    RefundForMerchantComponent,
    SetupboxHistoryviewComponent,
    CustomerStatusHistoryComponent,
    LcopchannelviewComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader:
      {
        provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]

      }
    }),
    PdfViewerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    NgxPaginationModule,
    MatChipsModule,
    MatCommonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatPaginatorModule,
    MatInputModule,
    MatToolbarModule,
    MatStepperModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    NgxPaginationModule,
    FilterPipeModule,
    MatBadgeModule,
    MatDialogModule,
    MatTooltipModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
