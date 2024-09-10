import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './Loading Interceptor/loading.interceptor.spec';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatMenuModule } from '@angular/material/menu';
import { TestpageComponent } from './testpage/testpage.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
import { ViewcategoryComponent } from './Main Master/businesscategory/viewcategory/viewcategory.component';
import { AddcategoryComponent } from './Main Master/businesscategory/addcategory/addcategory.component';
import { EditcategoryComponent } from './Main Master/businesscategory/editcategory/editcategory.component';
import { ViewticketComponent } from './Tickets/viewticket/viewticket.component';
import { AddticketComponent } from './Tickets/addticket/addticket.component';
import { EditticketComponent } from './Tickets/editticket/editticket.component';
import { ViewCommentComponent } from './Tickets/view-comment/view-comment.component';
import { ViewDescriptionComponent } from './Tickets/view-description/view-description.component';
import { TicketImageComponent } from './Tickets/ticket-image/ticket-image.component';
import { AddRoleComponent } from './Roles-Permission/add-role/add-role.component';
import { ViewRoleComponent } from './Roles-Permission/view-role/view-role.component';
import { EditRoleComponent } from './Roles-Permission/edit-role/edit-role.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BusinessKycComponent } from './Main Master/businesscategory/business-kyc/business-kyc.component';
import { BusinessKycCreateComponent } from './Main Master/businesscategory/business-kyc/business-kyc-create/business-kyc-create.component';
import { BusinessKycEditComponent } from './Main Master/businesscategory/business-kyc/business-kyc-edit/business-kyc-edit.component';
import { PermissionComponent } from './RolesandPermission/RolePermission/permission/permission.component';
import { SubPermissionComponent } from './RolesandPermission/RolePermission/sub-permission/sub-permission.component';
import { EntityViewallComponent } from './Entity Onboard/entity-viewall/entity-viewall.component';
import { EntityAddComponent } from './Entity Onboard/entity-add/entity-add.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { EntityViewComponent } from './Entity Onboard/entity-view/entity-view.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminCreateComponent } from './Admin-policy/admin-create/admin-create.component';
import { AdminViewComponent } from './Admin-policy/admin-view/admin-view.component';
import { AdminTermsConditionComponent } from './Admin-policy/admin-terms-condition/admin-terms-condition.component';
import { AdminDisclaimerComponent } from './Admin-policy/admin-disclaimer/admin-disclaimer.component';
import { AdminPrivacypolicyComponent } from './Admin-policy/admin-privacypolicy/admin-privacypolicy.component';
import { AdminRefundpolicyComponent } from './Admin-policy/admin-refundpolicy/admin-refundpolicy.component';
import { MatSelectModule } from '@angular/material/select';
import { PolicyEditComponent } from './Admin-policy/policy-edit/policy-edit.component';
import { AdminComponent } from './Admin-Creation/admin/admin.component';
import { AdminAddComponent } from './Admin-Creation/admin-add/admin-add.component';
import { ApprovalForBankComponent } from './Entity Onboard/approval-for-bank/approval-for-bank.component';
import { CommentsForApprovalComponent } from './Entity Onboard/comments-for-approval/comments-for-approval.component';
import { RegionComponent } from './Main Master/region/region.component';
import { RegionAddComponent } from './Main Master/region/region-add/region-add.component';
import { RegionEditComponent } from './Main Master/region/region-edit/region-edit.component';
import { ServiceProviderComponent } from './Main Master/ServiceProvider/service-provider/service-provider.component';
import { ServiceproviderAddComponent } from './Main Master/ServiceProvider/serviceprovider-add/serviceprovider-add.component';
import { ServiceproviderEditComponent } from './Main Master/ServiceProvider/serviceprovider-edit/serviceprovider-edit.component';
import { AdmincreationViewComponent } from './Admin-Creation/admincreation-view/admincreation-view.component';
import { AdminEditComponent } from './Admin-Creation/admin-edit/admin-edit.component';
import { AddfacheckkeyComponent } from './Main Master/Facheckkeys/addfacheckkey/addfacheckkey.component';
import { EditfacheckkeyComponent } from './Main Master/Facheckkeys/editfacheckkey/editfacheckkey.component';
import { ViewfacheckkeyComponent } from './Main Master/Facheckkeys/viewfacheckkey/viewfacheckkey.component';
import { AlacarteViewallComponent } from './Plan Creation/Alacarte channels/alacarte-viewall/alacarte-viewall.component';
import { AlcartAddComponent } from './Plan Creation/Alacarte channels/alcart-add/alcart-add.component';
import { AlcartViewComponent } from './Plan Creation/Alacarte channels/alcart-view/alcart-view.component';
import { AlcartEditComponent } from './Plan Creation/Alacarte channels/alcart-edit/alcart-edit.component';
import { AlcartLogoViewComponent } from './Plan Creation/Alacarte channels/alcart-logo-view/alcart-logo-view.component';
import { BouquatenameViewallComponent } from './Plan Creation/Bouquetname Creation/bouquatename-viewall/bouquatename-viewall.component';
import { BouquateNameAddComponent } from './Plan Creation/Bouquetname Creation/bouquate-name-add/bouquate-name-add.component';
import { BouquatenameEditComponent } from './Plan Creation/Bouquetname Creation/bouquatename-edit/bouquatename-edit.component';
import { BouquetsViewallComponent } from './Plan Creation/Broadcaster Bouqutes/bouquets-viewall/bouquets-viewall.component';
import { BouqutesAddComponent } from './Plan Creation/Broadcaster Bouqutes/bouqutes-add/bouqutes-add.component';
import { BouqetsEditComponent } from './Plan Creation/Broadcaster Bouqutes/bouqets-edit/bouqets-edit.component';
import { BouqutesViewComponent } from './Plan Creation/Broadcaster Bouqutes/bouqutes-view/bouqutes-view.component';
import { DPOViewallComponent } from './Plan Creation/DPO Bouquet Creation/dpoviewall/dpoviewall.component';
import { KycApprovalComponent } from './Entity Onboard/kyc-approval/kyc-approval.component';
import { KycdocumentViewComponent } from './Entity Onboard/kycdocument-view/kycdocument-view.component';
import { KycCommentsComponent } from './Entity Onboard/kyc-comments/kyc-comments.component';
import { AddKycdocumentComponent } from './Entity Onboard/add-kycdocument/add-kycdocument.component';
import { EditKycdocumentComponent } from './Entity Onboard/edit-kycdocument/edit-kycdocument.component';
import { CommentsforApprovaloneComponent } from './Entity Onboard/commentsfor-approvalone/commentsfor-approvalone.component';
import { CommentsforApprovaltwoComponent } from './Entity Onboard/commentsfor-approvaltwo/commentsfor-approvaltwo.component';
import { LevelOneApprovalComponent } from './Entity Onboard/level-one-approval/level-one-approval.component';
import { LevelTwoApprovalComponent } from './Entity Onboard/level-two-approval/level-two-approval.component';
import { EntityBankaddComponent } from './Entity Onboard/entity-bankadd/entity-bankadd.component';
import { EntityBankeditComponent } from './Entity Onboard/entity-bankedit/entity-bankedit.component';
import { BankInfoComponent } from './Entity Onboard/bank-info/bank-info.component';
import { KycInfoComponent } from './Entity Onboard/kyc-info/kyc-info.component';
import { BouquetePlanViewallComponent } from './Plan Creation/Bouquete plan Name/bouquete-plan-viewall/bouquete-plan-viewall.component';
import { BouquetenameAddComponent } from './Plan Creation/Bouquete plan Name/bouquetename-add/bouquetename-add.component';
import { BouquetenameEditComponent } from './Plan Creation/Bouquete plan Name/bouquetename-edit/bouquetename-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SpinnerComponent,
    DashboardComponent,
    TestpageComponent,
    ViewcategoryComponent,
    AddcategoryComponent,
    EditcategoryComponent,
    ViewticketComponent,
    AddticketComponent,
    EditticketComponent,
    BusinessKycComponent,
    BusinessKycCreateComponent,
    BusinessKycEditComponent,
    PermissionComponent,
    SubPermissionComponent,
    EntityViewallComponent,
    EntityAddComponent,
    DashboardContentComponent,
    EntityViewComponent,
    ForgotPasswordComponent,
    OtpVerificationComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    AdminCreateComponent,
    PolicyEditComponent,
    AdminViewComponent,
    AdminTermsConditionComponent,
    AdminDisclaimerComponent,
    AdminPrivacypolicyComponent,
    AdminRefundpolicyComponent,
    ViewCommentComponent,
    ViewDescriptionComponent,
    TicketImageComponent,
    AddRoleComponent,
    ViewRoleComponent,
    EditRoleComponent,
    AdminComponent,
    AdminAddComponent,
    AdminEditComponent,
    AdminViewComponent,
    ApprovalForBankComponent,
    CommentsForApprovalComponent,
    RegionComponent,
    RegionAddComponent,
    RegionEditComponent,
    ServiceProviderComponent,
    ServiceproviderAddComponent,
    ServiceproviderEditComponent,
    AdmincreationViewComponent,
    AddfacheckkeyComponent,
    EditfacheckkeyComponent,
    ViewfacheckkeyComponent,
    AlacarteViewallComponent,
    AlcartAddComponent,
    AlcartViewComponent,
    AlcartEditComponent,
    AlcartLogoViewComponent,
    BouquatenameViewallComponent,
    BouquateNameAddComponent,
    BouquatenameEditComponent,
    BouquetsViewallComponent,
    BouqutesAddComponent,
    BouqetsEditComponent,
    BouqutesViewComponent,
    DPOViewallComponent,
    ApprovalForBankComponent,
    CommentsForApprovalComponent,
    KycApprovalComponent,
    KycdocumentViewComponent,
    KycCommentsComponent,
    AddKycdocumentComponent,
    EditKycdocumentComponent,
    CommentsforApprovaloneComponent,
    CommentsforApprovaltwoComponent,
    LevelOneApprovalComponent,
    LevelTwoApprovalComponent,
    EntityBankaddComponent,
    EntityBankeditComponent,
    BankInfoComponent,
    KycInfoComponent,
    BouquetePlanViewallComponent,
    BouquetenameAddComponent,
    BouquetenameEditComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
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
    ToastrModule.forRoot()

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
