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