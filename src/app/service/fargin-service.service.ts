import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { BankPrimaryStatus } from '../fargin-model/fargin-model.module';
import { SessionServiceService } from '../Session service/session-service.service';
import { json } from 'stream/consumers';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class FarginServiceService {

  constructor(private http: HttpClient,
    private router: Router, private timerService: SessionServiceService, private toastr: ToastrService) { }

  // private readonly basePath = 'https://staging-api.farginconnect.com/'; 
  private readonly basePath = 'https://api.fargin.in/';

  // private readonly basePath = 'http://64.227.149.125:8085/'

  // login

  private readonly adminlogin = 'adminUser/adminlogin';
  private readonly forgotpassword = 'adminUser/verifyEmail';
  private readonly verifyotp = 'adminUser/verifyOtp';
  private readonly resendotp = 'adminUser/resendOtp';
  private readonly resetpassword = 'adminUser/reset';

  //change password
  private readonly changepassword = 'adminUser/changePassword/';





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
  private readonly updateRole = 'role/updaterole/';
  private readonly rolegetByid = 'role/viewbyid/';


  //Admin Policy
  private readonly adminpolicy = 'policy/viewallmerchant/2';
  private readonly Adminpolicycreate = 'policy/createmerchantpolicy';
  private readonly Adminpolicyedit = 'policy/updatemerchant/';
  private readonly adminpolicyviewbyidedit = 'policy/getpolicy/';
  private readonly policymerchant = 'merchant/approvedMerchant';
  private readonly policiesbyid = 'policy/getpolicy/';
  private readonly policyapproval = 'policy/updateStatus/';


  private readonly admingetall = 'adminUser/viewall';
  private readonly adminstatus = 'adminUser/updateStatus';
  private readonly admincreate = 'adminUser/addUser';
  private readonly adminupdate = 'adminUser/update';
  private readonly adminview = 'adminUser/viewById/';
  private readonly roleactiveviewall = 'role/viewactive';

  // Entity Details

  private readonly Entitygetall = 'merchant/getall'
  private readonly AddEntity = 'merchant/create'
  private readonly EntityKYCBYbusinessid = 'businesskyc/getcategorykyc/'
  private readonly Entityviewbyid = 'merchant/getmerchants/';
  private readonly updateEntity = 'merchant/updateMerchant/';
  private readonly entityactivestatus = 'merchant/updateStatus';
  private readonly emailtrigger = 'merchantOnboard/resendmail';
  private readonly merchantlogo = 'merchant/updateimage ';
  private readonly keysupdate = 'merchant/updateKey';
  private readonly paymentlink = 'paymentlink/getmerchant/';
  private readonly businessid = 'businesscategory/getById/';
  private readonly manualreciept = 'merchantpay/viewreceipt/';
  private readonly entitykyc = 'entityDocument/addDocuments'




  //Overall customer
  private readonly Overallcustomer = 'customer/viewByAll';
  private readonly Entityindividualcustomerview = 'customer/viewById/';
  private readonly viewcustomerbasicdetails = 'customer/viewcustomer/';
  private readonly viewSetupboxDetails = 'customer/viewcustomerstb/';
  private readonly viewsetupboxplan = 'customer/viewcustomerstbplan/';
  private readonly activestatussetupbox = 'customer/updateStbStatus/';
  private readonly activecustomerplan = 'customerplan/updatestatus/';

  //entity bank

  private readonly EntityBankAdd = 'merchantbank/create';
  private readonly EntityBankEdit = 'merchantbank/updatebank/';
  private readonly bankprimarystatus = 'merchantbank/updateprimaryaccount/';
  private readonly bankactivestatus = 'merchantbank/updateactive/'
  private readonly EntityBankApproval = 'merchantbank/updatebankapproval/';


  //kyc documents

  private readonly editkyc = 'merchantdocument/update';
  private readonly kycdocument = 'entityDocument/viewDocuments/';
  private readonly kycapproval = 'merchantdocument/updateapproval/';
  private readonly kycadd = 'merchantdocument/create';
  // private readonly EntityKYCBYbusinessid = 'businesskyc/viewbyid/';
  private readonly Kycdocname = 'businesskyc/getcategorykyc/';


  //Level1 Approval

  private readonly merchantlevel1 = 'merchantapproval/approvalLvl1';
  private readonly merchantlevel2 = 'merchantapproval/approvalLvl2/';

  //facheck verification

  private readonly bankverify = 'facheck/bankverify';
  private readonly bankgetfacheck = 'facheck/bankres/';

  private readonly aadharverify = 'facheck/aadhaarVerify';
  private readonly panverify = 'facheck/panVerify';
  private readonly passportverify = 'facheck/passportVerify';
  private readonly cinchverify = 'facheck/cinVerify';

  private readonly drivinglicense = 'facheck/drivingLicenseVerify';
  private readonly gstnumber = 'facheck/merchantGstVerify';
  private readonly voterId = 'facheck/voteridVerify';

  //facheck verification response

  private readonly drivinglicenseinfo = 'facheck/drivingLicense/';
  private readonly voteridinfo = 'facheck/voterid/';
  private readonly gstinfo = 'facheck/merchantGst/';
  private readonly passportinfo = 'facheck/passport/';
  private readonly cinchinfo = 'facheck/cin/';
  private readonly aadharinfo = 'facheck/aadhar/';
  private readonly paninfo = 'facheck/pan/';

  //facheck verification response
  // private readonly facheckresponse = 'facheck/getkycId/';

  //pG on board
  private readonly pgonboard = 'merchantOnboard/onboard';

  //customers
  private readonly Entitycustomerview = 'customer/viewbymerchant/';
  private readonly customerview = 'customer/viewById/';
  private readonly customertransaction = 'customerpay/viewcustomers/';

  //QRcode
  private readonly EntityQrgenerate = 'merchant/qrgenerate/';
  private readonly qrimageview = 'merchant/qrViewImage/';

  //refund
  private readonly EntityRefund = 'refund/getmerchant/'

  //settlement
  private readonly EntitySettlement = 'transactions/getPayouts'
  private readonly EntitySettlementtransaction = 'transactions/getPayoutTransactions'


  //Entity Transaction
  private readonly entitytransaction = 'paymentHistory/viewByMerchant/';

  //merchant transaction
  private readonly transactionformerchant = 'transactions/getadminPaymentList';

  //Region
  private readonly Regionget = 'region/viewAllRegion';
  private readonly Regiongetallactive = 'region/viewOnlyActive';
  private readonly Regioncreate = 'region/addRegion';
  private readonly regionstatus = 'region/updateStatus';
  private readonly regionupdate = 'region/update';
  private readonly ActiveRegions = 'region/viewOnlyActive';
  private readonly ActiveRegionbyServiceid = 'region/viewByService/'


  //service provider
  private readonly providergetall = 'serviceProvider/viewAllProvider';
  private readonly providercreate = 'serviceProvider/createProvider';
  private readonly providerupdate = 'serviceProvider/update';
  private readonly providerstatus = 'serviceProvider/updateStatus';
  private readonly providergetbyid = 'serviceProvider/viewByservice/';
  private readonly Activeprovider = 'serviceProvider/viewActive';


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
  private readonly BouquetenamebyBoueteid = 'bouquetCreation/viewByBroadCasterId/'

  // Broadcaster  Bouquete Creation

  private readonly bouquetsviewall = 'broadCaster/getall';
  private readonly Bouquetadd = 'broadCaster/add';
  private readonly Bouquetsviewbyid = 'broadCaster/getById/';
  private readonly Bouquetstatus = 'broadCaster/updateStatus';
  private readonly ActiveBouqutes = 'broadCaster/viewOnlyActive';
  private readonly bouquetEdit = 'broadCaster/update';
  private readonly bouquetesinglestatus = 'broadCaster/updateChannelStatus';
  private readonly AddChannelsbyBouquete = 'broadCaster/addextraChannel'

  // DPO Bouquete Creation

  private readonly DPOBouqueteViewall = 'dpoBouquet/viewAll';
  private readonly DPOBouqueteadd = 'dpoBouquet/create';
  private readonly DPOBouqueteviewbyid = 'dpoBouquet/viewid/';
  private readonly DPOBouqueteUpdate = 'dpoBouquet/update/';
  private readonly DPOBouquetestatus = 'dpoBouquet/updateStatus/';
  private readonly DPOActiveBouqutes = 'dpoBouquet/viewOnlyActive';
  private readonly DPOSinglechannelstatus = 'dpoBouquet/updateChannelStatus';


  // Merchant Plan Creation

  private readonly Merchantplanviewall = 'merchantplan/getall';
  private readonly MerchantplanAdd = 'merchantplan/create';
  private readonly MerchantplanUpdate = 'merchantplan/update/';
  private readonly MerchantplanStatus = 'merchantplan/updateactive/';
  private readonly MerchantActivePlans = 'merchantplan/getallactive';


  //PGsetup
  private readonly pgsetupget = 'pgmode/getall';
  private readonly pgsetupstatus = 'pgmode/updatestatus/';
  private readonly pgsetupadd = 'pgmode/add';
  private readonly pgsetupedit = 'pgmode/update/';


  //Withdrawal
  private readonly viewwithdrawal = 'tresHold/getall';
  private readonly addwithdrawal = 'tresHold/create';
  private readonly editwithdrawal = 'tresHold/update/';
  private readonly statuswithdrawal = 'tresHold/updateStatus/'


  //Beneficiary
  private readonly addbeneficiary = 'merchantbeneficiary/create'
  private readonly viewbeneficiary = 'merchantbeneficiary/getall'
  private readonly viewbyidbeneficiary = 'merchantbeneficiary/viewbyid/'
  private readonly statusbeneficiary = 'merchantbeneficiary/updateactive/'

  //payment dues
  private readonly paymentdues = 'maintanancePay/viewAll'
  private readonly generatedues = 'maintanancePay/createDues'
  private readonly maintenance = 'maintanancePay/receiptView/'

  //Dashboard
  private readonly dashboardData = 'dashBoard/dashBoardCount'
  private readonly dashboardbusinessgetall = 'businesscategory/getall'
  private readonly dashboardbusinesscategorybyid = 'dashBoard/businessCategory/'
  private readonly dashboardtransaction = 'dashBoard/transaction/'

  //unblock account
  private readonly unblockaccount = 'adminUser/unBlockAccount/';


  //unblock entity account
  private readonly unblockentityaccount = 'merchant/unBlockAccount/';
  //manual payment
  private readonly updatemanualpay = 'merchant/updateManualPayment/';
  private readonly createmanualpay = 'merchantpay/manualPayment';
  private readonly manualpayget = 'merchantpay/viewMerchant/';
  private readonly manualtransaction = 'transhistory/viewMerchantPay/';




  //Fargin terms and policy
  private readonly viewtermspolicy = 'policy/getallpolicy';
  private readonly addtermspolicy = 'policy/createpolicy';
  private readonly edittermspolicy = 'policy/updateadminpolicy/';
  private readonly viewbyidpolicy = 'policy/getpolicy/';


  //Dahboard
  private readonly dashboarddaytransaction = 'dashBoardd/overDayTotalTransactionsAmount';
  private readonly dashboardlastssevendays = 'dashBoardd/over7DayTotalTransactionsAmount';
  private readonly dashboardfifteendays = 'dashBoardd/fifteendays';
  private readonly dashboardthirtydays = 'dashBoard/thirtydays';
  private readonly dashboardlastmonth = 'dashBoardd/lastMonthTotalTransactionsAmount';
  private readonly dashboardthismonth = 'dashBoardd/thisMonthTotalTransactionsAmount'
  private readonly dashboardcustomrange = 'dashBoard/transaction/';
  private readonly dashboardoverall = 'dashBoardd/totalTransactionsAmount';
  private readonly dashboardoverallmerchantid = 'dashBoardd/totalTransactionsAmount/';
  private readonly dashboardoverallamount = 'dashBoard/overallTransactionsAmount';
  private readonly dashboardoverallonetime = 'dashBoard/overallOneTimeTransactionsAmount';
  private readonly dashboardsevendaysamount = 'dashBoardd/over7dayAmounts'


  //Tickets
  private readonly ticketsget = 'customerTickets/getall';
  private readonly customerticketraise = 'customerTickets/updateTicketStatus/'


  // Bank Details Main Master

  private readonly BankdetailsViewall = 'bankDetails/viewAllBank';
  private readonly AddBankDetails = 'bankDetails/addBank';
  private readonly EditBankdetails = 'bankDetails/update';
  private readonly Bankdetailsviewbyid = 'bankDetails/viewById/';
  private readonly ActiveBankDetails = 'bankDetails/viewOnlyActive';
  private readonly Bankdetailsstatus = 'bankDetails/updateStatus';


  //transactions
  private readonly customeralltransactions = 'customerpay/viewAllPayments';
  private readonly customerdatefilter = 'paymentHistory/getDateFilter/';
  private readonly customertransactionview = 'customerpay/viewbyid/'

  //merchant
  private readonly maintenancetransaction = 'maintanancePay/viewAll';
  private readonly maintenancetransactionview = 'maintanancePay/viewById/';
  private readonly maintenancedatefilter = 'maintanancePay/dateFilter/';

  //onetime
  private readonly onetimtransaction = 'merchantpay/viewAll';
  private readonly onetimtransactionview = 'merchantpay/viewpayment/';
  private readonly onetimdatefilter = 'transhistory/getDateWise/';

  // QR Creation API,S

  private readonly QrcreateName = 'merchant/qrnamegenerate/';
  private readonly QrCreationimage = 'merchant/qrgenerate';

  //other payment
  private readonly otherpaymentmerchantid = 'otherpayment/viewByMerchant/';
  private readonly otherpaymentcreate = 'otherpayment/create';
  private readonly otherpayment = 'otherpayment/viewall';
  private readonly otherpaymentupdate = 'otherpayment/update/';
  private readonly otherpaytrans = 'otherpayment/viewByPayId/';
  private readonly otherpaymentdate = 'otherpayment/dateFilter/';
  private readonly otherpaymentviewall = 'merchantdue/getall';


  // KYC category
  private readonly viewallkyccategory = 'kycCategory/getall';
  private readonly addkyccategory = 'kycCategory/addCategory';
  private readonly editkyccategory = 'kycCategory/update';
  private readonly statuskyccategory = 'kycCategory/statusUpdate';
  private readonly activeviewall = 'kycCategory/viewOnlyActive'

  private readonly kycviewall = 'entityDocument/viewAll'
  private readonly identityfront = 'entityDocument/identityFront';
  private readonly identityback = 'entityDocument/identityBack';
  private readonly addressfront = 'entityDocument/addressFront'
  private readonly addressback = 'entityDocument/addressBack';
  private readonly signaturefront = 'entityDocument/signatureFront';
  private readonly signatureback = 'entityDocument/signatureBack';
  private readonly editidentity = 'entityDocument/updateIdentity';
  private readonly editaddress = 'entityDocument/updateAddress';
  private readonly editsignature = 'entityDocument/updateSignature';
  private readonly identityapproval = 'entityDocument/approvalForidentity';
  private readonly addressapproval = 'entityDocument/approvalForAddress';
  private readonly signatureapproval = 'entityDocument/approvalForSignature';
  private readonly facheckresponse = 'merchantFacheck/getById/';


  //facheck verification
  private readonly adharverifyidentity = 'merchantFacheck/identityAadharVerify';
  private readonly adharverifyaddress = 'merchantFacheck/addressAadharVerify';
  private readonly adharverifysignature = 'merchantFacheck/signatureAadharVerify';

  private readonly panverifyIdentity = 'merchantFacheck/identityPanVerify';
  private readonly panverifyaddress = 'merchantFacheck/addressPanVerify'
  private readonly panverifySignature = 'merchantFacheck/signaturePanVerify';

  private readonly passportverifyIdentity = 'merchantFacheck/identityPassportVerify';
  private readonly passportverifyAddress = 'merchantFacheck/addressPassportVerify';
  private readonly passportverifySignature = 'merchantFacheck/signaturePassportVerify'

  private readonly cinverifyIdentity = 'merchantFacheck/identityCinVerify';
  private readonly cinverifyAddress = 'merchantFacheck/addressCinVerify';
  private readonly cinverifysignature = 'merchantFacheck/signatureCinVerify'

  private readonly gstverifyIdentity = 'merchantFacheck/identityGstVerify';
  private readonly gstverifyaddress = 'merchantFacheck/addressGstVerify';
  private readonly gstverifysignature = 'merchantFacheck/signatureGstVerify';

  private readonly voterverifyidentity = 'merchantFacheck/identityVoterVerify';
  private readonly voterverifyaddress = 'merchantFacheck/addressVoterVerify';
  private readonly voterverifysignature = 'merchantFacheck/signatureVoterVerify';

  private readonly drivingverfiyIdentity = 'merchantFacheck/identityDrivingVerify';
  private readonly drivingverifyAddress = 'merchantFacheck/addressDrivingVerify';
  private readonly drivingverifysignature = 'merchantFacheck/signatureDrivingVerify';



  //farginbank
  private readonly farginview = 'adminBankDetails/getBankDetails';
  private readonly fargincreate = 'adminBankDetails/createbankdetails';
  private readonly farginstatus = 'adminBankDetails/updateStatus/';
  private readonly farginEdit = 'adminBankDetails/createbankdetails';


  //sms settings
  private readonly smscreate = 'merchantSms/createSms';
  private readonly smsviewbyId = 'merchantSms/getMerchantSms/';
  private readonly smsstatus = 'merchantSms/updateStatus/';
  private readonly editsms = 'merchantSms/updateMerchantSms/';
  private readonly smsgetAll = 'merchantSms/getAllMerchantSms';
  private readonly smsdropdown = 'merchantSms/viewsms';
  private readonly smscount = 'smshistory/viewbymerchantandtype/';
  private readonly smsapproval = 'merchantSms/updateApproval/';

  //sms history
  private readonly smshistory = 'smshistory/viewall';
  private readonly smshistoryview = 'smshistory/viewbymerchant/';
  private readonly smshistoryfilter = 'smshistory/viewallfilter/';
  private readonly smshistorymerchantfilter = 'smshistory/viewmerchantfilter/';
  private readonly logout = 'adminUser/logout';


  // Overall trans Receipt

  private readonly customerreceipt = 'customerpay/viewReceipt/';
  private readonly otherpayReciept = 'otherpayment/viewinvoice/';

  //bussiness document
  private readonly documentadd = 'merchantdocument/create';
  private readonly documentedit = 'merchantdocument/updateData';
  private readonly documentapproval = 'merchantdocument/updateapproval/';
  private readonly documentImage = 'merchantdocument/viewimage/';
  private readonly documentfrontedit = 'merchantdocument/updateFrontPath'
  private readonly documentbackedit = 'merchantdocument/updateBacPath'

  // SMS Cost Setup

  private readonly SMSCostviewall = 'smsConfig/getAmountDetails'
  private readonly SMSCostadd = 'smsConfig/addAndUpdateAmount'
  private readonly SMSCostStatus = 'smsConfig/updateStatus/'

  // Auto Debit

  private readonly Autodebitgetall = 'merchantdue/getall';
  private readonly Autodebitbymerchat = 'merchantdue/viewbymerchant/';


  //anouncement
  private readonly announcementadd = 'announcement/add'
  private readonly announcementviewall = 'announcement/getall'
  private readonly announcementedit = 'announcement/update'
  private readonly announcementstatus = 'announcement/updateStatus'
  private readonly announcementdate = 'announcement/dateFilter/';

  //customer payment
  private readonly customerpayment = 'customerpay/trackApi';
  private readonly subscriptionpayment = 'maintanancePay/trackApi';
  private readonly customizationpayment = 'otherpayment/trackApi';
  private readonly manualpayment = 'merchantpay/trackApi';


  private readonly surveyviewall = 'surveyQuestion/getAll';
  private readonly surveyviewbyid = 'surveyQuestion/getQuestions/';
  private readonly viewbyidcustomerresponse = 'customerResponse/viewQuestion/';

  //total  plan amount
  private readonly customerplanamaount = 'customer/viewcustomertotalamount/'



  //customer logo
  private readonly customerlogo = 'customerTickets/updatedocument';
  private readonly customerlogoview = 'customerTickets/viewimage/';
  private readonly otherpaymentviewbyid = 'otherpayment/viewbyid/';



  loginError = new Subject();

  token = localStorage.getItem('token') || null;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    X_ACCESS_TOKEN: `Bearer ${this.token ? JSON.parse(localStorage.getItem('token') || '') : null
      }`,
  });

  headersMultipart = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    X_ACCESS_TOKEN: `Bearer ${this.token ? JSON.parse(localStorage.getItem('token') || '') : null
      }`,
  });
  options = { headers: this.headers };
  optionsMultipart = { headers: this.headersMultipart };

  getToken() {
    return !!localStorage.getItem('token');
  }

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

        this.router.navigateByUrl('/dashboard/dashboard-content', {
          replaceUrl: true,
        });
        this.timerService.restartTimer();
        setTimeout(() => {
          window.location.reload();
        }, 200);

        this.toastr.success(res.responseMessage)
        // location.href = '/dashboard/dashboard-content';   need to add After login

      }
      else if (res.flag == 2) {
        this.toastr.error(res.responseMessage)
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    });
  }


  dashboardCount() {
    return this.http.get(`${this.basePath}${this.dashboardData}`, this.options)
  }
  dashboardbusinessgetalls() {
    return this.http.get(`${this.basePath}${this.dashboardbusinessgetall}`, this.options)
  }
  dashboardbusinesscategorybyids(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardbusinesscategorybyid}${id}`, this.options)
  }
  dashboardtransactions(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.dashboardtransaction}${id}/${id1}/${id2}/${id3}`, this.options)
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

  editRole(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.updateRole}${id}`, model, this.options)
  }
  rolegetById(id: any) {
    return this.http.get(`${this.basePath}${this.rolegetByid}${id}`, this.options)
  }

  //privacy policy

  Policymerchant() {
    return this.http.get(`${this.basePath}${this.policymerchant}`, this.options)
  }


  Policiesgetbyid(id: any) {
    return this.http.get(`${this.basePath}${this.policiesbyid}${id}`, this.options)
  }

  ApprovalForPolicy(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.policyapproval}${id}`, model, this.options)
  }
  adminPolicyget() {
    return this.http.get(`${this.basePath}${this.adminpolicy}`, this.options)
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

  roleactiveViewall() {
    return this.http.get(`${this.basePath}${this.roleactiveviewall}`, this.options)
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

  ActiveRegionsbyserviceprovider(id: any) {
    return this.http.get(`${this.basePath}${this.ActiveRegionbyServiceid}${id}`, this.options)
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

  Activeregions() {
    return this.http.get(`${this.basePath}${this.ActiveRegions}`, this.options)
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

  activeprovider() {
    return this.http.get(`${this.basePath}${this.Activeprovider}`, this.options)
  }


  //FA Check key
  addfacheck(model: any) {
    return this.http.post(`${this.basePath}${this.addfacheckkey}`, model, this.options)
  }
  viewfacheck() {
    return this.http.get(`${this.basePath}${this.viewfacheckkey}`, this.options)
  }
  statusfacheck(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.statusfacheckkey}${id}`, model, this.options)
  }
  updatefacheck(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.updatefacheckkey}${id}`, model, this.options)
  }





  EntityViewall() {
    return this.http.get(`${this.basePath}${this.Entitygetall}`, this.options)
  }

  EntityAdd(formdata: any) {
    return this.http.post(`${this.basePath}${this.AddEntity}`, formdata, this.optionsMultipart)
  }

  UpdatePersonalEntity(id: any, formdata: any) {
    return this.http.put(`${this.basePath}${this.updateEntity}${id}`, formdata, this.optionsMultipart)
  }


  //email trigger
  EmailTrigger(data: any) {
    return this.http.post(`${this.basePath}${this.emailtrigger}`, data, this.options);
  }



  EntitylogoUpdate(data: FormData) {
    return this.http.put(`${this.basePath}${this.merchantlogo}`, data, this.optionsMultipart);
  }

  KeysUpdate(model: any) {
    return this.http.put(`${this.basePath}${this.keysupdate}`, model, this.options)
  }


  paymentLinkview(id: any) {
    return this.http.get(`${this.basePath}${this.paymentlink}${id}`, this.options)
  }






  EntityGetKYCbybussinessid(id: any) {
    return this.http.get(`${this.basePath}${this.EntityKYCBYbusinessid}${id}`, this.options)
  }

  ManualRecieptView(id: any) {
    return this.http.get(`${this.basePath}${this.manualreciept}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    })
  }

  // EntityAddKyc(formdata: FormData) {
  //   return this.http.post(`${this.basePath}${this.AddEntityKYC}`, formdata, this.optionsMultipart)
  // }

  EntityViewbyid(id: any) {
    return this.http.get(`${this.basePath}${this.Entityviewbyid}${id}`, this.options)
  }

  EntityActiveStatus(model: any) {
    return this.http.put(`${this.basePath}${this.entityactivestatus}`, model, this.options)
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
  entitykycs(formdata: FormData) {
    return this.http.post(`${this.basePath}${this.entitykyc}`, formdata, this.optionsMultipart)
  }
  KycAdd(data: any) {
    return this.http.post(`${this.basePath}${this.kycadd}`, data, this.optionsMultipart);
  }

  KycUpdate(data: any) {
    return this.http.post(`${this.basePath}${this.editkyc}`, data, this.optionsMultipart);
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


  FacheckVoterIdVerification(data: any) {
    return this.http.post(`${this.basePath}${this.voterId}`, data, this.options);
  }


  //verification response

  // FacheckVerificationResponse(id: any) {
  //   return this.http.get(`${this.basePath}${this.facheckresponse}${id}`, this.options)
  // }

  EntityBusinessCategoryId(id: any) {
    return this.http.get(`${this.basePath}${this.businessid}${id}`, this.options)
  }



  //verification response

  AaadharVerificationResponse(id: any) {
    return this.http.get(`${this.basePath}${this.aadharinfo}${id}`, this.options)
  }
  PanVerificationResponse(id: any) {
    return this.http.get(`${this.basePath}${this.paninfo}${id}`, this.options)
  }
  PassportVerificationResponse(id: any) {
    return this.http.get(`${this.basePath}${this.passportinfo}${id}`, this.options)
  }
  CinchVerificationResponse(id: any) {
    return this.http.get(`${this.basePath}${this.cinchinfo}${id}`, this.options)
  }
  GstVerificationResponse(id: any) {
    return this.http.get(`${this.basePath}${this.gstinfo}${id}`, this.options)
  }
  VoterIdVerificationResponse(id: any) {
    return this.http.get(`${this.basePath}${this.voteridinfo}${id}`, this.options)
  }
  DrivingLicenseVerificationResponse(id: any) {
    return this.http.get(`${this.basePath}${this.drivinglicenseinfo}${id}`, this.options)
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

  //manual payment


  UpdateManualPayment(id: any, data: any) {
    return this.http.put(`${this.basePath}${this.updatemanualpay}${id}`, data, this.options);

  }

  CreateManualPayment(data: any) {
    return this.http.post(`${this.basePath}${this.createmanualpay}`, data, this.options);

  }

  GetManualPay(id: any) {
    return this.http.get(`${this.basePath}${this.manualpayget}${id}`, this.options)
  }
  GetManualTransaction(id: any) {
    return this.http.get(`${this.basePath}${this.manualtransaction}${id}`, this.options)
  }

  //pg onboard
  PgOnboard(model: any) {
    return this.http.post(`${this.basePath}${this.pgonboard}`, model, this.options)
  }
  //customer

  EntityCustomerview(id: any) {
    return this.http.get(`${this.basePath}${this.Entitycustomerview}${id}`, this.options)
  }

  ViewCustomerDetails(id: any) {
    return this.http.get(`${this.basePath}${this.customerview}${id}`, this.options)
  }

  CustomerTransaction(id: any) {
    return this.http.get(
      `${this.basePath}${this.customertransaction}${id}`,
      this.options
    );
  }
  //entity transaction

  EntityTraansaction(id: any) {
    return this.http.get(`${this.basePath}${this.entitytransaction}${id}`, this.options)
  }

  TransactionForMerchant(model: any) {
    return this.http.post(`${this.basePath}${this.transactionformerchant}`, model, this.options)
  }

  //qr

  EntityQrGenerate(id: any) {
    return this.http.get(`${this.basePath}${this.EntityQrgenerate}${id}`, this.options)
  }

  QRImageView(id: any) {
    return this.http.get(`${this.basePath}${this.qrimageview}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    })
  }
  //refund
  Entityrefund(id: any) {
    return this.http.get(`${this.basePath}${this.EntityRefund}${id}`, this.options)
  }

  //settlement
  Entitysettlement(model: any) {
    return this.http.post(`${this.basePath}${this.EntitySettlement}`, model, this.options);
  }
  entitySettleTransaction(model: any) {
    return this.http.post(`${this.basePath}${this.EntitySettlementtransaction}`, model, this.options);
  }


  //Withdrawal Method
  viewwithdrawals() {
    return this.http.get(`${this.basePath}${this.viewwithdrawal}`, this.options)
  }
  addwithdrawals(model: any) {
    return this.http.post(`${this.basePath}${this.addwithdrawal}`, model, this.options)
  }
  editwithdrawals(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.editwithdrawal}${id}`, model, this.options)
  }

  statuswithdrawals(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.statuswithdrawal}${id}`, model, this.options)
  }



  //Beneficiary
  addbeneficiarys(model: any) {
    return this.http.post(`${this.basePath}${this.addbeneficiary}`, model, this.options)
  }
  viewbeneficiarys() {
    return this.http.get(`${this.basePath}${this.viewbeneficiary}`, this.options)
  }
  viewbyidbeneficiarys(id: any) {
    return this.http.get(`${this.basePath}${this.viewbyidbeneficiary}${id}`, this.options)
  }

  statusbeneficiarys(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.statusbeneficiary}${id}`, model, this.options)
  }




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

  Bouqetenameviewall() {
    return this.http.get(`${this.basePath}${this.Bouquetenameviewall}`, this.options)
  }

  BouquetenameAdd(model: any) {
    return this.http.post(`${this.basePath}${this.Bouquetenameadd}`, model, this.options)
  }

  Bouquetenameupdatae(model: any) {
    return this.http.put(`${this.basePath}${this.Bouquetenameupdate}`, model, this.options)
  }

  Bouquenamebyid(id: any) {
    return this.http.get(`${this.basePath}${this.Bouquetenamebyid}${id}`, this.options)
  }

  Bouquetnamestatus(model: any) {
    return this.http.put(`${this.basePath}${this.Bouquetenamestatus}`, model, this.options)
  }

  BouquetenameActive() {
    return this.http.get(`${this.basePath}${this.Bouquetenameactive}`, this.options)
  }

  BouqueteNameByBroadcasterid(id: any) {
    return this.http.get(`${this.basePath}${this.BouquetenamebyBoueteid}${id}`, this.options)
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

  BroadcasterSingleStatus(model: any) {
    return this.http.put(`${this.basePath}${this.bouquetesinglestatus}`, model, this.options)
  }

  AddExtraChannelsforBouquete(model: any) {
    return this.http.post(`${this.basePath}${this.AddChannelsbyBouquete}`, model, this.options)
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

  DpoStatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.DPOBouquetestatus}${id}`, model, this.options)
  }

  ActiveDPO() {
    return this.http.get(`${this.basePath}${this.DPOActiveBouqutes}`, this.options)
  }

  DpoSingleChannelStatus(model: any) {
    return this.http.put(`${this.basePath}${this.DPOSinglechannelstatus}`, model, this.options)
  }

  //Merchant plan creation


  merchantplanviewall() {
    return this.http.get(`${this.basePath}${this.Merchantplanviewall}`, this.options)
  }

  merchantplanadd(model: any) {
    return this.http.post(`${this.basePath}${this.MerchantplanAdd}`, model, this.options)
  }

  merchantplanUpdate(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.MerchantplanUpdate}${id}`, model, this.options)
  }

  merchantplanstatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.MerchantplanStatus}${id}`, this.options)
  }

  merchantplanactive() {
    return this.http.get(`${this.basePath}${this.MerchantActivePlans}`, this.options)
  }



  //PG Setup
  PGsetupget() {
    return this.http.get(`${this.basePath}${this.pgsetupget}`, this.options);
  }

  Pgsetupstatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.pgsetupstatus}${id}`, model, this.options)
  }

  Pgsetupcreate(model: any) {
    return this.http.post(`${this.basePath}${this.pgsetupadd}`, model, this.options)
  }

  PgsetupUpdate(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.pgsetupedit}${id}`, model, this.options)
  }


  //overall customer
  OverallCustomer() {
    return this.http.get(`${this.basePath}${this.Overallcustomer}`, this.options)
  }

  EntityIndividualCustomerview(id: any) {
    return this.http.get(`${this.basePath}${this.Entityindividualcustomerview}${id}`, this.options)
  }

  ViewCustomerBasicInfo(id: any) {
    return this.http.get(`${this.basePath}${this.viewcustomerbasicdetails}${id}`, this.options)
  }


  ViewCustomersSetupBox(id: any) {
    return this.http.get(`${this.basePath}${this.viewSetupboxDetails}${id}`, this.options)
  }


  ActiveStatusSetupbox(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.activestatussetupbox}${id}`, model, this.options)
  }

  ViewSetupBoxPlanDetails(id: any) {
    return this.http.get(`${this.basePath}${this.viewsetupboxplan}${id}`, this.options)
  }

  ActiveStatusCustomerPlan(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.activecustomerplan}${id}`, model, this.options)

  }



  //payment dues

  DuesViewAll() {
    return this.http.get(`${this.basePath}${this.paymentdues}`, this.options)
  }

  DuesGenerate() {
    return this.http.get(`${this.basePath}${this.generatedues}`, this.options)
  }


  MaintenanceReciept(id: any) {
    return this.http.get(`${this.basePath}${this.maintenance}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    })
  }

  unblockAccount(id: any) {
    return this.http.get(`${this.basePath}${this.unblockaccount}${id}`, this.options)
  }

  unblockentityAccount(id: any) {
    return this.http.get(`${this.basePath}${this.unblockentityaccount}${id}`, this.options)
  }



  //fargin policy

  viewfarginPolicy() {
    return this.http.get(`${this.basePath}${this.viewtermspolicy}`, this.options)
  }

  addTermsPolicy(model: any) {
    return this.http.post(`${this.basePath}${this.addtermspolicy}`, model, this.options)
  }

  editTermsPolicy(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.edittermspolicy}${id}`, model, this.options)
  }

  viewbyIdpolicy(id: any) {
    return this.http.get(`${this.basePath}${this.viewbyidpolicy}${id}`, this.options)
  }

  //Dashboard

  dashboardcustomersevenday() {
    return this.http.get(`${this.basePath}${this.dashboardlastssevendays}`, this.options)
  }
  dashboardcustomerfifteenday() {
    return this.http.get(`${this.basePath}${this.dashboardfifteendays}`, this.options)
  }
  dashboardcustomerthirtyday() {
    return this.http.get(`${this.basePath}${this.dashboardthirtydays}`, this.options)
  }
  dashboardcustomerlastmonth() {
    return this.http.get(`${this.basePath}${this.dashboardlastmonth}`, this.options)
  }
  dashboardcustomerthismonth() {
    return this.http.get(`${this.basePath}${this.dashboardthismonth}`, this.options)
  }
  dashboardcustomerstartenddates(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.dashboardcustomrange}${id}/${id1}`, this.options)
  }

  dashbaordcustomerdayTransaction() {
    return this.http.get(`${this.basePath}${this.dashboarddaytransaction}`, this.options)
  }

  // dashbaordcustomermobilenumbers(id: any,id1:any) {
  //   return this.http.get(`${this.basePath}${this.dashbaordcustomermobilenumber}${id}/${id1}`, this.options)
  // }

  dashboardcustomeroveralls() {
    return this.http.get(`${this.basePath}${this.dashboardoverall}`, this.options)
  }
  dashboardoverallmerchantids(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardoverallmerchantid}${id}`, this.options)
  }

  dashboardoverallamounts() {
    return this.http.get(`${this.basePath}${this.dashboardoverallamount}`, this.options)
  }
  dashboardoverallonetimes() {
    return this.http.get(`${this.basePath}${this.dashboardoverallonetime}`, this.options)
  }
  dashboardsevendaysamounts() {
    return this.http.get(`${this.basePath}${this.dashboardsevendaysamount}`, this.options)
  }

  //tickets
  Ticketscustomer() {
    return this.http.get(`${this.basePath}${this.ticketsget}`, this.options)
  }

  customerraiseticketupdate(id: any, model: any) {
    return this.http.put(
      `${this.basePath}${this.customerticketraise}${id}`,
      model,
      this.options
    );
  }

  // Bank Details Main Master

  bankdetailsViewall() {
    return this.http.get(`${this.basePath}${this.BankdetailsViewall}`, this.options)
  }

  bankdetailsAdd(model: any) {
    return this.http.post(`${this.basePath}${this.AddBankDetails}`, model, this.options)
  }

  bankdetailsviewbyid(id: any) {
    return this.http.get(`${this.basePath}${this.Bankdetailsviewbyid}${id}`, this.options)
  }

  bankdetailsUpdate(model: any) {
    return this.http.put(`${this.basePath}${this.EditBankdetails}`, model, this.options)
  }

  activebankdetails() {
    return this.http.get(`${this.basePath}${this.ActiveBankDetails}`, this.options)
  }

  activebankdetailsstatus(model: any) {
    return this.http.put(`${this.basePath}${this.Bankdetailsstatus}`, model, this.options)
  }

  CustomerAllTransactions() {
    return this.http.get(`${this.basePath}${this.customeralltransactions}`, this.options)
  }

  CustomerTransactionsFilter(id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.customerdatefilter}${id1}/${id2}`, this.options)
  }

  CustomerTransactionsView(id1: any) {
    return this.http.get(`${this.basePath}${this.customertransactionview}${id1}`, this.options)
  }



  MaintenanceAllTransactions() {
    return this.http.get(`${this.basePath}${this.maintenancetransaction}`, this.options)
  }


  MaintenanceTransactionsView(id1: any) {
    return this.http.get(`${this.basePath}${this.maintenancetransactionview}${id1}`, this.options)
  }
  MaintenanceTransactionFilter(id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.maintenancedatefilter}${id1}/${id2}`, this.options)
  }

  OneTimeAllTransactions() {
    return this.http.get(`${this.basePath}${this.onetimtransaction}`, this.options)
  }
  OneTimeTransactionsView(id1: any) {
    return this.http.get(`${this.basePath}${this.onetimtransactionview}${id1}`, this.options)
  }
  OneTimeTransactionFilter(id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.onetimdatefilter}${id1}/${id2}`, this.options)
  }


  QRCreateurl(id: any) {
    return this.http.get(`${this.basePath}${this.QrcreateName}${id}`, this.options)
  }

  QRURLcreation(model: any) {
    return this.http.post(`${this.basePath}${this.QrCreationimage}`, model, this.options)
  }

  OtherPayByMerchantId(id1: any) {
    return this.http.get(`${this.basePath}${this.otherpaymentmerchantid}${id1}`, this.options)
  }

  CreateOtherPayment(data: any) {
    return this.http.post(`${this.basePath}${this.otherpaymentcreate}`, data, this.options);
  }

  OtherPay() {
    return this.http.get(`${this.basePath}${this.otherpayment}`, this.options)
  }

  OtherPaymentUpdate(id: any, model: any) {
    return this.http.put(
      `${this.basePath}${this.otherpaymentupdate}${id}`,
      model,
      this.options
    );
  }
  OtherPayTransaction(id1: any) {
    return this.http.get(`${this.basePath}${this.otherpaytrans}${id1}`, this.options)
  }
  OtherPayFilter(id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.otherpaymentdate}${id1}/${id2}`, this.options)
  }

  OtherPayViewAll() {
    return this.http.get(`${this.basePath}${this.otherpaymentviewall}`, this.options)
  }



  identityFront(data: FormData) {
    return this.http.put(`${this.basePath}${this.identityfront}`, data, this.optionsMultipart);
  }

  identityBack(data: FormData) {
    return this.http.put(`${this.basePath}${this.identityback}`, data, this.optionsMultipart);
  }

  addressFront(data: FormData) {
    return this.http.put(`${this.basePath}${this.addressfront}`, data, this.optionsMultipart);
  }


  addressBack(data: FormData) {
    return this.http.put(`${this.basePath}${this.addressback}`, data, this.optionsMultipart);
  }

  signatureFront(data: FormData) {
    return this.http.put(`${this.basePath}${this.signaturefront}`, data, this.optionsMultipart);
  }

  signatureBack(data: FormData) {
    return this.http.put(`${this.basePath}${this.signatureback}`, data, this.optionsMultipart)
  }


  editIdentity(data: FormData) {
    return this.http.put(`${this.basePath}${this.editidentity}`, data, this.optionsMultipart);
  }

  editAddress(data: FormData) {
    return this.http.put(`${this.basePath}${this.editaddress}`, data, this.optionsMultipart);
  }

  editSignature(data: FormData) {
    return this.http.put(`${this.basePath}${this.editsignature}`, data, this.optionsMultipart);
  }

  //facheck
  adharVerifyIdentity(data: any) {
    return this.http.post(`${this.basePath}${this.adharverifyidentity}`, data, this.options);
  }

  adharverifyAddress(data: any) {
    return this.http.post(`${this.basePath}${this.adharverifyaddress}`, data, this.options);
  }

  adharverifySignature(data: any) {
    return this.http.post(`${this.basePath}${this.adharverifysignature}`, data, this.options);
  }

  panVerifysIdentity(data: any) {
    return this.http.post(`${this.basePath}${this.panverifyIdentity}`, data, this.options);
  }

  panverifyAddress(data: any) {
    return this.http.post(`${this.basePath}${this.panverifyaddress}`, data, this.options);
  }
  panverifysignature(data: any) {
    return this.http.post(`${this.basePath}${this.panverifySignature}`, data, this.options);
  }


  passportVerifyIdentity(data: any) {
    return this.http.post(`${this.basePath}${this.passportverifyIdentity}`, data, this.options);
  }
  passportVerifyAddress(data: any) {
    return this.http.post(`${this.basePath}${this.passportverifyAddress}`, data, this.options);
  }
  passportVerifySignature(data: any) {
    return this.http.post(`${this.basePath}${this.passportverifySignature}`, data, this.options);
  }

  cinVerifyIdentity(data: any) {
    return this.http.post(`${this.basePath}${this.cinverifyIdentity}`, data, this.options);
  }


  cinVerifyAddress(data: any) {
    return this.http.post(`${this.basePath}${this.cinverifyAddress}`, data, this.options);
  }

  cinverifySignature(data: any) {
    return this.http.post(`${this.basePath}${this.cinverifysignature}`, data, this.options);
  }

  gstVerifyIdentity(data: any) {
    return this.http.post(`${this.basePath}${this.gstverifyIdentity}`, data, this.options);
  }

  gstverifyAddress(data: any) {
    return this.http.post(`${this.basePath}${this.gstverifyaddress}`, data, this.options);
  }

  gstverifySignature(data: any) {
    return this.http.post(`${this.basePath}${this.gstverifysignature}`, data, this.options);
  }


  voterverifyIdentity(data: any) {
    return this.http.post(`${this.basePath}${this.voterverifyidentity}`, data, this.options);
  }

  voterverifyAddress(data: any) {
    return this.http.post(`${this.basePath}${this.voterverifyaddress}`, data, this.options);
  }

  voterverifySignature(data: any) {
    return this.http.post(`${this.basePath}${this.voterverifysignature}`, data, this.options);
  }

  drivingverfiyidentity(data: any) {
    return this.http.post(`${this.basePath}${this.drivingverfiyIdentity}`, data, this.options);
  }

  drivingverifyaddress(data: any) {
    return this.http.post(`${this.basePath}${this.drivingverifyAddress}`, data, this.options);
  }
  drivingverifySignature(data: any) {
    return this.http.post(`${this.basePath}${this.drivingverifysignature}`, data, this.options);
  }

  identityApproval(data: any) {
    return this.http.put(`${this.basePath}${this.identityapproval}`, data, this.options);
  }

  addressApproval(data: any) {
    return this.http.put(`${this.basePath}${this.addressapproval}`, data, this.options);
  }

  signatureApproval(data: any) {
    return this.http.put(`${this.basePath}${this.signatureapproval}`, data, this.options);
  }

  facheckgetbyId(id: any) {
    return this.http.get(`${this.basePath}${this.facheckresponse}${id}`, this.options)
  }

  viewallkycCategory() {
    return this.http.get(`${this.basePath}${this.viewallkyccategory}`, this.options)
  }


  addkycCategory(data: any) {
    return this.http.post(`${this.basePath}${this.addkyccategory}`, data, this.options);
  }


  editkycCategory(data: any) {
    return this.http.put(`${this.basePath}${this.editkyccategory}`, data, this.options);
  }

  statuskycCategory(data: any) {
    return this.http.put(`${this.basePath}${this.statuskyccategory}`, data, this.options);
  }

  activeViewall() {
    return this.http.get(`${this.basePath}${this.activeviewall}`, this.options)
  }


  //Fargin banks
  Farginview() {
    return this.http.get(`${this.basePath}${this.farginview}`, this.options);
  }


  FarginCreate(model: any) {
    return this.http.post(`${this.basePath}${this.fargincreate}`, model, this.options)
  }

  Farginstatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.farginstatus}${id}`, model, this.options)
  }

  Farginedit(model: any) {
    return this.http.put(`${this.basePath}${this.farginEdit}`, model, this.options)
  }



  //smscreate

  CreateSMS(data: any) {
    return this.http.post(`${this.basePath}${this.smscreate}`, data, this.options);
  }
  SMSViewById(id1: any) {
    return this.http.get(`${this.basePath}${this.smsviewbyId}${id1}`, this.options)
  }
  smsStatus(id: any, data: any) {
    return this.http.put(`${this.basePath}${this.smsstatus}${id}`, data, this.options)
  }
  smsUpdate(id: any, data: any) {
    return this.http.put(`${this.basePath}${this.editsms}${id}`, data, this.options)
  }
  SmsGetAll() {
    return this.http.get(`${this.basePath}${this.smsgetAll}`, this.options)
  }
  SmsHistoryGetAll() {
    return this.http.get(`${this.basePath}${this.smshistory}`, this.options)
  }
  SMSHistoryViewById(id1: any) {
    return this.http.get(`${this.basePath}${this.smshistoryview}${id1}`, this.options)
  }

  SMSHistoryFilter(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.smshistoryfilter}${id}/${id1}`, this.options)
  }
  SmsHistoryMerchantFilter(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.smshistorymerchantfilter}${id}/${id1}/${id1}`, this.options)
  }

  Logout(model: any) {
    return this.http.put(`${this.basePath}${this.logout}`, model, this.options)
  }

  CustomerReceipt(id: any) {
    return this.http.get(`${this.basePath}${this.customerreceipt}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    });
  }

  OtherPaymentReciept(id: any) {
    return this.http.get(`${this.basePath}${this.otherpayReciept}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    });
  }



  documentAdd(data: FormData) {
    return this.http.post(`${this.basePath}${this.documentadd}`, data, this.optionsMultipart);
  }



  documentEdit(data: any) {
    return this.http.put(`${this.basePath}${this.documentedit}`, data, this.options);
  }
  documentApproval(id: any, data: any) {
    return this.http.put(`${this.basePath}${this.documentapproval}${id}`, data, this.options);
  }

  getdocumentImage(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.documentImage}${id}/${id1}`, {
      ...this.options,
      ...{ responseType: 'blob' }
    })
  }


  documentFrontedit(data: FormData) {
    return this.http.put(`${this.basePath}${this.documentfrontedit}`, data, this.optionsMultipart);
  }


  documentBackedit(data: FormData) {
    return this.http.put(`${this.basePath}${this.documentbackedit}`, data, this.optionsMultipart);
  }

  // SMS Cost

  smscostViewall() {
    return this.http.get(`${this.basePath}${this.SMSCostviewall}`, this.options)
  }

  smscostadd(model: any) {
    return this.http.post(`${this.basePath}${this.SMSCostadd}`, model, this.options)
  }
  smscoststatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.SMSCostStatus}${id}`, model, this.options)
  }

  // AUTO Debit

  autodebitgetall() {
    return this.http.get(`${this.basePath}${this.Autodebitgetall}`, this.options)
  }
  autodebitbymerchat(id: any) {
    return this.http.get(`${this.basePath}${this.Autodebitbymerchat}${id}`, this.options)
  }

  //announcement
  announcementAdd(data: any) {
    return this.http.post(`${this.basePath}${this.announcementadd}`, data, this.options);
  }

  announcementViewall() {
    return this.http.get(`${this.basePath}${this.announcementviewall}`, this.options)
  }

  announcementEdit(data: any) {
    return this.http.put(`${this.basePath}${this.announcementedit}`, data, this.options);
  }

  announcementStatus(data: any) {
    return this.http.put(`${this.basePath}${this.announcementstatus}`, data, this.options);
  }

  announcementDate(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.announcementdate}${id}/${id1}`, this.options)
  }

  SmsDropdownGetAll() {
    return this.http.get(`${this.basePath}${this.smsdropdown}`, this.options)
  }
  SmsCount(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.smscount}${id}/${id1}`, this.options)
  }
  SmsApproval(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.smsapproval}${id}`, model, this.options)
  }


  //customer pay
  Customerpay(model: any) {
    return this.http.post(`${this.basePath}${this.customerpayment}`, model, this.options);
  }

  Subscribepay(model: any) {
    return this.http.post(`${this.basePath}${this.subscriptionpayment}`, model, this.options);
  }

  Customizepay(model: any) {
    return this.http.post(`${this.basePath}${this.customizationpayment}`, model, this.options);
  }

  Manualpay(model: any) {
    return this.http.post(`${this.basePath}${this.manualpayment}`, model, this.options);
  }


  SurveyViewAll() {
    return this.http.get(`${this.basePath}${this.surveyviewall}`, this.options)
  }
  SurveyQuestionsViewById(id: any) {
    return this.http.get(`${this.basePath}${this.surveyviewbyid}${id}`, this.options)
  }

  ViewByIdCustomerResponse(id: any) {
    return this.http.get(`${this.basePath}${this.viewbyidcustomerresponse}${id}`, this.options)
  }


  CustomerTotalPlanAmount(id: any) {
    return this.http.get(`${this.basePath}${this.customerplanamaount}${id}`, this.options)
  }





  //logo
  EntitylogoUpdatescustomer(data: FormData) {
    return this.http.put(`${this.basePath}${this.customerlogo}`, data, this.optionsMultipart);
  }

  Entitylogoview(id: string) {
    return this.http.get(`${this.basePath}${this.customerlogoview}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    });
  }


  OtherPayTransactionView(id: any) {
    return this.http.get(`${this.basePath}${this.otherpaymentviewbyid}${id}`, this.options)
  }





}