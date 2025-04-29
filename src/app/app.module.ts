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
import { MerchantPlanViewallComponent } from './Merchant Plan/merchant-plan-viewall/merchant-plan-viewall.component';
import { MerchantPlanAddComponent } from './Merchant Plan/merchant-plan-add/merchant-plan-add.component';
import { EditMerchantPlanComponent } from './Merchant Plan/edit-merchant-plan/edit-merchant-plan.component';
import { LogoutComponent } from './logout/logout.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from './serach pipe/search.pipe';
import { DPOBouqueteAddComponent } from './Plan Creation/DPO Bouquet Creation/dpobouquete-add/dpobouquete-add.component';
import { DpoViewComponent } from './Plan Creation/DPO Bouquet Creation/dpo-view/dpo-view.component';
import { PgsetupViewComponent } from './Main Master/PgSetup/pgsetup-view/pgsetup-view.component';
import { PgsetupCreateComponent } from './Main Master/PgSetup/pgsetup-create/pgsetup-create.component';
import { PgsetupEditComponent } from './Main Master/PgSetup/pgsetup-edit/pgsetup-edit.component';
import { OverallCustomerViewComponent } from './Overall-Customer/overall-customer-view/overall-customer-view.component';
import { OverallIndividualCustomerviewComponent } from './Overall-Customer/overall-individual-customerview/overall-individual-customerview.component';
import { EntityViewComponent } from './Entity Onboard/entity-view/entity-view.component';
import { EntityQrcodeComponent } from './entity-qrcode/entity-qrcode/entity-qrcode.component';
import { EntityRefundComponent } from './entity-refund/entity-refund.component';
import { EntitySettlementComponent } from './entity-settlement/entity-settlement.component';
import { SettlementViewComponent } from './settlement-view/settlement-view/settlement-view.component';
import { EntityPgonboardComponent } from './Entity Onboard/entity-pgonboard/entity-pgonboard/entity-pgonboard.component';
import { EntityCustomersViewAllComponent } from './Entity-Customers/entity-customers-view-all/entity-customers-view-all.component';
import { EntityCustomersViewComponent } from './Entity-Customers/entity-customers-view/entity-customers-view/entity-customers-view.component';
import { OverallTransactionsViewallComponent } from './Overall-Transactions/overall-transactions-viewall/overall-transactions-viewall.component';
import { MerchantTransactionViewComponent } from './Overall-Transactions/merchant-transaction-view/merchant-transaction-view.component';
import { ViewwithdrawalComponent } from './Main Master/WIthdrawal/viewwithdrawal/viewwithdrawal.component';
import { AddwithdrawalComponent } from './Main Master/WIthdrawal/addwithdrawal/addwithdrawal.component';
import { EditwithdrawalComponent } from './Main Master/WIthdrawal/editwithdrawal/editwithdrawal.component';
import { AddbeneficiaryComponent } from './Beneficiary/addbeneficiary/addbeneficiary.component';
import { ViewbeneficiaryComponent } from './Beneficiary/viewbeneficiary/viewbeneficiary.component';
import { EditbeneficiaryComponent } from './Beneficiary/editbeneficiary/editbeneficiary.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewPermissionComponent } from './Roles-Permission/view-permission/view-permission.component';
import { ViewSubpermissionComponent } from './Roles-Permission/view-subpermission/view-subpermission.component';
import { BouquetsRegionsviewComponent } from './Plan Creation/Broadcaster Bouqutes/bouquets-regionsview/bouquets-regionsview.component';
import { AddExtraChannelsComponent } from './Plan Creation/Broadcaster Bouqutes/add-extra-channels/add-extra-channels.component';
import { EditPersonalInfoComponent } from './Entity Onboard/edit-personal-info/edit-personal-info.component';
import { EntityTransactionComponent } from './entity-transaction/entity-transaction.component';
import { ChannelViewComponent } from './Overall-Customer/channel-view/channel-view.component';
import { DuesViewComponent } from './dues/dues-view/dues-view.component';
import { DuesComponent } from './dues/dues.component';
import { UpdateManualpaymentComponent } from './Entity Onboard/update-manualpayment/update-manualpayment.component';
import { MerchantLogoComponent } from './Entity Onboard/merchant-logo/merchant-logo.component';
import { ManualTransactionComponent } from './Entity Onboard/manual-transaction/manual-transaction.component';
import { CreateManualpaymentComponent } from './Entity Onboard/create-manualpayment/create-manualpayment.component';
import { KeysUpdateComponent } from './Entity Onboard/keys-update/keys-update.component';
import { ViewOnboardinfoComponent } from './Entity Onboard/view-onboardinfo/view-onboardinfo.component';
import { PaymentlinkViewComponent } from './Entity Onboard/paymentlink-view/paymentlink-view.component';
import { PaymentlinkResendComponent } from './Entity Onboard/paymentlink-resend/paymentlink-resend.component';
import { ViewPolicyComponent } from './Fargin-policy/view-policy/view-policy.component';
import { AddPolicyComponent } from './Fargin-policy/add-policy/add-policy.component';
import { EditPolicyComponent } from './Fargin-policy/edit-policy/edit-policy.component';
import { CustomerViewallComponent } from './Tickets/customer-viewall/customer-viewall.component';
import { CustomerTicketapprovalComponent } from './Tickets/customer-ticketapproval/customer-ticketapproval.component';
import { CustDescriptionCommentComponent } from './Tickets/cust-description-comment/cust-description-comment.component';
import { MatBadgeModule } from '@angular/material/badge';
import { BankViewallComponent } from './Main Master/Bank Details/bank-viewall/bank-viewall.component';
import { AddbankDetailsComponent } from './Main Master/Bank Details/addbank-details/addbank-details.component';
import { EditBankDetailsComponent } from './Main Master/Bank Details/edit-bank-details/edit-bank-details.component';
import { PolicyApprovalComponent } from './Admin-policy/policy-approval/policy-approval.component';
import { CustomerTransViewallComponent } from './Fargin Transtions/Customer Trans/customer-trans-viewall/customer-trans-viewall.component';
import { CustomerTransViewComponent } from './Fargin Transtions/Customer Trans/customer-trans-view/customer-trans-view.component';
import { MaintenanceTransViewallComponent } from './Fargin Transtions/Entity Trans/maintenance-trans-viewall/maintenance-trans-viewall.component';
import { MaintanceViewComponent } from './Fargin Transtions/Entity Trans/maintance-view/maintance-view.component';
import { ServicePaymentsViewallComponent } from './Fargin Transtions/Entity Trans/service-payments-viewall/service-payments-viewall.component';
import { ServicePaymentViewComponent } from './Fargin Transtions/Entity Trans/service-payment-view/service-payment-view.component';
import { DropdownModule } from 'primeng/dropdown';
import { QRcreationComponent } from './entity-qrcode/qrcreation/qrcreation.component';
import { BankVerificationMatchComponent } from './Entity Onboard/bank-verification-match/bank-verification-match.component';
import { OtherpaymentsViewallComponent } from './Fargin Transtions/Other Payments/otherpayments-viewall/otherpayments-viewall.component';
import { OtherpaymentsViewComponent } from './Fargin Transtions/Other Payments/otherpayments-view/otherpayments-view.component';
import { CreateOtherpaymentComponent } from './Entity Onboard/create-otherpayment/create-otherpayment.component';
import { EditOtherpaymentComponent } from './Entity Onboard/edit-otherpayment/edit-otherpayment.component';
import { OtherpayTransComponent } from './Entity Onboard/otherpay-trans/otherpay-trans.component';
import { EntityKyceditComponent } from './Entity Onboard/entity-kycedit/entity-kycedit.component';
import { AddKyccategoryComponent } from './Main Master/kyccategory/add-kyccategory/add-kyccategory.component';
import { ViewallKyccategoryComponent } from './Main Master/kyccategory/viewall-kyccategory/viewall-kyccategory.component';
import { EditKyccategoryComponent } from './Main Master/kyccategory/edit-kyccategory/edit-kyccategory.component';
import { FarginBankAddComponent } from './Main Master/Fargin Bank/fargin-bank-add/fargin-bank-add.component';
import { FarginBankviewComponent } from './Main Master/Fargin Bank/fargin-bankview/fargin-bankview.component';
import { FarginBankEditComponent } from './Main Master/Fargin Bank/fargin-bank-edit/fargin-bank-edit.component';
import { EditSmsComponent } from './Entity Onboard/edit-sms/edit-sms.component';
import { SmsCreateComponent } from './Entity Onboard/sms-create/sms-create.component';
import { SMSHistoryComponent } from './SMS details/smshistory/smshistory.component';
import { SMSHistoryViewComponent } from './SMS details/smshistory-view/smshistory-view.component';
import { EntitySmsViewallComponent } from './SMS details/entity-sms-viewall/entity-sms-viewall.component';
import { EntitySmsViewComponent } from './SMS details/entity-sms-view/entity-sms-view.component';
import { AddBussinessdocumentComponent } from './Entity Onboard/bussiness-document/add-bussinessdocument/add-bussinessdocument.component';
import { ApprovalBussinessdocumentComponent } from './Entity Onboard/bussiness-document/approval-bussinessdocument/approval-bussinessdocument.component';
import { CommentBussinessdocumentComponent } from './Entity Onboard/bussiness-document/comment-bussinessdocument/comment-bussinessdocument.component';
import { EditBussinessdocumentComponent } from './Entity Onboard/bussiness-document/edit-bussinessdocument/edit-bussinessdocument.component';
import { ImageBussinessdocumentComponent } from './Entity Onboard/bussiness-document/image-bussinessdocument/image-bussinessdocument.component';
import { SmsCostViewallComponent } from './Main Master/SMS Cost/sms-cost-viewall/sms-cost-viewall.component';
import { SMScostAddComponent } from './Main Master/SMS Cost/smscost-add/smscost-add.component';
import { EntityAutoDebitGetallComponent } from './entity-auto-debit-getall/entity-auto-debit-getall.component';
import { EntityAutoDebitByIdComponent } from './entity-auto-debit-by-id/entity-auto-debit-by-id.component';
import { AddAnnouncementComponent } from './Announcement/add-announcement/add-announcement.component';
import { AnnouncementviewComponent } from './Announcement/announcementview/announcementview.component';
import { EditAnnouncementComponent } from './Announcement/edit-announcement/edit-announcement.component';
import { ViewAnnouncementComponent } from './Announcement/view-announcement/view-announcement.component';
import { SmsApprovalComponent } from './Entity Onboard/sms-approval/sms-approval.component';
import { SmsHistoryEntityComponent } from './Entity Onboard/sms-history-entity/sms-history-entity.component';
import { PlanDetailsCustomerComponent } from './Overall-Customer/plan-details-customer/plan-details-customer.component';
import { CustomerSurveyquestionsComponent } from './Customer-Survey/customer-surveyquestions/customer-surveyquestions.component';
import { SurveyviewallComponent } from './Customer-Survey/surveyviewall/surveyviewall.component';
import { ViewQuestionsComponent } from './Customer-Survey/view-questions/view-questions.component';
import { CustomerticketImageComponent } from './Tickets/customerticket-image/customerticket-image.component';
import { ReadquestionsComponent } from './Customer-Survey/readquestions/readquestions.component';
import { AlcotHistoryComponent } from './Plan Creation/Alacarte channels/alcot-history/alcot-history.component';
import { ViewmerchantComponent } from './Merchant/viewmerchant/viewmerchant.component';
import { AddExtraRegionComponent } from './Plan Creation/Broadcaster Bouqutes/add-extra-region/add-extra-region.component';
import { ChanneleditComponent } from './Plan Creation/Broadcaster Bouqutes/channeledit/channeledit.component';
import { BouqutesRegioneditComponent } from './Plan Creation/Broadcaster Bouqutes/bouqutes-regionedit/bouqutes-regionedit.component';
import { BouqutesRegionComponent } from './Plan Creation/Broadcaster Bouqutes/bouqutes-region/bouqutes-region.component';
import { AggrementSignerOneComponent } from './aggrement-signer-one/aggrement-signer-one.component';
import { SignerGetallComponent } from './Main Master/Fargin Signer Details/signer-getall/signer-getall.component';
import { SignerAddComponent } from './Main Master/Fargin Signer Details/signer-add/signer-add.component';
import { SignerUpdateComponent } from './Main Master/Fargin Signer Details/signer-update/signer-update.component';

import { AddagreementplanComponent } from './Main Master/Agreementplan/addagreementplan/addagreementplan.component';
import { ViewagreementplanComponent } from './Main Master/Agreementplan/viewagreementplan/viewagreementplan.component';
import { EditagreementplanComponent } from './Main Master/Agreementplan/editagreementplan/editagreementplan.component';
import { AllagreementplansComponent } from './Main Master/Agreementplan/allagreementplans/allagreementplans.component';
import { AddAgreementsComponent } from './Entity Onboard/add-agreements/add-agreements.component';
import { AgreementlinkComponent } from './Entity Onboard/agreementlink/agreementlink.component';
import { AgreementViewallComponent } from './agreement-viewall/agreement-viewall.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AggrementSignerOtpComponent } from './aggrement-signer-otp/aggrement-signer-otp.component';
import { AggrementLocationTrackerComponent } from './aggrement-location-tracker/aggrement-location-tracker.component';
import { AgreementsLinkExtentComponent } from './Entity Onboard/agreements-link-extent/agreements-link-extent.component';
import { FailureOfftransactionsComponent } from './Entity Onboard/Offline-Transactions/failure-offtransactions/failure-offtransactions.component';
import { OffileSettlementPayoutComponent } from './Entity Onboard/Offline-Transactions/offile-settlement-payout/offile-settlement-payout.component';
import { OfflineSettlementComponent } from './Entity Onboard/Offline-Transactions/offline-settlement/offline-settlement.component';
import { OfflineTransactionsComponent } from './Entity Onboard/Offline-Transactions/offline-transactions/offline-transactions.component';
import { SuccessOfftransactionsComponent } from './Entity Onboard/Offline-Transactions/success-offtransactions/success-offtransactions.component';
import { BranchAddComponent } from './Entity Onboard/Branch/branch-add/branch-add.component';
import { BranchEditComponent } from './Entity Onboard/Branch/branch-edit/branch-edit.component';
import { BranchViewallComponent } from './branch-viewall/branch-viewall.component';
import { ViewadditionalpaymentsComponent } from './Fargin Transtions/additionalpayments/viewadditionalpayments/viewadditionalpayments.component';
import { AdditionalpaymentsComponent } from './Fargin Transtions/additionalpayments/additionalpayments.component';
import { BranchIndividualviewComponent } from './branch-individualview/branch-individualview.component';
import { BranchCustomerViewComponent } from './branch-customer-view/branch-customer-view.component';
import { RefundGetallComponent } from './Refund/refund-getall/refund-getall.component';
import { TransManualPayComponent } from './Fargin Transtions/Entity Trans/trans-manual-pay/trans-manual-pay.component';
import { AddStickerComponent } from './StickerCost/add-sticker/add-sticker.component';
import { ViewStickerComponent } from './StickerCost/view-sticker/view-sticker.component';
import { CreateCampaginComponent } from './Announcement/create-campagin/create-campagin.component';
import { BranchKycComponent } from './Entity Onboard/Branch/branch-kyc/branch-kyc.component';
import { BranchkycApprovalComponent } from './Entity Onboard/Branch/branchkyc-approval/branchkyc-approval.component';
import { BranchkycCommetsComponent } from './Entity Onboard/Branch/branchkyc-commets/branchkyc-commets.component';
import { BranchkycEditComponent } from './Entity Onboard/Branch/branchkyc-edit/branchkyc-edit.component';
import { BranchkycExtraComponent } from './Entity Onboard/Branch/branchkyc-extra/branchkyc-extra.component';
import { BranchkycInfoComponent } from './Entity Onboard/Branch/branchkyc-info/branchkyc-info.component';
import { KycbranchImageComponent } from './Entity Onboard/Branch/kycbranch-image/kycbranch-image.component';
import { BranchTerminalviewComponent } from './Entity Onboard/BranchTerminal/branch-terminalview/branch-terminalview.component';
import { BranchTerminalAddComponent } from './Entity Onboard/BranchTerminal/branch-terminal-add/branch-terminal-add.component';
import { BranchTerminalEditComponent } from './Entity Onboard/BranchTerminal/branch-terminal-edit/branch-terminal-edit.component';
import { EntityTerminalViewComponent } from './Entity Onboard/EntityTerminal/entity-terminal-view/entity-terminal-view.component';
import { EntityTerminalAddComponent } from './Entity Onboard/EntityTerminal/entity-terminal-add/entity-terminal-add.component';
import { EntityTerminalEditComponent } from './Entity Onboard/EntityTerminal/entity-terminal-edit/entity-terminal-edit.component';
import { TerminalTransactionsComponent } from './Entity Onboard/EntityTerminal/terminal-transactions/terminal-transactions.component';
import { BranchTransactionsComponent } from './Entity Onboard/BranchTerminal/branch-transactions/branch-transactions.component';
import { EntityPlanHistoryComponent } from './Entity Onboard/entity-plan-history/entity-plan-history.component';
import { RefundPeriodViewallComponent } from './Main Master/Refund Period/refund-period-viewall/refund-period-viewall.component';
import { RefundPeriodAddComponent } from './Main Master/Refund Period/refund-period-add/refund-period-add.component';
import { RefundPeriodEditComponent } from './Main Master/Refund Period/refund-period-edit/refund-period-edit.component';
import { EntityOfflineviewComponent } from './Entity Onboard/entity-offlineview/entity-offlineview.component';
import { CreateBulkcampaignsComponent } from './Campaign/create-bulkcampaigns/create-bulkcampaigns.component';
import { CreateCampaignsComponent } from './Campaign/create-campaigns/create-campaigns.component';
import { CreateCommentcampaignsComponent } from './Campaign/create-commentcampaigns/create-commentcampaigns.component';
import { EditCampaignComponent } from './Campaign/edit-campaign/edit-campaign.component';
import { ViewCampaignsComponent } from './Campaign/view-campaigns/view-campaigns.component';
import { ViewImagecampaignsComponent } from './Campaign/view-imagecampaigns/view-imagecampaigns.component';
import { ViewRecordcampaignsComponent } from './Campaign/view-recordcampaigns/view-recordcampaigns.component';
import { MaintenanceotherpayViewComponent } from './Fargin Transtions/Entity Trans/maintenanceotherpay-view/maintenanceotherpay-view.component';
import { UpdateBulkcampaignComponent } from './Campaign/update-bulkcampaign/update-bulkcampaign.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UpdateStickerTicketComponent } from './Tickets/update-sticker-ticket/update-sticker-ticket.component';
import { OfflineDetailsComponent } from './Overall-Customer/offline-details/offline-details.component';
import { SmsDescriptionComponent } from './Entity Onboard/sms-description/sms-description.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DashboardMerchantcontentComponent } from './dashboard-merchantcontent/dashboard-merchantcontent.component';
import { BranchOnlinetransactionsComponent } from './Entity Onboard/branch-onlinetransactions/branch-onlinetransactions.component';
import { BranchOnlineviewComponent } from './Entity Onboard/branch-onlinetransactions/branch-onlineview/branch-onlineview.component';
import { BranchWiseenitytransactionComponent } from './Entity Onboard/branch-onlinetransactions/branch-wiseenitytransaction/branch-wiseenitytransaction.component';
import { OtherpayManualpaymentComponent } from './Fargin Transtions/Other Payments/otherpay-manualpayment/otherpay-manualpayment.component';
import { BranchInactivenbranchComponent } from './Entity Onboard/Branch/branch-inactivenbranch/branch-inactivenbranch.component';
import { ExportReportViewallComponent } from './Export-Report/export-report-viewall/export-report-viewall.component';
import { ExportReportAddComponent } from './Export-Report/export-report-add/export-report-add.component';


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
    AddwithdrawalComponent,
    ViewwithdrawalComponent,
    EditwithdrawalComponent,
    BusinessKycComponent,
    BusinessKycCreateComponent,
    BusinessKycEditComponent,
    PermissionComponent,
    SubPermissionComponent,
    EntityViewallComponent,
    EntityAddComponent,
    PgsetupCreateComponent,
    MerchantTransactionViewComponent,
    PgsetupEditComponent,
    DashboardContentComponent,
    OverallCustomerViewComponent,
    OverallIndividualCustomerviewComponent,
    EntityViewComponent,
    PgsetupViewComponent,
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
    ViewmerchantComponent,
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
    EditPersonalInfoComponent,
    BouquatenameViewallComponent,
    BouquateNameAddComponent,
    BouquatenameEditComponent,
    AddExtraChannelsComponent,
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
    MerchantPlanViewallComponent,
    MerchantPlanAddComponent,
    EditMerchantPlanComponent,
    LogoutComponent,
    SearchPipe,
    DPOBouqueteAddComponent,
    DpoViewComponent,
    EntitySettlementComponent,
    EntityRefundComponent,
    EntityQrcodeComponent,
    SettlementViewComponent,
    EntityPgonboardComponent,
    EntityCustomersViewAllComponent,
    EntityCustomersViewComponent,
    OverallTransactionsViewallComponent,
    AddbeneficiaryComponent,
    ViewbeneficiaryComponent,
    EditbeneficiaryComponent,
    ProfileComponent,
    BouquetsRegionsviewComponent,
    ViewPermissionComponent,
    ViewSubpermissionComponent,
    EntityTransactionComponent,
    ChannelViewComponent,
    DuesViewComponent,
    DuesComponent,
    UpdateManualpaymentComponent,
    MerchantLogoComponent,
    ManualTransactionComponent,
    CreateManualpaymentComponent,
    KeysUpdateComponent,
    ViewOnboardinfoComponent,
    PaymentlinkViewComponent,
    PaymentlinkResendComponent,
    ViewPolicyComponent,
    AddPolicyComponent,
    EditPolicyComponent,
    CustomerViewallComponent,
    CustomerTicketapprovalComponent,
    CustDescriptionCommentComponent,
    BankViewallComponent,
    AddbankDetailsComponent,
    EditBankDetailsComponent,
    PolicyApprovalComponent,
    CustomerTransViewallComponent,
    CustomerTransViewComponent,
    MaintenanceTransViewallComponent,
    MaintanceViewComponent,
    ServicePaymentsViewallComponent,
    ServicePaymentViewComponent,
    QRcreationComponent,
    BankVerificationMatchComponent,
    OtherpaymentsViewallComponent,
    OtherpaymentsViewComponent,
    CreateOtherpaymentComponent,
    EditOtherpaymentComponent,
    OtherpayTransComponent,
    EntityKyceditComponent,
    EntityKyceditComponent,
    AddKyccategoryComponent,
    ViewallKyccategoryComponent,
    EditKyccategoryComponent,
    FarginBankAddComponent,
    FarginBankviewComponent,
    FarginBankEditComponent,
    EditSmsComponent,
    SmsCreateComponent,
    SMSHistoryComponent,
    SMSHistoryViewComponent,
    EntitySmsViewallComponent,
    EntitySmsViewComponent,
    AddBussinessdocumentComponent,
    EditBussinessdocumentComponent,
    ImageBussinessdocumentComponent,
    ApprovalBussinessdocumentComponent,
    CommentBussinessdocumentComponent,
    SmsCostViewallComponent,
    SMScostAddComponent,
    EntityAutoDebitGetallComponent,
    EntityAutoDebitByIdComponent,
    AddAnnouncementComponent,
    EditAnnouncementComponent,
    ViewAnnouncementComponent,
    AnnouncementviewComponent,
    SmsApprovalComponent,
    SmsHistoryEntityComponent,
    PlanDetailsCustomerComponent,
    CustomerSurveyquestionsComponent,
    ViewQuestionsComponent,
    SurveyviewallComponent,
    CustomerticketImageComponent,
    ReadquestionsComponent,
    AlcotHistoryComponent ,
    AddExtraRegionComponent,
    ChanneleditComponent,
    BouqutesRegioneditComponent,
    BouqutesRegionComponent,
    AggrementSignerOneComponent,
    SignerGetallComponent,
    SignerAddComponent,
    SignerUpdateComponent,
    AddagreementplanComponent,
    ViewagreementplanComponent,
    EditagreementplanComponent,
    AllagreementplansComponent,
    AddAgreementsComponent,
    AgreementlinkComponent,
    AgreementViewallComponent,
    AggrementSignerOtpComponent,
    AggrementLocationTrackerComponent,
    AgreementsLinkExtentComponent,
    OfflineTransactionsComponent,
    SuccessOfftransactionsComponent,
    FailureOfftransactionsComponent,
    OfflineSettlementComponent,
    OffileSettlementPayoutComponent,
    BranchAddComponent,
    BranchEditComponent,
    BranchViewallComponent,
    ViewadditionalpaymentsComponent,
    AdditionalpaymentsComponent,
    BranchIndividualviewComponent,
    BranchCustomerViewComponent,
    RefundGetallComponent,
    TransManualPayComponent,
    AddStickerComponent,
    ViewStickerComponent,
    CreateCampaginComponent,
    BranchKycComponent,
    KycbranchImageComponent,
    BranchkycEditComponent,
    BranchkycInfoComponent,
    BranchkycApprovalComponent,
    BranchkycCommetsComponent,
    BranchkycExtraComponent,
    BranchTerminalviewComponent,
    BranchTerminalAddComponent,
    BranchTerminalEditComponent,
    EntityTerminalViewComponent,
    EntityTerminalAddComponent,
    EntityTerminalEditComponent,
    TerminalTransactionsComponent,
    BranchTransactionsComponent,
    EntityPlanHistoryComponent,
    RefundPeriodViewallComponent,
    RefundPeriodAddComponent,
    RefundPeriodEditComponent,
    EntityOfflineviewComponent,
    CreateCampaignsComponent,
    ViewCampaignsComponent,
    CreateCommentcampaignsComponent,
    CreateBulkcampaignsComponent,
    ViewImagecampaignsComponent,
    ViewRecordcampaignsComponent,
    EditCampaignComponent,
    MaintenanceotherpayViewComponent,
    UpdateBulkcampaignComponent,
    UpdateStickerTicketComponent,
    OfflineDetailsComponent,
    SmsDescriptionComponent,
    DashboardMerchantcontentComponent,
    BranchOnlinetransactionsComponent,
    BranchOnlineviewComponent,
    BranchWiseenitytransactionComponent,
    OtherpayManualpaymentComponent,
    BranchInactivenbranchComponent,
    ExportReportViewallComponent,
    ExportReportAddComponent,

  ],

  imports: [
    BrowserModule,
    MatTooltipModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatBadgeModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    PdfViewerModule,
    MatCommonModule,
    MatDatepickerModule,
    NgxPaginationModule,
    MatDialogModule,
    MatPaginatorModule,
    MatInputModule,
    MatToolbarModule,
    MatStepperModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatSelectModule,
    DropdownModule, 
    NgSelectModule,
    ToastrModule.forRoot()

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
