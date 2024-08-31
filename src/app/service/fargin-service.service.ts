import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, map, observable } from 'rxjs';
import { SessionServiceService } from '../Session service/session-service.service';
import { Businessadd, Businessedit, Businesskycadd, Businesskycedit, Businesskycstatus, Businessstatus, ChangePassword, ResetPassword, ticket, VerifyOtp } from '../Fargin Model/fargin-model/fargin-model.module';
// import { ChangePassword, ResetPassword, VerifyOtp } from '../fargin-model/fargin-model.module';


@Injectable({
  providedIn: 'root'
})
export class FarginServiceService {

  constructor(private http: HttpClient,
    private router: Router, private timerService: SessionServiceService) { }

  private readonly basePath = 'http://64.227.149.125:8085/'; //Basepath

// login
  private readonly adminlogin = 'adminUser/adminlogin';
private readonly forgotpassword = 'adminUser/verifyEmail';
  private readonly verifyotp = 'adminUser/verifyOtp';
  private readonly resendotp='adminUser/resendOtp';
  private readonly resetpassword = 'adminUser/reset';

//change password
  private readonly changepassword = 'adminUser/changePassword/';
  
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

  BusinessCreate(model:Businessadd){
    return this.http.post(`${this.basePath}${this.businesscategoryAdd}`,model,this.options);
  }


  BusinessEdit(id:any,model:Businessedit){
    return this.http.put(`${this.basePath}${this.businesscategoryEdit}${id}`,model,this.options)
  }

  Businessactive(id:any,model:Businessstatus){
    return this.http.put(`${this.basePath}${this.businesscategorystatus}${id}`,model,this.options)
  }

//business category kyc
BusinesscategoryKyc(){
  return this.http.get(`${this.basePath}${this.businesscategorykycget}`,this.options);
}

BusinesskycActive(id:any,model:Businesskycstatus){
  return this.http.put(`${this.basePath}${this.businesscategorykycactive}${id}`,model,this.options)
}

BusinesskycCreate(model:Businesskycadd){
  return this.http.post(`${this.basePath}${this.businesskycAdd}`,model,this.options);
}

BusinesscategoryKycactive(){
  return this.http.get(`${this.basePath}${this.businesskycdocactive}`,this.options);
}


Businesskycupdate(id:any,model:Businesskycedit){
  return this.http.put(`${this.basePath}${this.businesskycupdate}${id}`,model,this.options)
}

  getForgotPassword(data: any) {
    return this.http.post(`${this.basePath}${this.forgotpassword}`, data, this.options)
  }
  VerifyOtp(data: VerifyOtp) {
    return this.http.post(`${this.basePath}${this.verifyotp}`, data, this.options)
  }
  ResendOtp(data: any) {
    return this.http.post(`${this.basePath}${this.resendotp}`, data, this.options)
  }
  
    ResetPassword(data: ResetPassword) {
    return this.http.post(`${this.basePath}${this.resetpassword}`, data, this.options)
  }
  ChangePassword(id: any, data: ChangePassword) {
    return this.http.put(`${this.basePath}${this.changepassword}${id}`, data, this.options)
  }



  viewTicket() {
    return this.http.get(`${this.basePath}${this.viewallTicket}`, this.options);
  }

  updatetickets(id: any, model: ticket) {
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

  subPermission(model: subpermission) {
    return this.http.post(`${this.basePath}${this.getsubPermission}`, model, this.options)
  }

  addRoles(model: role) {
    return this.http.post(`${this.basePath}${this.addRole}`, model, this.options)
  }

  rolesStatus(model:roleactiveInactive){
    return this.http.put(`${this.basePath}${this.roleStatus}`, model, this.options)
  }

  viewRoles(){
    return this.http.get(`${this.basePath}${this.viewallRoles}`, this.options)
  }

  viewPermissionSubPermission(id:any){
    return this.http.get(`${this.basePath}${this.viewPermissionSubpermission}${id}`, this.options)
  }
}
