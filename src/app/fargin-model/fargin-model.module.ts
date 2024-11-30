import { Interaction } from "chart.js";
import { read } from "fs";

export interface VerifyOtp {
  readonly emailAddress: any;
  readonly otpCode: any;
}
export interface ResetPassword {
  readonly emailAddress: any;
  readonly newPassword: any;
}

export interface ResendOtp {
  readonly emailAddress: any;

}
export interface ChangePassword {
  readonly userPassword: any;
  readonly newPassword: any;
}
export interface Adminstatus {
  readonly adminUserId: any;
  readonly accountStatus: any;
}

export interface AdminCreate {
  readonly roleId: any;
  readonly emailAddress: any;
  // readonly userPassword: any;
  readonly mobileNumber: any;
  readonly adminName: any;
  readonly address: any;
  readonly city: any;
  readonly state: any;
  readonly pincode: any;
  readonly country: any;
  readonly gender: any;
  readonly createdBy: any;
}


export interface AdminUpdate {
  readonly adminUserId: any;
  readonly adminName: any;
  readonly address: any;
  readonly city: any;
  readonly state: any;
  readonly pincode: any;
  readonly country: any;
  readonly gender: any;
  readonly modifiedBy: any;
  readonly roleId: any;
}





export interface Businessadd {
  readonly categoryName: any;
  readonly mccCode: any;
  readonly createdBy: any;
  readonly autoDebitDate:any;
}


export interface Businessedit {
  readonly categoryName: any;
  readonly mccCode: any;
  readonly modifiedBy: any;
  readonly autoDebitDate:any;
}

export interface Businessstatus {
  readonly activeStatus: any;

}

export interface Businesskycstatus {
  readonly activeStatus: any;
}


export interface Businesskycadd {
  readonly businessCategoryId: any;
  readonly createdBy: any;
  readonly kycCategoryId:any;
}


export interface Businesskycedit {
  readonly categoryKycId: any;
  readonly businessCreationId: any;
  readonly modifiedBy: any;
}
export interface addentity {

  readonly entityName: any;
  readonly merchantLegalName: any;
  readonly accountDisplayName: any;
  readonly contactName: any;
  readonly contactMobile: any;
  readonly secondaryMobile: any;
  readonly contactEmail: any;
  readonly gstIn: any;
  readonly billingAddress: any;
  readonly area: any;
  readonly zipcode: any;
  readonly stateName: any;
  readonly city: any;
  readonly contactPerson: any;
  readonly country: any;
  readonly locationServed: any;
  readonly serviceOffered: any;
  readonly businessCategoryId: any;
  readonly mccCode: any;
  readonly website: any;
  readonly merchantPlanId: any;

}


export interface updateentity {

  readonly entityName: any;
  readonly merchantLegalName: any;
  readonly accountDisplayName: any;
  readonly contactName: any;
  readonly contactMobile: any;
  readonly secondaryMobile: any;
  readonly contactEmail: any;
  readonly gstIn: any;
  readonly billingAddress: any;
  readonly area: any;
  readonly zipcode: any;
  readonly stateName: any;
  readonly city: any;
  readonly contactPerson: any;
  readonly country: any;
  readonly locationServed: any;
  readonly serviceOffered: any;
  readonly businessCategoryId: any;
  readonly mccCode: any;
  readonly website: any;
  readonly modifiedBy: any;

}

export interface EntityStatus {
  readonly merchantId: any;
  readonly accountStatus: any;
}

export interface EmailTrigger {
  readonly merchantId: any;
  readonly linkExpiry: any;
  readonly description: any;
  readonly returnUrl: any;

}

export interface AddEntityBank {
  readonly accountHolderName: any;
  readonly accountNumber: any;
  readonly bankId: any;
  readonly ifscCode: any;
  readonly branchName: any;
  readonly accountType: any;
  readonly merchantId: any;
  readonly ledgerId: any;
}


export interface settopStatus {
  readonly activeStatus: boolean | number;
}

export interface BankPrimaryStatus {
  readonly primaryAccountStatus: boolean | number;
}



export interface ApprovalBank {
  readonly approvalStatus: any;
  readonly reMarks: any;
  readonly modifiedBy: any;
}

export interface KycApproval {
  readonly approvalBy: any;
  readonly approvalStatus: any;
  readonly reMarks: any;
}



export interface KycAdd {
  readonly merchantId: any;
  readonly docFrontPath: any;
  readonly docBackPath: any;
  readonly docName: any;
  readonly docNumber: any;
  readonly createdBy: any;
}


export interface KycUpdate {
  readonly merchantDocumentId: any;
  readonly docFrontPath: any;
  readonly docBackPath: any;
  readonly docName: any;
  readonly docNumber: any;
  readonly modifiedBy: any;
}

export interface LeveloneApproval {
  readonly merchantId: any;
  readonly approvalStatusL1: any;
  readonly approvedByL1: any;
  readonly comment: any;
}
export interface LevelTwoApproval {
  readonly approvalStatusL2: any;
  readonly approvedByL2: any;
  readonly commentL2: any;
}


export interface Facheckverification {
  readonly kycId: any;
  readonly docNumber: any;
  readonly approvalBy: any;
}

export interface PassPortverification {
  readonly kycId: any;
  readonly docNumber: any;
  readonly approvalBy: any;
  readonly dateOfBirth: any;
}

export interface Gstverification {
  readonly kycId: any;
  readonly docNumber: any;
  readonly approvalBy: any;

}
export interface Bankverficiation {
  readonly merchantBankId: any;
}
export interface bankData {
  readonly accountHolderName: any;
  readonly accountNumber: any;
  readonly bankId: any;
  readonly ifscCode: any;
  readonly branchName: any;
  readonly accountType: any;
  readonly merchantId: any;
  readonly ledgerId: any;
}

export interface bankedit {
  readonly accountHolderName: any;
  readonly accountNumber: any;
  readonly bankId: any;
  readonly ifscCode: any;
  readonly branchName: any;
  readonly accountType: any;
  readonly ledgerId: any;
}


export interface MerchantTransaction {
  readonly accountId: any;
  readonly pageNo: any;
  readonly size: any;
  readonly query: any;
  readonly dateRange: any;
  readonly status: any;
}


export interface Addwithdrawal {
  readonly amountRange: any;
  readonly mode: any;
  readonly gstType: any;
  readonly fees: any;
  readonly gstInPercentage: any;
  readonly createdBy: any;
}
export interface Editwithdrawal {
  readonly amountRange: any;
  readonly mode: any;
  readonly gstType: any;
  readonly fees: any;
  readonly gstInPercentage: any;
  readonly modifiedBy: any;
}
export interface StatusWithdrawal {
  readonly withrawalStatus: any
}


export interface VoterIdVerify {
  readonly kycId: any;
  readonly docNumber: any;
  // readonly approvalBy: any;
}


export interface Addbeneficiary {
  readonly merchantId: any;
  readonly bankName: any;
  readonly accountNumber: any;
  readonly accountHolderName: any;
  readonly emailAddress: any;
  readonly ifscCode: any;
  readonly accountType: any;
  readonly mobileNumber: any;
  readonly createdBy: any;
  readonly branchName: any;
  readonly upiName: any;
  readonly type: any;
}
export interface Statusbeneficiary {
  readonly activeStatus: any
}








export interface VerifyOtp {
  readonly emailAddress: any;
  readonly otpCode: any;
}
export interface ResetPassword {
  readonly emailAddress: any;
  readonly newPassword: any;
}

export interface ResendOtp {
  readonly emailAddress: any;

}
export interface ChangePassword {
  readonly userPassword: any;
  readonly newPassword: any;
}

export interface AdminPolicycreate {
  readonly termAndCondition: any;
  readonly disclaimer: any;
  readonly privacyPolicy: any;
  readonly refundPolicy: any;
  readonly createdBy: any;
  readonly merchantId: any;
}


export interface AdminPolicyEdit {
  readonly termAndCondition: any;
  readonly disclaimer: any;
  readonly privacyPolicy: any;
  readonly refundPolicy: any;
  // readonly createdBy: any;
  readonly modifiedBy: any;
  readonly merchantId: any;

}


export interface ticket {
  readonly updatedBy: any;
  readonly remarks: any;
  readonly approvalStatus: any;

}

export interface subpermission {
  readonly permissionsId: any
}

export interface role {
  readonly roleName: any;
  readonly createdBy: any;
  readonly permission: any;
  readonly subPermission: any;
}

export interface roleactiveInactive {
  readonly roleId: any;
  readonly status: any;
}



export interface BankPrimaryStatus {
  readonly primaryAccountStatus: boolean | number;
}


export interface ApprovalBank {
  readonly approvalStatus: any;
  readonly reMarks: any;
  readonly modifiedBy: any;
}


export interface RegionAdd {
  readonly serviceId: any;
  readonly stateName: any;
  readonly createdBy: any
}

export interface RegionStatus {
  readonly regionId: any;
  readonly status: any;
}

export interface RegionEdit {
  readonly serviceId: any;
  readonly regionId: any;
  readonly stateName: any;
  readonly modifiedBy: any
}


//Service provider

export interface Providerstatus {
  readonly serviceId: any;
  readonly status: any;
}

export interface Providercreate {
  readonly serviceProviderName: any;
  readonly serviceProviderLink:any;
  readonly createdBy: any;
}

export interface Providerupdate {
  readonly serviceProviderName: any;
  readonly serviceProviderLink:any;
  readonly modifiedBy: any;
  readonly serviceId: any;
}

export interface Addfacheckkey {
  readonly apiKey: any;
  readonly secretKey: any;
  readonly applicationId: any;
  readonly mode: any;
  readonly createdBy: any;
}
export interface Updatefacheckkey {
  readonly apiKey: any;
  readonly secretKey: any;
  readonly applicationId: any;
  readonly mode: any;
  readonly modifiedBy: any;
}
export interface Statusfacheckkey {
  readonly activeStatus: any
}

export interface UpdateAlcart {
  readonly alcotId: any;
  readonly regionId: any;
  readonly bundleChannelId: any;
  readonly channelName: any;
  readonly type: any;
  readonly channelNo: any;
  readonly generic: any;
  readonly language: any;
  readonly price: any;
  readonly modifiedBy: any;

}

export interface Alcartstatus {
  readonly alcotId: any;
  readonly alcotStatus: any;
}

export interface addBouquetname {
  readonly broardCaste: any;
  readonly createdBy: any;
}

export interface UpdateBouquetname {
  readonly broardCaste: any;
  readonly modifiedBy: any;
  readonly bundleChannelId: any;
}

export interface broadcasterstatus {
  readonly status: boolean | number;
  readonly bundleChannelId: any;
}

export interface Bouquetenameadd {
  readonly bundleChannelId: any;
  readonly bouquetName: any;
  readonly createdBy: any;
}

export interface Bouquetenamestatus {
  readonly boqCreationId: any;
}

export interface BouquetenameUpdate {
  readonly bundleChannelId: any;
  readonly boqCreationId: any;
  readonly bouquetName: any;
  readonly modifiedBy: any;
}


export interface BroadcasterBouquetadd {
  readonly boqCreationId: any;
  readonly serviceId: any;
  readonly bundleChannelId: any;
  readonly alcotId: any;
  readonly regId: any;
  readonly amount: any;
  readonly createdBy: any;

}

export interface AddExtraChannels {
  readonly alcotChannel: any;
  readonly boqId: any;
  readonly broadCasterRegionId:any;
}

export interface BroadcasterBouquetStatus {
  readonly status: boolean | number;
  readonly bouquteId: any;

}

export interface BroadcasterBoucateUpdate {
  readonly bouquteId: any;
  readonly amount: any;
  readonly bouquetName: any;
}

export interface Broadcastersinglechanelstatus {
  readonly broadCasterAlcotId: any;
  readonly channelStatus: any;
}
export interface BroadcasterBoucateschannelEdits {
  readonly broadCasterAlcotId:any;
 readonly alcotIds: any;
}
export interface BroadcasterBouquetregionupdate {
  readonly broadCasterRegionId:any;
 readonly regionIds: any;
}


export interface DPOCrate {
  readonly bundleChannelId: any;
  readonly boqCreationId: any;
  readonly regionId: any;
  readonly alcotId: any;
  readonly amount: any;

}


export interface DPOStatus {
  readonly status: any;
}

export interface DPOUpdate {
  readonly amount: any;
  readonly broardCaste: any;
}

export interface DPOChanneloverallstatus {
  readonly dpoAlcotid: any;
  readonly channelStatus: any;
}



export interface BouquetNameadd {
  readonly bundleChannelId: any;
  readonly bouquetName: any;
  readonly createdBy: any;
}

export interface BouquetenameStatus {
  readonly boqCreationId: any;
  readonly status: any;
}

export interface BouquetenameUpdate {
  readonly boqCreationId: any;
  readonly bouquetName: any;
  readonly modifiedBy: any;
}



export interface MerchantplanCreate {
  readonly planName: any;
  readonly technicalAmount: any;
  readonly maintenanceAmount: any;
  readonly frequency: any;
  readonly createdBy: any;
  readonly renewalAmount: any;
}

export interface MerchantplanUpdate {
  readonly planName: any;
  readonly technicalAmount: any;
  readonly maintenanceAmount: any;
  readonly frequency: any;
  readonly modifiedBy: any;
  readonly renewalAmount: any;
}

export interface MerchantPlanStatus {
  readonly activeStatus: any;
}



export interface Pgsetup {
  readonly pgOnoffStatus: any;
}

export interface pgsetupadd {
  readonly pgMode: any;
  readonly secretKey: any;
  readonly apiKey: any;
  readonly createdBy: any;
}

export interface pgsetupedit {
  readonly pgMode: any;
  readonly secretKey: any;
  readonly apiKey: any;
  readonly modifiedBy: any;
}

//entity settlement
export interface settlement {
  readonly accountId: any;
  readonly pageNo: any;
  readonly query: any;
  readonly size: any;
  readonly dateRange: any;
  readonly status: any;
}

export interface settlements {
  readonly accountId: any;
  readonly pageNo: any;
  readonly query: any;
  readonly size: any;
  readonly dateRange: any;
  readonly status: any;
  readonly payoutId: any;
}


export interface PgOnboard {
  readonly merchantId: any;

}

export interface editroles {
  readonly roleName: any;
  readonly modifiedBy: any;
  readonly permission: any;
  readonly subPermission: any;
}




export interface BroadcasterBouquetupdate {
  readonly boqId: any
  readonly boqCreationId: any;
  readonly serviceId: any;
  readonly bundleChannelId: any;
  // readonly alcotId: any;
  // readonly regId: any;
  readonly amount: any;
  readonly modifiedBy: any;

}

export interface ExtraRegion{
  readonly boqId:any
  readonly regionId:any
  readonly alcotChannel:any
}

export interface manualPayment {
  readonly paymentStatus: any;
  readonly paymentMethod: any;
  readonly utrNumber: any;
  readonly merchantId: any;
  readonly paidAmount: any;
}

export interface createManualPayment {
  readonly paymentMethod: any;
  readonly utrNumber: any;
  readonly paymentStatus: any;
  readonly merchantId: any;
}

export interface KeysUpdate {
  readonly accountId: any;
  readonly merchantId: any;
  readonly apikey: any;
  readonly secretkey: any;
}

export interface addpolicy {
  readonly disclaimer: any;
  readonly privacyPolicy: any;
  readonly termAndCondition: any;
  readonly refundPolicy: any;
  readonly createdBy: any;
}

export interface editpolicy {
  readonly disclaimer: any;
  readonly privacyPolicy: any;
  readonly termAndCondition: any;
  readonly refundPolicy: any;
  readonly modifiedBy: any;
}


export interface custticketraise {
  readonly ticketStatus: any;
  readonly ticketComment: any;
}

export interface AddBankdetails {
  readonly bankName: any,
  readonly createdBy: any

}

export interface UpdateBankdetails {
  readonly bankId: any;
  readonly bankName: any;
  readonly modifiedBy: any
}

export interface UpdateBankdetailStatus {
  readonly bankId: any,
  readonly activeStatus: any
}


export interface policyApproval {
  readonly approvedStatus: any;
  readonly approvedBy: any;
}

export interface QrCodecreation {
  readonly merchantId: any;
  readonly qrReference: any;
  readonly qrGenerateLink: any;
  readonly qrCreatedBy: any;
}

export interface DashboardData {
  date: any;
  totalAmount: number;
  initiatedCount: number;
  pendingCount: number;
  successCount: number;
  totalCount: number;
  successAmount: number;
  failureAmount: number;
  failureCount: number;
  pendingAmount: number;
}

export interface createManualPayment {
  readonly paymentMethod: any;
  readonly utrNumber: any;
  readonly paymentStatus: any;
  readonly merchantId: any;
  readonly date: any;
  readonly manualApprovalBy: any;
}

export interface createOtherPayment {
  readonly serviceName: any;
  readonly paidAmount: any;
  readonly createdBy: any;
  readonly merchantId: any;
}

export interface updateOtherPayment {
  readonly serviceName: any;
  readonly paidAmount: any;
  readonly modifiedBy: any;
}


export interface identity {
  readonly identityProof: any;
  readonly proofId: any;
  readonly identityProofNo: any;
}

export interface address {
  readonly proofId: any;
  readonly addressProof: any;
  readonly addressProofNo: any;
}

export interface signature {
  readonly proofId: any;
  readonly signatureProof: any;
  readonly signatureProofNo: any;
}


export interface verification {
  readonly facheckDocNumber: any;
  readonly kycId: any;
}

export interface Drivingverification {
  readonly facheckDocNumber: any;
  readonly kycId: any;
  readonly dateOfBirth:any;
}

export interface Pasportverify {
  readonly kycId: any;
  readonly facheckDocNumber: any;
  readonly approvalBy: any;
  readonly dateOfBirth:any;
}

export interface verify {
  readonly kycId: any;
  readonly facheckDocNumber: any;
  readonly approvalBy: any;
}


export interface identityapprove {
  readonly proofId: any;
  readonly identityAdminComments: any;
  readonly identityAdminApprovalStatus: any
  readonly identityAdminApprovedBy: any
}

export interface addressapprove {
  readonly proofId: any;
  readonly addressAdminApprovalStatus: any
  readonly addressAdminComments: any;
  readonly addressAdminApprovedBy: any
}
export interface signatureapprove {
  readonly proofId: any;
  readonly signatureAdminApprovalStatus: any;
  readonly signatureAdminComments: any
  readonly signatureAdminApprovedBy: any
}

export interface kyccateforysts {
  readonly kycCategoryId: any;
  readonly activeStatus: any;
}

export interface kycadd {
  readonly createdBy: any
  readonly kycCategoryName: any
}


export interface kycedit {
  readonly modifiedBy: any
  readonly kycCategoryName: any
  readonly kycCategoryId: any
}


export interface farginadd{
  readonly accountHolderName:any;
  readonly accountNumber:any;
  readonly bankName:any;
  readonly ifscCode:any;
  readonly branchName:any;
  readonly ledgerId:any;
  readonly createdBy:any;
 
}
 
export interface farginstatus{
  readonly activeStatus:any;
}


export interface farginedit{
  readonly accountHolderName:any;
  readonly accountNumber:any;
  readonly bankName:any;
  readonly ifscCode:any;
  readonly branchName:any;
  readonly ledgerId:any;
  readonly createdBy:any;
}

export interface CreateSMS{
  readonly merchantId:any;
  readonly type:any;
  readonly createdBy:any;
}

export interface Logout {
readonly adminUserId: any;
readonly logout: any;
}

export interface SmsStatus {
  readonly smsStatus: boolean | number;
  readonly modifedBy: any;
 
}
export interface SmsUpdate {
  readonly smsType: boolean | number;
  readonly modifedBy: any;
 
}



export interface documentupdate{
  readonly merchantDocumentId:any;
  readonly kycCategoryId:any;
  readonly docNumber :any
  readonly modifiedBy:any
}
 
export interface documentapproval{
  readonly approvalBy:any
  readonly approvalStatus:any
  readonly reMarks:any
}

export interface SMSCostAdd {
  readonly amount:any;
  readonly createdBy:any;
}

export interface smscoststatus {
  readonly smsStatus:any;
}


export interface announceAdd{
  readonly businessCategoryId:any;
  readonly announcementContentEnglish:any;
  readonly startDate:any;
  readonly endDate:any;
  readonly createdBy:any
}
 
export interface announceEdit{
  readonly announcementId:any;
  readonly businessCategoryId:any;
  readonly announcementContentEnglish:any;
  readonly startDate:any;
  readonly endDate:any;
  readonly updatedBy:any
}
 
export interface announcestatus{
  readonly announcementId:any;
  readonly activeStatus:any
}



export interface SMSApproval{
readonly smsApprovalStatus:any;
readonly smsApprovedBy:any;
}

export interface customerplanStatus{
  readonly activeStatus:any;
}


export interface customerpay{
  readonly payId:any;
  readonly trackId:any;
  readonly paidAmount:any;
}
 
export interface subscriptionpay{
  readonly payId:any;
  readonly trackId:any;
  readonly paidAmount:any;
}
 
export interface customizepay{
  readonly payId:any;
}
 
export interface manualpay{
  readonly payId:any;
}


export interface Region{
  readonly regionsId:any
}


export interface Addsigner {
  readonly signAdminEmail :any,
  readonly signAdminMobile:any,
  readonly signAdminName:any,
  readonly createdBy:any
}

export interface Updatesigner {
  readonly signAdminEmail :any,
  readonly signAdminMobile:any,
  readonly signAdminName:any,
  readonly modifiedBy:any,
  readonly signId:any
}

export interface UpdatesignerStatus {
  readonly signId:any,
  readonly activeStatus:any
}

export interface AgreementCommerical
{
  readonly planName:any;
  readonly serviceFee:any;
  readonly createdBy:any;
  readonly netBankingAmount:any;
  readonly netBankingPercentage:any;
  readonly netBankingFixedFee:any;
  readonly rupayDebitCardMaxAmount:any;
  readonly rupayDebitCardMaxPercentage:any;
  readonly rupayDebitCardMaxFixedFee:any;
  readonly rupayDebitCardMinAmount:any;
  readonly rupayDebitCardMinPercentage:any;
  readonly rupayDebitCardMinFixedFee:any;
  readonly otherDebitCardMaxAmount:any;
  readonly otherDebitCardMaxPercentage:any;
  readonly otherDebitCardMaxFixedFee:any;
  readonly otherDebitCardMinAmount:any;
  readonly otherDebitCardMinPercentage:any;
  readonly otherDebitCardMinFixedFee:any;
  readonly eCollectAmount:any;
  readonly eCollectPercentage:any;
  readonly eCollectFixedFee:any;
  readonly disbursementApiAmount:any;
  readonly disbursementApiPercentage:any;
  readonly disbursementApiFixedFee:any;
  readonly internationalApiAmount:any;
  readonly internationApiPercentage:any;
  readonly internationApiFixedFee:any;
  readonly amexCardAmount:any;
  readonly amexCardPercentage:any;
  readonly amexCardFixedFee:any;
  readonly dinnersCardAmount:any;
  readonly dinnersCardPercentage:any;
  readonly dinnersCardFixedFee:any;
  readonly corporateOrCommercialCardAmount:any;
  readonly corporateOrCommercialCardPercentage:any;
  readonly corporateOrCommercialCardFixedFee:any;
  readonly prepaidCardAmount:any;
  readonly prepaidCardPercentage:any;
  readonly prepaidCardFixedFee:any;
  readonly walletPhonepeAmount:any;
  readonly walletPhonepePercentage:any;
  readonly walletPhonepeFixedFee:any;
  readonly walletFreeChargeAmount:any;
  readonly walletFreeChargePercentage:any;
  readonly walletFreeChargeFixedFee:any;
  readonly walletPayzappAmount:any;
  readonly walletPayzappPercentage:any;
  readonly walletPayzappFixedFee:any;
  readonly walletPaytmAmount:any;
  readonly walletPaytmPercentage:any;
  readonly walletPaytmFixedFee:any;
  readonly walletOlaMoneyAmount:any;
  readonly walletOlaMoneyPercentage:any;
  readonly walletOlaMoneyFixedFee:any;
  readonly walletMobikwikkAmount:any;
  readonly walletMobikwikkPercentage:any;
  readonly walletMobikwikkFixedFee:any;
  readonly walletRelianceJioMoneyAmount:any;
  readonly walletRelianceJioMoneyPercentage:any;
  readonly walletRelianceJioMoneyFixedFee:any;
  readonly walletAirtelMoneyAmount:any;
  readonly walletAirtelMoneyPercentage:any;
  readonly walletAirtelMoneyFixedFee:any;
  readonly upiAmount:any;
  readonly upiPercentage:any;
  readonly upiFixedFee:any;
  readonly dynamicQrAmount:any;
  readonly dynamicQrPercentage:any;
  readonly dynamicQrFixedFee:any;
  readonly creditCardAmount:any;
  readonly creditCardPercentage:any;
  readonly creditCardFixedFee:any;
 
 
}
export interface UpdateAgreementCommerical
{
  readonly planName:any;
  readonly serviceFee:any;
  readonly modifiedBy:any;
  readonly netBankingAmount:any;
  readonly netBankingPercentage:any;
  readonly netBankingFixedFee:any;
  readonly rupayDebitCardMaxAmount:any;
  readonly rupayDebitCardMaxPercentage:any;
  readonly rupayDebitCardMaxFixedFee:any;
  readonly rupayDebitCardMinAmount:any;
  readonly rupayDebitCardMinPercentage:any;
  readonly rupayDebitCardMinFixedFee:any;
  readonly otherDebitCardMaxAmount:any;
  readonly otherDebitCardMaxPercentage:any;
  readonly otherDebitCardMaxFixedFee:any;
  readonly otherDebitCardMinAmount:any;
  readonly otherDebitCardMinPercentage:any;
  readonly otherDebitCardMinFixedFee:any;
  readonly eCollectAmount:any;
  readonly eCollectPercentage:any;
  readonly eCollectFixedFee:any;
  readonly disbursementApiAmount:any;
  readonly disbursementApiPercentage:any;
  readonly disbursementApiFixedFee:any;
  readonly internationalApiAmount:any;
  readonly internationApiPercentage:any;
  readonly internationApiFixedFee:any;
  readonly amexCardAmount:any;
  readonly amexCardPercentage:any;
  readonly amexCardFixedFee:any;
  readonly dinnersCardAmount:any;
  readonly dinnersCardPercentage:any;
  readonly dinnersCardFixedFee:any;
  readonly corporateOrCommercialCardAmount:any;
  readonly corporateOrCommercialCardPercentage:any;
  readonly corporateOrCommercialCardFixedFee:any;
  readonly prepaidCardAmount:any;
  readonly prepaidCardPercentage:any;
  readonly prepaidCardFixedFee:any;
  readonly walletPhonepeAmount:any;
  readonly walletPhonepePercentage:any;
  readonly walletPhonepeFixedFee:any;
  readonly walletFreeChargeAmount:any;
  readonly walletFreeChargePercentage:any;
  readonly walletFreeChargeFixedFee:any;
  readonly walletPayzappAmount:any;
  readonly walletPayzappPercentage:any;
  readonly walletPayzappFixedFee:any;
  readonly walletPaytmAmount:any;
  readonly walletPaytmPercentage:any;
  readonly walletPaytmFixedFee:any;
  readonly walletOlaMoneyAmount:any;
  readonly walletOlaMoneyPercentage:any;
  readonly walletOlaMoneyFixedFee:any;
  readonly walletMobikwikkAmount:any;
  readonly walletMobikwikkPercentage:any;
  readonly walletMobikwikkFixedFee:any;
  readonly walletRelianceJioMoneyAmount:any;
  readonly walletRelianceJioMoneyPercentage:any;
  readonly walletRelianceJioMoneyFixedFee:any;
  readonly walletAirtelMoneyAmount:any;
  readonly walletAirtelMoneyPercentage:any;
  readonly walletAirtelMoneyFixedFee:any;
  readonly upiAmount:any;
  readonly upiPercentage:any;
  readonly upiFixedFee:any;
  readonly dynamicQrAmount:any;
  readonly dynamicQrPercentage:any;
  readonly dynamicQrFixedFee:any;
  readonly creditCardAmount:any;
  readonly creditCardPercentage:any;
  readonly creditCardFixedFee:any;
 
 
 
}
export interface CreatePlan{
  readonly merchantId:any;
  readonly commercialId:any;
  readonly createdBy:any;
  readonly merchantPosition:any;
  readonly expiryLink:any;
}

export interface AdminsignerOtp {
  readonly otpCode:any
}


export interface AgreementConsent  {
  readonly referenceCode:any,
  readonly flag:any,
  readonly consent:any
}

export interface AgreementlocationTracker {
  readonly  referenceCode:any,
  readonly flag:any,
  readonly consent:any,
  readonly getLocation:any
  readonly ipAddress:any,
  readonly locationStatus:any,
  readonly publicIp:any,
  readonly country:any,
  readonly city:any,
  readonly zip:any,
  readonly serviceProvider:any,
  readonly timezone:any,
  readonly region:any,
  readonly longitude:any,
  readonly latitude:any,
  readonly countryCode:any,
  readonly regionCode:any,
  readonly autonomousSystemNumber:any
}

export interface Agreementextentdate {
  readonly expiryLink:any
}

export interface AgreementLinkExpiry {
  readonly expiryLinkStatus:any;
}