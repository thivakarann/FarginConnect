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

  private readonly Entitygetall = 'merchant/getall'
  private readonly AddEntity = 'merchant/create'
  private readonly EntityKYCBYbusinessid = 'businesskyc/getcategorykyc/'
  private readonly Entityviewbyid = 'merchant/getmerchants/'

  //entity bank

  private readonly EntityBankAdd = 'merchantbank/create';
  private readonly EntityBankEdit = 'merchantbank/updatebank/';
  private readonly bankprimarystatus = 'merchantbank/updateprimaryaccount/';
  private readonly bankactivestatus = 'merchantbank/updateactive/'
  private readonly EntityBankApproval = 'merchantbank/updatebankapproval/';


  //kyc documents

  private readonly editkyc = 'merchantdocument/update';
  private readonly kycdocument = 'merchantdocument/viewimage/';
  private readonly kycapproval = 'merchantdocument/updateapproval/';
  private readonly kycadd = 'merchantdocument/create';
  // private readonly EntityKYCBYbusinessid = 'businesskyc/viewbyid/';
  private readonly Kycdocname = 'businesskyc/getcategorykyc/';


  //Level1 Approval

  private readonly merchantlevel1 = 'merchantapproval/approvalLvl1';
  private readonly merchantlevel2 = 'Merchantapproval/approvalLvl2/';

  //facheck verification

  private readonly bankverify = 'facheck/bankverify';
  private readonly bankgetfacheck = 'facheck/bankres/';

  private readonly aadharverify = 'facheck/aadhaarVerify';
  private readonly panverify = 'facheck/panVerify';
  private readonly passportverify = 'facheck/passportVerify';
  private readonly cinchverify = 'facheck/cinVerify';

  private readonly drivinglicense = 'facheck/drivingLicenseVerify';
  private readonly gstnumber = 'facheck/merchantGstVerify';



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


  // Alcarte Creation 

  private readonly alcartvieall = 'alcotchannel/viewAll';
  private readonly alcartAdd = 'alcotchannel/addalcot';
  private readonly alcartviewbyid = 'alcotchannel/getById/';
  private readonly alcartstatus = 'alcotchannel/updateStatus';
  private readonly activealcards = 'alcotchannel/viewOnlyActive';
  private readonly Alcartupdate = 'alcotchannel/update';
  private readonly Alcartchannellogo = 'alcotchannel/viewLogo/';
  private readonly AlcartChannellogoUpdate = 'alcotchannel/updateLogo'

  // Broadcaster Name Creation

  private readonly BoucatenameViewall = 'bundleChannel/getallChannel';
  private readonly BoucatenameAdd = 'bundleChannel/addbouquet';
  private readonly Boutenamebyid = 'bundleChannel/getChannelId/';
  private readonly BoutenameUpdate = 'bundleChannel/update';
  private readonly Boucatenamestatus = 'bundleChannel/updateStatus';
  private readonly BoucateGetactive = 'bundleChannel/viewOnlyActive'


  //Broadcaster Bouquete name creation

  private readonly Bouquetenameviewall = 'bouquetCreation/viewAll';
  private readonly Bouquetenameadd = 'bouquetCreation/add';
  private readonly Bouquetenamebyid = 'bouquetCreation/viewById/';
  private readonly Bouquetenameupdate = 'bouquetCreation/update';
  private readonly Bouquetenamestatus = 'bouquetCreation/updateStatus';
  private readonly Bouquetenameactive = 'bouquetCreation/viewOnlyActive';

  // Broadcaster  Bouquete Creation

  private readonly bouquetsviewall = 'broadCaster/getall';
  private readonly Bouquetadd = 'broadCaster/add';
  private readonly Bouquetsviewbyid = 'broadCaster/getById/';
  private readonly Bouquetstatus = 'broadCaster/updateStatus';
  private readonly ActiveBouqutes = 'broadCaster/viewOnlyActive';
  private readonly bouquetEdit = 'broadCaster/update';

  // DPO Bouquete Creation

  private readonly DPOBouqueteViewall = 'dpoBouquet/viewAll';
  private readonly DPOBouqueteadd = 'dpoBouquet/create ';
  private readonly DPOBouqueteviewbyid = 'dpoBouquet/viewid/';
  private readonly DPOBouqueteUpdate = 'dpoBouquet/update/';
  private readonly DPOBouquetestatus = 'dpoBouquet/updateStatus/';
  private readonly DPOActiveBouqutes = 'dpoBouquet/viewOnlyActive';







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





  EntityGetKYCbybussinessid(id: any) {
    return this.http.get(`${this.basePath}${this.EntityKYCBYbusinessid}${id}`, this.options)
  }

  // EntityAddKyc(formdata: FormData) {
  //   return this.http.post(`${this.basePath}${this.AddEntityKYC}`, formdata, this.optionsMultipart)
  // }

  EntityViewbyid(id: any) {
    return this.http.get(`${this.basePath}${this.Entityviewbyid}${id}`, this.options)
  }

  //bank

  EntitybankAdd(model: any) {
    return this.http.post(`${this.basePath}${this.EntityBankAdd}`, model, this.options)
  }

  EntitybankEdit(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.EntityBankEdit}${id}`, model, this.options)
  }
  BankActiveStatus(id: any, data: any) {
    return this.http.put(`${this.basePath}${this.bankactivestatus}${id}`, data, this.options);
  }

  BankprimaryStatus(id: any, data: any) {
    return this.http.put(`${this.basePath}${this.bankprimarystatus}${id}`, data, this.options);
  }


  EntityBankApprovals(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.EntityBankApproval}${id}`, model, this.options)
  }


  //kyc document
  KycAdd(data: any) {
    return this.http.post(`${this.basePath}${this.kycadd}`, data, this.optionsMultipart);
  }

  KycUpdate(data: any) {
    return this.http.put(`${this.basePath}${this.editkyc}`, data, this.optionsMultipart);
  }
  getImageview(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.kycdocument}${id}/${id1}`, {
      ...this.options,
      ...{ responseType: 'blob' }
    })
  }

  KycApproval(id: any, data: any) {
    return this.http.put(`${this.basePath}${this.kycapproval}${id}`, data, this.options);
  }

  KycDocName(id: any) {
    return this.http.get(`${this.basePath}${this.Kycdocname}${id}`, this.options)
  }


  //Level one Approval
  MerchantLevelApprovalOne(Model: any) {
    return this.http.put(`${this.basePath}${this.merchantlevel1}`, Model, this.options);
  }
  MerchantLevel2ApprovalTwo(id: any, data: any) {
    return this.http.put(`${this.basePath}${this.merchantlevel2}${id}`, data, this.options);
  }
  //Bank Verification
  BankVerification(data: any) {
    return this.http.post(`${this.basePath}${this.bankverify}`, data, this.options);
  }
  BankVerificationResponse(id: any) {
    return this.http.get(`${this.basePath}${this.bankgetfacheck}${id}`, this.options)
  }
  //Facheck

  FacheckAadharVerification(data: any) {
    return this.http.post(`${this.basePath}${this.aadharverify}`, data, this.options);
  }
  FacheckPanVerification(data: any) {
    return this.http.post(`${this.basePath}${this.panverify}`, data, this.options);
  }
  FacheckPassportVerification(data: any) {
    return this.http.post(`${this.basePath}${this.passportverify}`, data, this.options);
  }
  FacheckLicenseVerification(data: any) {
    return this.http.post(`${this.basePath}${this.drivinglicense}`, data, this.options);
  }
  FacheckGSTVerification(data: any) {
    return this.http.post(`${this.basePath}${this.gstnumber}`, data, this.options);
  }
  FacheckCinchVerification(data: any) {
    return this.http.post(`${this.basePath}${this.cinchverify}`, data, this.options);
  }

  // BankprimaryStatus(id: any, model: any) {
  //   return this.http.put(`${this.basePath}${this.BankPrimaryStatus}${id}`, model, this.options)
  // }

  // EntityBankApprovals(id: any, model: any) {
  //   return this.http.put(`${this.basePath}${this.EntityBankApproval}${id}`, model, this.options)
  // }




  Alcartviewall() {
    return this.http.get(`${this.basePath}${this.alcartvieall}`, this.options)
  }

  AlcardAdd(Formdata: FormData) {
    return this.http.post(`${this.basePath}${this.alcartAdd}`, Formdata, this.optionsMultipart)
  }

  AlcardUpdate(model: any) {
    return this.http.put(`${this.basePath}${this.Alcartupdate}`, model, this.optionsMultipart)
  }

  Alcardviewbyid(id: any) {
    return this.http.get(`${this.basePath}${this.alcartviewbyid}${id}`, this.options)
  }

  AlcardStatus(model: any) {
    return this.http.put(`${this.basePath}${this.alcartstatus}`, model, this.options)
  }

  AlcartImageview(id: any) {
    return this.http.get(`${this.basePath}${this.Alcartchannellogo}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    })
  }

  AlcartImageUpdate(formdata: FormData) {
    return this.http.put(`${this.basePath}${this.AlcartChannellogoUpdate}`, formdata, this.optionsMultipart)
  }

  ActiveAlcards() {
    return this.http.get(`${this.basePath}${this.activealcards}`, this.options)
  }


  BouquetnameViewall() {
    return this.http.get(`${this.basePath}${this.BoucatenameViewall}`, this.options)
  }

  BouquetAdd(model: any) {
    return this.http.post(`${this.basePath}${this.BoucatenameAdd}`, model, this.options)
  }

  Bouquetnamebyid(id: any) {
    return this.http.get(`${this.basePath}${this.Boutenamebyid}${id}`, this.options)
  }

  BouquetnameUpdate(model: any) {
    return this.http.put(`${this.basePath}${this.BoutenameUpdate}`, model, this.options)
  }

  Bouquetstatusforbroadcaster(model: any) {
    return this.http.put(`${this.basePath}${this.Boucatenamestatus}`, model, this.options)
  }

  BoucatenamesActive() {
    return this.http.get(`${this.basePath}${this.BoucateGetactive}`, this.options)
  }

  //Broadcaster Bouquete name creation

  Bouqetenameviewall (){
    return this.http.get(`${this.basePath}${this.Bouquetenameviewall}`,this.options)
  }

  BouquetenameAdd(model:any){
   return this.http.post(`${this.basePath}${this.Bouquetenameadd}`,model,this.options)
  }

  Bouquetenameupdatae(model:any){
    return this.http.put(`${this.basePath}${this.Bouquetenameupdate}`,model,this.options)
  }

  Bouquenamebyid(id:any){
    return this.http.get(`${this.basePath}${this.Bouquetenamebyid}${id}`,this.options)
  }

  Bouquetnamestatus(model:any){
    return this.http.put(`${this.basePath}${this.Bouquetenamestatus}`,model,this.options)
  }

  BouquetenameActive(){
    return this.http.get(`${this.basePath}${this.Bouquetenameactive}`,this.options)
  }





  BroadcasterBoucateviewall() {
    return this.http.get(`${this.basePath}${this.bouquetsviewall}`, this.options)
  }

  BroadcasterBoucateadd(model: any) {
    return this.http.post(`${this.basePath}${this.Bouquetadd}`, model, this.options)
  }

  BroadcasterBoucatebyid(id: any) {
    return this.http.get(`${this.basePath}${this.Bouquetsviewbyid}${id}`, this.options)
  }

  BroadcasterBoucateStatus(model: any) {
    return this.http.put(`${this.basePath}${this.Bouquetstatus}`, model, this.options)
  }

  ActiveBroadcasterBoucates() {
    return this.http.get(`${this.basePath}${this.ActiveBouqutes}`, this.options)
  }

  BroadcasterBoucatesEdit(Model: any) {
    return this.http.put(`${this.basePath}${this.bouquetEdit}`, Model, this.options)
  }

  DPOViewall() {
    return this.http.get(`${this.basePath}${this.DPOBouqueteViewall}`, this.options)
  }

  DPOAdd(model: any) {
    return this.http.post(`${this.basePath}${this.DPOBouqueteadd}`, model, this.options)
  }

  DPObyid(id: any) {
    return this.http.get(`${this.basePath}${this.DPOBouqueteviewbyid}${id}`, this.options)
  }

  DPOUpdate(model: any) {
    return this.http.put(`${this.basePath}${this.DPOBouqueteUpdate}`, model, this.options)
  }

  DpoStatus(model: any) {
    return this.http.put(`${this.basePath}${this.DPOBouquetestatus}`, model, this.options)
  }

  ActiveDPO() {
    return this.http.get(`${this.basePath}${this.DPOActiveBouqutes}`, this.options)
  }




}