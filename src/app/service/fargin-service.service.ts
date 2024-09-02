import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FarginServiceService {

  constructor(private http: HttpClient,
    private router: Router) { }

  private readonly basePath = 'http://64.227.149.125:8085/'; //Basepath

  // login
  private readonly adminlogin = 'adminUser/adminlogin';
  private readonly forgotpassword = 'adminUser/verifyEmail';
  private readonly verifyotp = 'adminUser/verifyOtp';
  private readonly resendotp='adminUser/resendOtp';
  private readonly resetpassword = 'adminUser/reset';

  //change password
  private readonly changepassword = 'adminUser/changePassword/';


  //Admin Creation
//business category
  private readonly businesscategoryget = 'businesscategory/getall'; 
  private readonly businesscategoryAdd = 'businesscategory/create';
  private readonly businesscategoryEdit = 'businesscategory/update/'; 
  private readonly businesscategorystatus ='businesscategory/updateactive/'; 

  //Business KYC
  private readonly businesscategorykycget = 'businesskyc/getall'; 
  private readonly businesscategorykycactive = 'businesskyc/updateactive/'; 
  private readonly businesskycAdd = 'businesskyc/create'; 
  private readonly businesskycdocactive = 'businesscategory/getallactive'; 
  private readonly businesskycupdate='businesskyc/update/';
  
  //Ticket
  private readonly viewallTicket = 'tickets/getall';
  private readonly updateTicket = 'tickets/updateapproval/';
  private readonly viewTicketImage = 'tickets/viewimage/';

  //Roles & Permission
  private readonly permissiongetall = 'permission/activepermission';
  private readonly getsubPermission = 'subpermission/getpermissionlist';
  private readonly addRole = 'role/create';
  private readonly roleStatus='role/updatestatus';
  private readonly viewallRoles='role/viewall';
  private readonly viewPermissionSubpermission='role/viewpermission/';

  //Admin Policy
  private readonly adminpolicy = 'policy/getallpolicy'; 
  private readonly Adminpolicycreate = 'policy/createpolicy'; 
  private readonly Adminpolicyedit= 'policy/updateadminpolicy/';
  private readonly adminpolicyviewbyidedit= 'policy/getpolicy/';

  private readonly admingetall='adminUser/viewall';
  private readonly adminstatus='adminUser/updateStatus';
  private readonly admincreate='adminUser/addUser';
  private readonly adminupdate='adminUser/update';
  private readonly adminview='adminUser/viewById/';



  loginError = new Subject();

  gettoken = localStorage.getItem('token');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    X_ACCESS_TOKEN: `Bearer ${this.gettoken ? JSON.parse(localStorage.getItem('token') || '') : null
      }`,
  });

  headersMultipart = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    X_ACCESS_TOKEN: `Bearer ${this.gettoken ? JSON.parse(localStorage.getItem('token') || '') : null
      }`,
  });
  options = { headers: this.headers };
  optionsMultipart = { headers: this.headersMultipart };


  getLogin(email: string, password: string) {
    const credentialBody = {
      emailAddress: email,
      userPassword: password,
    };

    return this.http.post(`${this.basePath}${this.adminlogin}`, credentialBody).subscribe((res: any) => {
      if (res.flag == 1) {
        localStorage.setItem('token', JSON.stringify(res.response.login_history.adminUser.jwtResponse.X_ACCESS_TOKEN));
        localStorage.setItem('adminid', JSON.stringify(res.response.login_history?.adminUser?.adminUserId));
        localStorage.setItem('adminname', JSON.stringify(res.response.login_history?.adminUser?.adminName));
        localStorage.setItem('emailaddress', JSON.stringify(res.response.login_history?.adminUser?.emailAddress));
        localStorage.setItem('address', JSON.stringify(res.response.login_history?.adminUser?.address));
        localStorage.setItem('mobilenumber', JSON.stringify(res.response.login_history?.adminUser?.mobileNumber));
        localStorage.setItem('lastlogin', JSON.stringify(res.response.login_history?.adminUser?.lastLogin));
	      localStorage.setItem('fullname', JSON.stringify(res.response.login_history?.adminUser?.createdBy));
        localStorage.setItem('roleId', JSON.stringify(res.response.login_history?.adminUser?.roleModel?.roleId));
        location.href = '/dashboard';
      }
      else {
        this.loginError.next(res.responseMessage);

      }

    });
  }
//business category

  Businesscategory(){
    return this.http.get(`${this.basePath}${this.businesscategoryget}`,this.options);
  }

  BusinessCreate(model:any){
    return this.http.post(`${this.basePath}${this.businesscategoryAdd}`,model,this.options);
  }


  BusinessEdit(id:any,model:any){
    return this.http.put(`${this.basePath}${this.businesscategoryEdit}${id}`,model,this.options)
  }

  Businessactive(id:any,model:any){
    return this.http.put(`${this.basePath}${this.businesscategorystatus}${id}`,model,this.options)
  }

//business category kyc
BusinesscategoryKyc(){
  return this.http.get(`${this.basePath}${this.businesscategorykycget}`,this.options);
}

BusinesskycActive(id:any,model:any){
  return this.http.put(`${this.basePath}${this.businesscategorykycactive}${id}`,model,this.options)
}

BusinesskycCreate(model:any){
  return this.http.post(`${this.basePath}${this.businesskycAdd}`,model,this.options);
}

BusinesscategoryKycactive(){
  return this.http.get(`${this.basePath}${this.businesskycdocactive}`,this.options);
}


Businesskycupdate(id:any,model:any){
  return this.http.put(`${this.basePath}${this.businesskycupdate}${id}`,model,this.options)
}
  getForgotPassword(data: any) {
    return this.http.post(`${this.basePath}${this.forgotpassword}`, data, this.options)
  }
  VerifyOtp(data: any) {
    return this.http.post(`${this.basePath}${this.verifyotp}`, data, this.options)
  }
  ResendOtp(data: any) {
    return this.http.post(`${this.basePath}${this.resendotp}`, data, this.options)
  }
  ResetPassword(data: any) {
    return this.http.post(`${this.basePath}${this.resetpassword}`, data, this.options)
  }
  ChangePassword(id: any, data: any) {
    return this.http.put(`${this.basePath}${this.changepassword}${id}`, data, this.options)
  }

 
  GetAdminDetails(){
    return this.http.get(`${this.basePath}${this.admingetall}`,this.options);
  }
  UpdateAdminStatus(data:any){
    return this.http.put(`${this.basePath}${this.adminstatus}`,data,this.options);
  }
viewTicket() {
    return this.http.get(`${this.basePath}${this.viewallTicket}`, this.options);
  }

  updatetickets(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.updateTicket}${id}`, model, this.options)
  }

  viewticketImage(id: string) {
    return this.http.get(`${this.basePath}${this.viewTicketImage}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    });
  }


  //Roles and permission

  permissionget() {
    return this.http.get(`${this.basePath}${this.permissiongetall}`, this.options)
  }

  subPermission(model: any) {
    return this.http.post(`${this.basePath}${this.getsubPermission}`, model, this.options)
  }

  addRoles(model: any) {
    return this.http.post(`${this.basePath}${this.addRole}`, model, this.options)
  }

  rolesStatus(model:any){
    return this.http.put(`${this.basePath}${this.roleStatus}`, model, this.options)
  }

  viewRoles(){
    return this.http.get(`${this.basePath}${this.viewallRoles}`, this.options)
  }

  viewPermissionSubPermission(id:any){
    return this.http.get(`${this.basePath}${this.viewPermissionSubpermission}${id}`, this.options)
  }


//privacy policy
  
adminPolicyget(){
  return this.http.get(`${this.basePath}${this.adminpolicy}`,this.options);
}

adminpolicycreate(model:any){
  return this.http.post(`${this.basePath}${this.Adminpolicycreate}`,model,this.options);
}

adminpolicyedit(id: any, data: any) {
  return this.http.put(`${this.basePath}${this.Adminpolicyedit}${id}`, data, this.options)
}

Adminpolicyviewbyidedit(id:any){
  return this.http.get(`${this.basePath}${this.adminpolicyviewbyidedit}${id}`,this.options);
}
  AdminCreate(data:any){
    return this.http.post(`${this.basePath}${this.admincreate}`,data,this.options);
  }
  AdminUpdate(data:any){
    return this.http.put(`${this.basePath}${this.adminupdate}`,data,this.options);
  }
  AdminView(id:any){
    return this.http.get(`${this.basePath}${this.adminview}${id}`,this.options);
  }
 
}