import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { BankPrimaryStatus } from '../fargin-model/fargin-model.module';


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
  private readonly resendotp = 'adminUser/resendOtp';
  private readonly resetpassword = 'adminUser/reset';

  //change password
  private readonly changepassword = 'adminUser/changePassword/';


  //Admin Creation
  //business category
  private readonly businesscategoryget = 'businesscategory/getall';
  private readonly businesscategoryAdd = 'businesscategory/create';
  private readonly businesscategoryEdit = 'businesscategory/update/';
  private readonly businesscategorystatus = 'businesscategory/updateactive/';

  //Business KYC
  private readonly businesscategorykycget = 'businesskyc/getall';
  private readonly businesscategorykycactive = 'businesskyc/updateactive/';
  private readonly businesskycAdd = 'businesskyc/create';
  private readonly businesskycdocactive = 'businesscategory/getallactive';
  private readonly businesskycupdate = 'businesskyc/update/';

  //Ticket
  private readonly viewallTicket = 'tickets/getall';
  private readonly updateTicket = 'tickets/updateapproval/';
  private readonly viewTicketImage = 'tickets/viewimage/';

  //Roles & Permission
  private readonly permissiongetall = 'permission/activepermission';
  private readonly getsubPermission = 'subpermission/getpermissionlist';
  private readonly addRole = 'role/create';
  private readonly roleStatus = 'role/updatestatus';
  private readonly viewallRoles = 'role/viewall';
  private readonly viewPermissionSubpermission = 'role/viewpermission/';


  //Admin Policy
  private readonly adminpolicy = 'policy/getallpolicy';
  private readonly Adminpolicycreate = 'policy/createpolicy';
  private readonly Adminpolicyedit = 'policy/updateadminpolicy/';
  private readonly adminpolicyviewbyidedit = 'policy/getpolicy/';

  private readonly admingetall = 'adminUser/viewall';
  private readonly adminstatus = 'adminUser/updateStatus';
  private readonly admincreate = 'adminUser/addUser';
  private readonly adminupdate = 'adminUser/update';
  private readonly adminview = 'adminUser/viewById/';

  // Entity Details

  private readonly Entitygetall = 'merchant/getall '
  private readonly AddEntity = 'merchant/create'
  private readonly AddEntityBank = 'merchantbank/create'
  private readonly EntityKYCBYbusinessid = 'businesskyc/viewbyid/'
  private readonly AddEntityKYC = 'merchantdocument/create'
  private readonly Entityviewbyid = 'merchant/getmerchants/'
  private readonly BankPrimaryStatus = 'merchantbank/updateprimaryaccount/'
  private readonly EntityBankApproval = 'merchantbank/updatebankapproval/'


  //Region
  private readonly Regionget = 'region/viewAllRegion';
  private readonly Regiongetallactive = 'region/viewOnlyActive';
  private readonly Regioncreate = 'region/addRegion';
  private readonly regionstatus = 'region/updateStatus';
  private readonly regionupdate = 'region/update';


  //service provider
  private readonly providergetall = 'serviceProvider/viewAllProvider';
  private readonly providercreate = 'serviceProvider/createProvider';
  private readonly providerupdate = 'serviceProvider/update';
  private readonly providerstatus = 'serviceProvider/updateStatus';
  private readonly providergetbyid = 'serviceProvider/viewByservice/';


  //Facheckkey
  private readonly addfacheckkey = 'facheckkey/create'
  private readonly viewfacheckkey = 'facheckkey/getall'
  private readonly updatefacheckkey = 'facheckkey/update/'
  private readonly statusfacheckkey = 'facheckkey/updatestatus/'



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

  Businesscategory() {
    return this.http.get(`${this.basePath}${this.businesscategoryget}`, this.options);
  }

  BusinessCreate(model: any) {
    return this.http.post(`${this.basePath}${this.businesscategoryAdd}`, model, this.options);
  }


  BusinessEdit(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.businesscategoryEdit}${id}`, model, this.options)
  }

  Businessactive(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.businesscategorystatus}${id}`, model, this.options)
  }

  //business category kyc
  BusinesscategoryKyc() {
    return this.http.get(`${this.basePath}${this.businesscategorykycget}`, this.options);
  }

  BusinesskycActive(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.businesscategorykycactive}${id}`, model, this.options)
  }

  BusinesskycCreate(model: any) {
    return this.http.post(`${this.basePath}${this.businesskycAdd}`, model, this.options);
  }

  BusinesscategoryKycactive() {
    return this.http.get(`${this.basePath}${this.businesskycdocactive}`, this.options);
  }


  Businesskycupdate(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.businesskycupdate}${id}`, model, this.options)
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

  GetAdminDetails() {
    return this.http.get(`${this.basePath}${this.admingetall}`, this.options);
  }
  UpdateAdminStatus(data: any) {
    return this.http.put(`${this.basePath}${this.adminstatus}`, data, this.options);
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

  rolesStatus(model: any) {
    return this.http.put(`${this.basePath}${this.roleStatus}`, model, this.options)
  }

  viewRoles() {
    return this.http.get(`${this.basePath}${this.viewallRoles}`, this.options)
  }

  viewPermissionSubPermission(id: any) {
    return this.http.get(`${this.basePath}${this.viewPermissionSubpermission}${id}`, this.options)
  }


  //privacy policy

  adminPolicyget() {
    return this.http.get(`${this.basePath}${this.adminpolicy}`, this.options);
  }

  adminpolicycreate(model: any) {
    return this.http.post(`${this.basePath}${this.Adminpolicycreate}`, model, this.options);
  }

  adminpolicyedit(id: any, data: any) {
    return this.http.put(`${this.basePath}${this.Adminpolicyedit}${id}`, data, this.options)
  }

  Adminpolicyviewbyidedit(id: any) {
    return this.http.get(`${this.basePath}${this.adminpolicyviewbyidedit}${id}`, this.options);
  }
  AdminCreate(data: any) {
    return this.http.post(`${this.basePath}${this.admincreate}`, data, this.options);
  }
  AdminUpdate(data: any) {
    return this.http.put(`${this.basePath}${this.adminupdate}`, data, this.options);
  }
  AdminView(id: any) {
    return this.http.get(`${this.basePath}${this.adminview}${id}`, this.options);
  }
  Bussinesscategoryactivelist() {
    return this.http.get(`${this.basePath}${this.businesskycdocactive}`, this.options)
  }

  //Region

  RegionGet() {
    return this.http.get(`${this.basePath}${this.Regionget}`, this.options)
  }

  RegionGetAllActive() {
    return this.http.get(`${this.basePath}${this.Regiongetallactive}`, this.options)
  }


  RegionCreate(model: any) {
    return this.http.post(`${this.basePath}${this.Regioncreate}`, model, this.options)
  }

  RegionStatus(model: any) {
    return this.http.put(`${this.basePath}${this.regionstatus}`, model, this.options)
  }

  RegionEdit(model: any) {
    return this.http.put(`${this.basePath}${this.regionupdate}`, model, this.options)
  }

  //service provider
  ServiceProviderView() {
    return this.http.get(`${this.basePath}${this.providergetall}`, this.options);
  }
  ServiceProviderCreate(data: any) {
    return this.http.post(`${this.basePath}${this.providercreate}`, data, this.options);
  }

  ServiceProviderUpdate(data: any) {
    return this.http.put(`${this.basePath}${this.providerupdate}`, data, this.options);
  }
  UpdateProviderStatus(data: any) {
    return this.http.put(`${this.basePath}${this.providerstatus}`, data, this.options);
  }

  ProviderViewById(id: any) {
    return this.http.get(`${this.basePath}${this.providergetbyid}${id}`, this.options);
  }


  //FA Check key
  addfacheck(model: any) {
    return this.http.post(`${this.basePath}${this.addfacheckkey}`, model, this.options)
  }
  viewfacheck() {
    return this.http.get(`${this.basePath}${this.viewfacheckkey}`, this.options)
  }
  statusfacheck(model: any) {
    return this.http.post(`${this.basePath}${this.statusfacheckkey}`, model, this.options)
  }
  updatefacheck(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.updatefacheckkey}${id}`, model, this.options)
  }



  EntityViewall() {
    return this.http.get(`${this.basePath}${this.Entitygetall}`, this.options)
  }

  EntityAdd(model: any) {
    return this.http.post(`${this.basePath}${this.AddEntity}`, model, this.options)
  }

  EntityAddBank(model: any) {
    return this.http.post(`${this.basePath}${this.AddEntityBank}`, model, this.options)
  }

  EntityGetKYCbybussinessid(id: any) {
    return this.http.get(`${this.basePath}${this.EntityKYCBYbusinessid}${id}`, this.options)
  }

  EntityAddKyc(formdata: FormData) {
    return this.http.post(`${this.basePath}${this.AddEntityKYC}`, formdata, this.options)
  }

  EntityViewbyid(id: any) {
    return this.http.get(`${this.basePath}${this.Entityviewbyid}${id}`, this.options)
  }

  BankprimaryStatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.BankPrimaryStatus}${id}`, model, this.options)
  }

  EntityBankApprovals(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.EntityBankApproval}${id}`, model, this.options)
  }
}