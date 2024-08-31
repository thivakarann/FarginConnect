
export interface Businessadd{
    readonly categoryName:any;
    readonly mccCode:any;
    readonly createdBy:any;
  }


  export interface Businessedit{
    readonly categoryName:any;
    readonly mccCode:any;
    readonly modifiedBy:any;
  }

 export interface Businessstatus{
    readonly activeStatus:any;
  
 }

 export interface Businesskycstatus{
  readonly activeStatus:any;
 }


 export interface Businesskycadd{
  readonly businessCategoryId:any;
  readonly kycDocName:any;
  readonly createdBy:any;
}


export interface Businesskycedit{
  readonly kycDocName:any;
  readonly businessCategoryId:any;
  readonly modifiedBy:any;
}
export interface addentity {
    
    readonly entityName: any;
    readonly merchantLegalName: any;
    readonly accountDisplayName:any;
    readonly contactName:any;
    readonly contactMobile:any;
    readonly secondaryMobile:any;
    readonly contactEmail:any;
    readonly gstIn:any;
    readonly billingAddress:any;
    readonly area:any;
    readonly zipcode:any;
    readonly stateName:any;
    readonly city:any;
    readonly contactPerson:any;
    readonly country:any;
    readonly locationServed:any;
    readonly serviceOffered:any;
    readonly businessCategoryId:any;
    readonly mccCode:any;

}

export interface AddEntityBank {
    readonly accountHolderName:any;
    readonly accountNumber:any;
    readonly bankName:any;
    readonly ifscCode:any;
    readonly branchName:any;
    readonly accountType:any;
    readonly merchantId:any;
}

export interface  VerifyOtp{
  readonly emailAddress:any;
  readonly otpCode:any;
}
export interface ResetPassword{
  readonly emailAddress:any;
  readonly newPassword:any;
}

export interface ResendOtp{
  readonly emailAddress:any;

}
export interface ChangePassword{
  readonly userPassword:any;
  readonly newPassword:any;
}



