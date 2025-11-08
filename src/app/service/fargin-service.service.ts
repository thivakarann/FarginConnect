import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Subject } from 'rxjs';
import { SessionServiceService } from '../Session service/session-service.service';
import { ToastrService } from 'ngx-toastr';
import { EncyDecySericeService } from '../Encrypt-Decrypt Service/ency-decy-serice.service';
import { SessionValidatorService } from '../Session storage Validator/session-validator.service';
import { Payload } from '../fargin-model/fargin-model.module';

@Injectable({ providedIn: 'root', })

export class FarginServiceService {
  Email: any;
  AdminId: any;
  Tokens: any;
  Client: HttpClient;
  details: any;
  user: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private timerService: SessionServiceService,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,
    private back: HttpBackend,
    private SessionValidatorService: SessionValidatorService
  ) { this.Client = new HttpClient(back); }

  // private readonly basePath = 'https://staging-api.farginconnect.com/';    //Staging server

  private readonly basePath = 'https://dev-api.farginconnect.com/admin/'; //  Dev Server

  // private readonly basePath = 'https://api.fargin.in/';       //  Production server




  // login
  private readonly LoginCaptcha = 'user/generateCaptcha';
  private readonly adminlogin = 'user/login';
  private readonly forgotpassword = 'user/forgotPasswordOtpSend';
  private readonly verifyotp = 'user/forgotPasswordOtpVerify';
  private readonly resendotp = 'user/forgotPasswordOtpSend';
  private readonly resetpassword = 'user/forgotPassword';

  //change password

  private readonly changepassword = 'user/changePassword';

  //business category

  private readonly businesscategoryget = 'businesscategory/withPagination/getAll';
  private readonly businesscategoryAdd = 'businesscategory/add';
  private readonly businesscategoryEdit = 'businesscategory/update';
  private readonly businesscategorystatus = 'businesscategory/updateStatus';
  private readonly ActiveBussinesscate = 'businesscategory/getByStatus'

  //Business KYC

  private readonly businesscategorykycget = 'businessCategoryDocument/withPagination/getAll ';
  private readonly businesscategorykycactive = 'businessCategoryDocument/updateStatus';
  private readonly businesskycAdd = 'businessCategoryDocument/add';
  // activestatus old
  private readonly businesskycdocactive = 'businesscategory/getallactive';
  // activestatus new
  private readonly buskycactivestatus = 'businesscategory/getByStatus';
  private readonly activedocuments = 'businessDocumentType/getByStatus'

  private readonly businesskycupdate = 'businessCategoryDocument/update';

  //Ticket

  private readonly viewallTicket = 'tickets/getall';
  private readonly updateTicket = 'tickets/updateapproval/';
  private readonly updatestickerticket = 'tickets/updateticket';
  private readonly viewTicketImage = 'tickets/viewimage/';

  //Roles & Permission

  private readonly permissiongetall = 'permission/getAllPermission';
  private readonly getsubPermission = 'permission/getAllSubPermission';
  private readonly addRole = 'role/add';
  private readonly roleStatus = 'role/updateStatus';
  private readonly viewallRoles = 'role/withPagination/getAll';
  private readonly viewPermissionSubpermission = 'role/viewpermission/';
  private readonly updateRole = 'role/update';
  private readonly rolegetByid = 'role/getAuthorization';
  private readonly RolegetByidnew = 'role/getRoleAuthorization'

  //Admin Policy

  private readonly adminpolicy = 'policy/viewallmerchant/2';
  private readonly Adminpolicycreate = 'policy/createmerchantpolicy';
  private readonly Adminpolicyedit = 'policy/updatemerchant/';
  private readonly adminpolicyviewbyidedit = 'policy/getpolicy/';
  private readonly policymerchant = 'policy/getMerchant';
  private readonly policiesbyid = 'policy/getpolicy/';
  private readonly policyapproval = 'policy/updateStatus/';
  private readonly admingetall = 'user/withPagination/getAll';
  private readonly adminstatus = 'user/updateStatus';
  private readonly admincreate = 'user/add';
  private readonly adminupdate = 'user/update';
  private readonly adminview = 'user/getById';
  private readonly roleactiveviewall = 'role/getByStatus';

  // Entity Details

  private readonly Entitygetallexport = 'merchant/getall';
  private readonly entitygetall = 'merchant/getall/';
  private readonly AddEntity = 'merchant/create';
  private readonly EntityKYCBYbusinessid = 'businesskyc/getcategorykyc/';
  private readonly Entityviewbyid = 'merchant/getmerchants/';
  private readonly updateEntity = 'merchant/updateMerchant/';
  private readonly entityactivestatus = 'merchant/updateStatus';
  private readonly emailtrigger = 'merchantOnboard/resendmail';
  private readonly merchantlogo = 'merchant/updateimage ';
  private readonly keysupdate = 'merchant/updateKey';
  private readonly paymentlink = 'paymentlink/getmerchant/';
  private readonly businessid = 'businesscategory/getById/';
  private readonly manualreciept = 'merchantpay/viewreceipt/';
  private readonly entitykyc = 'entityDocument/addDocuments';
  private readonly EntityPlanDetails = 'merchant/viewMerchantPlanHistorys/';

  //Overall customer

  private readonly Overallcustomer = 'customer/viewByAll/';
  private readonly overallcustomerexport = 'customer/viewByAll';
  private readonly Entityindividualcustomerview = 'customer/viewById/';
  private readonly viewcustomerbasicdetails = 'customer/viewcustomer/';
  private readonly viewSetupboxDetails = 'customer/viewcustomerstb/';
  private readonly viewsetupboxplan = 'customer/viewcustomerstbplan/';
  private readonly viewCustomerallsetupboxplan = 'customer/customerAllStbPlans/';
  private readonly PlanViewbyidcust = 'lcop/viewActiveChannels/';
  private readonly activestatussetupbox = 'customer/updateStbStatus/';
  private readonly activecustomerplan = 'customerplan/updatestatus/';

  //entity bank

  private readonly EntityBankAdd = 'merchantbank/create';
  private readonly EntityBankEdit = 'merchantbank/updatebank/';
  private readonly bankprimarystatus = 'merchantbank/updateprimaryaccount/';
  private readonly bankactivestatus = 'merchantbank/updateactive/';
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
  private readonly EntityCustomerviewsearchs = 'customer/customersSearch/';
  private readonly customerview = 'customer/viewById/';
  private readonly customertransaction = 'customerpay/viewcustomers/';

  //QRcode

  private readonly EntityQrgenerate = 'merchant/qrgenerate/';
  private readonly qrimageview = 'merchant/qrViewImage/';

  //Customer QRCode

  private readonly CustomerQR = 'customer/viewCustomerQrImage/';
  private readonly CustomerQRGenerate = 'customer/updatekeysForexistingcustomer/';

  //refund

  private readonly EntityRefund = 'refund/getmerchant/';

  //settlement Online

  private readonly EntitySettlement = 'transactions/getPayouts';
  private readonly EntitySettlementtransaction = 'transactions/getPayoutTransactions';

  //settlement Offline

  private readonly EntitySettlementOffline = 'transactions/getOfflinePayouts';
  private readonly offlinePayouts = 'transactions/getOfflinePayoutTransactions';

  //Entity Transaction

  private readonly entitytransaction = 'paymentHistory/viewByMerchantPage/';
  private readonly entitytraansactionSearchs = 'paymentHistory/viewByMerchantSearch/';
  private readonly EntityTransactionexports = 'paymentHistory/viewByMerchant/';

  //merchant transaction

  private readonly transactionformerchant = 'transactions/getadminPaymentList';

  //Region

  private readonly Regionget = 'region/viewAllRegion';
  private readonly Regiongetallactive = 'region/viewOnlyActive';
  private readonly Regioncreate = 'region/addRegion';
  private readonly regionstatus = 'region/updateStatus';
  private readonly regionupdate = 'region/update';
  private readonly ActiveRegions = 'region/viewOnlyActive';
  private readonly ActiveRegionbyServiceid = 'region/viewByService/';
  private readonly regionbyitsids = 'broadCaster/getByRegionId/';

  //service provider

  private readonly providergetall = 'serviceProvider/viewAllProvider';
  private readonly providercreate = 'serviceProvider/createProvider';
  private readonly providerupdate = 'serviceProvider/update';
  private readonly providerstatus = 'serviceProvider/updateStatus';
  private readonly providergetbyid = 'serviceProvider/viewByservice/';
  private readonly Activeprovider = 'serviceProvider/viewActive';

  //Facheckkey

  private readonly addfacheckkey = 'facheckKey/add';
  private readonly viewfacheckkey = 'facheckKey/withPagination/getAll';
  private readonly updatefacheckkey = 'facheckKey/update ';
  private readonly statusfacheckkey = 'facheckKey/updateStatus';
  private readonly Estamp = 'Estamp/getActive';

  // Alcarte Creation

  private readonly alcartviewallexport = 'alcotchannel/viewAll';
  private readonly alcartvieall = 'alcotchannel/viewAll/';
  private readonly alcartAdd = 'alcotchannel/addalcot';
  private readonly alcartviewbyid = 'alcotchannel/getById/';
  private readonly alcartstatus = 'alcotchannel/updateStatus';
  private readonly activealcards = 'alcotchannel/viewOnlyActive';
  private readonly Alcartupdate = 'alcotchannel/update';
  private readonly Alcartchannellogo = 'alcotchannel/viewLogo/';
  private readonly AlcartChannellogoUpdate = 'alcotchannel/updateLogo';
  private readonly AlcartChannelregion = 'alcotchannel/viewregionactive/';
  private readonly AlcartUploadbulks = 'alcotchannel/alcotBulkUpload/';
  private readonly Alcartbulkresponses = 'alcotchannel/getUploadResponse';
  private readonly Alcartuploadids = 'alcotchannel/getResponse/';

  // Broadcaster Name Creation

  private readonly BoucatenameViewall = 'bundleChannel/getallChannel';
  private readonly BoucatenameAdd = 'bundleChannel/addbouquet';
  private readonly Boutenamebyid = 'bundleChannel/getChannelId/';
  private readonly BoutenameUpdate = 'bundleChannel/update';
  private readonly Boucatenamestatus = 'bundleChannel/updateStatus';
  private readonly BoucateGetactive = 'bundleChannel/viewOnlyActive';

  //Broadcaster Bouquete name creation

  private readonly Bouquetenameviewall = 'bouquetCreation/viewAll';
  private readonly Bouquetenameadd = 'bouquetCreation/add';
  private readonly Bouquetenamebyid = 'bouquetCreation/viewById/';
  private readonly Bouquetenameupdate = 'bouquetCreation/update';
  private readonly Bouquetenamestatus = 'bouquetCreation/updateStatus';
  private readonly Bouquetenameactive = 'bouquetCreation/viewOnlyActive';
  private readonly BouquetenamebyBoueteid = 'bouquetCreation/viewByBroadCasterId/';

  // Broadcaster  Bouquete Creation

  private readonly bouquetsviewall = 'broadCaster/getall';
  private readonly Bouquetadd = 'broadCaster/add';
  private readonly Bouquetsviewbyid = 'broadCaster/getById/';
  private readonly Bouquetsviewbyidregion = 'broadCaster/getByregions/'; //NEW for region view
  private readonly Bouquetsviewbyidregionall = 'broadCaster/getAllByregions/'
  private readonly Bouquetsviewbyidchannel = 'broadCaster/viewChannelsByRegions/'; //for channel view
  private readonly Bouquetstatus = 'broadCaster/updateStatus';
  private readonly ActiveBouqutes = 'broadCaster/viewOnlyActive';
  private readonly bouquetEdit = 'broadCaster/updateBroadCaster';
  private readonly BroadcasterBoucatesRegionEdits = 'broadCaster/updateRegion';
  private readonly BroadcasterBoucateschannelEdits = 'broadCaster/updateAlcotChannel';
  private readonly bouquetesinglestatus = 'broadCaster/updateChannelStatus';
  private readonly AddChannelsbyBouquete = 'broadCaster/addextraChannel';
  private readonly bouquetsextraregions = 'broadCaster/addExtraRegion';
  private readonly bouquetchanneledit = 'broadCaster/getByAlcotId/';
  private readonly Bouquetmsoregionstatus = 'broadCaster/updateRegionStatus'

  // DPO Bouquete Creation

  private readonly DPOBouqueteViewall = 'dpoBouquet/viewAll';
  private readonly DPOBouqueteadd = 'dpoBouquet/create';
  private readonly DPOBouqueteviewbyid = 'dpoBouquet/viewid/';
  private readonly DPOBouqueteUpdate = 'dpoBouquet/update/';
  private readonly DPOBouquetestatus = 'dpoBouquet/updateStatus/';
  private readonly DPOActiveBouqutes = 'dpoBouquet/viewOnlyActive';
  private readonly DPOSinglechannelstatus = 'dpoBouquet/updateChannelStatus';

  // Merchant Plan Creation

  private readonly Merchantplanviewall = 'entityPlan/withPagination/getAll';
  private readonly MerchantplanAdd = 'entityPlan/add';
  private readonly MerchantplanUpdate = 'entityPlan/update';
  private readonly MerchantplanStatus = 'entityPlan/updateStatus';
  private readonly MerchantActivePlans = 'merchantplan/getallactive';

  //PGsetup

  private readonly pgsetupget = 'pgKeys/withPagination/getAll';
  private readonly pgsetupstatus = 'pgKeys/updateStatus';
  private readonly pgsetupadd = 'pgKeys/add';
  private readonly pgsetupedit = 'pgKeys/update ';

  //Withdrawal

  private readonly viewwithdrawal = 'tresHold/getall';
  private readonly addwithdrawal = 'tresHold/create';
  private readonly editwithdrawal = 'tresHold/update/';
  private readonly statuswithdrawal = 'tresHold/updateStatus/';

  //Beneficiary

  private readonly addbeneficiary = 'merchantbeneficiary/create';
  private readonly viewbeneficiary = 'merchantbeneficiary/getall';
  private readonly viewbyidbeneficiary = 'merchantbeneficiary/viewbyid/';
  private readonly statusbeneficiary = 'merchantbeneficiary/updateactive/';

  //payment dues

  private readonly paymentdues = 'maintanancePay/viewAll';
  private readonly generatedues = 'maintanancePay/createDues';
  private readonly maintenance = 'maintanancePay/receiptView/';

  //Dashboard

  private readonly dashboardData = 'dashBoard/dashBoardCount';
  private readonly dashboardbusinessgetall = 'businesscategory/getall';
  private readonly dashboardbusinesscategorybyid = 'dashBoard/businessCategory/';
  private readonly dashboardbusinesscategory = 'merchant/viewCategory/';
  private readonly dashboardtransaction = 'dashBoard/transaction/';

  //unblock account

  private readonly unblockaccount = 'user/unblock';

  //unblock entity account

  private readonly unblockentityaccount = 'merchant/unBlockAccount/';

  //manual payment

  private readonly updatemanualpay = 'merchantpay/updateManualCash/';
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
  private readonly dashboardthismonth = 'dashBoardd/thisMonthTotalTransactionsAmount';
  private readonly dashboardcustomrange = 'dashBoardd/transaction/';
  private readonly dashboardoverall = 'dashBoardd/totalTransactionsAmount';
  private readonly dashboardoverallmerchantid = 'dashBoardd/totalTransactionsAmount/';
  private readonly dashboardoverallamount = 'dashBoard/overallTransactionsAmount';
  private readonly dashboardoverallonetime = 'dashBoard/overallOneTimeTransactionsAmount';
  private readonly dashboardsevendaysamount = 'dashBoardd/over7dayAmounts';

  //Tickets
  private readonly ticketsgetexport = 'customerTickets/getall';
  private readonly ticketsget = 'customerTickets/getall/';
  private readonly ticketssearchcustomers = 'customerTickets/adminSearch/';
  private readonly customerticketraise = 'customerTickets/updateTicketStatus/';

  // Bank Details Main Master

  private readonly BankdetailsViewall = 'bankDetails/withOutPagination/getAll';
  private readonly AddBankDetails = 'bankDetails/add';
  private readonly EditBankdetails = 'bankDetails/update';
  private readonly Bankdetailsviewbyid = 'bankDetails/viewById/';
  private readonly ActiveBankDetails = 'bankDetails/viewOnlyActive';
  private readonly Bankdetailsstatus = 'bankDetails/updateStatus';

  //transactions

  private readonly customeralltransactions = 'customerpay/viewAllPayments/';
  private readonly customertransactionexport = 'customerpay/ViewCusDetails';
  private readonly customerdatefilter = 'paymentHistory/getDateFilter/';
  private readonly customertransactionview = 'customerpay/viewbyid/';

  //merchant

  private readonly maintenancetransaction = 'maintanancePay/viewAll/';
  private readonly maintenancetransactionexport = 'maintanancePay/getMaintainance';
  private readonly maintenancedatefilter = 'maintanancePay/dateFilter/';
  private readonly maintenancetransactionview = 'maintanancePay/viewById/';
  private readonly Manuveldueformaintenance = 'maintanancePay/due-generate';
  private readonly customermanuvalduegenerate = 'customerpay/merchant/generate-dues';
  private readonly Otherpaymentview = 'maintanancePay/maintenaceOtherPaymentView/';

  //onetime

  private readonly onetimtransaction = 'merchantpay/viewAll/';
  private readonly onetimtransactionexport = 'merchantpay/getAll';
  private readonly onetimdatefilter = 'transhistory/getDateWise/';
  private readonly onetimtransactionview = 'merchantpay/viewpayment/';

  // QR Creation API,S

  private readonly QrcreateName = 'merchant/qrnamegenerate/';
  private readonly QrCreationimage = 'merchant/qrgenerate';

  //other payment

  private readonly otherpaymentmerchantid = 'otherpayment/viewByMerchant/';
  private readonly otherpaymentcreate = 'otherpayment/create';
  private readonly otherpayment = 'otherpayment/viewall/';
  private readonly otherpaymentviewallexport = 'otherpayment/viewAllPayments';
  private readonly otherpaymentupdate = 'otherpayment/update/';
  private readonly otherpaytrans = 'otherpayment/viewByPayId/';
  private readonly otherpaymentdate = 'otherpayment/dateFilter/';
  private readonly otherpaymentviewall = 'merchantdue/getall';
  private readonly Otherpaymanualpayment = 'otherpayment/updateManualCash/';

  // KYC category

  private readonly viewallkyccategory = 'businessDocumentType/withPagination/getAll';
  private readonly addkyccategory = 'businessDocumentType/add';
  private readonly editkyccategory = 'businessDocumentType/update';
  private readonly statuskyccategory = 'businessDocumentType/updateStatus';
  private readonly activeviewall = 'kycCategory/viewOnlyActive';
  private readonly kycviewall = 'entityDocument/viewAll';
  private readonly identityfront = 'entityDocument/identityFront';
  private readonly identityback = 'entityDocument/identityBack';
  private readonly addressfront = 'entityDocument/addressFront';
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
  private readonly panverifyaddress = 'merchantFacheck/addressPanVerify';
  private readonly panverifySignature = 'merchantFacheck/signaturePanVerify';
  private readonly passportverifyIdentity = 'merchantFacheck/identityPassportVerify';
  private readonly passportverifyAddress = 'merchantFacheck/addressPassportVerify';
  private readonly passportverifySignature = 'merchantFacheck/signaturePassportVerify';
  private readonly cinverifyIdentity = 'merchantFacheck/identityCinVerify';
  private readonly cinverifyAddress = 'merchantFacheck/addressCinVerify';
  private readonly cinverifysignature = 'merchantFacheck/signatureCinVerify';
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

  private readonly farginview = 'adminBankDetails/withPagination/getBankDetails';
  private readonly fargincreate = 'adminBankDetails/createbankdetails';
  private readonly farginupdate = 'adminBankDetails/updatebank';
  private readonly farginstatus = 'adminBankDetails/updateStatus';
  private readonly farginEdit = 'adminBankDetails/createbankdetails';
  private readonly Farginbankhistory = 'adminBankDetails/getHistory';

  //sms settings

  private readonly smscreate = 'merchantSms/createSms';
  private readonly smsviewbyId = 'merchantSms/getMerchantSms/';
  private readonly smsstatus = 'merchantSms/updateStatus/';
  private readonly editsms = 'merchantSms/updateMerchantSms/';
  private readonly smsgetAll = 'merchantSms/getAllMerchantSms/';
  private readonly smsgetAllexport = 'merchantSms/getAllMerchantSms';
  private readonly smsdropdown = 'merchantSms/viewMerchantSms/';
  private readonly smsViewalltem = 'merchantSms/viewMerchantSms/'
  private readonly smscount = 'smshistory/viewbymerchantandtype/';
  private readonly smsapproval = 'merchantSms/updateApproval/';
  private readonly smsfreepaiddropdown = 'merchantSms/viewFreePaidsms/';

  //sms history

  private readonly smshistory = 'smshistory/viewall/';
  private readonly smhistoryexport = 'smshistory/viewall';
  private readonly smshistoryview = 'smshistory/viewbymerchant/';
  private readonly smshistoryfilter = 'smshistory/viewallfilter/';
  private readonly smshistorymerchantfilter = 'smshistory/viewmerchantfilter/';
  private readonly logout = 'user/logOut';

  // Overall trans Receipt

  private readonly customerreceipt = 'customerpay/viewReceipt/';
  private readonly otherpayReciept = 'otherpayment/viewinvoice/';

  //bussiness document

  private readonly documentadd = 'merchantdocument/create';
  private readonly documentedit = 'merchantdocument/updateData';
  private readonly documentapproval = 'merchantdocument/updateapproval/';
  private readonly documentImage = 'merchantdocument/viewimage/';
  private readonly documentfrontedit = 'merchantdocument/updateFrontPath';
  private readonly documentbackedit = 'merchantdocument/updateBacPath';

  // SMS Cost Setup

  private readonly SMSCostviewall = 'smsCost/withPagination/getAll';
  private readonly SMSCostadd = 'smsCost/add';
  private readonly SMSUpdate = 'smsCost/update';
  private readonly SMSCostStatus = 'smsCost/updateStatus';
  private readonly SMSHistory = 'smsCost/getBySmsHistory';

  // Auto Debit

  private readonly Autodebitgetall = 'merchantdue/getall/';
  private readonly autodebitgetallexport = 'merchantdue/getall';
  private readonly Autodebitbymerchat = 'merchantdue/viewbymerchant/';
  private readonly autodebitbymerchatsearchs = 'merchantdue/entitySearch/';

  //anouncement

  private readonly announcementadd = 'announcement/add';
  private readonly announcementviewall = 'announcement/getall/';
  private readonly announcementviewallexport = 'announcement/getall';
  private readonly announcementedit = 'announcement/update';
  private readonly announcementstatus = 'announcement/updateStatus';
  private readonly announcementdate = 'announcement/dateFilter/';
  private readonly announcementsearchs = 'announcement/getallSearch/';

  //customer payment

  private readonly customerpayment = 'customerpay/trackApi';
  private readonly subscriptionpayment = 'maintanancePay/trackApi';
  private readonly customizationpayment = 'otherpayment/trackApi';
  private readonly manualpayment = 'merchantpay/trackApi';
  private readonly surveyviewallexport = 'surveyQuestion/getAll';
  private readonly surveyviewall = 'surveyQuestion/getAll/';
  private readonly surveyviewbyid = 'surveyQuestion/getQuestions/';
  private readonly viewbyidcustomerresponse = 'customerResponse/viewQuestion/';

  //total  plan amount

  private readonly customerplanamaount = 'customer/viewcustomertotalamount/';

  //customer logo

  private readonly customerlogo = 'customerTickets/updatedocument';
  private readonly customerlogoview = 'customerTickets/viewimage/';
  private readonly otherpaymentviewbyid = 'otherpayment/viewbyid/';

  //alcot-history

  private readonly alcothistory = 'alcotchannel/viewAllHistory/';
  private readonly alcothistoryexport = 'alcotchannel/viewAllHistory';
  private readonly alcotchannelactiveregion = 'alcotchannel/viewregionactive';
  private readonly Alcotsearchs = 'alcotchannel/viewAllHistorySerach/';

  //search

  private readonly regionsearch = 'region/advanceSearchEntity/';
  private readonly entitysearch = 'merchant/advanceSearch/';
  private readonly alcotsearch = 'alcotchannel/advanceSearch/';
  private readonly entitybanksearch = 'merchantbank/advanceSearch/';
  // private readonly entitykycdocumentsearch ='entityDocument/advanceSearch/';
  private readonly customersearch = 'customer/advanceSearch/';
  private readonly customeradminsearch = 'customerpay/adminSearch/';
  private readonly customercustomeridsearch = 'customerpay/customerSearch/';
  private readonly smshistorysearch = 'smshistory/advanceSearch/';
  private readonly mmcautodebit = 'merchantdue/search/';
  private readonly subscriptionsearch = 'maintanancePay/adminSearch/';
  private readonly onetimepayment = 'merchantpay/adminSearch/';

  // Fargin Signer Details

  private readonly Signerdetailsgetall = 'signingAdmin/withPagination/getallData';
  private readonly SignerdetailsWithoutToken = '/signingAdmin/getall';
  private readonly SignerdetailsAdd = 'signingAdmin/add';
  private readonly SignerdetailsUpdate = 'signingAdmin/update';
  private readonly SignerdetailsbyId = 'signingAdmin/viewById/';
  private readonly SignerdetaisStatus = 'signingAdmin/updateStatus';
  private readonly SignerdetailsActiveGetall = 'signingAdmin/viewOnlyActive';
  private readonly SignerHistory = 'signingAdmin/getSigningHistory';

  //Agreementplan

  private readonly viewagreementplans = 'commercialSetup/ViewAll';
  private readonly viewactiveagreementplans = 'commercialSetup/viewOnlyActive';
  private readonly createagreementplans = 'commercialSetup/create';
  private readonly editagreementplans = 'commercialSetup/update/';
  private readonly viewstatusagreementplans = 'commercialSetup/changeStatus';
  private readonly viewbyidagreementplans = 'commercialSetup/viewById/';
  private readonly createplan = 'agreement/create';
  private readonly viewbyidplan = 'agreement/viewByMerchant/';
  private readonly viewagreementdoucment = 'agreement/viewdoc/';
  // private readonly ViewAggrementbyRefference = 'agreement/viewByReferenceCode/';
  private readonly ViewAggrementbyRefference = 'agreement/viewByAdminReferenceCode/';
  private readonly agreementgetall = 'agreement/getall';
  private readonly Agreementsendotp = 'agreement/merchantsendotp/';
  private readonly AgreementVerifyOTP = 'agreement/merchantverifyotp/';
  private readonly AgreementConcent = 'agreement/consent';
  private readonly AgreemntConcentLocation = 'agreement/consentlocationtracker';
  private readonly AgreementLinkExtent = 'agreement/updatelink/';
  private readonly AgreementLinkExpiry = 'agreement/updatelinkstatus/';
  private readonly AgreementStatus = 'agreement/updateAgreement/';
  private readonly AgreementSendLink = 'agreement/resendlink/';

  //offline transactions

  private readonly offlinetransactions = 'transactions/getMerchantOfflinePaymentList';
  private readonly successofftransactions = 'transactions/getMerchofflineSfulPayment/';
  private readonly failureofftransactions = 'transactions/getMerchOfflineFailPayment/';
  private readonly offlinesettlement = 'transactions/getOfflinePayouts';
  private readonly offlinepayoutsettelemnt = 'transactions/getOfflinePayoutTransactions';

  //branch entity view

  // private readonly branchget = 'bankBranch/view/'
  private readonly branchget = 'bankBranch/viewData/';
  private readonly branchcreate = 'bankBranch/createBranch';
  private readonly branchedit = 'bankBranch/update/';
  private readonly branchstatus = 'bankBranch/updateStatus/';
  private readonly branchindividualview = 'bankBranch/viewAll/';
  private readonly branchcustomerget = 'customer/customersByBranch/';
  private readonly branchcustomersearch = 'customer/customersByBranchs/';
  private readonly onlinebranch = 'customerpay/viewByBranch/';
  private readonly NewOnlinebranch = 'customerpay/viewOnlineTransaction/';
  private readonly onlinesearchbranch = 'customerpay/branchSearch/';
  private readonly NewOnlineSearch = 'customerpay/branchSearch/';
  private readonly OnlineNewSearch = 'customerpay/viewByMerchantSearch/';
  private readonly entityonlinesearchbranch = 'customerpay/viewByMerchantSearch/';
  private readonly entitywishonlinebranch = 'customerpay/viewByBranchMerchant/';
  // private readonly Entitywisetrans = 'customerpay/viewBranchMerchantOnline/';
  private readonly Entitywisetrans = 'customerpay/viewByBranchMerchant/';
  private readonly entityterminaltrans = 'transactions/getMerchantOfflinePaymentListForAdmin';
  private readonly branchtrans = 'transactions/getMerchantOfflinePaymentListForBranch';

  // Find Ip
  private ipApiUrl = 'https://api.ipify.org/?format=json';

  // Find Location Details

  private geoApiUrl = 'https://ipinfo.io/json';
  private abstarctipaddress = 'https://ipgeolocation.abstractapi.com/v1/?api_key=f620ad1cab2f4577ae761b40b0ff73b7';


  //Additional Payment

  private readonly additionalpayment = 'customerotherpayment/viewall/';
  private readonly additionalpaymentsfilters = 'customerotherpayment/dateFilter/';
  private readonly additionalpaymentssearchfilters = 'customerotherpayment/search/';
  private readonly additionalpaymentsviewbyids = 'customerotherpayment/viewbyid/';
  private readonly additionalpaymentsreceipt = 'customerotherpayment/viewinvoice/';
  private readonly additionalpaymentscheck = 'otherpayment/trackApi';
  private readonly additionalpaycheckstatus = 'customerotherpayment/trackApi';
  private readonly merchantadditionalpayment = 'customerotherpayment/viewmerchants/';
  private readonly additionalsearchfilters = 'customerotherpayment/advancesearch/';
  private readonly additionalexports = 'customerotherpayment/viewall';
  private readonly additionaltransviewbyid = 'customerotherpayment/viewcustomers/';
  private readonly broadcastergetallctive = 'bundleChannel/viewOnlyActive';
  private readonly regiongetall = 'region/viewAllRegion';

  //Channels List
  private readonly channelslist = 'broadCaster/viewByChennals/';

  //survey  search

  private readonly surveysearch = 'surveyQuestion/advanceSearch/';
  private readonly refundgetall = 'refund/getOnlineRefunds/';
  private readonly refundsearch = 'refund/getall/';
  private readonly refundforcustomer = 'refund/getcustomer/';
  private readonly RefundForCustomerAdditionals = 'addtionalPayRefund/viewCustomer/';
  private readonly refundexport = 'refund/getall';
  private readonly refunddatefilter = 'refund/getAll/';
  private readonly refundcheck = 'refund/response';

  //alcarte mso

  private readonly msoactive = 'serviceProvider/viewActive';
  private readonly msoregions = 'region/viewByService/';
  private readonly custopay = 'otherpayment/advanceSearch/';
  private readonly smssearch = 'merchantSms/getAllMerchantSms/';
  private readonly subscriptionmanualpay = 'maintanancePay/manualCash/';

  //sticker

  private readonly stickerget = 'stickerconfig/getall';

  // sticker getall
  private readonly sticketgetall = 'stickercost/withPagination/getAll'
  // Add
  private readonly stickerAdd = 'stickercost/add';
  // Edit
  private readonly stickeredit = 'stickercost/update'
  private readonly stickerstatus = 'stickercost/updateStatus';
  private readonly StickerHistory = 'stickerconfig/getStickerHistory';

  //Campagin
  private addcampagins = 'emailbroadcaster/sendemail';
  private readonly activemerchantemail = 'merchant/activeMerchants';

  //Branchkyc

  private readonly addkycbranchs = 'bankBranchProof/addProof';
  private readonly branchkycviews = 'bankBranchProof/viewByBrandId/';
  private readonly branchidentityFronts = 'bankBranchProof/identityFront';
  private readonly branchidentitybacks = 'bankBranchProof/identityBack';
  private readonly branchaddressFronts = 'bankBranchProof/addressFront';
  private readonly branchaddressbacks = 'bankBranchProof/addressBack';
  private readonly branchsignFronts = 'bankBranchProof/signatureFront';
  private readonly branchsignbacks = 'bankBranchProof/signatureBack';
  private readonly getbranchkycImages = 'bankBranchProof/viewDocuments/';
  private readonly editbranchIdentitys = 'bankBranchProof/updateIdentity';
  private readonly editbranchAddres = 'bankBranchProof/updateAddress';
  private readonly editbranchSigns = 'bankBranchProof/updateSignature';
  private readonly branchkycinfos = 'branchFacheckVerify/getById/';
  private readonly identitybranchApprovals = 'bankBranchProof/approvalForidentity';
  private readonly addressbranchApprovals = 'bankBranchProof/approvalForAddress';
  private readonly signbranchApprovals = 'bankBranchProof/approvalForSignature';
  private readonly adharbranchVerifyIdentitys = 'branchFacheckVerify/identityAadharVerify';
  private readonly adharbranchVerifyAddres = 'branchFacheckVerify/addressAadharVerify';
  private readonly adharbranchVerifySign = 'branchFacheckVerify/signatureAadharVerify';
  private readonly panbranchVerifyIdentitys = 'branchFacheckVerify/identityPanVerify';
  private readonly panbranchVerifyAddres = 'branchFacheckVerify/addressPanVerify';
  private readonly panbranchVerifySign = 'branchFacheckVerify/signaturePanVerify';
  private readonly passportbranchVerifyIdentitys = 'branchFacheckVerify/identityPassportVerify';
  private readonly passportbranchVerifyAddres = 'branchFacheckVerify/addressPassportVerify';
  private readonly passportbranchVerifySign = 'branchFacheckVerify/signaturePassportVerify';
  private readonly drivingbranchVerifyIdentitys = 'branchFacheckVerify/identityDrivingVerify';
  private readonly drivingbranchVerifyAddres = 'branchFacheckVerify/addressDrivingVerify';
  private readonly drivingbranchVerifySign = 'branchFacheckVerify/signatureDrivingVerify';
  private readonly voterbranchVerifyIdentitys = 'branchFacheckVerify/identityVoterVerify';
  private readonly voterbranchVerifyAddres = 'branchFacheckVerify/addressVoterVerify';
  private readonly voterbranchVerifySign = 'branchFacheckVerify/signatureVoterVerify';

  //branch terminal view

  private readonly branchterminalview = 'branchTerminal/getAll';
  private readonly branchtermialviewbyid = 'branchTerminal/getByBranch/';
  private readonly branchterminalstatus = 'branchTerminal/updateStatus/';
  private readonly branchterminalcreate = 'branchTerminal/add';
  private readonly branchterminaledit = 'branchTerminal/update/';

  //entity terminal view

  private readonly entityterminalview = 'entityTerminal/getall';
  private readonly entityterminalviewmerchant = 'entityTerminal/viewByMerchant/';
  private readonly entityterminalstatus = 'entityTerminal/updateStatus/';
  private readonly entityterminalcreate = 'entityTerminal/create';
  private readonly entityterminalupdate = 'entityTerminal/update/';

  //customer payments

  private readonly customerpayget = 'customerpay/viewEntitySearch/';
  private readonly customerpayfilter = 'customerpay/viewPaymentStatusFilter/';
  private readonly Additionalpaysearch = 'customerotherpayment/viewEntitySearch/';
  private readonly Additionalpayfilter = 'customerotherpayment/viewPaymentStatusFilter/';
  private readonly Cloudfeesearch = 'maintanancePay/viewEntitySearch/';
  private readonly Cloudfeefilter = 'maintanancePay/viewPaymentStatusFilter/';
  private readonly Onetimepaysearch = 'merchantpay/viewEntitySearch/';
  private readonly Onetimepaydatefilter = 'merchantpay/viewPaymentStatusFilter/';
  private readonly Otherpaymentsearch = 'otherpayment/viewEntitySearch/';
  private readonly Otherpaydatefilter = 'otherpayment/viewPaymentStatusFilter/';

  // Refund Period

  private readonly refundperiodviewall = 'refundPeriod/withPagination/getAll';
  private readonly refundperiodadd = 'refundPeriod/add';
  private readonly refundperiodupdate = 'refundPeriod/update';
  private readonly refundperiodbyid = 'refundDayLimit/getDays/';
  private readonly refundperiodhistory = 'refundPeriod/getHistory';
  private readonly refundperiostatus = 'refundPeriod/updateStatus'

  //campaign

  private readonly viewcampaigns = 'emailbroadcaster/viewevent/';
  private readonly campaignimageUpdates = 'emailbroadcaster/updateimage';
  private readonly campaignimageviews = 'emailbroadcaster/viewimage/';
  private readonly campaignstatu = 'emailbroadcaster/activestatusupdate/';
  private readonly viewrecordcampaign = 'emailbroadcaster/viewemailsentresponse/';
  private readonly viewresponsecampaign = 'emailbroadcaster/viewemailaddressonly/';
  private readonly editcampaigns = 'emailbroadcaster/updatedata/';
  private readonly updatebulks = 'emailbroadcaster/uploadbulkemail/';
  private readonly viewemailsendresponsecampaign = 'emailbroadcaster/getemailaddress/';

  //peronsalview

  private readonly customertransactionsearchs = 'customerpay/viewByCustomerSearch/';
  private readonly customeradditionaltransactionsearchs = 'customerotherpayment/viewByCustomerSearch/';

  //dashboard

  private readonly dashbordcustomercount = 'dashBoard/customerCount/';
  private readonly dashboardviewpending = 'customerpay/viewbyPendingCustomers/';
  private readonly dashboardemployeecount = 'merchantadminlogin/activeInactiveCount/';
  private readonly dashbaordcustomerdayTransactions = 'entitydashboard/dayTransactions/';
  private readonly dashboardCurrentmonthcustomertransaction = 'entitydashboard/monthlyCustomerDues/';
  private readonly dashboardlastmonthcustomertransaction = 'entitydashboard/lastMonthCustomerTransactions/';
  private readonly dashboardthismonthcustomertransaction = 'entitydashboard/thisMonthCustomerTransactions/';
  private readonly dashboarddatecustomertransaction = 'entitydashboard/customerRangeTransaction/';
  private readonly dashboardthismonthadditionaltransaction = 'entitydashboard/thisMonthAdditionalTransactionsAmount/';
  private readonly dashboardlastmonthadditionaltransaction = 'entitydashboard/lastMonthAdditionalTransactions/';
  private readonly actvemerchants = 'merchant/limitActiveMerchants';
  private readonly actvemerchantsearchs = 'merchant/limitActiveMerchantsearch/';
  private readonly inactivebranchs = 'bankBranch/updateStatus/';
  private readonly branchonlyactives = 'bankBranch/viewbranchwithoutselect/';
  private readonly entityonlinebranch = 'customerpay/branchwiseTransaction/';
  private readonly entitysearchbranch = 'customerpay/branchwiseSearch/';
  private readonly entitywithbranchexports = 'customerpay/branchwiseTransactionExport/';
  private readonly entitywithputbranchexports = 'customerpay/viewByBranchMerchantExport/';
  private readonly termspolicysearchs = 'policy/viewMerchantSearch/';

  //export report

  private readonly exportreportadd = 'exportData/add';
  private readonly exportreportview = 'exportData/getallSuperAdmin';
  private readonly exportreportdownload = 'exportData/viewExportedData/';

  //branch

  private readonly branchview = 'bankBranch/viewmerchantactive/';

  //Renewal Autodebit

  private readonly renewalautodebitbyids = 'merchantdue/getmerchantRenewal/';
  private readonly renewalautodebitsearchbyids = 'merchantdue/renewalMerchantSearch/';
  private readonly renewalautodebits = 'merchantdue/getallrenewal/';
  private readonly renewalautodebitsearchs = 'merchantdue/renewalSearch/';

  //Additional Transaction

  private readonly additionalduesTransactions = 'customerotherpayment/viewBranchMerchantOnline/';
  private readonly additionalBranchTransactions = 'customerotherpayment/viewAllBranchTransaction/';
  private readonly additionalBranchwiseTransactions = 'customerotherpayment/viewBranchTransaction/';

  //Refund for Additional Transactions

  private readonly additionalRefundGetAlls = 'addtionalPayRefund/getOnlineRefunds/';

  //Refund for Additional Transactions

  private readonly refundadditionalgetalls = 'addtionalPayRefund/getmerchant/';
  private readonly refundformerchant = 'refund/getmerchant/';
  private readonly onlinerefunddatefilter = 'refund/getmerchant/';
  private readonly RefundForMerchantsearchs = 'refund/getmerchant/';

  // SMS details for merchants and Trigger

  private readonly Merchantsmsdetails = 'monthlySmsLog/getByMonthlymerchant/';
  private readonly Merchantsmslogs = 'monthlySmsLog/viewByMonthlySmsLogId/';
  private readonly merchantsmstigger = 'monthlySmsLog/smsTrigger';

  // refund cumlative

  private readonly duesCumulativeRefunds = 'refund/cumulativeRefund';
  private readonly additionalCumulativeRefunds = 'addtionalPayRefund/cumulativeRefund';

  // WhatAPP API,S

  private readonly WhatappActiveventors = 'vendor/getallactive';
  private readonly Whatappmerchantdetails = 'merchantWhatsapp/getMerchant/Templates/';
  private readonly WhatappTemplate = 'merchantWhatsapp/viewMerchantTemplates/';
  private readonly CreateMerchatWhatapp = 'merchantWhatsapp/create/template';
  private readonly UpdateMerchantWhatapp = 'merchantWhatsapp/update/template';
  private readonly merchatWhatappStatus = 'merchantWhatsapp/updateStatus';
  private readonly merchatWhapappApproval = 'merchantWhatsapp/updateApprovalStatus';
  private readonly MechantsWhatsappGetall = 'merchantWhatsapp/filter';
  private readonly MechantsWhatsappGetallexport = 'merchantWhatsapp/viewAll';
  private readonly WhatsappHistory = 'whatsappHistory/viewallAndSearch';
  private readonly whatsapphistoryFilter = 'whatsappHistory/viewAllFilter/';
  private readonly WhatsappEditHistory = 'merchantWhatsapp/getDataBywhatsAppId/';


  //WhatsApp Bulk Upload

  private readonly whatsappbulkupload = 'whatsappHistory/whatsappBulkUpload/';
  private readonly whatsappbulkgetall = 'whatsappHistory/bulk/getall';
  private readonly whatsappbulkbyid = 'whatsappHistory/bulk/byId/';

  // WhatsappVendors

  private readonly WhatsAppVendorsViewall = 'whatsapp/vendor/withPagination/getAll ';
  private readonly WhatsAppVendorsAdd = 'whatsapp/vendor/add';
  private readonly WhatsAppVendorsUpdate = 'whatsapp/vendor/update';
  private readonly WhatsAppVendorsStatus = 'whatsapp/vendor/updateStatus ';

  loginError = new Subject();
  // token = sessionStorage.getItem('token') || null;
  token = this.cryptoService.decrypt(sessionStorage.getItem('One') || '');


  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    X_ACCESS_TOKEN: `Bearer ${this.token}`,
  });

  headersMultipart = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    X_ACCESS_TOKEN: `Bearer ${this.token}`,
  });

  options = { headers: this.headers };
  optionsMultipart = { headers: this.headersMultipart };

  // getToken() {
  //   return !!sessionStorage.getItem('token');
  // }

  // getToken(): boolean {
  //   const encryptedToken = sessionStorage.getItem('One');
  //   if (!encryptedToken) return false;

  //   try {
  //     const token = this.cryptoService.decrypt(encryptedToken);
  //     return !!token;
  //   } catch (e) {
  //     console.error('Token decryption failed:', e);
  //     return false;
  //   }
  // }

  getToken(): string | null {
    const encrypted = sessionStorage.getItem('One');
    return encrypted ? this.cryptoService.decrypt(encrypted) : null;
  }

  Captcha(model: any) {
    return this.Client.post(`${this.basePath}${this.LoginCaptcha}`, model)
  }

  getLogin(email: string, password: string, captcha: string) {
    const credentialBody = {
      emailAddress: email,
      password: password,
      captcha: captcha,
    };
    let submitmodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(credentialBody))
    }
    return this.http.post(`${this.basePath}${this.adminlogin}`, submitmodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.details = JSON.parse(this.cryptoService.decrypt(res.data));
        this.user = this.details.admin;
        sessionStorage.setItem('One', this.cryptoService.encrypt(this.details.X_ACCESS_TOKEN));
        sessionStorage.setItem('Two', this.cryptoService.encrypt(this.user.userId.toString()));
        sessionStorage.setItem('Three', this.cryptoService.encrypt(this.user.name));
        sessionStorage.setItem('Four', this.cryptoService.encrypt(this.user.emailAddress));
        sessionStorage.setItem('Five', this.cryptoService.encrypt(this.user.address));
        sessionStorage.setItem('Six', this.cryptoService.encrypt(this.user.mobileNumber));
        sessionStorage.setItem('Eight', this.cryptoService.encrypt(this.user.createdBy));
        sessionStorage.setItem('Nine', this.cryptoService.encrypt(this.user.roleEntity?.roleId.toString()));
        this.router.navigateByUrl('/dashboard/dashboard-content', { replaceUrl: true });
        this.timerService.restartTimer();
      } else {
        this.toastr.error(res.messageDescription);
      }
    });
  }

  getIpAddress() {
    return this.http.get(`${this.ipApiUrl}`);
  }

  getIpLocation(model: any) {
    return this.http.post(`${this.geoApiUrl}`, model);
  }

  dashboardCount() {
    return this.http.get(`${this.basePath}${this.dashboardData}`, this.options);
  }
  dashboardbusinessgetalls() {
    return this.http.get(`${this.basePath}${this.dashboardbusinessgetall}`, this.options);
  }

  dashboardbusinesscategorybyids(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardbusinesscategorybyid}${id}`, this.options);
  }

  dashboardbusinesscategorys(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardbusinesscategory}${id}`, this.options);
  }

  dashboardtransactions(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.dashboardtransaction}${id}/${id1}/${id2}/${id3}`, this.options);
  }

  //business category

  Businesscategory(model: any) {
    return this.http.post(`${this.basePath}${this.businesscategoryget}`, model, this.options);
  }

  BusinessCreate(model: any) {
    return this.http.post(`${this.basePath}${this.businesscategoryAdd}`, model, this.options);
  }

  BusinessEdit(model: any) {
    return this.http.put(`${this.basePath}${this.businesscategoryEdit}`, model, this.options);
  }

  Businessactive(model: any) {
    return this.http.put(`${this.basePath}${this.businesscategorystatus}`, model, this.options);
  }

  ActiveBus(modal: any) {
    return this.http.post(`${this.basePath}${this.ActiveBussinesscate}`, modal, this.options)
  }

  //business category kyc

  BusinesscategoryKyc(model: any) {
    return this.http.post(`${this.basePath}${this.businesscategorykycget}`, model, this.options);
  }

  BusinesskycActive(model: any) {
    return this.http.put(`${this.basePath}${this.businesscategorykycactive}`, model, this.options);
  }

  BusinesskycCreate(model: any) {
    return this.http.post(`${this.basePath}${this.businesskycAdd}`, model, this.options);
  }

  BusinesscategoryKycactive() {
    return this.http.get(`${this.basePath}${this.businesskycdocactive}`, this.options);
  }

  // 123

  Businessactivestatus(model: any) {
    return this.http.post(`${this.basePath}${this.buskycactivestatus}`, model, this.options)
  }

  // 
  Businessactivedocument(model: any) {
    return this.http.post(`${this.basePath}${this.activedocuments}`, model, this.options)
  }

  Businesskycupdate(model: any) {
    return this.http.put(`${this.basePath}${this.businesskycupdate}`, model, this.options
    );
  }

  getForgotPassword(model: any) {
    return this.http.post(`${this.basePath}${this.forgotpassword}`, model, this.options);
  }

  VerifyOtp(data: any) {
    return this.http.post(`${this.basePath}${this.verifyotp}`, data, this.options);
  }

  ResendOtp(data: any) {
    return this.http.post(`${this.basePath}${this.resendotp}`, data, this.options);
  }

  ResetPassword(data: any) {
    return this.http.post(`${this.basePath}${this.resetpassword}`, data, this.options);
  }

  ChangePassword(data: any) {
    return this.http.post(`${this.basePath}${this.changepassword}`, data, this.options);
  }

  GetAdminDetails(modal: any) {
    return this.http.post(`${this.basePath}${this.admingetall}`, modal, this.options);
  }

  UpdateAdminStatus(data: any) {
    return this.http.put(`${this.basePath}${this.adminstatus}`, data, this.options
    );
  }

  viewTicket() {
    return this.http.get(`${this.basePath}${this.viewallTicket}`, this.options);
  }

  updatetickets(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.updateTicket}${id}`, model, this.options
    );
  }

  UpdateStickerTickets(model: any) {
    return this.http.put(`${this.basePath}${this.updatestickerticket}`, model, this.options);
  }

  viewticketImage(id: string) {
    return this.http.get(`${this.basePath}${this.viewTicketImage}${id}`, {
      ...this.options, ...{ responseType: 'blob' },
    });
  }

  //Roles and permission

  permissionget(modal: any) {
    return this.http.post(`${this.basePath}${this.permissiongetall}`, modal, this.options);
  }

  subPermission(model: any) {
    return this.http.post(`${this.basePath}${this.getsubPermission}`, model, this.options);
  }

  addRoles(model: any) {
    return this.http.post(`${this.basePath}${this.addRole}`, model, this.options);
  }

  rolesStatus(model: any) {
    return this.http.put(`${this.basePath}${this.roleStatus}`, model, this.options);
  }

  viewRoles(modal: any) {
    return this.http.post(`${this.basePath}${this.viewallRoles}`, modal, this.options);
  }

  viewPermissionSubPermission(id: any) {
    return this.http.get(`${this.basePath}${this.viewPermissionSubpermission}${id}`, this.options);
  }

  editRole(model: any) {
    return this.http.put(`${this.basePath}${this.updateRole}`, model, this.options);
  }

  rolegetById(modal: any) {
    return this.http.post(`${this.basePath}${this.rolegetByid}`, modal, this.options);
  }

  RolebyIDnew(modal: any) {
    return this.http.post(`${this.basePath}${this.RolegetByidnew}`, modal, this.options)
  }

  //privacy policy

  Policymerchant() {
    return this.http.get(`${this.basePath}${this.policymerchant}`, this.options);
  }

  Policiesgetbyid(id: any) {
    return this.http.get(`${this.basePath}${this.policiesbyid}${id}`, this.options);
  }

  ApprovalForPolicy(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.policyapproval}${id}`, model, this.options);
  }

  adminPolicyget(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.adminpolicy}/${id}/${id1}`, this.options);
  }

  adminPolicygetExport() {
    return this.http.get(`${this.basePath}${this.adminpolicy}`, this.options);
  }

  adminpolicycreate(model: any) {
    return this.http.post(`${this.basePath}${this.Adminpolicycreate}`, model, this.options);
  }

  adminpolicyedit(id: any, data: any) {
    return this.http.put(`${this.basePath}${this.Adminpolicyedit}${id}`, data, this.options);
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

  AdminView(modal: any) {
    return this.http.post(`${this.basePath}${this.adminview}`, modal, this.options);
  }

  roleactiveViewall(modal: any) {
    return this.http.post(`${this.basePath}${this.roleactiveviewall}`, modal, this.options);
  }

  Bussinesscategoryactivelist() {
    return this.http.get(`${this.basePath}${this.businesskycdocactive}`, this.options);
  }

  //Region

  RegionGet() {
    return this.http.get(`${this.basePath}${this.Regionget}`, this.options);
  }

  RegionGetAllActive() {
    return this.http.get(`${this.basePath}${this.Regiongetallactive}`, this.options);
  }

  ActiveRegionsbyserviceprovider(id: any) {
    return this.http.get(`${this.basePath}${this.ActiveRegionbyServiceid}${id}`, this.options);
  }

  regionbyitsid(id: any) {
    return this.http.get(`${this.basePath}${this.regionbyitsids}${id}`, this.options);
  }

  RegionCreate(model: any) {
    return this.http.post(`${this.basePath}${this.Regioncreate}`, model, this.options);
  }

  RegionStatus(model: any) {
    return this.http.put(`${this.basePath}${this.regionstatus}`, model, this.options);
  }

  RegionEdit(model: any) {
    return this.http.put(`${this.basePath}${this.regionupdate}`, model, this.options
    );
  }

  Activeregions() {
    return this.http.get(`${this.basePath}${this.ActiveRegions}`, this.options);
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
    return this.http.get(`${this.basePath}${this.Activeprovider}`, this.options);
  }

  //FA Check key

  addfacheck(model: any) {
    return this.http.post(`${this.basePath}${this.addfacheckkey}`, model, this.options);
  }

  viewfacheck(model: any) {
    return this.http.post(`${this.basePath}${this.viewfacheckkey}`, model, this.options);
  }

  statusfacheck(model: any) {
    return this.http.put(`${this.basePath}${this.statusfacheckkey}`, model, this.options);
  }

  updatefacheck(model: any) {
    return this.http.put(`${this.basePath}${this.updatefacheckkey}`, model, this.options);
  }

  EntityViewall(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.entitygetall}${id}/${id1}`, this.options);
  }

  EntityViewallExport() {
    return this.http.get(`${this.basePath}${this.Entitygetallexport}`, this.options);
  }

  EntityAdd(formdata: any) {
    return this.http.post(`${this.basePath}${this.AddEntity}`, formdata, this.optionsMultipart);
  }

  UpdatePersonalEntity(id: any, formdata: any) {
    return this.http.put(`${this.basePath}${this.updateEntity}${id}`, formdata, this.optionsMultipart);
  }

  EstampGetActive() {
    return this.http.get(`${this.basePath}${this.Estamp}`, this.options)
  }

  //email trigger

  EmailTrigger(data: any) {
    return this.http.post(`${this.basePath}${this.emailtrigger}`, data, this.options);
  }

  EntitylogoUpdate(data: FormData) {
    return this.http.put(`${this.basePath}${this.merchantlogo}`, data, this.optionsMultipart);
  }

  KeysUpdate(model: any) {
    return this.http.put(`${this.basePath}${this.keysupdate}`, model, this.options);
  }

  paymentLinkview(id: any) {
    return this.http.get(`${this.basePath}${this.paymentlink}${id}`, this.options);
  }

  EntityGetKYCbybussinessid(id: any) {
    return this.http.get(`${this.basePath}${this.EntityKYCBYbusinessid}${id}`, this.options);
  }

  ManualRecieptView(id: any) {
    return this.http.get(`${this.basePath}${this.manualreciept}${id}`, {
      ...this.options, ...{ responseType: 'blob' },
    });
  }

  MerchatPlandetails(id: any) {
    return this.http.get(`${this.basePath}${this.EntityPlanDetails}${id}`, this.options);
  }

  // EntityAddKyc(formdata: FormData) {
  //   return this.http.post(`${this.basePath}${this.AddEntityKYC}`, formdata, this.optionsMultipart)
  // }

  EntityViewbyid(id: any) {
    return this.http.get(`${this.basePath}${this.Entityviewbyid}${id}`, this.options);
  }

  EntityActiveStatus(model: any) {
    return this.http.put(`${this.basePath}${this.entityactivestatus}`, model, this.options);
  }

  //bank

  EntitybankAdd(model: any) {
    return this.http.post(`${this.basePath}${this.EntityBankAdd}`, model, this.options);
  }

  EntitybankEdit(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.EntityBankEdit}${id}`, model, this.options);
  }

  BankActiveStatus(id: any, data: any) {
    return this.http.put(`${this.basePath}${this.bankactivestatus}${id}`, data, this.options);
  }

  BankprimaryStatus(id: any, data: any) {
    return this.http.put(`${this.basePath}${this.bankprimarystatus}${id}`, data, this.options);
  }

  EntityBankApprovals(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.EntityBankApproval}${id}`, model, this.options);
  }

  //kyc document

  entitykycs(formdata: FormData) {
    return this.http.post(`${this.basePath}${this.entitykyc}`, formdata, this.optionsMultipart);
  }

  KycAdd(data: any) {
    return this.http.post(`${this.basePath}${this.kycadd}`, data, this.optionsMultipart);
  }

  KycUpdate(data: any) {
    return this.http.post(`${this.basePath}${this.editkyc}`, data, this.optionsMultipart);
  }

  getImageview(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.kycdocument}${id}/${id1}`, {
      ...this.options, ...{ responseType: 'blob' },
    });
  }

  KycApproval(id: any, data: any) {
    return this.http.put(`${this.basePath}${this.kycapproval}${id}`, data, this.options);
  }

  KycDocName(id: any) {
    return this.http.get(`${this.basePath}${this.Kycdocname}${id}`, this.options
    );
  }

  FacheckVoterIdVerification(data: any) {
    return this.http.post(`${this.basePath}${this.voterId}`, data, this.options);
  }

  //verification response

  // FacheckVerificationResponse(id: any) {
  //   return this.http.get(`${this.basePath}${this.facheckresponse}${id}`, this.options)
  // }


  EntityBusinessCategoryId(id: any) {
    return this.http.get(`${this.basePath}${this.businessid}${id}`, this.options);
  }

  //verification response

  AaadharVerificationResponse(id: any) {
    return this.http.get(`${this.basePath}${this.aadharinfo}${id}`, this.options);
  }

  PanVerificationResponse(id: any) {
    return this.http.get(`${this.basePath}${this.paninfo}${id}`, this.options);
  }

  PassportVerificationResponse(id: any) {
    return this.http.get(`${this.basePath}${this.passportinfo}${id}`, this.options);
  }

  CinchVerificationResponse(id: any) {
    return this.http.get(`${this.basePath}${this.cinchinfo}${id}`, this.options);
  }

  GstVerificationResponse(id: any) {
    return this.http.get(`${this.basePath}${this.gstinfo}${id}`, this.options);
  }

  VoterIdVerificationResponse(id: any) {
    return this.http.get(`${this.basePath}${this.voteridinfo}${id}`, this.options);
  }

  DrivingLicenseVerificationResponse(id: any) {
    return this.http.get(`${this.basePath}${this.drivinglicenseinfo}${id}`, this.options);
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
    return this.http.get(`${this.basePath}${this.bankgetfacheck}${id}`, this.options);
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
    return this.http.get(`${this.basePath}${this.manualpayget}${id}`, this.options);
  }

  GetManualTransaction(id: any) {
    return this.http.get(`${this.basePath}${this.manualtransaction}${id}`, this.options);
  }


  //pg onboard

  PgOnboard(model: any) {
    return this.http.post(`${this.basePath}${this.pgonboard}`, model, this.options);
  }


  //customer

  EntityCustomerview(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.Entitycustomerview}${id}/${id1}/${id2}`, this.options);
  }

  EntityCustomerviewsearch(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.EntityCustomerviewsearchs}${id}/${id1}/${id2}/${id3}`, this.options);
  }

  ViewCustomerDetails(id: any) {
    return this.http.get(`${this.basePath}${this.customerview}${id}`, this.options);
  }

  CustomerTransactions(id: any) {
    return this.http.get(`${this.basePath}${this.customertransaction}${id}`, this.options);
  }

  CustomerTransaction(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.customertransaction}${id}/${id1}/${id2}`, this.options);
  }


  //entity transaction

  EntityTraansaction(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.entitytransaction}${id}/${id1}/${id2}`, this.options);
  }

  EntityTraansactionSearch(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.entitytraansactionSearchs}${id}/${id1}/${id2}/${id3}`, this.options);
  }

  EntityTransactionexport(id: any) {
    return this.http.get(`${this.basePath}${this.EntityTransactionexports}${id}`, this.options);
  }

  TransactionForMerchant(model: any) {
    return this.http.post(`${this.basePath}${this.transactionformerchant}`, model, this.options);
  }

  //qr

  EntityQrGenerate(id: any) {
    return this.http.get(`${this.basePath}${this.EntityQrgenerate}${id}`, this.options);
  }

  QRImageView(id: any) {
    return this.http.get(`${this.basePath}${this.qrimageview}${id}`, {
      ...this.options, ...{ responseType: 'blob' },
    });
  }

  CustomerQRImageView(id: any) {
    return this.http.get(`${this.basePath}${this.CustomerQR}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    });
  }

  CustomerQRCreation(id: any) {
    return this.http.get(`${this.basePath}${this.CustomerQRGenerate}${id}`, this.options);
  }

  //refund

  Entityrefund(id: any) {
    return this.http.get(`${this.basePath}${this.EntityRefund}${id}`, this.options);
  }

  //settlement Online

  Entitysettlement(model: any) {
    return this.http.post(`${this.basePath}${this.EntitySettlement}`, model, this.options);
  }

  entitySettleTransaction(model: any) {
    return this.http.post(`${this.basePath}${this.EntitySettlementtransaction}`, model, this.options);
  }

  // Settlement Offline

  Entitysettlementoffline(model: any) {
    return this.http.post(`${this.basePath}${this.EntitySettlementOffline}`, model, this.options);
  }

  EntityOfflinePayouts(model: any) {
    return this.http.post(`${this.basePath}${this.offlinePayouts}`, model, this.options)
  }

  //Withdrawal Method

  viewwithdrawals() {
    return this.http.get(`${this.basePath}${this.viewwithdrawal}`, this.options);
  }

  addwithdrawals(model: any) {
    return this.http.post(`${this.basePath}${this.addwithdrawal}`, model, this.options);
  }

  editwithdrawals(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.editwithdrawal}${id}`, model, this.options);
  }

  statuswithdrawals(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.statuswithdrawal}${id}`, model, this.options);
  }

  //Beneficiary


  addbeneficiarys(model: any) {
    return this.http.post(`${this.basePath}${this.addbeneficiary}`, model, this.options);
  }

  viewbeneficiarys() {
    return this.http.get(`${this.basePath}${this.viewbeneficiary}`, this.options);
  }

  viewbyidbeneficiarys(id: any) {
    return this.http.get(`${this.basePath}${this.viewbyidbeneficiary}${id}`, this.options);
  }


  statusbeneficiarys(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.statusbeneficiary}${id}`, model, this.options);
  }

  AlcartviewallExport() {
    return this.http.get(`${this.basePath}${this.alcartviewallexport}`, this.options);
  }

  Alcartviewall(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.alcartvieall}${id}/${id1}`, this.options);
  }

  AlcardAdd(Formdata: FormData) {
    return this.http.post(`${this.basePath}${this.alcartAdd}`, Formdata, this.optionsMultipart);
  }

  AlcardUpdate(model: any) {
    return this.http.put(`${this.basePath}${this.Alcartupdate}`, model, this.optionsMultipart);
  }

  Alcardviewbyid(id: any) {
    return this.http.get(`${this.basePath}${this.alcartviewbyid}${id}`, this.options);
  }

  AlcardStatus(model: any) {
    return this.http.put(`${this.basePath}${this.alcartstatus}`, model, this.options);
  }

  AlcartImageview(id: any) {
    return this.http.get(`${this.basePath}${this.Alcartchannellogo}${id}`, { ...this.options, ...{ responseType: 'blob' }, });
  }

  AlcartImageUpdate(formdata: FormData) {
    return this.http.put(`${this.basePath}${this.AlcartChannellogoUpdate}`, formdata, this.optionsMultipart);
  }

  ActiveAlcards() {
    return this.http.get(`${this.basePath}${this.activealcards}`, this.options);
  }

  BouquetnameViewall() {
    return this.http.get(`${this.basePath}${this.BoucatenameViewall}`, this.options);
  }

  BouquetAdd(model: any) {
    return this.http.post(`${this.basePath}${this.BoucatenameAdd}`, model, this.options);
  }

  Bouquetnamebyid(id: any) {
    return this.http.get(`${this.basePath}${this.Boutenamebyid}${id}`, this.options);
  }

  BouquetnameUpdate(model: any) {
    return this.http.put(`${this.basePath}${this.BoutenameUpdate}`, model, this.options);
  }

  Bouquetstatusforbroadcaster(model: any) {
    return this.http.put(`${this.basePath}${this.Boucatenamestatus}`, model, this.options);
  }

  BoucatenamesActive() {
    return this.http.get(`${this.basePath}${this.BoucateGetactive}`, this.options);
  }

  //Broadcaster Bouquete name creation

  Bouqetenameviewall() {
    return this.http.get(`${this.basePath}${this.Bouquetenameviewall}`, this.options);
  }

  BouquetenameAdd(model: any) {
    return this.http.post(`${this.basePath}${this.Bouquetenameadd}`, model, this.options);
  }

  Bouquetenameupdatae(model: any) {
    return this.http.put(`${this.basePath}${this.Bouquetenameupdate}`, model, this.options);
  }

  Bouquenamebyid(id: any) {
    return this.http.get(`${this.basePath}${this.Bouquetenamebyid}${id}`, this.options);
  }

  Bouquetnamestatus(model: any) {
    return this.http.put(`${this.basePath}${this.Bouquetenamestatus}`, model, this.options);
  }

  BouquetenameActive() {
    return this.http.get(`${this.basePath}${this.Bouquetenameactive}`, this.options);
  }

  BouqueteNameByBroadcasterid(id: any) {
    return this.http.get(`${this.basePath}${this.BouquetenamebyBoueteid}${id}`, this.options);
  }

  BroadcasterBoucateviewall() {
    return this.http.get(`${this.basePath}${this.bouquetsviewall}`, this.options);
  }

  BroadcasterBoucateadd(model: any) {
    return this.http.post(`${this.basePath}${this.Bouquetadd}`, model, this.options);
  }

  BroadcasterBoucatebyid(id: any) {
    return this.http.get(`${this.basePath}${this.Bouquetsviewbyid}${id}`, this.options);
  }

  BroadcasterBoucatebyidregion(id: any) {
    return this.http.get(`${this.basePath}${this.Bouquetsviewbyidregion}${id}`, this.options);
  }

  BroadcasterBoucatebyidregionall(id: any) {
    return this.http.get(`${this.basePath}${this.Bouquetsviewbyidregionall}${id}`, this.options)
  }

  Broadcastermsoregion(model: any) {
    return this.http.put(`${this.basePath}${this.Bouquetmsoregionstatus}`, model, this.options)
  }

  BroadcasterBoucatebyidchannel(id: any) {
    return this.http.get(`${this.basePath}${this.Bouquetsviewbyidchannel}${id}`, this.options);
  }

  BroadcasterBoucateStatus(model: any) {
    return this.http.put(`${this.basePath}${this.Bouquetstatus}`, model, this.options);
  }

  ActiveBroadcasterBoucates() {
    return this.http.get(`${this.basePath}${this.ActiveBouqutes}`, this.options);
  }

  BroadcasterBoucatesEdit(Model: any) {
    return this.http.put(`${this.basePath}${this.bouquetEdit}`, Model, this.options);
  }

  BroadcasterBoucatesRegionEdit(Model: any) {
    return this.http.put(`${this.basePath}${this.BroadcasterBoucatesRegionEdits}`, Model, this.options);
  }

  BroadcasterBoucateschannelEdit(Model: any) {
    return this.http.put(`${this.basePath}${this.BroadcasterBoucateschannelEdits}`, Model, this.options);
  }

  BroadcasterSingleStatus(model: any) {
    return this.http.put(`${this.basePath}${this.bouquetesinglestatus}`, model, this.options);
  }

  AddExtraChannelsforBouquete(model: any) {
    return this.http.post(`${this.basePath}${this.AddChannelsbyBouquete}`, model, this.options);
  }

  BouquetsRegion(model: any) {
    return this.http.post(`${this.basePath}${this.bouquetsextraregions}`, model, this.options);
  }

  BouquetChanneledit(id: any) {
    return this.http.get(`${this.basePath}${this.bouquetchanneledit}${id}`, this.options);
  }

  DPOViewall() {
    return this.http.get(`${this.basePath}${this.DPOBouqueteViewall}`, this.options);
  }

  DPOAdd(model: any) {
    return this.http.post(`${this.basePath}${this.DPOBouqueteadd}`, model, this.options);
  }

  DPObyid(id: any) {
    return this.http.get(`${this.basePath}${this.DPOBouqueteviewbyid}${id}`, this.options);
  }

  DPOUpdate(model: any) {
    return this.http.put(`${this.basePath}${this.DPOBouqueteUpdate}`, model, this.options);
  }

  DpoStatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.DPOBouquetestatus}${id}`, model, this.options);
  }

  ActiveDPO() {
    return this.http.get(`${this.basePath}${this.DPOActiveBouqutes}`, this.options);
  }

  DpoSingleChannelStatus(model: any) {
    return this.http.put(`${this.basePath}${this.DPOSinglechannelstatus}`, model, this.options);
  }

  //Merchant plan creation

  merchantplanviewall(modal: any) {
    return this.http.post(`${this.basePath}${this.Merchantplanviewall}`, modal, this.options);
  }

  merchantplanadd(model: any) {
    return this.http.post(`${this.basePath}${this.MerchantplanAdd}`, model, this.options);
  }

  merchantplanUpdate(model: any) {
    return this.http.put(`${this.basePath}${this.MerchantplanUpdate}`, model, this.options);
  }

  merchantplanstatus(model: any) {
    return this.http.put(`${this.basePath}${this.MerchantplanStatus}`, model, this.options);
  }

  merchantplanactive() {
    return this.http.get(`${this.basePath}${this.MerchantActivePlans}`, this.options);
  }

  //PG Setup

  PGsetupget(model: any) {
    return this.http.post(`${this.basePath}${this.pgsetupget}`, model, this.options);
  }

  Pgsetupstatus(model: any) {
    return this.http.put(`${this.basePath}${this.pgsetupstatus}`, model, this.options);
  }

  Pgsetupcreate(model: any) {
    return this.http.post(`${this.basePath}${this.pgsetupadd}`, model, this.options);
  }

  PgsetupUpdate(model: any) {
    return this.http.put(`${this.basePath}${this.pgsetupedit}`, model, this.options);
  }

  //overall customer

  OverallCustomer(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.Overallcustomer}${id}/${id1}`, this.options);
  }

  OverallCustomerExport() {
    return this.http.get(`${this.basePath}${this.overallcustomerexport}`, this.options);
  }

  EntityIndividualCustomerview(id: any) {
    return this.http.get(`${this.basePath}${this.Entityindividualcustomerview}${id}`, this.options);
  }

  ViewCustomerBasicInfo(id: any) {
    return this.http.get(`${this.basePath}${this.viewcustomerbasicdetails}${id}`, this.options);
  }

  ViewCustomersSetupBox(id: any) {
    return this.http.get(`${this.basePath}${this.viewSetupboxDetails}${id}`, this.options);
  }

  ActiveStatusSetupbox(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.activestatussetupbox}${id}`, model, this.options);
  }

  ViewSetupBoxPlanDetails(id: any) {
    return this.http.get(`${this.basePath}${this.viewsetupboxplan}${id}`, this.options);
  }

  ViewallSetupBoxPlanDetails(id: any) {
    return this.http.get(`${this.basePath}${this.viewCustomerallsetupboxplan}${id}`, this.options)
  }

  LCOPViewbyidcust(id: any) {
    return this.http.get(`${this.basePath}${this.PlanViewbyidcust}${id}`, this.options);
  }

  ActiveStatusCustomerPlan(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.activecustomerplan}${id}`, model, this.options);
  }

  //payment dues

  DuesViewAll() {
    return this.http.get(`${this.basePath}${this.paymentdues}`, this.options);
  }

  DuesGenerate() {
    return this.http.get(`${this.basePath}${this.generatedues}`, this.options);
  }

  MaintenanceReciept(id: any) {
    return this.http.get(`${this.basePath}${this.maintenance}${id}`, { ...this.options, ...{ responseType: 'blob' }, });
  }

  unblockAccount(modal: any) {
    return this.http.post(`${this.basePath}${this.unblockaccount}`, modal, this.options);
  }

  unblockentityAccount(id: any) {
    return this.http.get(`${this.basePath}${this.unblockentityaccount}${id}`, this.options);
  }

  //fargin policy

  viewfarginPolicy() {
    return this.http.get(`${this.basePath}${this.viewtermspolicy}`, this.options);
  }

  addTermsPolicy(model: any) {
    return this.http.post(`${this.basePath}${this.addtermspolicy}`, model, this.options);
  }

  editTermsPolicy(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.edittermspolicy}${id}`, model, this.options);
  }

  viewbyIdpolicy(id: any) {
    return this.http.get(`${this.basePath}${this.viewbyidpolicy}${id}`, this.options);
  }

  //Dashboard

  dashboardcustomersevenday() {
    return this.http.get(`${this.basePath}${this.dashboardlastssevendays}`, this.options);
  }

  dashboardcustomerfifteenday() {
    return this.http.get(`${this.basePath}${this.dashboardfifteendays}`, this.options);
  }

  dashboardcustomerthirtyday() {
    return this.http.get(`${this.basePath}${this.dashboardthirtydays}`, this.options);
  }

  dashboardcustomerlastmonth() {
    return this.http.get(`${this.basePath}${this.dashboardlastmonth}`, this.options);
  }

  dashboardcustomerthismonth() {
    return this.http.get(`${this.basePath}${this.dashboardthismonth}`, this.options);
  }

  dashboardcustomerstartenddates(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.dashboardcustomrange}${id}/${id1}`, this.options);
  }

  dashbaordcustomerdayTransaction() {
    return this.http.get(`${this.basePath}${this.dashboarddaytransaction}`, this.options);
  }

  // dashbaordcustomermobilenumbers(id: any,id1:any) {
  //   return this.http.get(`${this.basePath}${this.dashbaordcustomermobilenumber}${id}/${id1}`, this.options)
  // }

  dashboardcustomeroveralls() {
    return this.http.get(`${this.basePath}${this.dashboardoverall}`, this.options);
  }

  dashboardoverallmerchantids(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardoverallmerchantid}${id}`, this.options);
  }

  dashboardoverallamounts() {
    return this.http.get(`${this.basePath}${this.dashboardoverallamount}`, this.options);
  }

  dashboardoverallonetimes() {
    return this.http.get(`${this.basePath}${this.dashboardoverallonetime}`, this.options);
  }

  dashboardsevendaysamounts() {
    return this.http.get(`${this.basePath}${this.dashboardsevendaysamount}`, this.options);
  }

  //tickets

  Ticketscustomer(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.ticketsget}${id}/${id1}`, this.options);
  }

  Ticketssearchcustomer(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.ticketssearchcustomers}${id}/${id1}/${id2}`, this.options);
  }

  TicketscustomerExport() {
    return this.http.get(`${this.basePath}${this.ticketsgetexport}`, this.options);
  }

  customerraiseticketupdate(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.customerticketraise}${id}`, model, this.options);
  }

  // Bank Details Main Master

  bankdetailsViewall(model: any) {
    return this.http.post(`${this.basePath}${this.BankdetailsViewall}`, model, this.options);
  }

  bankdetailsAdd(model: any) {
    return this.http.post(`${this.basePath}${this.AddBankDetails}`, model, this.options);
  }

  bankdetailsviewbyid(id: any) {
    return this.http.get(`${this.basePath}${this.Bankdetailsviewbyid}${id}`, this.options);
  }

  bankdetailsUpdate(model: any) {
    return this.http.put(`${this.basePath}${this.EditBankdetails}`, model, this.options);
  }

  activebankdetails() {
    return this.http.get(`${this.basePath}${this.ActiveBankDetails}`, this.options);
  }

  activebankdetailsstatus(model: any) {
    return this.http.put(`${this.basePath}${this.Bankdetailsstatus}`, model, this.options);
  }

  CustomerAllTransactions(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.customeralltransactions}${id}/${id1}`, this.options);
  }

  CustomerAllTransactionsExport() {
    return this.http.get(`${this.basePath}${this.customertransactionexport}`, this.options);
  }

  CustomerTransactionsFilter(id1: any, id2: any, id3: any, id4: any) {
    return this.http.get(`${this.basePath}${this.customerdatefilter}${id1}/${id2}/${id3}/${id4}`, this.options);
  }

  CustomerTransactionsView(id1: any) {
    return this.http.get(`${this.basePath}${this.customertransactionview}${id1}`, this.options);
  }

  MaintenanceAllTransactions(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.maintenancetransaction}${id}/${id1}`, this.options);
  }

  OtherPaymentsView(id: any) {
    return this.http.get(`${this.basePath}${this.Otherpaymentview}${id}`, this.options);
  }

  MaintenancedueManuvelgenerate(model: any) {
    return this.http.post(`${this.basePath}${this.Manuveldueformaintenance}`, model, this.options);
  }

  CustomerManuvalDusegenrate(model: any) {
    return this.http.post(`${this.basePath}${this.customermanuvalduegenerate}`, model, this.options);
  }

  MaintenanceAllTransactionsExport() {
    return this.http.get(`${this.basePath}${this.maintenancetransactionexport}`, this.options);
  }

  MaintenanceTransactionFilter(id1: any, id2: any, id3: any, id4: any) {
    return this.http.get(`${this.basePath}${this.maintenancedatefilter}${id1}/${id2}/${id3}/${id4}`, this.options);
  }

  MaintenanceTransactionsView(id1: any) {
    return this.http.get(`${this.basePath}${this.maintenancetransactionview}${id1}`, this.options);
  }

  OneTimeAllTransactions(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.onetimtransaction}${id}/${id1}`, this.options);
  }

  OneTimeTransactionsExport() {
    return this.http.get(`${this.basePath}${this.onetimtransactionexport}`, this.options);
  }

  OneTimeTransactionFilter(id1: any, id2: any, id3: any, id4: any) {
    return this.http.get(`${this.basePath}${this.onetimdatefilter}${id1}/${id2}/${id3}/${id4}`, this.options);
  }

  OneTimeTransactionsView(id1: any) {
    return this.http.get(`${this.basePath}${this.onetimtransactionview}${id1}`, this.options);
  }

  QRCreateurl(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.QrcreateName}${id}/${id1}`, this.options);
  }

  QRURLcreation(model: any) {
    return this.http.post(`${this.basePath}${this.QrCreationimage}`, model, this.options);
  }

  OtherPayByMerchantId(id1: any) {
    return this.http.get(`${this.basePath}${this.otherpaymentmerchantid}${id1}`, this.options);
  }

  CreateOtherPayment(data: any) {
    return this.http.post(`${this.basePath}${this.otherpaymentcreate}`, data, this.options);
  }

  OtherPay(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.otherpayment}${id}/${id1}`, this.options);
  }

  OtherPayExport() {
    return this.http.get(`${this.basePath}${this.otherpaymentviewallexport}`, this.options);
  }

  OtherPaymentUpdate(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.otherpaymentupdate}${id}`, model, this.options);
  }

  OtherPayTransaction(id1: any) {
    return this.http.get(`${this.basePath}${this.otherpaytrans}${id1}`, this.options);
  }

  OtherPayFilter(id1: any, id2: any, id3: any, id4: any) {
    return this.http.get(`${this.basePath}${this.otherpaymentdate}${id1}/${id2}/${id3}/${id4}`, this.options);
  }

  OtherPayViewAll() {
    return this.http.get(`${this.basePath}${this.otherpaymentviewall}`, this.options);
  }

  OtherpaymentManualpay(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.Otherpaymanualpayment}${id}`, model, this.options);
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
    return this.http.put(`${this.basePath}${this.signatureback}`, data, this.optionsMultipart);
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
    return this.http.get(`${this.basePath}${this.facheckresponse}${id}`, this.options);
  }

  viewallkycCategory(model: any) {
    return this.http.post(`${this.basePath}${this.viewallkyccategory}`, model, this.options);
  }

  addkycCategory(model: any) {
    return this.http.post(`${this.basePath}${this.addkyccategory}`, model, this.options);
  }

  editkycCategory(model: any) {
    return this.http.put(`${this.basePath}${this.editkyccategory}`, model, this.options);
  }

  statuskycCategory(model: any) {
    return this.http.put(`${this.basePath}${this.statuskyccategory}`, model, this.options);
  }

  activeViewall() {
    return this.http.get(`${this.basePath}${this.activeviewall}`, this.options);
  }

  //Fargin banks

  Farginview(model: any) {
    return this.http.post(`${this.basePath}${this.farginview}`, model, this.options);
  }

  FarginCreate(model: any) {
    return this.http.post(`${this.basePath}${this.fargincreate}`, model, this.options);
  }

  FarginUpdate(model: any) {
    return this, this.http.put(`${this.basePath}${this.farginupdate}`, model, this.options)
  }

  Farginstatus(model: any) {
    return this.http.put(`${this.basePath}${this.farginstatus}`, model, this.options);
  }

  Farginedit(model: any) {
    return this.http.put(`${this.basePath}${this.farginEdit}`, model, this.options);
  }

  FarginBankhistory(model: any) {
    return this.http.post(`${this.basePath}${this.Farginbankhistory}`, model, this.options);
  }

  //smscreate

  CreateSMS(data: any) {
    return this.http.post(`${this.basePath}${this.smscreate}`, data, this.options);
  }

  SMSViewById(id1: any) {
    return this.http.get(`${this.basePath}${this.smsviewbyId}${id1}`, this.options);
  }

  smsStatus(id: any, data: any) {
    return this.http.put(`${this.basePath}${this.smsstatus}${id}`, data, this.options);
  }

  smsUpdate(id: any, data: any) {
    return this.http.put(`${this.basePath}${this.editsms}${id}`, data, this.options);
  }

  SmsGetAll(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.smsgetAll}${id}/${id1}`, this.options);
  }

  SmsGetAllExport() {
    return this.http.get(`${this.basePath}${this.smsgetAllexport}`, this.options);
  }

  SmsHistoryGetAll(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.smshistory}${id}/${id1}`, this.options);
  }

  smsfreepaiddropdowns(id: any) {
    return this.http.get(`${this.basePath}${this.smsfreepaiddropdown}${id}`, this.options);
  }

  SmsHistoryGetAllExport() {
    return this.http.get(`${this.basePath}${this.smhistoryexport}`, this.options);
  }

  SMSHistoryViewById(id1: any) {
    return this.http.get(`${this.basePath}${this.smshistoryview}${id1}`, this.options);
  }

  SMSHistoryFilter(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.smshistoryfilter}${id}/${id1}/${id2}/${id3}`, this.options);
  }

  SmsHistoryMerchantFilter(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.smshistorymerchantfilter}${id}/${id1}/${id1}`, this.options);
  }

  Logout(model: any) {
    return this.http.post(`${this.basePath}${this.logout}`, model, this.options);
  }

  CustomerReceipt(id: any) {
    return this.http.get(`${this.basePath}${this.customerreceipt}${id}`, { ...this.options, ...{ responseType: 'blob' }, });
  }

  OtherPaymentReciept(id: any) {
    return this.http.get(`${this.basePath}${this.otherpayReciept}${id}`, {
      ...this.options, ...{ responseType: 'blob' },
    });
  }

  documentAdd(data: FormData) {
    return this.http.post(`${this.basePath}${this.documentadd}`, data, this.optionsMultipart);
  }

  documentEdit(data: any) {
    return this.http.put(`${this.basePath}${this.documentedit}`, data, this.optionsMultipart);
  }

  documentApproval(id: any, data: any) {
    return this.http.put(`${this.basePath}${this.documentapproval}${id}`, data, this.options);
  }

  getdocumentImage(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.documentImage}${id}/${id1}`, {
      ...this.options, ...{ responseType: 'blob' },
    });
  }

  documentFrontedit(data: FormData) {
    return this.http.put(`${this.basePath}${this.documentfrontedit}`, data, this.optionsMultipart);
  }

  documentBackedit(data: FormData) {
    return this.http.put(`${this.basePath}${this.documentbackedit}`, data, this.optionsMultipart);
  }

  // SMS Cost

  smscostViewall() {
    return this.http.get(`${this.basePath}${this.SMSCostviewall}`, this.options);
  }

  smscostadd(model: any) {
    return this.http.post(`${this.basePath}${this.SMSCostadd}`, model, this.options);
  }

  smsupdate(modal: any) {
    return this.http.put(`${this.basePath}${this.SMSUpdate}`, modal, this.options)
  }

  smscoststatus(model: any) {
    return this.http.put(`${this.basePath}${this.SMSCostStatus}`, model, this.options);
  }

  SMShistory(modal: any) {
    return this.http.post(`${this.basePath}${this.SMSHistory}`, modal, this.options);
  }

  // AUTO Debit

  autodebitgetall(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.Autodebitgetall}${id}/${id1}`, this.options);
  }

  autodebitgetallExport() {
    return this.http.get(`${this.basePath}${this.autodebitgetallexport}`, this.options);
  }

  autodebitbymerchat(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.Autodebitbymerchat}${id}/${id1}/${id2}`, this.options);
  }

  autodebitbymerchatsearch(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.autodebitbymerchatsearchs}${id}/${id1}/${id2}/${id3}`, this.options);
  }

  //announcement

  announcementAdd(data: any) {
    return this.http.post(`${this.basePath}${this.announcementadd}`, data, this.options);
  }

  announcementViewall(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.announcementviewall}${id}/${id1}`, this.options);
  }

  announcementViewallExport() {
    return this.http.get(`${this.basePath}${this.announcementviewallexport}`, this.options);
  }

  announcementEdit(data: any) {
    return this.http.put(`${this.basePath}${this.announcementedit}`, data, this.options);
  }

  announcementStatus(data: any) {
    return this.http.put(`${this.basePath}${this.announcementstatus}`, data, this.options);
  }

  announcementDate(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.announcementdate}${id}/${id1}/${id2}/${id3}`, this.options);
  }

  announcementsearch(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.announcementsearchs}${id}/${id1}/${id2}`, this.options);
  }

  SmsDropdownGetAll(id: any) {
    return this.http.get(`${this.basePath}${this.smsdropdown}${id}`, this.options);
  }

  NewSMSDropdown(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.smsViewalltem}${id}/${id1}/${id2}`, this.options)
  }

  SmsCount(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.smscount}${id}/${id1}`, this.options);
  }

  SmsApproval(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.smsapproval}${id}`, model, this.options);
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

  SurveyViewAll(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.surveyviewall}${id}/${id1}`, this.options);
  }

  SurveyViewAllExport() {
    return this.http.get(`${this.basePath}${this.surveyviewallexport}`, this.options);
  }

  SurveyQuestionsViewById(id: any) {
    return this.http.get(`${this.basePath}${this.surveyviewbyid}${id}`, this.options);
  }

  ViewByIdCustomerResponse(id: any) {
    return this.http.get(`${this.basePath}${this.viewbyidcustomerresponse}${id}`, this.options);
  }

  CustomerTotalPlanAmount(id: any) {
    return this.http.get(`${this.basePath}${this.customerplanamaount}${id}`, this.options);
  }

  //logo

  EntitylogoUpdatescustomer(data: FormData) {
    return this.http.put(`${this.basePath}${this.customerlogo}`, data, this.optionsMultipart);
  }

  Entitylogoview(id: string) {
    return this.http.get(`${this.basePath}${this.customerlogoview}${id}`, { ...this.options, ...{ responseType: 'blob' }, });
  }

  OtherPayTransactionView(id: any) {
    return this.http.get(`${this.basePath}${this.otherpaymentviewbyid}${id}`, this.options);
  }

  //alcot history

  AlcotHistoryViewAll(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.alcothistory}${id}/${id1}`, this.options);
  }

  Alcotsearch(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.Alcotsearchs}${id}/${id1}/${id2}`, this.options);
  }

  AlcotHistoryViewAllExport() {
    return this.http.get(`${this.basePath}${this.alcothistoryexport}`, this.options);
  }

  AlcotChannelActiveRegion(id: any) {
    return this.http.get(`${this.basePath}${this.alcotchannelactiveregion}${id}`, this.options);
  }

  createAlcotChannelActiveRegion(model: any) {
    return this.http.post(`${this.basePath}${this.alcotchannelactiveregion}`, model, this.options);
  }

  AlcartChannelregions(id: any) {
    return this.http.get(`${this.basePath}${this.AlcartChannelregion}${id}`, this.options);
  }

  AlcartUploadbulk(id: any, formData: any[]): Promise<any> {
    return lastValueFrom(this.http.post(`${this.basePath}${this.AlcartUploadbulks}${id}`, formData, this.options));
  }

  Alcartbulkresponse() {
    return this.http.get(`${this.basePath}${this.Alcartbulkresponses}`, this.options);
  }

  Alcartuploadid(id: any) {
    return this.http.get(`${this.basePath}${this.Alcartuploadids}${id}`, this.options);
  }

  Regionsearch(id: any) {
    return this.http.get(`${this.basePath}${this.regionsearch}${id}`, this.options);
  }

  EntitySearch(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.entitysearch}${id}/${id1}/${id2}`, this.options);
  }

  AlcotSearch(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.alcotsearch}${id}/${id1}/${id2}`, this.options);
  }

  EntityBanksearch(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.entitybanksearch}${id}/${id1}`, this.options);
  }


  // Entitykycdocumentsearch(id:any,id1:any){
  //   return this.http.get(`${this.basePath}${this.entitykycdocumentsearch}${id}/${id1}`,this.options)
  // }

  CustomerSearch(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.customersearch}${id}/${id1}/${id2}`, this.options);
  }


  CustomeradminSearch(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.customeradminsearch}${id}/${id1}/${id2}`, this.options);
  }

  Customercustomeridsearch(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.customercustomeridsearch}${id}/${id1}`, this.options);
  }

  Smshistorysearch(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.smshistorysearch}${id}/${id1}/${id2}`, this.options);
  }

  Mmcautodebit(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.mmcautodebit}${id}/${id1}/${id2}`, this.options);
  }

  Subscriptionsearch(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.subscriptionsearch}${id}/${id1}/${id2}`, this.options);
  }

  Onetimepayment(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.onetimepayment}${id}/${id1}/${id2}`, this.options);
  }

  // Signer Details

  signergetall(model: any) {
    return this.http.post(`${this.basePath}${this.Signerdetailsgetall}`, model, this.options);
  }

  signerwithouttoken() {
    return this.http.get(`${this.basePath}${this.SignerdetailsWithoutToken}`);
  }

  signeradd(model: any) {
    return this.http.post(`${this.basePath}${this.SignerdetailsAdd}`, model, this.options);
  }

  signerupdate(model: any) {
    return this.http.put(`${this.basePath}${this.SignerdetailsUpdate}`, model, this.options);
  }

  signerbyid(id: any) {
    return this.http.get(`${this.basePath}${this.SignerdetailsbyId}${id}`, this.options);
  }

  signerstatus(model: any) {
    return this.http.put(`${this.basePath}${this.SignerdetaisStatus}`, model, this.options);
  }

  signeractivestatus() {
    return this.http.get(`${this.basePath}${this.SignerdetailsActiveGetall}`, this.options);
  }

  Signerhistory(model: any) {
    return this.http.post(`${this.basePath}${this.SignerHistory}`, model, this.options);
  }

  //Agreement

  viewagreementplan() {
    return this.http.get(`${this.basePath}${this.viewagreementplans}`, this.options);
  }

  viewactiveagreementplan() {
    return this.http.get(`${this.basePath}${this.viewactiveagreementplans}`, this.options);
  }

  createagreementplan(model: any) {
    return this.http.post(`${this.basePath}${this.createagreementplans}`, model, this.options);
  }

  editagreementplan(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.editagreementplans}${id}`, model, this.options);
  }

  viewstatusagreementplan(model: any) {
    return this.http.put(`${this.basePath}${this.viewstatusagreementplans}`, model, this.options);
  }

  viewbyidagreementplan(id: any) {
    return this.http.get(`${this.basePath}${this.viewbyidagreementplans}${id}`, this.options);
  }

  createplans(model: any) {
    return this.http.post(`${this.basePath}${this.createplan}`, model, this.options);
  }

  viewbyidplans(id: any) {
    return this.http.get(`${this.basePath}${this.viewbyidplan}${id}`, this.options);
  }

  viewagreementdoucments(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.viewagreementdoucment}${id}/${id1}`, { ...this.options, ...{ responseType: 'blob' }, }
    );
  }

  AggrementViewbyrefferencenumber(id: any) {
    return this.http.get(`${this.basePath}${this.ViewAggrementbyRefference}${id}`, this.options);
  }

  AgreementgetAll() {
    return this.http.get(`${this.basePath}${this.agreementgetall}`, this.options);
  }

  AgreementSendOtp(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.Agreementsendotp}${id}/${id1}`, this.options);
  }

  AgreemntVerifyOtp(id: any, id1: any, model: any) {
    return this.http.put(`${this.basePath}${this.AgreementVerifyOTP}${id}/${id1}`, model, this.options);
  }

  agreementConcent(model: any) {
    return this.http.post(`${this.basePath}${this.AgreementConcent}`, model, this.options);
  }

  agreemntconcentlocation(model: any) {
    return this.http.post(`${this.basePath}${this.AgreemntConcentLocation}`, model, this.options);
  }

  agreementextendlink(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.AgreementLinkExtent}${id}`, model, this.options);
  }

  agreementlinkexpiry(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.AgreementLinkExpiry}${id}`, model, this.options);
  }

  AgreementCheckStatus(id: any) {
    return this.http.get(`${this.basePath}${this.AgreementStatus}${id}`, this.options)
  }

  AgrementLinkSend(id: any) {
    return this.http.get(`${this.basePath}${this.AgreementSendLink}${id}`, this.options)
  }

  //offline transaction

  OfflineTransactions(model: any) {
    return this.http.post(`${this.basePath}${this.offlinetransactions}`, model, this.options);
  }

  SuccessOffTransaction(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.successofftransactions}${id}/${id1}`, this.options);
  }

  FailureOffTransaction(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.failureofftransactions}${id}/${id1}`, this.options);
  }

  OfflineSettlement(model: any) {
    return this.http.post(`${this.basePath}${this.offlinesettlement}`, model, this.options);
  }

  PayoutOfflineSettlement(model: any) {
    return this.http.post(`${this.basePath}${this.offlinepayoutsettelemnt}`, model, this.options);
  }

  //branch

  BranchGet(id: any) {
    return this.http.get(`${this.basePath}${this.branchget}${id}`, this.options);
  }

  onlinebranchs(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.onlinebranch}${id}/${id1}/${id2}`, this.options);
  }

  NewOnlineBranch(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.NewOnlinebranch}${id}/${id1}/${id2}`, this.options);
  }

  onlinesearchbranchs(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.onlinesearchbranch}${id}/${id1}/${id2}/${id3}`, this.options);
  }

  NewOnlineBranchsearch(id: any, id1: any, id2: any, id3: any, id4: any) {
    return this.http.get(`${this.basePath}${this.NewOnlineSearch}${id}/${id1}/${id2}/${id3}/${id4}`, this.options);
  }

  entitywishonlinebranchs(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.entitywishonlinebranch}${id}/${id1}/${id2}`, this.options);
  }

  Newentitywisetrans(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.Entitywisetrans}${id}/${id1}/${id2}`, this.options);
  }

  entityonlinesearchbranchs(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.entityonlinesearchbranch}${id}/${id1}/${id2}/${id3}`, this.options);
  }

  entityNewSearch(id: any, id1: any, id2: any, id3: any, id4: any) {
    return this.http.get(`${this.basePath}${this.OnlineNewSearch}${id}/${id1}/${id2}/${id3}/${id4}`, this.options);
  }

  BranchAdd(model: any) {
    return this.http.post(`${this.basePath}${this.branchcreate}`, model, this.options);
  }

  BranchUpdate(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.branchedit}${id}`, model, this.options);
  }

  BranchStatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.branchstatus}${id}`, model, this.options);
  }

  BranchIndividualView(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.branchindividualview}${id}/${id1}`, this.options);
  }

  BranchViewallSearch(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.branchindividualview}${id}/${id1}/${id2}`, this.options);
  }

  BranchCustomerSearch(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.branchcustomersearch}${id}/${id1}/${id2}/${id3}`, this.options);
  }

  BranchCustomerExport(id: any) {
    return this.http.get(`${this.basePath}${this.branchcustomerget}${id}`, this.options);
  }

  //Additional Payments

  additionalpayments(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.additionalpayment}${id}/${id1}`, this.options);
  }

  additionalpaymentsfilter(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.additionalpaymentsfilters}${id}/${id1}/${id2}/${id3}`, this.options);
  }

  additionalpaymentssearchfilter(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.additionalpaymentssearchfilters}${id}/${id1}/${id2}/${id3}`, this.options);
  }

  additionalpaymentsviewbyid(id: any) {
    return this.http.get(`${this.basePath}${this.additionalpaymentsviewbyids}${id}`, this.options);
  }

  additionalsearchfilter(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.additionalsearchfilters}${id}/${id1}/${id2}`, this.options);
  }

  additionalpaymentsreceipts(id: any) {
    return this.http.get(`${this.basePath}${this.additionalpaymentsreceipt}${id}`, { ...this.options, ...{ responseType: 'blob' }, });
  }

  additionalpaymentscheckstatus(model: any) {
    return this.http.post(`${this.basePath}${this.additionalpaymentscheck}`, model, this.options);
  }

  additionalexport() {
    return this.http.get(`${this.basePath}${this.additionalexports}`, this.options);
  }

  BranchCustomer(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.branchcustomerget}${id}/${id1}/${id2}`, this.options);
  }

  AdditionalPaymentsCustomerTransaction(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.additionaltransviewbyid}${id}/${id1}/${id2}`, this.options);
  }

  AdditionalPaymentsCustomerTransactions(id: any) {
    return this.http.get(`${this.basePath}${this.additionaltransviewbyid}${id}`, this.options);
  }

  BroadCasterGetAllActive() {
    return this.http.get(`${this.basePath}${this.broadcastergetallctive}`, this.options);
  }

  RegionGetAll() {
    return this.http.get(`${this.basePath}${this.regiongetall}`, this.options);
  }

  ChannelsList(id: any) {
    return this.http.get(`${this.basePath}${this.channelslist}${id}`, this.options);
  }

  SurveySearch(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.surveysearch}${id}/${id1}/${id2}`, this.options);
  }

  RefundGetAll(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.refundgetall}${id}/${id1}`, this.options);
  }

  RefundCheck(model: any) {
    return this.http.post(`${this.basePath}${this.refundcheck}`, model, this.options)
  }

  RefundGetAllSearch(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.refundsearch}${id}/${id1}/${id2}/${id3}`, this.options);
  }

  RefundExport() {
    return this.http.get(`${this.basePath}${this.refundexport}`, this.options);
  }

  RefundForCustomerView(id: any) {
    return this.http.get(`${this.basePath}${this.refundforcustomer}${id}`, this.options);
  }

  RefundForCustomerAdditionalView(id: any) {
    return this.http.get(`${this.basePath}${this.RefundForCustomerAdditionals}${id}`, this.options);
  }

  RefundGetAllDateFilter(id: any, id1: any, id2: any, id3: any, id4: any) {
    return this.http.get(`${this.basePath}${this.refunddatefilter}${id}/${id1}/${id2}/${id3}/${id4}`, this.options);
  }

  MSOActive() {
    return this.http.get(`${this.basePath}${this.msoactive}`, this.options);
  }

  MSORegions(id: any) {
    return this.http.get(`${this.basePath}${this.msoregions}${id}`, this.options);
  }

  additionalpaycheck(model: any) {
    return this.http.post(`${this.basePath}${this.additionalpaycheckstatus}`, model, this.options);
  }

  CustomizationPaySearch(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.custopay}${id}/${id1}/${id2}`, this.options);
  }

  SmsviewallSearch(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.smssearch}${id}/${id1}/${id2}`, this.options);
  }

  ManualPay(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.subscriptionmanualpay}${id}`, model, this.options);
  }

  abstarctipadd() {
    return this.http.get(`${this.abstarctipaddress}`);
  }

  Sticker() {
    return this.http.get(`${this.basePath}${this.stickerget}`, this.options);
  }

  Sticketget() {
    return this.http.get(`${this.basePath}${this.sticketgetall}`, this.options)
  }

  StickerCreate(model: any) {
    return this.http.post(`${this.basePath}${this.stickerAdd}`, model, this.options);
  }

  Stickeredit(model: any) {
    return this.http.put(`${this.basePath}${this.stickeredit}`, model, this.options)
  }

  StickerStatus(model: any) {
    return this.http.put(`${this.basePath}${this.stickerstatus}`, model, this.options);
  }

  Stickerhistory(modal: any) {
    return this.http.post(`${this.basePath}${this.StickerHistory}`, modal, this.options);
  }

  //Campagin

  addcampagin(FormData: FormData) {
    return this.http.post(`${this.basePath}${this.addcampagins}`, FormData, this.optionsMultipart);
  }

  activemerchantemails() {
    return this.http.get(`${this.basePath}${this.activemerchantemail}`, this.options);
  }


  //branchkyc

  addkycbranch(FormData: FormData) {
    return this.http.post(`${this.basePath}${this.addkycbranchs}`, FormData, this.optionsMultipart);
  }

  branchkycview(id: any) {
    return this.http.get(`${this.basePath}${this.branchkycviews}${id}`, this.options);
  }

  getbranchkycImage(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.getbranchkycImages}${id}/${id1}`, { ...this.options, ...{ responseType: 'blob' }, });
  }

  branchidentityFront(data: FormData) {
    return this.http.put(`${this.basePath}${this.branchidentityFronts}`, data, this.optionsMultipart);
  }

  branchidentityback(data: FormData) {
    return this.http.put(`${this.basePath}${this.branchidentitybacks}`, data, this.optionsMultipart);
  }

  branchaddressFront(data: FormData) {
    return this.http.put(`${this.basePath}${this.branchaddressFronts}`, data, this.optionsMultipart);
  }

  branchaddressback(data: FormData) {
    return this.http.put(`${this.basePath}${this.branchaddressbacks}`, data, this.optionsMultipart);
  }

  branchsignFront(data: FormData) {
    return this.http.put(`${this.basePath}${this.branchsignFronts}`, data, this.optionsMultipart);
  }

  branchsignback(data: FormData) {
    return this.http.put(`${this.basePath}${this.branchsignbacks}`, data, this.optionsMultipart);
  }

  editbranchIdentity(data: FormData) {
    return this.http.put(`${this.basePath}${this.editbranchIdentitys}`, data, this.optionsMultipart);
  }

  editbranchAddress(data: FormData) {
    return this.http.put(`${this.basePath}${this.editbranchAddres}`, data, this.optionsMultipart);
  }

  editbranchSign(data: FormData) {
    return this.http.put(`${this.basePath}${this.editbranchSigns}`, data, this.optionsMultipart);
  }

  branchkycinfo(id: any) {
    return this.http.get(`${this.basePath}${this.branchkycinfos}${id}`, this.options);
  }

  identitybranchApproval(data: any) {
    return this.http.put(`${this.basePath}${this.identitybranchApprovals}`, data, this.options);
  }

  addressbranchApproval(data: any) {
    return this.http.put(`${this.basePath}${this.addressbranchApprovals}`, data, this.options);
  }

  signbranchApproval(data: any) {
    return this.http.put(`${this.basePath}${this.signbranchApprovals}`, data, this.options);
  }

  adharbranchVerifyIdentity(data: any) {
    return this.http.post(`${this.basePath}${this.adharbranchVerifyIdentitys}`, data, this.options);
  }

  adharbranchVerifyAddress(data: any) {
    return this.http.post(`${this.basePath}${this.adharbranchVerifyAddres}`, data, this.options);
  }

  adharbranchVerifySigns(data: any) {
    return this.http.post(`${this.basePath}${this.adharbranchVerifySign}`, data, this.options);
  }

  panbranchVerifyIdentity(data: any) {
    return this.http.post(`${this.basePath}${this.panbranchVerifyIdentitys}`, data, this.options);
  }

  panbranchVerifyAddress(data: any) {
    return this.http.post(`${this.basePath}${this.panbranchVerifyAddres}`, data, this.options);
  }

  panbranchVerifySigns(data: any) {
    return this.http.post(`${this.basePath}${this.panbranchVerifySign}`, data, this.options);
  }

  passportbranchVerifyIdentity(data: any) {
    return this.http.post(`${this.basePath}${this.passportbranchVerifyIdentitys}`, data, this.options);
  }

  passportbranchVerifyAddress(data: any) {
    return this.http.post(`${this.basePath}${this.passportbranchVerifyAddres}`, data, this.options);
  }

  passportbranchVerifySigns(data: any) {
    return this.http.post(`${this.basePath}${this.passportbranchVerifySign}`, data, this.options);
  }

  drivingbranchVerifyIdentity(data: any) {
    return this.http.post(`${this.basePath}${this.drivingbranchVerifyIdentitys}`, data, this.options);
  }

  drivingbranchVerifyAddress(data: any) {
    return this.http.post(`${this.basePath}${this.drivingbranchVerifyAddres}`, data, this.options);
  }

  drivingbranchVerifySigns(data: any) {
    return this.http.post(`${this.basePath}${this.drivingbranchVerifySign}`, data, this.options);
  }

  voterbranchVerifyIdentity(data: any) {
    return this.http.post(`${this.basePath}${this.voterbranchVerifyIdentitys}`, data, this.options);
  }

  voterbranchVerifyAddress(data: any) {
    return this.http.post(`${this.basePath}${this.voterbranchVerifyAddres}`, data, this.options);
  }

  voterbranchVerifySigns(data: any) {
    return this.http.post(`${this.basePath}${this.voterbranchVerifySign}`, data, this.options
    );
  }

  BranchTerminal(id: any) {
    return this.http.get(`${this.basePath}${this.branchterminalview}${id}`, this.options);
  }

  Branchterminalbyids(id: any) {
    return this.http.get(`${this.basePath}${this.branchtermialviewbyid}${id}`, this.options);
  }

  BranchTerminalStatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.branchterminalstatus}${id}`, model, this.options);
  }

  BranchTerminalCreate(data: any) {
    return this.http.post(`${this.basePath}${this.branchterminalcreate}`, data, this.options);
  }

  BranchTerminalEdit(id: any, data: any) {
    return this.http.put(`${this.basePath}${this.branchterminaledit}${id}`, data, this.options);
  }

  EntityTerminalget() {
    return this.http.get(`${this.basePath}${this.entityterminalview}`, this.options);
  }

  EntityTerminalviewMerchant(id: any) {
    return this.http.get(`${this.basePath}${this.entityterminalviewmerchant}${id}`, this.options);
  }

  EntityTerminalStatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.entityterminalstatus}${id}`, model, this.options);
  }

  EntityTerminalCreate(data: any) {
    return this.http.post(`${this.basePath}${this.entityterminalcreate}`, data, this.options);
  }

  EntityTerminalUpdate(id: any, data: any) {
    return this.http.put(`${this.basePath}${this.entityterminalupdate}${id}`, data, this.options);
  }

  EntityTerminalTransactions(data: any) {
    return this.http.post(`${this.basePath}${this.entityterminaltrans}`, data, this.options);
  }

  BranchTransactions(data: any) {
    return this.http.post(`${this.basePath}${this.branchtrans}`, data, this.options);
  }

  // customer trans

  CustomerpayFilter(id: any, id1: any, model: any) {
    return this.http.post(`${this.basePath}${this.customerpayfilter}${id}/${id1}`, model, this.options);
  }

  Customerpaysearchfilter(id: any) {
    return this.http.get(`${this.basePath}${this.customerpayget}${id}`, this.options);
  }

  //additional trans

  AdditionalPaySearch(id: any) {
    return this.http.get(`${this.basePath}${this.Additionalpaysearch}${id}`, this.options);
  }

  AdditionalPayDateFilter(id: any, id1: any, model: any) {
    return this.http.post(`${this.basePath}${this.Additionalpayfilter}${id}/${id1}`, model, this.options);
  }

  // cloud fee

  CloudFeeSearch(id: any) {
    return this.http.get(`${this.basePath}${this.Cloudfeesearch}${id}`, this.options);
  }

  CloudFeeDateFilter(id: any, id1: any, model: any) {
    return this.http.post(`${this.basePath}${this.Cloudfeefilter}${id}/${id1}`, model, this.options);
  }

  //onetimepay

  OneTimepaySearch(id: any) {
    return this.http.get(`${this.basePath}${this.Onetimepaysearch}${id}`, this.options);
  }

  OneTimepayFilter(id: any, id1: any, model: any) {
    return this.http.post(`${this.basePath}${this.Onetimepaydatefilter}${id}/${id1}`, model, this.options);
  }

  //customize pay

  OtherPaymentSearch(id: any) {
    return this.http.get(`${this.basePath}${this.Otherpaymentsearch}${id}`, this.options);
  }

  OtherPaymentFilter(id: any, id1: any, model: any) {
    return this.http.post(`${this.basePath}${this.Otherpaydatefilter}${id}/${id1}`, model, this.options);
  }

  // Refund period

  RefundperiodGetall(model: any) {
    return this.http.post(`${this.basePath}${this.refundperiodviewall}`, model, this.options);
  }

  Refundperiodadd(model: any) {
    return this.http.post(`${this.basePath}${this.refundperiodadd}`, model, this.options);
  }

  RefundPeriodUpdate(model: any) {
    return this.http.put(`${this.basePath}${this.refundperiodupdate}`, model, this.options);
  }

  RefundPeriodbyid(id: any) {
    return this.http.get(`${this.basePath}${this.refundperiodbyid}${id}`, this.options);
  }

  RefundPeriodHistory(model: any) {
    return this.http.post(`${this.basePath}${this.refundperiodhistory}`, model, this.options);
  }

  Refunsupdatestatus(model: any) {
    return this.http.put(`${this.basePath}${this.refundperiostatus}`, model, this.options)
  }

  //Campaign

  viewcampaign(id: any) {
    return this.http.get(`${this.basePath}${this.viewcampaigns}${id}`, this.options);
  }

  campaignimageUpdate(data: FormData) {
    return this.http.put(`${this.basePath}${this.campaignimageUpdates}`, data, this.optionsMultipart);
  }

  campaignimageview(id: string) {
    return this.http.get(`${this.basePath}${this.campaignimageviews}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    });
  }

  campaignstatus(id: any, id1: any) {
    return this.http.put(`${this.basePath}${this.campaignstatu}${id}/${id1}`, this.options);
  }

  viewrecordcampaigns(id: any) {
    return this.http.get(`${this.basePath}${this.viewrecordcampaign}${id}`, this.options);
  }

  viewresponsecampaigns(id: any) {
    return this.http.get(`${this.basePath}${this.viewresponsecampaign}${id}`, this.options);
  }

  editcampaign(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.editcampaigns}${id}`, model, this.options);
  }

  updatebulk(id: any, id1: any, payload: { emailAddress: any[] }): Promise<any> {
    return lastValueFrom(
      this.http.put(`${this.basePath}${this.updatebulks}${id}/${id1}`, payload, this.options));
  }

  viewemailsendresponsecampaigns(id: any) {
    return this.http.get(`${this.basePath}${this.viewemailsendresponsecampaign}${id}`, this.options);
  }

  customertransactionsearch(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.customertransactionsearchs}${id}/${id1}/${id2}/${id3}`, this.options);
  }

  customeradditionaltransactionsearch(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.customeradditionaltransactionsearchs}${id}/${id1}/${id2}/${id3}`, this.options);
  }

  //Merchantdahboard

  dashboardcount(id: any) {
    return this.http.get(`${this.basePath}${this.dashbordcustomercount}${id}`, this.options);
  }

  dashboardviewpendings(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardviewpending}${id}`, this.options);
  }

  dashboardemployeecounts(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardemployeecount}${id}`, this.options);
  }

  dashbaordcustomerday(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.dashbaordcustomerdayTransactions}${id}/${id1}`, this.options);
  }

  dashboardcurrentmonthcustomertransactions(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardCurrentmonthcustomertransaction}${id}`, this.options);
  }

  dashboardlastmonthcustomertransactions(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardlastmonthcustomertransaction}${id}`, this.options);
  }

  dashboardthismonthcustomertransactions(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardthismonthcustomertransaction}${id}`, this.options);
  }

  dashboarddatecustomertransactions(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.dashboarddatecustomertransaction}${id}/${id1}/${id2}`, this.options);
  }

  dashboardlastmonthadditionaltransactions(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardlastmonthadditionaltransaction}${id}`, this.options);
  }

  dashboardthismonthadditionaltransactions(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardthismonthadditionaltransaction}${id}`, this.options);
  }

  actvemerchant() {
    return this.Client.get(`${this.basePath}${this.actvemerchants}`, this.options);
  }

  actvemerchantsearch(id: any) {
    return this.Client.get(`${this.basePath}${this.actvemerchantsearchs}${id}`, this.options);
  }


  //branch

  inactivebranch(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.inactivebranchs}${id}`, model, this.options);
  }

  branchonlyactive(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.branchonlyactives}${id}/${id1}`, this.options);
  }

  entityonlinebranchs(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.entityonlinebranch}${id}/${id1}/${id2}`, this.options);
  }

  entitysearchbranchs(id: any, id1: any, id2: any, id3: any, id4: any) {
    return this.http.get(`${this.basePath}${this.entitysearchbranch}${id}/${id1}/${id2}/${id3}/${id4}`, this.options);
  }

  entitywithbranchexport(id: any) {
    return this.http.get(`${this.basePath}${this.entitywithbranchexports}${id}`, this.options);
  }

  entitywithputbranchexport(id: any) {
    return this.http.get(`${this.basePath}${this.entitywithputbranchexports}${id}`, this.options);
  }


  //Terms search

  termspolicysearch(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.termspolicysearchs}${id}/${id1}/${id2}/${id3}`, this.options);
  }


  //export report

  ExportReportAdd(model: any) {
    return this.http.post(`${this.basePath}${this.exportreportadd}`, model, this.options);
  }

  ExportReportGet() {
    return this.http.get(`${this.basePath}${this.exportreportview}`, this.options);
  }

  ExportReportDownload(id: any) {
    return this.http.get(`${this.basePath}${this.exportreportdownload}${id}`, { ...this.options, ...{ responseType: 'blob' }, });
  }

  BranchView(id: any) {
    return this.http.get(`${this.basePath}${this.branchview}${id}`, this.options);
  }

  //Renewal autodebit

  renewalautodebitbyid(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.renewalautodebitbyids}${id}/${id1}/${id2}`, this.options);
  }

  renewalautodebitsearchbyid(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.renewalautodebitsearchbyids}${id}/${id1}/${id2}/${id3}`, this.options);
  }

  renewalautodebit(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.renewalautodebits}${id}/${id1}`, this.options);
  }

  renewalautodebitsearch(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.renewalautodebitsearchs}${id}/${id1}/${id2}`, this.options);
  }

  //Additional Transaction

  additionalduesTransaction(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.additionalduesTransactions}${id}/${id1}/${id2}`, this.options);
  }

  additionalBranchTransaction(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.additionalBranchTransactions}${id}/${id1}/${id2}`, this.options);
  }

  additionalBranchwiseTransaction(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.additionalBranchwiseTransactions}${id}/${id1}/${id2}`, this.options);
  }

  //Refund for Additional transactions

  additionalRefundGetAll(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.additionalRefundGetAlls}${id}/${id1}`, this.options);
  }

  //Refund for Additional Trnasactions

  refundadditionalgetall(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.refundadditionalgetalls}${id}/${id1}/${id2}`, this.options);
  }

  RefundForMerchantView(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.refundformerchant}${id}/${id1}/${id2}`, this.options);
  }

  RefundForMerchantsearch(id: any, id1: any, id2: any, id3: any, id4: any) {
    return this.http.get(`${this.basePath}${this.RefundForMerchantsearchs}${id}/${id1}/${id2}/${id3}/${id4}`, this.options);
  }

  OnlineRfundsDateFilter(id: any, id1: any, id2: any, id3: any, id4: any, id5: any) {
    return this.http.get(`${this.basePath}${this.onlinerefunddatefilter}${id}/${id1}/${id2}/${id3}/${id4}/${id5}`, this.options
    );
  }

  monthlyMerchantsms(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.Merchantsmsdetails}${id}/${id1}/${id2}`, this.options)
  }

  monthlyMerchantsmslogs(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.Merchantsmslogs}${id}/${id1}/${id2}`, this.options)
  }

  monthlysmstriggermerchant(model: any) {
    return this.http.post(`${this.basePath}${this.merchantsmstigger}`, model, this.options)
  }

  //Refund cumlative

  duesCumulativeRefund(model: any) {
    return this.http.post(`${this.basePath}${this.duesCumulativeRefunds}`, model, this.options);
  }

  additionalCumulativeRefund(model: any) {
    return this.http.post(`${this.basePath}${this.additionalCumulativeRefunds}`, model, this.options);
  }

  // WhatApp API,S 


  WhatAPPVendors() {
    return this.http.get(`${this.basePath}${this.WhatappActiveventors}`, this.options)
  }

  Merchatwhatappgetall(id: any) {
    return this.http.get(`${this.basePath}${this.Whatappmerchantdetails}${id}`, this.options)
  }

  MerchantwiseWhatappTemplates(id1: any, id2: any, id3: any, id4: any) {
    return this.http.get(`${this.basePath}${this.WhatappTemplate}${id1}/${id2}/${id3}/${id4}`, this.options)
  }

  CreateMerchatWhatappService(model: any) {
    return this.http.post(`${this.basePath}${this.CreateMerchatWhatapp}`, model, this.options)
  }

  UpdateMerchatWhatappService(model: any) {
    return this.http.put(`${this.basePath}${this.UpdateMerchantWhatapp}`, model, this.options)
  }

  MerchatWhatappServiceStatus(model: any) {
    return this.http.put(`${this.basePath}${this.merchatWhatappStatus}`, model, this.options)
  }

  MerchatWhatappServiceApproval(model: any) {
    return this.http.put(`${this.basePath}${this.merchatWhapappApproval}`, model, this.options)
  }

  MerchatWhatsAPPGetall(formdata: FormData) {
    return this.http.post(`${this.basePath}${this.MechantsWhatsappGetall}`, formdata, this.optionsMultipart)
  }
  MerchatWhatsAppGetallExport() {
    return this.http.get(`${this.basePath}${this.MechantsWhatsappGetallexport}`, this.options)
  }

  WhatsAPPHistorys(formdata: FormData) {
    return this.http.post(`${this.basePath}${this.WhatsappHistory}`, formdata, this.optionsMultipart)
  }

  WhatsAPPHistorysFilters(id1: any, id2: any, id3: any, id4: any) {
    return this.http.get(`${this.basePath}${this.whatsapphistoryFilter}${id1}/${id2}/${id3}/${id4}`, this.options)
  }

  WhatsAppEditHistorys(id: any) {
    return this.http.get(`${this.basePath}${this.WhatsappEditHistory}${id}`, this.options)
  }

  //WhatsApp Bulk Upload

  getwhatsappbulkupload(id: any, data: any) {
    return this.http.post(`${this.basePath}${this.whatsappbulkupload}${id}`, data, this.options)
  }
  getwhatsappbulkgetall() {
    return this.http.get(`${this.basePath}${this.whatsappbulkgetall}`, this.options)
  }
  getwhatsappbulkbyid(id: any) {
    return this.http.get(`${this.basePath}${this.whatsappbulkbyid}${id}`, this.options)
  }

  // WhatsAppVendors

  VendorsViewall(model: any) {
    return this.http.post(`${this.basePath}${this.WhatsAppVendorsViewall}`, model, this.options)
  }

  VendorsAdd(model: any) {
    return this.http.post(`${this.basePath}${this.WhatsAppVendorsAdd}`, model, this.options)
  }

  VendorsUpdate(model: any) {
    return this.http.put(`${this.basePath}${this.WhatsAppVendorsUpdate}`, model, this.options)
  }

  VendorsStatus(model: any) {
    return this.http.put(`${this.basePath}${this.WhatsAppVendorsStatus}`, model, this.options)
  }


}
