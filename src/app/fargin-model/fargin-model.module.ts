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
  readonly userPassword: any;
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
}





export interface Businessadd {
  readonly categoryName: any;
  readonly mccCode: any;
  readonly createdBy: any;
}


export interface Businessedit {
  readonly categoryName: any;
  readonly mccCode: any;
  readonly modifiedBy: any;
}

export interface Businessstatus {
  readonly activeStatus: any;

}

export interface Businesskycstatus {
  readonly activeStatus: any;
}


export interface Businesskycadd {
  readonly businessCategoryId: any;
  readonly kycDocName: any;
  readonly createdBy: any;
}


export interface Businesskycedit {
  readonly kycDocName: any;
  readonly businessCategoryId: any;
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

}


export interface BankStatus {
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
  readonly bankName: any;
  readonly ifscCode: any;
  readonly branchName: any;
  readonly accountType: any;
  readonly merchantId: any;
}

export interface bankedit {
  readonly accountHolderName: any;
  readonly accountNumber: any;
  readonly bankName: any;
  readonly ifscCode: any;
  readonly branchName: any;
  readonly accountType: any;
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
  readonly adminUserId: any;
}


export interface AdminPolicyEdit {
  readonly termAndCondition: any;
  readonly disclaimer: any;
  readonly privacyPolicy: any;
  readonly refundPolicy: any;
  readonly createdBy: any;
  readonly modifiedBy: any;
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
}

export interface RegionStatus {
  readonly regionId: any;
  readonly status: any;
}

export interface RegionEdit {
  readonly serviceId: any;
  readonly regionId: any;
  readonly stateName: any;
}


//Service provider

export interface Providerstatus {
  readonly serviceId: any;
  readonly status: any;
}

export interface Providercreate {
  readonly companyName: any;
  readonly mobileNumber: any;
  readonly emailAddress: any;
  readonly location: any;
  readonly serviceProviderName: any;
  readonly createdBy: any;
}

export interface Providerupdate {
  readonly companyName: any;
  readonly mobileNumber: any;
  readonly emailAddress: any;
  readonly location: any;
  readonly serviceProviderName: any;
  readonly modifiedBy: any;
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
  readonly broadCaster: any;
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


export interface BroadcasterBouquetadd {
  readonly bundleChannelId: any;
  readonly alcotId: any;
  readonly amount: any;
  readonly bouquetName: any;
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

export interface DPOCrate {
  readonly bundleChannelId: any;
  readonly alcotId: any;
  readonly region: any;
  readonly plan: any;
  readonly broardCaste: any;
  readonly amount: any;

}

export interface DPOStatus {
  readonly status: any;
}

export interface DPOUpdate {
  readonly amount: any;
  readonly broardCaste: any;
}



export interface BouquetNameadd {
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






