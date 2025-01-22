export interface VerifyOtp {
  readonly otpCode: any;
}

export interface ResetPassword {
  readonly contactEmail: any;
  readonly password: any;

}

export interface CustomerRefunds {
  readonly payId: any;
  readonly customerId: any;
  readonly amount: any
}

export interface ChangePassword {
  readonly contactEmail: any;
  readonly password: any;
  readonly newPassword: any;
  readonly modifiedBy: any;
  readonly reasonForChange: any;

}


//Admin Onboard 
export interface Addadmins {
  readonly adminName: any;
  readonly email: any;
  readonly gender: any;
  readonly age: any;
  readonly mobileNumber: any;
  readonly address: any;
  readonly countryName: any;
  readonly stateName: any;
  readonly cityName: any;
  readonly pincodeName: any;
  readonly createdBy: any;
  // readonly password: any;
  readonly reqDeviceType: any
  readonly merchantId: any
  readonly merchantRoleId: any
  readonly roleType:any
}

export interface Upadteadmins {
  readonly adminName: any;
  readonly email: any;
  readonly gender: any;
  readonly age: any;
  readonly mobileNumber: any;
  readonly address: any;
  readonly countryName: any;
  readonly stateName: any;
  readonly city: any;
  readonly pincodeName: any;
  readonly modifiedBy: any;
  readonly merchantRoleId: any;
  readonly roleType:any;

}
export interface Statusadmin {
  readonly accountStatus: any;
}
export interface Addemployees {
  readonly employeeName: any;
  readonly emailAddress: any;
  readonly mobileNumber: any;
  readonly area: any;
  readonly city: any;
  readonly pincode: any;
  readonly merchantId: any;
}
export interface EmailOtpVerfiy {
  readonly emailOtpCode: any
}
export interface SmsOtpVerfiy {
  readonly smsOtpCode: any
}
export interface Tickets {
  readonly description: any;
  readonly subject: any;
  readonly ticketStatus: any;
  readonly raiseTicketId: any;
}
export interface subpermission {
  readonly permissionIds: any;

}

export interface roles {
  readonly roleName: any;
  readonly merchantPermission: any;
  readonly merchantSubPermission: any;
  readonly createdBy: any;
  readonly merchantId: any;
}

export interface updaterole {
  readonly modifiedBy: any;
  readonly roleName: any;
  readonly merchantPermission: any;
  readonly merchantSubPermission: any;
}

export interface roleStatus {
  readonly merchantRoleId: any;
  readonly status: any;
}

export interface Addonetime {
  readonly merchantId: any;
  readonly paidAmount: any
}

export interface AddWithdrawal {
  readonly merchantId: any;
  readonly tresholdId: any;
  readonly fromLedgerId: any;
  readonly toLedgerId: any;
  readonly amount: any;
  readonly type: any;
  readonly currency: any;
  readonly fee: any;
  readonly note: any;
}
export interface addbeneficiary {
  readonly employeeId: any;
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
export interface editbenificiary {
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
export interface setupStatus {
  readonly status: any;
  readonly stbId: any;
}

export  interface bookingststatus {
readonly bookingStatus:any,
readonly stbId:any,
}

export interface postsetupbox {
  readonly setupBoxNumber: any;
  readonly createdBy: any;
  readonly regionId: any;
  readonly serviceId: any;
  readonly merchantId: any
}

export interface updatesetupbox {
  readonly setupBoxNumber: any;
  readonly modifiedBy: any;
  readonly stbId: any;
  readonly regionId: any;
  readonly serviceId: any;
}


export interface setupStatus {
  readonly status: any;
  readonly stbId: any;
}

export interface postsetupbox {
  readonly setupBoxNumber: any;
  readonly createdBy: any;
}

export interface updatesetupbox {
  readonly setupBoxNumber: any;
  readonly modifiedBy: any;
  readonly stbId: any;
}
export interface setupStatus {
  readonly status: any;
  readonly stbId: any;
}

export interface postsetupbox {
  readonly setupBoxNumber: any;
  readonly createdBy: any;
}

export interface updatesetupbox {
  readonly setupBoxNumber: any;
  readonly modifiedBy: any;
  readonly stbId: any;
}

export interface employeeStatus {
  readonly activeStatus: any;
}

export interface primaryStatus {
  readonly primaryAccountStatus: any;
}

export interface routests {
  readonly activeStatus: any
}
export interface route {
  readonly streetName: any;
  readonly areaName: any;
  readonly merchantAdminId: any;
  readonly beatRole: any;
  readonly customerList: any;
  readonly merchantId: any,
  readonly pincodeName:any;
  readonly createdBy:any;
 
}
 
export interface routeupdate {
 
  readonly beatRole: any;
 
  readonly modifiedBy: any;
}
 
 




export interface PlanCalculation {
  readonly freeChannel: any;
  readonly paidChannel: any;
  readonly bouquetId: any;
}

export interface PlanCreationAdd {
  readonly freeChannel: any;
  readonly paidChannel: any;
  readonly bouquetId: any;
  readonly totalAmount: any;
  readonly price: any;
  readonly overallAmount: any;
  readonly plan: any;
  readonly createdBy: any;
  readonly merchantId: any;
}

export interface PlanStatus {
  readonly lcopId: any;
  readonly status: any;
}

export interface Freechannelstatus {
  readonly merchantFreeId: any;
  readonly freeChannelStatus: any;
}

export interface Paidchannelstatus {
  readonly merchantPaidId: any;
  readonly paidChannelStatus: any;
}

export interface BouquetsplanStatus {
  readonly merchantBouquetId: any;
  readonly bouquetChannelStatus: any;
}
// channel.interface.ts
export interface Channel {
  alcotId: number;
  channelName: string;
  channelNo: string;
  logo: string;
  type: number;
  price: number;
  language: string;
  generic: string;
  alcotStatus: number;
  createdBy: string;
  createdAt: string;
  modifiedBy: string | null;
  modifiedAt: string | null;
  region: {
    regionId: number;
    stateName: string;
    status: number;
    createdBy: string | null;
    createdAt: string;
    modifiedBy: string | null;
    modifedAt: string | null;
    service: {
      serviceId: number;
      serviceProviderName: string;
      status: number;
      createdBy: string;
      createdAt: string;
      modifiedBy: string;
      modifiedAt: string;
    };
  };
  bundleChannelId: {
    bundleChannelId: number;
    broadCasterName: string;
    status: number;
    createdBy: string;
    createdAt: string;
    modifiedBy: string;
    modifiedAt: string;
  };
}


export interface PgMakePayment {
  readonly customerPayId: any;
  readonly paidAmount: any;
}


export interface CustomerUpdate {
  readonly area: any;
  readonly customerName: any;
  readonly countryName: any;
  readonly stateName: any;
  readonly pincodeName: any;
  readonly emailAddress: any;
  readonly alterMobileNumber: any;
  readonly apartmentName: any;
  readonly doorNumber: any;
  readonly flatNumber: any;
  readonly blockNumber: any;
  readonly landmark: any;
  readonly age: any;
  readonly streetName: any;
  readonly mobileNumber: any;
  readonly houseName: any;
  readonly merchantId: any;
  // readonly stbId: any;
  readonly cityName: any;
  readonly advanceStatus: any;
  readonly advanceAmount: any;
  readonly modifiedBy: any;
  readonly freeLine: any;
  readonly customerReferenceId:any;
  readonly customerMsoId:any;
  readonly branchStatus:any;
  readonly branchId:any;
}


export interface customerbouquetadd {
  readonly customerStbId: any;
  readonly bouquetId: any;
}
export interface customeralcotadd {
  readonly customerStbId: any;
  readonly alcotId: any;
}
export interface customerlcopadd {
  readonly customerStbId: any;
  readonly lcopId: any;
}
export interface CustomerCreate {
  readonly area: any;
  readonly customerName: any;
  readonly countryName: any;
  readonly stateName: any;
  readonly pincodeName: any;
  readonly emailAddress: any;
  readonly alterMobileNumber: any;
  readonly apartmentName: any;
  readonly doorNumber: any;
  readonly flatNumber: any;
  readonly blockNumber: any;
  readonly landmark: any;
  readonly age: any;
  readonly streetName: any;
  readonly mobileNumber: any;
  readonly houseName: any;
  readonly merchantId: any;
  readonly customerReferenceId:any;
  // readonly alcotId: any;
  readonly freeLine: any;
  // readonly bouquetId: any;
  // readonly lcopId: any;
  // readonly stbId: any;
  readonly advanceStatus: any;
  readonly advanceAmount: any;
  readonly cityName: any;
  readonly createdBy: any;
  readonly customerMsoId:any;
  readonly branchStatus:any,
  readonly branchId:any,

}

export interface duespay {
  readonly maintenancePayId: any;
}


export interface lcopedit {
  readonly lcopId: any;
  readonly plan: any;
  readonly totalAmount: any;
  readonly price: any;
  readonly overallAmount:any;
  readonly modifiedBy:any;
  readonly freeChannel:any;
  readonly paidChannel:any;
  readonly bouquetId:any;
}


export interface manualpay {
  readonly paymentMethod: any;
  readonly utrNumber: any;
  readonly paymentStatus: any;
  readonly otpCode: any;
  readonly updatedBy: any;

}

export interface manuvalwithoutOTP {
  readonly paymentMethod: any;
  readonly utrNumber: any;
  readonly paymentStatus: any;
  readonly updatedBy: any;
  
}


export interface duespay {
  readonly maintenancePayId: any;
}
export interface ActiveCustomer {
  readonly activeStatus: any;
  readonly modifiedBy:any;

}
export interface ActiveCustomerSetupbox {
  readonly activeStatus: any;
  // readonly modifiedBy:any;
}


export interface tickets {
  readonly customerId: any;
  readonly merchantId: any;
  readonly mobileNumber: any;
  readonly categoryName: any;
  readonly description: any;
  readonly fileImage: any;
}

export interface ticketsedit {
  readonly raiseTicketId: any;
  readonly categoryName: any;
  readonly description: any;
  readonly mobileNumber: any;

}

export interface custticketraise {
  readonly ticketStatusModifedBy: any;
  readonly ticketStatus: any;
  readonly ticketComment: any;
}


export interface Transactiondues {
  readonly paymentStatus:any
  readonly dueStatus: any;
  readonly commentsBy: any;
  readonly comments:any;
}


export interface Privacypolicy {
  readonly policyApprovedStatus: any;
  readonly policyApprovedBy: any;
}
export interface Termspolicy {
  readonly termsConditionApprovedStatus: any;
  readonly termsConditionApprovedBy: any;
}
export interface Disclaimerpolicy {
  readonly disclaimerApprovedStatus: any;
  readonly disclaimerApprovedBy: any;
}
export interface Refundpolicy {
  readonly refundPolicyApprovedStatus: any;
  readonly refundPolicyApprovedBy: any;
}

export interface CustomerOTP {
  readonly mobileNumber: any;
  readonly otpCode: any
}

export interface resendotp {
  readonly mobileNumber: any
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

export interface OtherMakePayment {
  readonly payId: any;

}

export interface Renewal {
  readonly merchantPayId: any
}

export interface CreateSetupBoxPln {
  readonly alcotId: any;
  readonly bouquetId: any;
  readonly lcopId: any;
  readonly stbId: any;
  readonly customerId: any;
  readonly createdBy:any;
  readonly billingDate:any;


}

export interface setupboxstatus{
  readonly modifiedBy: any;
  readonly activeStatus: any;
  readonly statusRemarks: any;
}

export interface SmsApproval {
  readonly smsApprovalStatus: any;
  readonly smsApprovedBy: any;
}

export interface ActiveSms {
  readonly smsStatus: any;
  readonly modifedBy: any;
}


export interface surveyQuestionsCreate {
  readonly questions: any;
  readonly merchantId: any;
  readonly createdBy: any;
}
export interface surveyQuestionsActive {
  readonly activeStatus: any;
}
export interface surveyQuestionUpdate {
  readonly question: any;
  readonly modifiedBy: any;
}
export interface CustomerResponse {
  readonly remark: any;
  readonly quesId: any;
  readonly answer: any;
  readonly customerId: any;
}


export interface pincode{
  readonly merchantId:any;
  readonly pincodeList:any;
}
 
export interface area{
  readonly areaList:any;
  readonly pincodeList:any;
  readonly merchantId:any;
}
export interface street{
  readonly areaList:any;
  readonly pincodeList:any;
  readonly streetList:any;
  readonly merchantId:any;
}
export interface pincodeStatus
{
  readonly activeStatus:any
}
 
export interface areaStatus
{
  readonly activeStatus:any
}
export interface streetStatus
{
  readonly activeStatus:any
}
export interface customerStatus
{
  readonly activeStatus:any
}
 
export interface extraroute {
  readonly streetName: any;
  readonly areaName: any;
  readonly merchantAdminId: any;
  // readonly beatRole: any;
  readonly customerList: any;
  readonly merchantId: any,
  readonly pincodeName:any;
  readonly createdBy:any;
  readonly routeId:any;
 
}
 
export interface extraarearoute {
  readonly streetName: any;
  readonly areaName: any;
  readonly merchantAdminId: any;
  readonly customerList: any;
  readonly merchantId: any,
  readonly routePincodeId:any;
  readonly createdBy:any;
  readonly routeId:any;
 
}
 
export interface extrastreetroute {
  readonly streetName: any;
  readonly routeAreaId: any;
  readonly merchantAdminId: any;
  readonly customerList: any;
  readonly merchantId: any,
  readonly routePincodeId:any;
  readonly createdBy:any;
  readonly routeId:any;
 
}
 
export interface extracustomerroute {
  readonly routeStreetId: any;
  readonly routeAreaId: any;
  readonly merchantAdminId: any;
  readonly customerList: any;
  readonly merchantId: any,
  readonly routePincodeId:any;
  readonly createdBy:any;
  readonly routeId:any;
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


export interface OffilneTransaction{
  readonly merchantId:any;
  readonly pageNo:any;
  readonly  query:any;
  readonly size:any;
  readonly dateRange:any;
  readonly status:any;
  readonly terminalId:any;
}

export interface UpdateCustomerdues{
  readonly paidAmount:any;
  readonly modifiedBy:any;
  readonly reason:any;
}

export interface CreatePincode{
  readonly createdBy:any;
  readonly pincodeList:any;
}
 
export interface updatePincode{
  readonly merchantPincodeId:any;
  readonly merchantId:any;
  readonly modifiedBy:any;
  readonly pincodeNumber:any;
 
}
 
export interface PincodeStatus{
  readonly status:any;
}
 
export interface createArea{
  readonly merchantPincodeId:any;
  readonly createdBy:any;
  readonly areaList:any;
 
}
export interface updateArea{
  readonly merchantPincodeId:any;
  readonly merchantAreaId:any;
  readonly merchantId:any;
  readonly modifiedBy:any;
  readonly areaName:any;
 
}
export interface AreaStatus{
  readonly status:any;
}
 
 
export interface StreetStatusActive{
  readonly status:any;
}
 
export interface createStreet{
  readonly merchantAreaId:any;
  readonly createdBy:any;
  readonly streetList:any;
 
}
 
export interface updateStreet{
  readonly merchantStreetId:any;
  readonly merchantAreaId:any;
  readonly merchantId:any;
  readonly modifiedBy:any;
  readonly streetName:any;
 
}

export interface additonalpay{
  readonly payId:any;
}

export interface createCategory{
  readonly createdBy:any;
  readonly serviceName:any;
  readonly merchantId:any;
 
}
 
export interface updateCategory{
  readonly modifiedBy:any;
  readonly serviceName:any;
 
}
 
export interface categoryActiveStatus{
  readonly activeStatus:any;
 
}
 
export interface AdditionalPaycreate{
  readonly customerId:any;
  readonly additionalCategoryId:any;
  readonly createdBy:any;
  readonly paidAmount:any;
 
}
 
export interface AdditionalPayUpdate{
  readonly additionalCategoryId:any;
  readonly modifiedBy:any;
  readonly paidAmount:any;
}
export interface DuePendingSetupbx{
  readonly stbInputs:any;
}
 
 
export interface PaymentStatusSetupbx{
  readonly stbInputs:any;
  readonly paymentStatus:any;
}
export interface employeefilter{
 
  readonly paymentStatus:any;
}
 
 
export interface PaymentStatusUpdate{
  readonly payId:any;
  readonly paymentStatus:any;
  readonly updatedBy:any;

}
export interface customerId{
  readonly cusStbRefIds:any;
}
export interface customerMonthManual{
  readonly merchantId:any;
  readonly customersId:any;
}
export interface customerfullManual{
  readonly merchantId:any;
  readonly customersId:any;
}
export interface EditSetUpbox{
  readonly stbId:any;
  readonly modifiedBy:any;
}
export interface UnblockAdmin{
  readonly merchantAdminId:any;
 
}


export interface ActiveInactiveCustomer{
  readonly  activeStatus:any,
  readonly modifiedBy:any,
  readonly statusRemarks:any
}

export interface duestatusonoff
{
  readonly dueStatus:any;
  readonly billingMode:any;
  readonly createdBy:any;
}

export interface remainderstatus
{
  readonly dueMethod:any;
  readonly activatedDate:any;
  readonly inactivatedDate:any;
  readonly description:any;
}
export interface duegenertes
{
  readonly merchantId:any;
  readonly stbNumber:any;
 
}


export interface  getiplocation {
  readonly ip:any
}


export interface Lcopfreechannelstatus {
  readonly merchantFreeId:any;
  readonly freeChannelStatus:any;
}

export interface Lcoppaidchannelstatus {
  readonly merchantPaidId:any;
  readonly paidChannelStatus:any;
}

export interface LcopBouquetestatus {
  readonly merchantBouquetId:any;
  readonly bouquetChannelStatus:any;
}

export interface LCOPcalculationforEdit {
  readonly freeChannel:any;
  readonly paidChannel:any;
  readonly bouquetId:any;
}
 