import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Subject } from 'rxjs';
import {
  Addadmins,
  addbeneficiary,
  Addemployees,
  Addonetime,
  AddWithdrawal,
  editbenificiary,
  EmailOtpVerfiy,
  employeeStatus,
  extraarearoute,
  extracustomerroute,
  extraroute,
  extrastreetroute,
  postsetupbox,
  primaryStatus,
  ResetPassword,
  roles,
  roleStatus,
  route,
  routests,
  routeupdate,
  setupStatus,
  SmsOtpVerfiy,
  Statusadmin,
  subpermission,
  Tickets,
  Upadteadmins,
  updaterole,
  updatesetupbox,
  VerifyOtp,
} from '../fargin-model/fargin-model.module';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class FarginServiceService {


  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  // private readonly basePath = 'https://staging-api.farginconnect.com/';    //Staging server

  private readonly basePath = 'https://dev-api.farginconnect.com/';     //  Dev Server

  // private readonly basePath ='https://api.fargin.in/';   //  production server



  // login
  private readonly entitylogin = 'merchant/entitylogin';
  private readonly forgotpassword = 'merchant/emailverify/';
  private readonly verifyotp = 'merchant/otpverify/';
  private readonly resendotp = 'merchant/resendotp/';
  private readonly resetpassword = 'merchant/reset';

  //change password
  private readonly changepassword = 'merchant/changepassword';

  // Admin Onboard
  private readonly addadmin = 'merchantadminlogin/create';
  private readonly viewadmin = 'merchantadminlogin/viewall';
  private readonly viewbyidadmin = 'merchantadminlogin/viewbyid/';
  private readonly editadmin = 'merchantadminlogin/updateadmin/';
  private readonly statusadmin = 'merchantadminlogin/updatestatus/';
  private readonly getActiveRole = 'merchantrole/activeRole/';
  private readonly viewadminbyid = 'merchantadminlogin/viewAll/';
  private readonly ViewadminforCollectionamount = 'customer/viewemp/';

  // Employee Onboard
  private readonly addemployee = 'employee/create';
  private readonly viewemployee = 'employee/viewmerchantemployees/';
  private readonly viewactiveemploye = 'merchantadminlogin/merchantActiveStatus/';

  //Terms & Policy
  // private readonly viewterms = 'policy/getpolicybymerchant/';

  private readonly viewterms = 'policy/adminApprovedByMerchant/'

  //Email Verfiy
  private readonly emailverfiy = 'merchant/emailverification/';
  private readonly emailotp = 'merchant/emailotpverification/';
  private readonly verifyemailresend = 'merchant/emailResendOtp/';
  //Mobile Verify
  private readonly mobileverify = 'merchant/mobileVerification/';
  private readonly mobileotp = 'merchant/mobileotpverification/';
  private readonly verifymobileresend = 'merchant/mobileResentsOtp/'


  //Merchant 
  private readonly merchantbyid = 'merchant/getmerchants/'

  //Service Tickets
  private readonly viewallTicket = 'tickets/viewbymerchant/';
  private readonly addTicket = 'tickets/create';
  private readonly viewTicketImage = 'tickets/viewimage/';
  private readonly editTicket = 'tickets/updateticket';
  private readonly editImage = 'tickets/updatedocument';

  //Roles and permission
  private readonly viewallRole = 'merchantrole/viewmerchantrole/';
  private readonly viewRoles = 'merchantrole/viewpermissionandsubpermmission/';
  // private readonly viewRoles = 'role/viewbyid/';

  private readonly getallPermission = 'merchantpermission/getActive';
  private readonly getSubpermission =
    'merchantsubpermisssion/getpermissionlist';
  private readonly createrole = 'merchantrole/create';
  private readonly updateRole = 'merchantrole/updaterole/';
  private readonly statusRole = 'merchantrole/updatestatus';

  // customer onboard

  private readonly merchantview = 'customer/viewbymerchant/';
  private readonly merchantviewexcel = 'customer/viewExcel/';
  private readonly customercreate = 'customer/create';
  private readonly customergetall = 'customer/viewByAll';
  private readonly customerupdate = 'customer/updateCustomer/';
  private readonly customerview = 'customer/viewById/';
  private readonly customeractivestatus = 'customer/activeInactive/';
  private readonly duestatusonoff = 'duegenerate/updateDue/'

  //service provider
  private readonly serviceprovideractive = 'serviceProvider/viewActive';
  private readonly Activeserviceproviderfromstb = 'setupbox/getserviceprovider/';
  private readonly editsettopbox = 'customer/updatecustomerstb/';




  //Customer
  private readonly viewcustomerbymerchantid = 'customer/viewbymerchant/';
  private readonly viewcustomerbyid = 'customer/viewById/';
  private readonly alcotlogo = 'alcotchannel/viewLogo/';
  private readonly customertransaction = 'customerpay/viewcustomers/';
  private readonly Activesetupboxmerchantid = 'setupbox/getMerchantAndService/'
  private readonly Activeplanmerchant = 'lcop/getactiveMerchant/';
  private readonly customeridsearchs = 'customerpay/monthlystbdues';
  private readonly customeridmonthmanualdue = 'customerpay/monthduesmanual';
  private readonly customeridfullmanualdue = 'customerpay/fullproduesmanual';
  private readonly createremainder = 'customer/remainder/'

  //One Time Setup fee
  private readonly addonetime = 'merchantpay/makepayment';
  private readonly pgmode = 'pgmode/activepg';
  private readonly createcost = 'merchantpay/createorder/';
  private readonly initiatecost = 'merchantpay/initiate/';
  private readonly getonetimesucces = 'transhistory/getbyid/';

  //Withdrawal Request
  private readonly viewbymerchantid = 'merchant/getmerchants/';
  private readonly addwithdrawal = 'withderawal/withdrawalRequest';



  //Route configuration
  private readonly routeviewall = 'route/viewAll';
  private readonly routemerchantid = 'route/viewByMerchant/';
  private readonly routemerchantadminIds = 'route/viewByEmplyee/'
  private readonly routeCreate = 'route/create';
  private readonly extraroutecreates = 'route/addroute';
  private readonly extraarearoutecreates = 'route/addarea';
  private readonly extrastreetroutecreates = 'route/addStreet';
  private readonly extracustomerroutecreates = 'route/addCustomer'
  private readonly routeEdit = 'route/update/';
  private readonly viewStreetName = 'customer/viewallStreetName/';
  private readonly viewAreaName = 'customer/viewallArea/';
  private readonly routeStatus = 'route/activeInactive/';
  private readonly activeEmployee = 'merchantadminlogin/merchantActiveStatus/';
  private readonly customerrouteid = 'route/viewroutePincodes/';
  private readonly viewrouteareas = 'route/viewrouteAreas/';
  private readonly viewroutestrreets = 'route/viewrouteStreets/';
  private readonly viewcustomerbtstreets = 'route/viewrouteCustomers/';
  private readonly viewByRoutePincodeIds = 'route/viewByRoutePincodeId/';


  private readonly pincodestatus = 'route/updatePincodeStatus/';
  private readonly areastatus = 'route/updateAreaStatus/';
  private readonly streetstatus = 'route/updateStreetStatus/';
  private readonly customerStatus = 'route/updateCustomerRouteStatus/'


  private readonly routebyitsids = 'route/getbyid/';
  private readonly pincodeviewall = 'customer/viewPincodes/';
  private readonly areaViewAll = 'customer/viewArea/';
  private readonly streetViewalls = 'customer/viewStreet/';
  private readonly customerViewalls = 'customer/viewCustomer/'
  private readonly pincodepost = 'customer/viewArea'
  private readonly areapost = 'customer/viewStreets';
  private readonly streetpost = 'customer/viewCustomerDetails';


  //region
  private readonly regionviewall = 'region/viewAllRegion';
  private readonly regionViewbyid = 'region/viewByService/';
  private readonly regionViewactive = 'region/viewOnlyActive';

  //service
  private readonly serviceActive = 'serviceProvider/viewActive';
  private readonly ServiceProvideLinks = "setupbox/merchantBasedService/"

  //Beneficiary
  private readonly Beneficiaryadd = 'employeebeneficiary/create';
  private readonly BeneficiaryView = 'employeebeneficiary/viewmerchant/';
  private readonly BeneficiaryemployeeView = 'merchantadminlogin/viewbyid/';
  private readonly BeneficiaryemployeeEdit = 'employeebeneficiary/update/';
  private readonly BeneficiaryViewbyid = 'employeebeneficiary/viewbyid/';
  private readonly BeneficiaryStatus = 'employeebeneficiary/updateactive/';
  private readonly BeneficiaryPrimary = 'employeebeneficiary/updateprimary/';

  //Transaction
  // private readonly transaction = 'paymentHistory/viewByMerchant/';

  //Channel configuration
  private readonly channelConfigurationexport = 'alcotchannel/viewOnlyActive';
  private readonly channelConfiguration = 'alcotchannel/viewOnlyActive/';
  private readonly Alcartchannellogo = 'alcotchannel/viewLogo/';
  private readonly alcartviewbyid = 'alcotchannel/getById/';

  //Plan configuration
  private readonly planConfiguration = 'broadCaster/viewOnlyActive';
  // private readonly Bouquetsviewbyid = 'broadCaster/getById/';
  private readonly Bouquetsviewbyid = 'broadCaster/getByregions/';
  private readonly Bouquetsviewbyidchannel = 'broadCaster/viewActiveChannelsByRegions/' //for channel view


  // Bouquete plan Active

  private readonly ActiveBiuquetePlans = 'broadCaster/viewOnlyActive'


  // LCOP Plan creation

  private readonly Freechannel = 'lcop/viewFree';
  private readonly PaidChannel = 'lcop/viewPaid';
  private readonly PlanCalculation = 'lcop/calculate';
  private readonly PlanCreation = 'lcop/addpackage';
  private readonly PlanViewall = 'lcop/viewAll';
  private readonly PlanViewbyid = 'lcop/viewById/';
  private readonly PlanViewbyidcust = 'lcop/viewActiveChannels/'; //for customer onboard channels
  private readonly LcopFreechannelstatus = 'lcop/updateFreeStatus';
  private readonly LcopPaidChannelstatus = 'lcop/updatePaidStatus';
  private readonly LcopBouqutesstatus = 'lcop/updatebouquetStatus';
  private readonly PlanStatus = 'lcop/updateStatus';
  private readonly ActivePlans = 'lcop/activeData';
  private readonly PaidChannelStatus = 'lcop/updatePaidStatus';
  private readonly FreeChannelStatus = 'lcop/updateFreeStatus';
  private readonly BouQuetePlanStatus = 'lcop/updatebouquetStatus';
  private readonly PlanViewalls = 'lcop/viewByMerchant/';
  private readonly Lcopupdate = 'lcop/addExtraPackage';
  private readonly Paidchannelactive = 'lcop/viewActivePaid';
  private readonly Freechannelactive = 'lcop/viewActiveFree';
  private readonly FreeChannelforEdit = 'lcop/getFree/';
  private readonly PaidChannelforEdit = 'lcop/getPaid/';
  private readonly BouquetsforEdit = 'lcop/getBouquet/';
  private readonly LCOPcalculationEdit = 'lcop/updateCalculate/'


  //setupbox
  private readonly setupboxViewall = 'setupbox/viewAll';
  private readonly setupboxStatus = 'setupbox/updateStatus';
  private readonly setupboxadd = 'setupbox/create';
  private readonly setupboxedit = 'setupbox/update';
  private readonly setupboxmerchantid = 'setupbox/viewByMerchant/';
  private readonly setupboxactive = 'setupbox/viewByService/';


  //setupbox bulk upload
  private readonly bulkUploadsetupbox = 'setupbox/uploadsetupboxnumber/';
  private readonly bulkuploadexport = 'setupbox/getuploaddatabymerchant/'
  private readonly bulkUploadView = 'setupbox/getuploaddatabymerchant/';
  private readonly bulkuploadResponse = 'setupbox/uploadList/';
  private readonly bulkuploadbyId = 'setupbox/response/';
  private readonly stbcustomerview = 'customer/viewStb/';
  private readonly STBstatus = 'setupbox/updateBookingStatus'
  private readonly SetupBoxflags = 'setupbox/advanceSearchEntity/';

  //Customer dues
  private readonly transaction = 'customerpay/viewbycustomers/';
  private readonly generatedues = 'customerpay/createDues/';
  private readonly customerreceipt = 'customerpay/viewReceipt/';
  private readonly transactionmanualpay = 'customerpay/manualCash/';  //Manuval payment with otp
  private readonly transmanuvalpaywithoutOTP = 'customerpay/manualCashWithoutotp/';  //Manuval payment withOUTotp
  private readonly transactiondues = 'customerpay/updateduestatus/';

  // Customer dues Update
  private readonly custransamountupdate = 'customerpay/updatepayment/';
  private readonly customerupdatebyid = 'customerpayauditlog/viewByCustomerPayId/';
  private readonly Customedueslogbyid = '/customerpayauditlog/viewByMerchant/';
  private readonly customerduessearch = 'customerpayauditlog/viewAdvanceSearch/';
  private readonly customerduelogsgetall = 'customerpayauditlog/viewAllByMerchant/';

  //QR View
  private readonly merchantQr = 'merchant/qrViewImage/';

  //  Customer Payments  

  private readonly CustomerPaymentDetails = 'customerpay/customerpayments/';
  private readonly CustomerMakePayment = 'customerpay/makepayment';
  private readonly CustomerPgCreateOrder = 'customerpay/createorder/';
  private readonly CustomerPgInitiate = 'customerpay/initiate/';
  private readonly CustomerTransDetails = 'paymentHistory/viewByPaynumber/';
  private readonly CustomerDetails = 'customerpay/viewbyid/';
  private readonly Customertransactiondetail = 'customerpay/customertransactions/';
  private readonly CutsomerRefund = 'refund/create';
  private readonly PaymentKeys = 'pgmode/activepg'

  //Merchant Dues
  private readonly dues = 'maintanancePay/viewByMerchant/';
  private readonly duesmakepayment = 'maintanancePay/maintanancemakepayment';
  private readonly createorderdues = 'maintanancePay/createorder/';
  private readonly initiatedues = 'maintanancePay/initiate/';
  private readonly transactiondetails = 'maintanancePay/viewByPayNumber/';
  private readonly transactioninvoice = 'maintanancePay/receiptView/';

  // Customer Tickets

  //ticket customer
  private readonly custmerchantticket = 'customerTickets/getall/';
  private readonly customerticketraise = 'customerTickets/updateTicketStatus/';



  //customer setupbox history
  private readonly viewbymerchant = 'customer/viewMerchant/';
  private readonly viewebycustomer = 'customer/view/';
  private readonly customersetupboxhistorys = 'customer/viewStbHistory/';

  private readonly planbouquetadd = 'customerplan/bouqetcreate';
  private readonly planalcotadd = 'customerplan/alcotcreate';
  private readonly planlcopadd = 'customerplan/lcopcreate';
  private readonly planstatus = 'customerplan/updatestatus/';

  //policy update
  private readonly privacypolicyupdate = 'policy/updatepolicyStatus/';
  private readonly termspolicyupdate = 'policy/updatetcStatus/';
  private readonly disclaimerpolicyupdate = 'policy/updatedisStatus/';
  private readonly refundpolicyupdate = 'policy/updaterefundStatus/';
  private readonly approvepolicy = 'policy/updatePoliciesStatus/';
  private readonly smsmerchant = 'merchantSms/viewmerchantstatus/'

  //customer bulk upload
  private readonly customeraddBulk = 'customer/uploadDetails/';
  private readonly customerbulkresponse = 'customer/uploadedList/';
  private readonly customerbulkbyid = 'customer/getResponse/';
  private readonly customersetupboxbulkResponses = 'customer/viewStbUploadResponse/';
  private readonly customerbulkviewall = 'customer/getuploaddatabymerchant/';
  private readonly customersetupboxbulkbyIds = 'customer/getresponse/';
  private readonly customersetupAddBulks = 'customer/uploadBulkStb/'



  //Dashboard
  private readonly dashbordcustomercount = 'dashBoard/customerCount/';
  private readonly dashboardcustomersevendays = 'entitydashboard/lasts7days/';
  private readonly dashboardcustomerfifteendays = 'entitydashboard/lastsfifteendays/';
  private readonly dashboardcustomerthirtydays = 'dashBoard/thirtydays/';
  private readonly dashboardcustomerlastmonth = 'entitydashboard/lastMonthCustomerTransactionAmount/';
  private readonly dashboardcustomerthismonth = 'entitydashboard/thisMonthCustomerTransactionsAmount/';

  // private readonly dashboardcustomerstartenddate = 'entitydashboard/customerTransaction/';
  private readonly dashboardcustomerstartenddate = 'entitydashboard/customerRangeTransaction/'
  private readonly dashbaordcustomerdayTransactions = 'entitydashboard/dayTransactions/';
  private readonly dashbaordcustomermobilenumber = 'entitydashboard/customerTransactions/';
  private readonly dashboardcustomeroverall = 'entitydashboard/overAllTransaction/';
  private readonly dashboardcustomersevenamount = 'entitydashboard/lasts7daysAmounts/';
  private readonly dashboardthismonthcustomertransaction = 'entitydashboard/thisMonthCustomerTransactions/';
  private readonly dashboardlastmonthcustomertransaction = 'entitydashboard/lastMonthCustomerTransactions/';
  private readonly dashboarddatecustomertransaction = 'entitydashboard/customerRangeTransaction/';

  private readonly dashboardtodayemployee = 'customerpay/getEmployeePayment/';
  private readonly dashboardsevendayemployee = 'customerpay/getWeekPayment/';
  private readonly dashboardmonthemployee = 'customerpay/getMonthPayment/';
  private readonly dashboardpendingemployee = 'customerpay/viewbyPendingCustomers/';
  private readonly dashboardticket = 'customerTickets/statusList/';
  private readonly dashboardbranchmonths = 'entitydashboard/thisMonthBranchTransactions/';
  private readonly dashboardbranchlastmonths = 'entitydashboard/lastMonthBranchTransactions/';
  private readonly dashboardbranchcustomeranges = 'entitydashboard/branchRangeTransaction/';
  private readonly dashboardsetupboxallcote = 'setupbox/getAllocatedCount/'
  private readonly dashboardsetupboxfree = 'setupbox/getFreeSetupBox/'
  private readonly dashboardsetupboxbookingstatus = 'setupbox/updateBookingStatus';
  private readonly dashboardsetupboxstatus = 'setupbox/viewAllocate/';
  private readonly dashboardviewactivecustomer = 'merchantadminlogin/activeInactive/';
  private readonly dashboardviewinactivecustomer = 'merchantadminlogin/activeInactive/';
  private readonly dashboardviewpending = 'customerpay/viewbyPendingCustomers/';
  private readonly dashboardviewallpending = 'customerpay/duependingTransaction/';
  private readonly dashboardemployeecount = 'merchantadminlogin/activeInactiveCount/';
  private readonly dashboardactiveinactivecustomer = 'customer/merchantActive/';
  private readonly dashbaordonoffstatus = 'customer/viewByDay/';
  private readonly dashbaordyesterdayonoffstatus = 'customer/viewByYesterday/';
  private readonly dashbaordtodayonoffcount = 'customer/todayDateCount/';
  private readonly dashbaordyesterdayonoffcount = 'customer/yesterdaDateCount/';
  private readonly dashbaordduestatusoffs = 'customer/viewOffStb/';
  private readonly merchantviewactiveinactiveexcel = 'customer/viewExcel/';
  //other payments
  private readonly otherpayviewall = 'otherpayment/viewByMerchant/';
  private readonly othermakepay = 'otherpayment/makepayment';
  private readonly otherpaycreateorder = 'otherpayment/createorder/';
  private readonly otherpayinitiate = 'otherpayment/checkrequest/';
  private readonly otherpaySuccess = 'otherpayment/viewbytrackid/';
  private readonly otherpayReciept = 'otherpayment/viewinvoice/';

  //Renewal
  private readonly viewrenewal = 'merchantpay/viewRenewalMerchant/'
  private readonly craeterenewal = 'merchantpay/renewalmakepayment';
  private readonly renewalinvoice = 'merchantpay/viewreceipt/';

  // OTP for Manuval payment

  private readonly getotpforManuvelpayment = 'customerpay/manualsendotp/'

  //Announcement
  private readonly announcementview = 'announcement/viewByBusinessCategory/'

  //addsetupbox plan
  private readonly addsetupboxplan = 'customer/createStbAndPlan';
  private readonly viewcustomerbasicdetails = 'customer/viewcustomer/';
  private readonly viewSetupboxDetails = 'customer/viewcustomerstb/';
  private readonly viewsetupboxplan = 'customer/viewcustomerstbplan/';
  private readonly activestatussetupbox = 'customer/updateStbStatus/';

  //SMS
  private readonly viewmerchantsms = 'merchantSms/viewpaidsms/';
  private readonly viewmerchantsmstype = 'smshistory/viewbymerchantandtype/';
  private readonly updatesmsapproval = 'merchantSms/updateApproval/';
  private readonly updateactivestatus = 'merchantSms/updateStatus/';
  private readonly viewsmshistory = 'smshistory/viewbymerchant/';
  private readonly viewsmsdate = 'smshistory/viewmerchantfilter/';


  //survey
  private readonly surveycreate = 'surveyQuestion/createQuestions';
  private readonly surveyviewbyid = 'surveyQuestion/getQuestions/';
  private readonly surveyactivestatus = 'surveyQuestion/updatestatus/';
  private readonly surveyquestionsupdate = 'surveyQuestion/updateQuestions/';

  private readonly surveyanswerremarks = 'customerResponse/responses';
  private readonly viewcustomerresponse = 'customerResponse/view/';
  private readonly viewbyidcustomerresponse = 'customerResponse/viewQuestion/';
  private readonly activequestions = 'surveyQuestion/activeQuestions/';
  private readonly activecustomers = '/customer/activecustomers';

  //total  plan amount
  private readonly customerplanamaount = 'customer/viewcustomertotalamount/'


  //customer logo
  private readonly customerlogo = 'customerTickets/updatedocument';
  private readonly customerlogoview = 'customerTickets/viewimage/';

  //view payment details
  private readonly maintenancetransactionview = 'maintanancePay/viewById/';
  private readonly onetimetransactionview = 'merchantpay/viewpayment/';
  private readonly otherpaymentviewbyid = 'otherpayment/viewbyid/';
  private readonly customertransactionview = 'customerpay/viewbyid/';

  //profile
  private readonly onetimeinvoice = 'merchant/viewInvoice/';


  //search
  private readonly otherpayment = 'otherpayment/advanceSearch/';
  private readonly subscription = 'maintanancePay/advanceSearchEntity/';
  private readonly customeronboard = 'customer/advanceSearchEntity/';
  private readonly customeronboards = 'customer/advanceSearchEntity/';
  private readonly customertickets = 'customerTickets/advanceSearchEntity/';
  private readonly servicetickets = 'tickets/advanceSearchEntity/';
  private readonly lcopplan = 'lcop/advanceSearchEntity/';
  private readonly viewrole = 'merchantrole/advanceSearch/';
  private readonly employeedetailssearch = 'merchantadminlogin/advanceSearchEntity/';
  private readonly customerpay = 'customerpay/advanceSearchEntity/';
  private readonly customerpaydue = 'customerpay/search/';
  private readonly setupbox = 'setupbox/advanceSearchEntity/';
  private readonly viewbymerchantadminid = 'merchantadminlogin/viewbyid/';


  private readonly customerhistoryremainder = 'dueStatus/getStb/';
  private readonly customerduestatushistorys = 'dueStatus/getMerchant/'

  //Agreement
  private readonly viewbyidplan = 'agreement/viewByMerchant/';
  private readonly viewagreementdoucment = 'agreement/viewdoc/';
  private readonly ViewAggrementbyRefference = 'agreement/viewByReferenceCode/';
  private readonly Agreementsendotp = 'agreement/merchantsendotp/';
  private readonly AgreementVerifyOTP = 'agreement/merchantverifyotp/';
  private readonly AgreementConcent = 'agreement/consent';
  private readonly AgreemntConcentLocation = 'agreement/consentlocationtracker'

  //offline transactions
  private readonly offlinetransactions = 'transactions/getMerchantOfflinePaymentList';
  private readonly successofftransactions = 'transactions/getMerchofflineSfulPayment/';
  private readonly failureofftransactions = 'transactions/getMerchOfflineFailPayment/';

  //Route Bulk
  private readonly customerrouteAddBulks = 'route/bulkUpload/';
  private readonly routebulkuploadresponses = 'route/uploadedList/';
  private readonly routebulkuploadByIds = 'route/getResponse/'

  // Find Ip 
  private ipApiUrl = 'https://api.ipify.org/?format=json';

  // Find Location Details 

  private geoApiUrl = 'https://ipinfo.io/json';



  private paidipaddress='https://api.ipgeolocation.io/ipgeo?apiKey=e4d18a0faefd43a2982674ac6d4565a9'

   private abstarctipaddress='https://ipgeolocation.abstractapi.com/v1/?api_key=dc919b65a0184a6fb10a07b13733027b'

  // private geoApiUrl = 'http://ip-api.com/json/'

  // private geoApiUrl = 'https://data.handyapi.com/geoip/'



  // private geoApiUrl = 'http://ip-api.com/json';


  //Search for customer dues

  private readonly yesterdaysearch = 'customerpay/customerYesterDayTransaction/';
  private readonly todaysearch = 'customerpay/customerDayTransaction/';
  private readonly customsearch = 'customerpay/customercustomRangeTransactions/';
  private readonly customsearchwithstatus = 'customerpay/customercustomRangeTransaction/';



  //pincode

  private readonly pincodecreate = 'merchantPincode/create/';
  private readonly pincodeupdate = 'merchantPincode/update';
  private readonly pincodeviewbyid = 'merchantPincode/viewByMerchant/';
  private readonly pincodeactivestatus = 'merchantPincode/updateStatus/';
  private readonly pincodeactivegetall = 'merchantPincode/viewOnlyActive';


  //area

  private readonly areacreate = 'merchantArea/add/';
  private readonly areaupdate = 'merchantArea/update';
  private readonly areaactivestatus = 'merchantArea/updateStatus/';
  private readonly areaviewbyid = 'merchantArea/viewByPincode/';
  private readonly areagetall = 'merchantArea/viewall';
  private readonly areadactivegetall = 'merchantArea/viewActiveArea'


  //street

  private readonly streetcreate = 'merchantStreet/addStreet/';
  private readonly streetupdate = 'merchantStreet/update ';
  private readonly streetactivestatus = 'merchantStreet/updateStatus/';
  private readonly streetgetall = 'merchantStreet/viewAll';



  //Additional category

  private readonly categorycreate = 'addcategory/createcategory';
  private readonly categoryupdate = 'addcategory/updatecategory/';
  private readonly categoryactivestatus = 'addcategory/updatestatus/';
  private readonly viewcategorybymerchant = 'addcategory/getmerchantid/';
  private readonly categorygetallactive = 'addcategory/getactivestatusmerchant/';


  //Additional payment

  private readonly additionalpaycreate = 'customerotherpayment/create';
  private readonly additionalpayupdate = 'customerotherpayment/update/';
  private readonly additionaltransviewbyid = 'customerotherpayment/viewByCustomer/';
  private readonly additionaltranscheckstatus = 'customerotherpayment/checkrequest/';
  private readonly additionalpayinvoice = 'customerotherpayment/viewinvoice/';
  private readonly additionalpaydatefilter = 'customerotherpayment/dateFilter/';
  private readonly additionalpayviewbyMerchant = 'customerotherpayment/viewmerchants/';
  private readonly additionalpayviewbyId = 'customerotherpayment/viewbyid/';

  //branch
  private readonly branchview = 'bankBranch/viewData/';

  //filter
  private readonly paidunpaidfilter = 'customerpay/paidUnpaid/';
  private readonly duependingsetupboxfilter = 'customerpay/merchantStbNumber/';
  private readonly duependingsetupboxcustomrange = 'customerpay/stbNumbers/';
  private readonly SetupboxpayStatus = 'customerpay/stbNo/';
  private readonly Updatepaymentstatus = 'customerpay/updatePaymentStatus/';
  private readonly filteremployeepayments = 'customerpay/employee/';
  private readonly paidcustrangefilter = 'customerpay/cusRange/';

  //Branch
  private readonly branchindividualview = 'bankBranch/view/';
  private readonly branchcustomerget = 'customer/customersByBranch/';
  private readonly branchcustomergetexport = 'customer/customersByBranch/';

  //unblock

  private readonly unblockadmin = 'merchant/unBlockAccountAdmin/';
  //filter
  private readonly customermsofilter = 'customer/msoSearchPage/';
  private readonly customersettopboxfilter = 'customer/merchantSearchPage/';


  //channelslist
  private readonly channelslist = 'broadCaster/viewByChennals/';
  //survey  search
  private readonly surveysearch = 'surveyQuestion/advanceSearch/';
  //branch search
  private readonly branchsearch = 'bankBranch/branchSearch/';
  private readonly branchcustomersearch = 'customer/customersByBranchs/';

  private readonly damagecustomerview = 'customer/viewDamageStb/'

  private readonly refundformerchant = 'refund/getmerchant/';
  private readonly refundsearch = 'refund/getmerchant/'
  private readonly refundmerchantgetall = 'refund/getmerchant/';





  private readonly refundforcustomer = 'refund/getcustomer/';
  private readonly refundcustomersearch = 'refund/getcustomer/';



  private readonly duecancelled = 'customerpay/viewMerchantDueCancel/';
  private readonly duecancelcustomrange = 'customerpay/viewMerchantDueCancel/';
  private readonly duependingdashboardsearch = 'customerpay/duependingTransaction/';
  private readonly dashboardviewallpendingexport = 'customerpay/duependingTransaction/';


  private readonly additionaltranssearch = 'customerotherpayment/search/';
  private readonly customerduestatushistorysearch = 'dueStatus/getMerchant/';
  private readonly smshistorysearch = 'smshistory/advanceSearchEntity/';
  private readonly channelsearch = 'alcotchannel/advanceSearch/';

  private readonly Setupboxhistory = 'customer/viewStbHistory/';
  private readonly activeinactivesearch = 'customer/viewActiveCustomer/';
  private readonly activeinactivegetall = 'customer/viewActiveCustomer/';
  private readonly activeinactiveexport = 'customer/merchantActive/';
  private readonly duestatushistoryexport = 'dueStatus/getMerchant/';
  private readonly additionaltransexport = 'customerotherpayment/getMerchantId/'
  private readonly customerduesearch = 'customer/advanceSearchEntitypagiantion/';

  private readonly customeractivestatushistory = 'customer/getCustomerStatusHistory/';
  private readonly onlinerefunddatefilter = 'refund/getmerchant/';
  private readonly viewlcopids = 'lcop/viewById/';

  private readonly surveyqtAnssearch = 'customerResponse/advanceSearchQusandAnswer/';
  private readonly customersearchmso = 'customer/msoSearch/';
  private readonly customermerchantsearch = 'customer/merchantSearch/';
  private readonly dashboardsetupboxsearch = 'setupbox/viewAllocateSearch/'

  private readonly setupboxstatuspagination='setupbox/viewAllocatePagination/'

  loginError = new Subject();

  token = localStorage.getItem('token');

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
  getEntityLogin(email: string, password: string) {
    const credentialBody = {
      contactEmail: email,
      password: password,
    };
    return this.http
      .post(`${this.basePath}${this.entitylogin}`, credentialBody)
      .subscribe((res: any) => {
        if (res.flag == 1) {
          localStorage.setItem(
            'token',
            JSON.stringify(
              res.response.login_history?.jwtResponse?.X_ACCESS_TOKEN
            )
          );
          localStorage.setItem(
            'merchantId',
            res.response.login_history?.merchantId || res.response.login_history?.entityId?.merchantId
          );
          localStorage.setItem('bussinessId', res.response.login_history?.businessCategoryModel?.businessCategoryId || res.response.login_history?.entityId?.businessCategoryModel?.businessCategoryId)
          localStorage.setItem('adminName', res.response?.login_history?.adminName || res.response?.login_history?.entityName)

          localStorage.setItem(
            'logoLink',
            res.response.login_history?.logoLink || res.response?.login_history?.entityId?.logoLink
          );


          localStorage.setItem('gstAmount', res.response.login_history?.gstAmount || res.response.login_history?.entityId?.gstAmount)

          localStorage.setItem(
            'merchantname',
            res.response.login_history?.merchantLegalName || res.response.login_history?.entityId?.merchantLegalName
          );
          localStorage.setItem(
            'email',
            res.response.login_history?.contactEmail || res.response.login_history?.adminEmail
          );
          localStorage.setItem(
            'mobilenumber',
            res.response.login_history?.contactMobile || res.response.login_history?.mobileNumber
          );
          localStorage.setItem(
            'address',
            res.response.login_history?.billingAddress || res.response.login_history?.address
          );
          localStorage.setItem(
            'area',
            res.response.login_history?.area || res.response.login_history?.entityId?.area
          );
          localStorage.setItem(
            'pincode',
            res.response.login_history?.zipcode || res.response.login_history?.entityId?.zipcode
          );
          localStorage.setItem(
            'city',
            res.response.login_history?.city || res.response.login_history?.entityId?.city
          );

          localStorage.setItem(
            'fullname',
            res.response.login_history?.entityName || res.response.login_history?.entityId?.adminName
          );

          localStorage.setItem(
            'stateName',
            res.response.login_history?.stateName || res.response.login_history?.entityId?.stateName
          );

          localStorage.setItem(
            'technicalTotalAmount',
            res.response.login_history?.technicalTotalAmount || res.response.login_history?.entityId?.technicalTotalAmount
          );
          localStorage.setItem(
            'emailOtpVerificationStatus', res.response.login_history?.emailOtpVerificationStatus || res.response.login_history?.entityId?.emailOtpVerificationStatus
          );
          localStorage.setItem(
            'smsOtpVerificationstatus', res.response.login_history?.smsOtpVerificationstatus || res.response.login_history?.entityId?.smsOtpVerificationstatus);
          localStorage.setItem(
            'technicalPayStatus',

            res.response.login_history?.technicalPayStatus || res.response.login_history?.entityId?.technicalPayStatus
          );
          localStorage.setItem('technicalAmount', res.response.login_history?.merchantPlanModel?.technicalAmount || res.response.login_history?.entityId?.technicalAmount);
          localStorage.setItem(
            'merchantPlanId',

            res.response.login_history?.merchantPlanModel
              ?.merchantPlanId
          );


          localStorage.setItem(
            'modifiedDateTime',
            res.response.login_history?.modifiedDateTime || res.response.login_history?.modifiedDateTime
          );

          // localStorage.setItem(
          //   'roleId',
          //   res.response.login_history?.roleModel?.roleId || res.response?.login_history?.merchantRoleId?.merchantRoleId
          // );

          localStorage.setItem(
            'roleName', res.response?.login_history?.roleModel?.roleName || res.response?.login_history?.merchantRoleId?.roleName
          );

          localStorage.setItem('adminName', res.response?.login_history?.adminName || res.response?.login_history?.entityName)
          localStorage.setItem('smsStatus', res.response?.login_history?.smsStatus || res.response.login_history?.entityId?.smsStatus)
          localStorage.setItem('roleId', res.response?.login_history?.merchantRoleId?.merchantRoleId);
          localStorage.setItem('roleIds', res.response.login_history?.roleModel?.roleId)

          localStorage.setItem('merchantAdminId', res.response.login_history?.merchantAdminId)
          localStorage.setItem('accountId', res.response.login_history?.accountId)

          localStorage.setItem('customerManualStatus', res.response.login_history?.customerManualStatus)
          localStorage.setItem('customerPaymentMode', res.response.login_history?.customerPaymentMode)
          localStorage.setItem('billingMode', res.response.login_history?.billingMode)
          localStorage.setItem('offlineQrEnableStatus', res.response.login_history?.offlineQrEnableStatus)
          // location.href = '/dashboard/content';

          this.router.navigateByUrl('/dashboard/content', {
            replaceUrl: true,
          });
          setTimeout(() => {
            window.location.reload()
          }, 300);


          // this.router.navigate(['/dashboard/content']).then(() => {
          //  setTimeout(() => {
          //   window.location.reload()
          // }, 300);
          // });

        }
        else {
          this.toastr.error(res.responseMessage)
        }

        // else {
        //   this.loginError.next(res.responseMessage);
        // }
      });
  }

  getIpAddress() {
    return this.http.get(`${this.ipApiUrl}`)
  }

  getIpLocation(model: any) {
    return this.http.post(`${this.geoApiUrl}`, model)
  }





  getForgotPassword(id: any) {
    return this.http.get(
      `${this.basePath}${this.forgotpassword}${id}`,
      this.options
    );
  }
  VerifyOtp(id: any, data: VerifyOtp) {
    return this.http.put(
      `${this.basePath}${this.verifyotp}${id}`,
      data,
      this.options
    );
  }
  ResendOtp(id: any) {
    return this.http.get(
      `${this.basePath}${this.resendotp}${id}`,
      this.options
    );
  }
  ResetPassword(data: ResetPassword) {
    return this.http.post(
      `${this.basePath}${this.resetpassword}`,
      data,
      this.options
    );
  }
  ChangePassword(data: any) {
    return this.http.put(
      `${this.basePath}${this.changepassword}`,
      data,
      this.options
    );
  }
  // Admin Method
  addadmins(model: Addadmins) {
    return this.http.post(
      `${this.basePath}${this.addadmin}`,
      model,
      this.options
    );
  }
  viewadmins() {
    return this.http.get(`${this.basePath}${this.viewadmin}`, this.options);
  }
  viewadminbyId(id: any) {
    return this.http.get(
      `${this.basePath}${this.viewadminbyid}${id}`,
      this.options
    );
  }

  ViewAdminforcollections(id: any) {
    return this.http.get(`${this.basePath}${this.ViewadminforCollectionamount}${id}`, this.options)
  }
  viewbyidadmins(id: any) {
    return this.http.get(
      `${this.basePath}${this.viewbyidadmin}${id}`,
      this.options
    );
  }
  editadmins(id: any, model: Upadteadmins) {
    return this.http.put(
      `${this.basePath}${this.editadmin}${id}`,
      model,
      this.options
    );
  }
  statusadmins(id: any, model: Statusadmin) {
    return this.http.put(
      `${this.basePath}${this.statusadmin}${id}`,
      model,
      this.options
    );
  }
  getactiveRole(id: any) {
    return this.http.get(`${this.basePath}${this.getActiveRole}${id}`, this.options)
  }
  //Empolyee Method
  addemployees(model: Addemployees) {
    return this.http.post(
      `${this.basePath}${this.addemployee}`,
      model,
      this.options
    );
  }
  viewemployees(id: any) {
    return this.http.get(
      `${this.basePath}${this.viewemployee}${id}`,
      this.options
    );
  }

  //Terms and policy method
  viewterm(id: any) {
    return this.http.get(
      `${this.basePath}${this.viewterms}${id}`,
      this.options
    );
  }

  //Email Method
  emailverifys(id: any) {
    return this.http.get(
      `${this.basePath}${this.emailverfiy}${id}`,
      this.options
    );
  }
  otpemail(id: any, model: EmailOtpVerfiy) {
    return this.http.put(
      `${this.basePath}${this.emailotp}${id}`,
      model,
      this.options
    );
  }

  verifyemailresends(id: any) {
    return this.http.get(
      `${this.basePath}${this.verifyemailresend}${id}`,
      this.options
    );
  }

  //Mobile Verify
  mobileverifys(id: any) {
    return this.http.get(
      `${this.basePath}${this.mobileverify}${id}`,
      this.options
    );
  }
  otpmobile(id: any, model: SmsOtpVerfiy) {
    return this.http.put(
      `${this.basePath}${this.mobileotp}${id}`,
      model,
      this.options
    );
  }

  verifymobileresends(id: any) {
    return this.http.get(
      `${this.basePath}${this.verifymobileresend}${id}`,
      this.options
    );
  }

  //Service Ticket
  viewTicket(id: any) {
    return this.http.get(
      `${this.basePath}${this.viewallTicket}${id}`,
      this.options
    );
  }

  addserviceTicket(FormData: FormData) {
    return this.http.post(
      `${this.basePath}${this.addTicket}`,
      FormData,
      this.optionsMultipart
    );
  }

  viewticketImage(id: string) {
    return this.http.get(`${this.basePath}${this.viewTicketImage}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    });
  }

  updateTickets(model: Tickets) {
    return this.http.put(
      `${this.basePath}${this.editTicket}`,
      model,
      this.options
    );
  }

  editTicketImage(formData: FormData) {
    return this.http.put(
      `${this.basePath}${this.editImage}`,
      formData,
      this.optionsMultipart
    );
  }
  //Roles and permisiion
  viewRole(id: any) {
    return this.http.get(
      `${this.basePath}${this.viewRoles}${id}`,
      this.options
    );
  }

  viewallPermission() {
    return this.http.get(
      `${this.basePath}${this.getallPermission}`,
      this.options
    );
  }

  subpermissionValue(model: subpermission) {
    return this.http.post(
      `${this.basePath}${this.getSubpermission}`,
      model,
      this.options
    );
  }
  createroles(model: roles) {
    return this.http.post(
      `${this.basePath}${this.createrole}`,
      model,
      this.options
    );
  }

  updateRoles(id: any, model: updaterole) {
    return this.http.put(
      `${this.basePath}${this.updateRole}${id}`,
      model,
      this.options
    );
  }

  statusRoles(model: roleStatus) {
    return this.http.put(
      `${this.basePath}${this.statusRole}`,
      model,
      this.options
    );
  }

  getallRole(id: any) {
    return this.http.get(
      `${this.basePath}${this.viewallRole}${id}`,
      this.options
    );
  }

  //Customer Method
  viewcustomerbyids(id: any) {
    return this.http.get(
      `${this.basePath}${this.viewcustomerbymerchantid}${id}`,
      this.options
    );
  }
  viewcustomer(id: any) {
    return this.http.get(
      `${this.basePath}${this.viewcustomerbyid}${id}`,
      this.options
    );
  }
  createremainders(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.createremainder}${id}`, model, this.options)
  }
  alcotlogos(id: string) {
    return this.http.get(`${this.basePath}${this.alcotlogo}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    });
  }
  customeridsearch(model: any) {
    return this.http.post(`${this.basePath}${this.customeridsearchs}`, model, this.options)
  }
  customeridmonthmanualdues(model: any) {
    return this.http.post(`${this.basePath}${this.customeridmonthmanualdue}`, model, this.options)
  }
  customeridfullmanualdues(model: any) {
    return this.http.post(`${this.basePath}${this.customeridfullmanualdue}`, model, this.options)
  }
  //One time setup
  addonetimes(model: Addonetime) {
    return this.http.post(
      `${this.basePath}${this.addonetime}`,
      model,
      this.options
    );
  }

  pgmodes() {
    return this.http.get(`${this.basePath}${this.pgmode}`, this.options);
  }
  getCreateCost(id: any, id1: any) {
    return this.http.get(
      `${this.basePath}${this.createcost}${id}/${id1}`,
      this.options
    );
  }

  getinitateCost(id: any, id1: any) {
    return this.http.get(
      `${this.basePath}${this.initiatecost}${id}/${id1}`,
      this.options
    );
  }

  getonetimesuccess(id: any) {
    return this.http.get(
      `${this.basePath}${this.getonetimesucces}${id}`,
      this.options
    );
  }
  //Withdrawal Request
  viewbymerchantids(id: any) {
    return this.http.get(
      `${this.basePath}${this.viewbymerchantid}${id}`,
      this.options
    );
  }
  addwithdrawals(model: AddWithdrawal) {
    return this.http.post(
      `${this.basePath}${this.addwithdrawal}`,
      model,
      this.options
    );
  }
  beneficiaryAdd(model: addbeneficiary) {
    return this.http.post(
      `${this.basePath}${this.Beneficiaryadd}`,
      model,
      this.options
    );
  }

  BeneficiaryViewall(id: any) {
    return this.http.get(
      `${this.basePath}${this.BeneficiaryView}${id}`,
      this.options
    );
  }

  BeneficiaryEmployeeView(id: any) {
    return this.http.get(
      `${this.basePath}${this.BeneficiaryemployeeView}${id}`,
      this.options
    );
  }

  BeneficiaryEmployeeEdit(id: any, model: editbenificiary) {
    return this.http.put(
      `${this.basePath}${this.BeneficiaryemployeeEdit}${id}`,
      model,
      this.options
    );
  }

  BeneficiaryViewbyId(id: any) {
    return this.http.get(
      `${this.basePath}${this.BeneficiaryViewbyid}${id}`,
      this.options
    );
  }

  Beneficiarystatus(id: any, model: employeeStatus) {
    return this.http.put(
      `${this.basePath}${this.BeneficiaryStatus}${id}`,
      model,
      this.options
    );
  }

  BeneficiaryPrimarystatus(id: any, model: primaryStatus) {
    return this.http.put(
      `${this.basePath}${this.BeneficiaryPrimary}${id}`,
      model,
      this.options
    );
  }

  routeViewall() {
    return this.http.get(`${this.basePath}${this.routeviewall}`, this.options);
  }

  routecreate(model: route) {
    return this.http.post(
      `${this.basePath}${this.routeCreate}`,
      model,
      this.options
    );
  }
  extraroutecreate(model: extraroute) {
    return this.http.post(
      `${this.basePath}${this.extraroutecreates}`,
      model,
      this.options
    );
  }
  extraarearoutecreate(model: extraarearoute) {
    return this.http.post(
      `${this.basePath}${this.extraarearoutecreates}`,
      model,
      this.options
    );
  }
  extrastreetroutecreate(model: extrastreetroute) {
    return this.http.post(
      `${this.basePath}${this.extrastreetroutecreates}`,
      model,
      this.options
    );
  }
  extracustomerroutecreate(model: extracustomerroute) {
    return this.http.post(
      `${this.basePath}${this.extracustomerroutecreates}`,
      model,
      this.options
    );
  }
  routebyitsid(id: any) {
    return this.http.get(`${this.basePath}${this.routebyitsids}${id}`, this.options);
  }
  pincodeViewall(id: any) {
    return this.http.get(`${this.basePath}${this.pincodeviewall}${id}`, this.options);
  }
  areaViewall(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.areaViewAll}${id}/${id1}`, this.options);
  }
  streetViewall(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.streetViewalls}${id}/${id1}/${id2}`, this.options);
  }
  customerViewall(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.customerViewalls}${id}/${id1}/${id2}/${id3}`, this.options);
  }
  pincodePost(data: any) {
    return this.http.post(`${this.basePath}${this.pincodepost}`, data, this.options);
  }

  areaPost(data: any) {
    return this.http.post(`${this.basePath}${this.areapost}`, data, this.options);
  }
  streetPost(data: any) {
    return this.http.post(`${this.basePath}${this.streetpost}`, data, this.options);
  }

  routeedit(id: any, model: routeupdate) {
    return this.http.put(
      `${this.basePath}${this.routeEdit}${id}`,
      model,
      this.options
    );
  }
  viewstreetName(id: any) {
    return this.http.get(
      `${this.basePath}${this.viewStreetName}${id}`,
      this.options
    );
  }

  viewareaName(id: any) {
    return this.http.get(`${this.basePath}${this.viewAreaName}${id}`, this.options);
  }

  routestatus(id: any, model: routests) {
    return this.http.put(
      `${this.basePath}${this.routeStatus}${id}`,
      model,
      this.options
    );
  }


  activeEmployees(id: any) {
    return this.http.get(
      `${this.basePath}${this.activeEmployee}${id}`,
      this.options
    );
  }
  viewactiveemployes(id: any) {
    return this.http.get(
      `${this.basePath}${this.viewactiveemploye}${id}`,
      this.options
    );
  }
  customerrouteids(id: any) {
    return this.http.get(
      `${this.basePath}${this.customerrouteid}${id}`,
      this.options
    );
  }
  viewroutearea(id: any) {
    return this.http.get(
      `${this.basePath}${this.viewrouteareas}${id}`,
      this.options
    );
  }
  viewroutestrreet(id: any) {
    return this.http.get(
      `${this.basePath}${this.viewroutestrreets}${id}`,
      this.options
    );
  }
  viewcustomerbtstreet(id: any) {
    return this.http.get(
      `${this.basePath}${this.viewcustomerbtstreets}${id}`,
      this.options
    );
  }
  viewByRoutePincodeId(id: any) {
    return this.http.get(
      `${this.basePath}${this.viewByRoutePincodeIds}${id}`,
      this.options
    );
  }
  routemerchantadminId(id: any) {
    return this.http.get(`${this.basePath}${this.routemerchantadminIds}${id}`, this.options)
  }

  pinStatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.pincodestatus}${id}`, model, this.options)
  }
  areasStatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.areastatus}${id}`, model, this.options)
  }
  streetsStatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.streetstatus}${id}`, model, this.options)
  }
  customersStatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.customerStatus}${id}`, model, this.options)
  }

  routemerchantId(id: any) {
    return this.http.get(`${this.basePath}${this.routemerchantid}${id}`, this.options)
  }

  regionview() {
    return this.http.get(`${this.basePath}${this.regionviewall}`, this.options);
  }
  regionViewActive() {
    return this.http.get(`${this.basePath}${this.regionViewactive}`, this.options)
  }


  regionViewByid(id: any) {
    return this.http.get(`${this.basePath}${this.regionViewbyid}${id}`, this.options);
  }

  serviceactive() {
    return this.http.get(`${this.basePath}${this.serviceActive}`, this.options)
  }

  ServiceprovideLinks(id: any) {
    return this.http.get(`${this.basePath}${this.ServiceProvideLinks}${id}`, this.options)
  }


  ActiveSetupBox(id: any) {
    return this.http.get(`${this.basePath}${this.setupboxactive}${id}`, this.options)
  }

  ActiveServiceProvider() {
    return this.http.get(`${this.basePath}${this.serviceprovideractive}`, this.options)
  }

  ActiveMsobySTB(id: any) {
    return this.http.get(`${this.basePath}${this.Activeserviceproviderfromstb}${id}`, this.options)
  }
  EditSetUpboxonly(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.editsettopbox}${id}`, model, this.options)
  }

  CustomergetAll() {
    return this.http.get(`${this.basePath}${this.customergetall}`, this.options)
  }

  OnboardCustomer(model: any) {
    return this.http.post(`${this.basePath}${this.customercreate}`, model, this.options)
  }
  UpdateCustomer(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.customerupdate}${id}`, model, this.options)
  }
  ViewCustomerDetails(id: any) {
    return this.http.get(`${this.basePath}${this.customerview}${id}`, this.options)
  }
  ActiveStatusCustomer(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.customeractivestatus}${id}`, model, this.options)
  }
  duestatusonoffs(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.duestatusonoff}${id}`, model, this.options)
  }


  ViewCustomerByMerchantDetails(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.merchantview}${id}/${id1}/${id2}`, this.options)
  }

  merchantviewexcels(id: any) {
    return this.http.get(`${this.basePath}${this.merchantviewexcel}${id}`, this.options)
  }

  ViewCustomerByMerchantDetail(id: any) {
    return this.http.get(`${this.basePath}${this.merchantview}${id}`, this.options)
  }


  ViewCustomerByMerchantExport(id: any) {
    return this.http.get(`${this.basePath}${this.merchantview}${id}`, this.options)
  }



  transactionView(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.transaction}${id}/${id1}/${id2}`, this.options)
  }

  transactionViewExport(id: any) {
    return this.http.get(`${this.basePath}${this.transaction}${id}`, this.options)
  }

  generateDues(id: any) {
    return this.http.get(`${this.basePath}${this.generatedues}${id}`, this.options)
  }

  FilterUnpaidPaid(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.paidunpaidfilter}${id}/${id1}`, this.options)

  }

  //Channel

  channelconfiguration(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.channelConfiguration}${id}/${id1}`, this.options)
  }

  channelconfigurationExport() {
    return this.http.get(`${this.basePath}${this.channelConfigurationexport}`, this.options)
  }

  AlcartImageview(id: any) {
    return this.http.get(`${this.basePath}${this.Alcartchannellogo}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    })
  }
  Alcardviewbyid(id: any) {
    return this.http.get(`${this.basePath}${this.alcartviewbyid}${id}`, this.options)
  }

  //Plan
  planconfiguration() {
    return this.http.get(`${this.basePath}${this.planConfiguration}`, this.options)
  }

  // Bouquete Active Plans 

  ActiveBouquetePlans() {
    return this.http.get(`${this.basePath}${this.ActiveBiuquetePlans}`, this.options)
  }
  BroadcasterBoucatebyid(id: any) {
    return this.http.get(`${this.basePath}${this.Bouquetsviewbyid}${id}`, this.options)
  }

  // Lcop Plan API,S

  Freechannels() {
    return this.http.get(`${this.basePath}${this.Freechannel}`, this.options)
  }

  PaidChannels() {
    return this.http.get(`${this.basePath}${this.PaidChannel}`, this.options)
  }

  PaidChannelsActive() {
    return this.http.get(`${this.basePath}${this.Paidchannelactive}`, this.options)
  }

  FreechannelsActive() {
    return this.http.get(`${this.basePath}${this.Freechannelactive}`, this.options)
  }

  FreeChannelForEdit(id:any){
    return this.http.get(`${this.basePath}${this.FreeChannelforEdit}${id}`,this.options)
  }
  PaidChannelForEdit(id:any){
    return this.http.get(`${this.basePath}${this.PaidChannelforEdit}${id}`,this.options)
  }

  BouqueteForEdit(id:any){
    return this.http.get(`${this.basePath}${this.BouquetsforEdit}${id}`,this.options)
  }

  LCOPCalculationForEdit(id:any,model:any){
    return this.http.post(`${this.basePath}${this.LCOPcalculationEdit}${id}`,model,this.options)
  }

  LcopViewall() {
    return this.http.get(`${this.basePath}${this.PlanViewall}`, this.options)
  }

  LCOPPlanCalculation(model: any) {
    return this.http.post(`${this.basePath}${this.PlanCalculation}`, model, this.options)
  }

  LcopPlanCreation(model: any) {
    return this.http.post(`${this.basePath}${this.PlanCreation}`, model, this.options)
  }

  LCOPPlanStatus(model: any) {
    return this.http.put(`${this.basePath}${this.PlanStatus}`, model, this.options)
  }

  LCOPViewbyid(id: any) {
    return this.http.get(`${this.basePath}${this.PlanViewbyid}${id}`, this.options)
  }

  LCOPViewbyidcust(id: any) {
    return this.http.get(`${this.basePath}${this.PlanViewbyidcust}${id}`, this.options)
  }

  LCOPFreeChannelStatus(model: any) {
    return this.http.put(`${this.basePath}${this.LcopFreechannelstatus}`, model, this.options)
  }

  LCOPPaidchannelStatus(model: any) {
    return this.http.put(`${this.basePath}${this.LcopPaidChannelstatus}`, model, this.options)
  }

  LCOPBouquteStatus(model: any) {
    return this.http.put(`${this.basePath}${this.LcopBouqutesstatus}`, model, this.options)
  }

  ActiveLCOP() {
    return this.http.get(`${this.basePath}${this.ActivePlans}`, this.options)
  }

  LcopViewalls(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.PlanViewalls}${id}/${id1}/${id2}`, this.options)
  }

  LcopViewallsExport(id: any) {
    return this.http.get(`${this.basePath}${this.PlanViewalls}${id}`, this.options)
  }

  Lcopedit(model: any) {
    return this.http.put(`${this.basePath}${this.Lcopupdate}`, model, this.options)
  }

  PaidChannelstatusforlcop(model: any) {
    return this.http.put(`${this.basePath}${this.PaidChannelStatus}`, model, this.options)
  }

  Paidchannelstatusforlcop(model: any) {
    return this.http.put(`${this.basePath}${this.FreeChannelStatus}`, model, this.options)
  }

  Bouquestplanstatusforlcop(model: any) {
    return this.http.put(`${this.basePath}${this.BouQuetePlanStatus}`, model, this.options)
  }

  // Setupbox


  setupboxView() {
    return this.http.get(`${this.basePath}${this.setupboxViewall}`, this.options)
  }

  setupboxstatus(model: setupStatus) {
    return this.http.put(`${this.basePath}${this.setupboxStatus}`, model, this.options)
  }

  setupboxCreate(model: postsetupbox) {
    return this.http.post(`${this.basePath}${this.setupboxadd}`, model, this.options)
  }

  setupboxEdit(model: updatesetupbox) {
    return this.http.put(`${this.basePath}${this.setupboxedit}`, model, this.options)
  }

  setupboxbyid(id: any) {
    return this.http.get(`${this.basePath}${this.setupboxmerchantid}${id}`, this.options)
  }


  bulkuploadViewall(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.bulkUploadView}${id}/${id1}/${id2}`, this.options);
  }

  SetupBoxflag(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.SetupBoxflags}${id}/${id1}/${id2}`, this.options)
  }
  STBStatus(model: any) {
    return this.http.put(`${this.basePath}${this.STBstatus}`, model, this.options)
  }

  setupboxcustomerview(id: any) {
    return this.http.get(`${this.basePath}${this.stbcustomerview}${id}`, this.options)
  }

  bulkuploadExport(id: any) {
    return this.http.get(`${this.basePath}${this.bulkuploadexport}${id}`, this.options)
  }
  bulkUploadSetupbox(id: any, id1: any, formData: any[]) {
    return this.http.post(`${this.basePath}${this.bulkUploadsetupbox}${id}/${id1}`, formData, this.options)
  }

  bulkuploadresponse(id: any) {
    return this.http.get(`${this.basePath}${this.bulkuploadResponse}${id}`, this.options)
  }

  bulkuploadById(id: any) {
    return this.http.get(`${this.basePath}${this.bulkuploadbyId}${id}`, this.options)
  }


  //Merchant

  merchantbyids(id: any) {
    return this.http.get(`${this.basePath}${this.merchantbyid}${id}`, this.options)
  }


  // Customer Payments API,S

  CustomerPaymentsList(id: any) {
    return this.http.get(`${this.basePath}${this.CustomerPaymentDetails}${id}`, this.options)
  }

  CustomerMakePayments(model: any) {
    return this.http.post(`${this.basePath}${this.CustomerMakePayment}`, model, this.options)
  }

  CustomerPGCreateOrder(id: any) {
    return this.http.get(`${this.basePath}${this.CustomerPgCreateOrder}${id}`, this.options)
  }


  CustomerPGinitiate(id: any) {
    return this.http.get(`${this.basePath}${this.CustomerPgInitiate}${id}`, this.options)
  }

  Customertransactioninfo(id: any) {
    return this.http.get(`${this.basePath}${this.Customertransactiondetail}${id}`, this.options)
  }

  CustomerPaymentdetails(id: any) {
    return this.http.get(`${this.basePath}${this.CustomerTransDetails}${id}`, this.options)
  }

  CustomersinglePaymentDetails(id: any) {
    return this.http.get(`${this.basePath}${this.CustomerDetails}${id}`, this.options)
  }

  CutsomerRefunds(model: any) {
    return this.http.post(`${this.basePath}${this.CutsomerRefund}`, model, this.options)
  }

  CustomerAPIKeys() {
    return this.http.get(`${this.basePath}${this.PaymentKeys}`, this.options)
  }





  CustomerTransaction(id: any) {
    return this.http.get(
      `${this.basePath}${this.customertransaction}${id}`,
      this.options
    );
  }

  ActiveSetupBoxByMerchantId(id: any, id1: any) {
    return this.http.get(
      `${this.basePath}${this.Activesetupboxmerchantid}${id}/${id1}`,
      this.options
    );
  }
  ActiveLcop(id: any) {
    return this.http.get(`${this.basePath}${this.Activeplanmerchant}${id}`, this.options)
  }


  QRImageView(id: any) {
    return this.http.get(`${this.basePath}${this.merchantQr}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    })
  }



  // Merchant Dues

  MerchantDues(id: any) {
    return this.http.get(`${this.basePath}${this.dues}${id}`, this.options);
  }

  Duesmakepay(model: any) {
    return this.http.post(`${this.basePath}${this.duesmakepayment}`, model, this.options)
  }

  createdues(id: any) {
    return this.http.get(`${this.basePath}${this.createorderdues}${id}`, this.options)
  }

  Initiatedues(id: any) {
    return this.http.get(`${this.basePath}${this.initiatedues}${id}`, this.options)
  }


  Transactiondues(id: any) {
    return this.http.get(`${this.basePath}${this.transactiondetails}${id}`, this.options)
  }

  Trasactionreceipt(id: string) {
    return this.http.get(`${this.basePath}${this.transactioninvoice}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    });
  }

  Manualpaytransaction(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.transactionmanualpay}${id}`, model, this.options)
  }

  Manuvaltranswithoutotp(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.transmanuvalpaywithoutOTP}${id}`, model, this.options)
  }

  transactiondue(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.transactiondues}${id}`, model, this.options)
  }

  CustomerReceipt(id: any) {
    return this.http.get(`${this.basePath}${this.customerreceipt}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    });
  }

  // Customer Dues update

  Updatecustomerdues(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.custransamountupdate}${id}`, model, this.options)
  }


  updatedduesdetailsbyid(id: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.customerupdatebyid}${id}/${id2}/${id3}`, this.options)
  }

  updatedduesbymerchantid(id: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.Customedueslogbyid}${id}/${id2}/${id3}`, this.options)
  }

  CustomerDuesAuditLogs(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.customerduessearch}${id}/${id1}/${id2}/${id3}`, this.options)
  }

  CustomerDuesAuditLogsGetAll(id: any) {
    return this.http.get(`${this.basePath}${this.customerduelogsgetall}${id}`, this.options)
  }


  //customer setupbox history
  ViewByMerchant(id: any) {
    return this.http.get(`${this.basePath}${this.viewbymerchant}${id}`, this.options)
  }
  ViewByCustomer(id: any) {
    return this.http.get(`${this.basePath}${this.viewebycustomer}${id}`, this.options)
  }
  customersetupboxhistory(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.customersetupboxhistorys}${id}/${id1}`, this.options)
  }
  customersetupboxbulkbyId(id: any) {
    return this.http.get(`${this.basePath}${this.customersetupboxbulkbyIds}${id}`, this.options)
  }
  customersetupAddBulk(id: any, id1: any, formData: any[]): Promise<any> {
    return lastValueFrom(this.http.post(`${this.basePath}${this.customersetupAddBulks}${id}/${id1}`, formData, this.options))
  }
  Customermerchanttickets(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.custmerchantticket}${id}/${id1}/${id2}`, this.options)
  }
  CustomermerchantticketsExport(id: any) {
    return this.http.get(`${this.basePath}${this.custmerchantticket}${id}`, this.options)
  }

  customerraiseticketupdate(id: any, model: any) {
    return this.http.put(
      `${this.basePath}${this.customerticketraise}${id}`,
      model,
      this.options
    );
  }

  //Dashboard
  dashboardcount(id: any) {
    return this.http.get(`${this.basePath}${this.dashbordcustomercount}${id}`, this.options)
  }
  dashboardcustomersevenday(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardcustomersevendays}${id}`, this.options)
  }
  dashboardcustomerfifteenday(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardcustomerfifteendays}${id}`, this.options)
  }
  dashboardcustomerthirtyday(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardcustomerthirtydays}${id}`, this.options)
  }
  dashboardcustomerlastmonths(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardcustomerlastmonth}${id}`, this.options)
  }
  dashboardcustomerthismonths(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardcustomerthismonth}${id}`, this.options)
  }
  dashboardcustomerstartenddates(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.dashboardcustomerstartenddate}${id}/${id1}/${id2}`, this.options)
  }

  dashbaordcustomerdayTransaction(id: any) {
    return this.http.get(`${this.basePath}${this.dashbaordcustomerdayTransactions}${id}`, this.options)
  }

  dashbaordcustomermobilenumbers(id: any) {
    return this.http.get(`${this.basePath}${this.dashbaordcustomermobilenumber}${id}`, this.options)
  }

  dashboardcustomeroveralls(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardcustomeroverall}${id}`, this.options)
  }
  dashboardcustomersevenamounts(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardcustomersevenamount}${id}`, this.options)
  }

  dashboardthismonthcustomertransactions(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardthismonthcustomertransaction}${id}`, this.options)
  }
  dashboardlastmonthcustomertransactions(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardlastmonthcustomertransaction}${id}`, this.options)
  }
  dashboarddatecustomertransactions(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.dashboarddatecustomertransaction}${id}/${id1}/${id2}`, this.options)
  }
  dashboardpendingemployees(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardpendingemployee}${id}`, this.options)
  }
  dashboardsetupboxallcotes(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardsetupboxallcote}${id}`, this.options)
  }
  dashboardsetupboxfrees(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardsetupboxfree}${id}`, this.options)
  }
  dashboardsetupboxbooking(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardsetupboxbookingstatus}${id}`, this.options)
  }
  

  dashboardsetupboxStatusPagination(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.setupboxstatuspagination}${id}/${id1}/${id2}/${id3}`, this.options)
  }
  
  dashboardsetupboxStatusExport(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.dashboardsetupboxstatus}${id}/${id1}`, this.options)
  }
  dashboardviewactivecustomers(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.dashboardviewactivecustomer}${id}/${id1}`, this.options)
  }
  dashboardviewinactivecustomers(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.dashboardviewinactivecustomer}${id}/${id1}`, this.options)
  }
  dashboardviewpendings(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardviewpending}${id}`, this.options)
  }
  dashboardviewallpendings(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.dashboardviewallpending}${id}/${id1}/${id2}`, this.options)
  }
  dashboardemployeecounts(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardemployeecount}${id}`, this.options)
  }

  dashboardActiveInactiveCustomers(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.activeinactivegetall}${id}/${id1}/${id2}/${id3}`, this.options)
  }
  dashboardbranchmonth(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardbranchmonths}${id}`, this.options)
  }
  dashboardbranchlastmonth(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardbranchlastmonths}${id}`, this.options)
  }
  dashboardbranchcustomerange(id: any,id1:any,id2:any) {
    return this.http.get(`${this.basePath}${this.dashboardbranchcustomeranges}${id}/${id1}/${id2}`, this.options)
  }
  merchantviewactiveinactiveexcels(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.merchantviewactiveinactiveexcel}${id}/${id1}`, this.options)
  }


  dashboardtodayemployees(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardtodayemployee}${id}`, this.options)
  }
  dashboardsevendayemployees(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardsevendayemployee}${id}`, this.options)
  }
  dashboardmonthemployees(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardmonthemployee}${id}`, this.options)
  }
  dashboardticketstatus(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.dashboardticket}${id}/${id1}`, this.options)
  }
  dashbaordonoffstatu(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.dashbaordonoffstatus}${id}/${id1}`, this.options)
  }
  dashbaordyesterdayonoffstatu(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.dashbaordyesterdayonoffstatus}${id}/${id1}`, this.options)
  }
  dashbaordtodayonoffcounts(id: any) {
    return this.http.get(`${this.basePath}${this.dashbaordtodayonoffcount}${id}`, this.options)
  }
  dashbaordyesterdayonoffcounts(id: any) {
    return this.http.get(`${this.basePath}${this.dashbaordyesterdayonoffcount}${id}`, this.options)
  }
  dashbaordduestatusoff(id: any) {
    return this.http.get(`${this.basePath}${this.dashbaordduestatusoffs}${id}`, this.options)
  }
  PlanBouequetAdd(model: any) {
    return this.http.post(`${this.basePath}${this.planbouquetadd}`, model, this.options)
  }


  PlanAlcotAdd(model: any) {
    return this.http.post(`${this.basePath}${this.planalcotadd}`, model, this.options)
  }

  PlanlcopAdd(model: any) {
    return this.http.post(`${this.basePath}${this.planlcopadd}`, model, this.options)
  }
  CustomerPlanStatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.planstatus}${id}`, model, this.options)
  }

  //policyapproval
  PrivacyPolicyUpdate(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.privacypolicyupdate}${id}`, model, this.options)
  }
  TermsPolicyUpdate(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.termspolicyupdate}${id}`, model, this.options)
  }
  DisclaimerPolicyUpdate(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.disclaimerpolicyupdate}${id}`, model, this.options)
  }

  RefundPolicyUpdate(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.refundpolicyupdate}${id}`, model, this.options)
  }

  viewapprovepolicy(id: any) {
    return this.http.get(
      `${this.basePath}${this.approvepolicy}${id}`,
      this.options
    );
  }

  smsmerchants(id: any) {
    return this.http.get(`${this.basePath}${this.smsmerchant}${id}`, this.options)
  }



  customerAddBulk(id: any, id1: any, formData: any[]): Promise<any> {
    return lastValueFrom(this.http.post(`${this.basePath}${this.customeraddBulk}${id}/${id1}`, formData, this.options))
  }

  customerbulkResponse(id: any) {
    return this.http.get(`${this.basePath}${this.customerbulkresponse}${id}`, this.options)
  }

  customerbulkbyId(id: any) {
    return this.http.get(`${this.basePath}${this.customerbulkbyid}${id}`, this.options)
  }
  customersetupboxbulkResponse(id: any) {
    return this.http.get(`${this.basePath}${this.customersetupboxbulkResponses}${id}`, this.options)
  }

  customerbulkViewall(id: any) {
    return this.http.get(`${this.basePath}${this.customerbulkviewall}${id}`, this.options)
  }


  OtherpaymentById(id: any) {
    return this.http.get(`${this.basePath}${this.otherpayviewall}${id}`, this.options)
  }



  OtherMakePayment(model: any) {
    return this.http.post(`${this.basePath}${this.othermakepay}`, model, this.options)
  }
  OtherPaymentCreateOrder(id: any) {
    return this.http.get(`${this.basePath}${this.otherpaycreateorder}${id}`, this.options)
  }

  OtherPaymentInitiateOrder(id: any) {
    return this.http.get(`${this.basePath}${this.otherpayinitiate}${id}`, this.options)
  }
  OtherPaymentSuccessPage(id: any) {
    return this.http.get(`${this.basePath}${this.otherpaySuccess}${id}`, this.options)
  }


  OtherPaymentReciept(id: any) {
    return this.http.get(`${this.basePath}${this.otherpayReciept}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    });
  }


  //Renewal

  viewrenewals(id: any) {
    return this.http.get(`${this.basePath}${this.viewrenewal}${id}`, this.options)
  }

  craeterenewals(model: any) {
    return this.http.put(`${this.basePath}${this.craeterenewal}`, model, this.options)
  }

  renewalinvoices(id: string) {
    return this.http.get(`${this.basePath}${this.renewalinvoice}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    });
  }

  // OTP for Manuvel Payment

  ManuvelPaymentOtp(id: any) {
    return this.http.get(`${this.basePath}${this.getotpforManuvelpayment}${id}`, this.options)
  }


  announcementView(id: any) {
    return this.http.get(`${this.basePath}${this.announcementview}${id}`, this.options)
  }

  AddSetupBoxPlan(model: any) {
    return this.http.post(`${this.basePath}${this.addsetupboxplan}`, model, this.options)
  }




  ViewCustomerBasicInfo(id: any) {
    return this.http.get(`${this.basePath}${this.viewcustomerbasicdetails}${id}`, this.options)
  }


  ViewCustomersSetupBox(id: any) {
    return this.http.get(`${this.basePath}${this.viewSetupboxDetails}${id}`, this.options)
  }

  ViewSetupBoxPlanDetails(id: any) {
    return this.http.get(`${this.basePath}${this.viewsetupboxplan}${id}`, this.options)
  }
  ActiveStatusSetupbox(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.activestatussetupbox}${id}`, model, this.options)
  }

  //SMS
  viewmerchantssms(id: any) {
    return this.http.get(`${this.basePath}${this.viewmerchantsms}${id}`, this.options)
  }
  viewmerchantsmstypes(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.viewmerchantsmstype}${id}/${id1}`, this.options)
  }

  updatemerchantsms(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.updatesmsapproval}${id}`, model, this.options)
  }

  updateactivesstatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.updateactivestatus}${id}`, model, this.options)
  }
  viewsmshistorys(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.viewsmshistory}${id}/${id1}/${id2}`, this.options)
  }
  SmsHitoryExport(id: any) {
    return this.http.get(`${this.basePath}${this.viewsmshistory}${id}`, this.options)
  }

  viewsmsdates(id: any, id1: any, id2: any, id3: any, id4: any) {
    return this.http.get(`${this.basePath}${this.viewsmsdate}${id}/${id1}/${id2}/${id3}/${id4}`, this.options)
  }


  CreateSurveyQuestions(model: any) {
    return this.http.post(`${this.basePath}${this.surveycreate}`, model, this.options)
  }

  SurveyQuestionsViewById(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.surveyviewbyid}${id}/${id1}/${id2}`, this.options)
  }
  SurveyQuestionsviewExport(id: any) {
    return this.http.get(`${this.basePath}${this.surveyviewbyid}${id}`, this.options)
  }



  Surveyactivesstatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.surveyactivestatus}${id}`, model, this.options)
  }
  SurveyQuestionsUpdate(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.surveyquestionsupdate}${id}`, model, this.options)
  }

  AddCustomerResponse(model: any) {
    return this.http.post(`${this.basePath}${this.surveyanswerremarks}`, model, this.options)
  }
  ViewCustomerResponse(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.viewcustomerresponse}${id}/${id1}`, this.options)
  }
  ViewByIdCustomerResponse(id: any) {
    return this.http.get(`${this.basePath}${this.viewbyidcustomerresponse}${id}`, this.options)
  }
  ActiveQuestions(id: any) {
    return this.http.get(`${this.basePath}${this.activequestions}${id}`, this.options)
  }
  ActiveCustomers() {
    return this.http.get(`${this.basePath}${this.activecustomers}`, this.options)
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
  ViewCustomerbyMerchantId(id: any) {
    return this.http.get(`${this.basePath}${this.viewcustomerbymerchantid}${id}`, this.options)
  }

  MaintenanceTransactionsView(id1: any) {
    return this.http.get(`${this.basePath}${this.maintenancetransactionview}${id1}`, this.options)
  }
  RenewalTransactionsView(id1: any) {
    return this.http.get(`${this.basePath}${this.onetimetransactionview}${id1}`, this.options)
  }
  OtherPayTransactionView(id: any) {
    return this.http.get(`${this.basePath}${this.otherpaymentviewbyid}${id}`, this.options)
  }
  CustomerTransactionsView(id1: any) {
    return this.http.get(`${this.basePath}${this.customertransactionview}${id1}`, this.options)
  }


  onetimepaymentinvoice(id: any) {
    return this.http.get(`${this.basePath}${this.onetimeinvoice}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    });
  }

  //search
  OtherPayment(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.otherpayment}${id}/${id1}`, this.options);
  }

  Subscription(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.subscription}${id}/${id1}`, this.options)
  }

  Customeronboard(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.customeronboard}${id}/${id1}`, this.options)
  }
  Customeronboards(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.customeronboards}${id}/${id1}/${id2}`, this.options)
  }




  CustomerTickets(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.customertickets}${id}/${id1}`, this.options)
  }


  CustomerTicketsSearch(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.customertickets}${id}/${id1}/${id2}/${id3}`, this.options)
  }

  ServiceTickets(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.servicetickets}${id}/${id1}`, this.options)
  }

  LcopPlan(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.lcopplan}${id}/${id1}/${id2}/${id3}`, this.options)
  }

  MerchantRole(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.viewrole}${id}/${id1}`, this.options)
  }

  Employeedetails(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.employeedetailssearch}${id}/${id1}`, this.options)
  }

  CustomerPay(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.customerpay}${id}/${id1}`, this.options)
  }

  Customerdue(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.customerpaydue}${id}/${id1}/${id2}/${id3}`, this.options)
  }

  SetupBox(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.setupbox}${id}/${id1}/${id2}/${id3}`, this.options)
  }

  viewbymerchantadminId(id: any) {
    return this.http.get(
      `${this.basePath}${this.viewbymerchantadminid}${id}`,
      this.options
    );
  }
  //Agreement
  viewbyidplans(id: any) {
    return this.http.get(`${this.basePath}${this.viewbyidplan}${id}`, this.options)
  }

  viewagreementdoucments(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.viewagreementdoucment}${id}/${id1}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    });


  }

  AggrementViewbyrefferencenumber(id: any) {
    return this.http.get(`${this.basePath}${this.ViewAggrementbyRefference}${id}`, this.options)
  }

  AgreementSendOtp(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.Agreementsendotp}${id}/${id1}`, this.options)
  }

  AgreemntVerifyOtp(id: any, id1: any, model: any) {
    return this.http.put(`${this.basePath}${this.AgreementVerifyOTP}${id}/${id1}`, model, this.options)
  }

  agreementConcent(model: any) {
    return this.http.post(`${this.basePath}${this.AgreementConcent}`, model, this.options)

  }
  agreemntconcentlocation(model: any) {
    return this.http.post(`${this.basePath}${this.AgreemntConcentLocation}`, model, this.options)
  }

  //offline transaction
  OfflineTransactions(model: any) {
    return this.http.post(`${this.basePath}${this.offlinetransactions}`, model, this.options)
  }

  SuccessOffTransaction(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.successofftransactions}${id}/${id1}`, this.options)
  }

  FailureOffTransaction(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.failureofftransactions}${id}/${id1}`, this.options)
  }

  BroadcasterBoucatebyidchannel(id: any) {
    return this.http.get(`${this.basePath}${this.Bouquetsviewbyidchannel}${id}`, this.options)
  }
  //Search for customer dues
  yesterdaysearchs(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.yesterdaysearch}${id}/${id1}/${id2}/${id3}`, this.options)
  }
  todaysearchs(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.todaysearch}${id}/${id1}/${id2}/${id3}`, this.options)
  }
  customsearchs(id: any, id1: any, id2: any, id3: any, id4: any, id5: any) {
    return this.http.get(`${this.basePath}${this.customsearch}${id}/${id1}/${id2}/${id3}/${id4}/${id5}`, this.options)
  }
  customsearchwithStatus(id: any, id1: any, id2: any, id3: any, id4: any, id5: any, id6: any) {
    return this.http.get(`${this.basePath}${this.customsearchwithstatus}${id}/${id1}/${id2}/${id3}/${id4}/${id5}/${id6}`, this.options)
  }
  //pincode

  CreatePincode(id: any, model: any) {
    return this.http.post(`${this.basePath}${this.pincodecreate}${id}`, model, this.options)
  }

  UpdatePincode(model: any) {
    return this.http.put(`${this.basePath}${this.pincodeupdate}`, model, this.options)
  }

  PincodeViewById(id: any) {
    return this.http.get(`${this.basePath}${this.pincodeviewbyid}${id}`, this.options)
  }

  PincodeActiveStatus(id: any, model: any) {

    return this.http.put(`${this.basePath}${this.pincodeactivestatus}${id}`, model, this.options)
  }
  PincodeActiveGetAll() {
    return this.http.get(`${this.basePath}${this.pincodeactivegetall}`, this.options)
  }

  //Area

  AreaCreate(id: any, model: any) {
    return this.http.post(`${this.basePath}${this.areacreate}${id}`, model, this.options)

  }
  UpdateArea(model: any) {
    return this.http.put(`${this.basePath}${this.areaupdate}`, model, this.options)
  }
  AreaActiveStatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.areaactivestatus}${id}`, model, this.options)
  }
  AreaGetAll() {
    return this.http.get(`${this.basePath}${this.areagetall}`, this.options)
  }

  AreaActiveGetAll() {
    return this.http.get(`${this.basePath}${this.areadactivegetall}`, this.options)
  }
  //street

  StreetCreate(id: any, model: any) {
    return this.http.post(`${this.basePath}${this.streetcreate}${id}`, model, this.options)

  }
  UpdateStreet(model: any) {
    return this.http.put(`${this.basePath}${this.streetupdate}`, model, this.options)
  }
  StreetActiveStatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.streetactivestatus}${id}`, model, this.options)
  }
  streetGetAll() {
    return this.http.get(`${this.basePath}${this.streetgetall}`, this.options)
  }

  //Category create

  CreateCategory(model: any) {
    return this.http.post(`${this.basePath}${this.categorycreate}`, model, this.options)
  }

  UpdateCategory(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.categoryupdate}${id}`, model, this.options)
  }

  CategoryActiveStatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.categoryactivestatus}${id}`, model, this.options)
  }

  ViewCategoryByMerchant(id: any) {
    return this.http.get(`${this.basePath}${this.viewcategorybymerchant}${id}`, this.options)
  }

  CategoryGetallActive(id: any) {
    return this.http.get(`${this.basePath}${this.categorygetallactive}${id}`, this.options)
  }

  //Additional payments

  CreateAdditionalPayments(model: any) {
    return this.http.post(`${this.basePath}${this.additionalpaycreate}`, model, this.options)
  }

  UpdateAdditionalPayments(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.additionalpayupdate}${id}`, model, this.options)

  }

  AdditionalPaymentsCustomerTransaction(id: any) {
    return this.http.get(`${this.basePath}${this.additionaltransviewbyid}${id}`, this.options)

  }

  ChecKStatusAdditionalPayments(id: any) {
    return this.http.get(`${this.basePath}${this.additionaltranscheckstatus}${id}`, this.options)

  }

  InvoiceAdditionalPayments(id: any) {
    return this.http.get(`${this.basePath}${this.additionalpayinvoice}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    });
  }

  AdditionalPaymentsViewByMerchant(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.additionalpayviewbyMerchant}${id}/${id1}/${id2}`, this.options)

  }
  AdditionalPaymentsDateFilter(id: any, id1: any, id2: any, id3: any,id4:any) {
    return this.http.get(`${this.basePath}${this.additionalpaydatefilter}${id}/${id1}/${id2}/${id3}/${id4}`, this.options)
  }

  AdditionalPaymentsViewById(id: any) {
    return this.http.get(`${this.basePath}${this.additionalpayviewbyId}${id}`, this.options)
  }

  BranchView(id: any) {
    return this.http.get(`${this.basePath}${this.branchview}${id}`, this.options)
  }


  DuePendingSetupBoxFilter(id: any, model: any) {
    return this.http.post(`${this.basePath}${this.duependingsetupboxfilter}${id}`, model, this.options)

  }

  DuePendingCustomRange(id: any, id1: any, id2: any, model: any) {
    return this.http.post(`${this.basePath}${this.duependingsetupboxcustomrange}${id}/${id1}/${id2}`, model, this.options)

  }

  SetupboxpaymentStatus(id: any, id1: any, id2: any, model: any) {
    return this.http.post(`${this.basePath}${this.SetupboxpayStatus}${id}/${id1}/${id2}`, model, this.options)
  }

  UpdatePaymentStatus(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.Updatepaymentstatus}${id}`, model, this.options)
  }
  filteremployeepayment(id: any, id1: any, id2: any, model: any) {
    return this.http.post(`${this.basePath}${this.filteremployeepayments}${id}/${id1}/${id2}`, model, this.options)

  }

  BranchIndividualView(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.branchindividualview}${id}/${id1}/${id2}`, this.options)
  }

  BranchCustomer(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.branchcustomerget}${id}/${id1}/${id2}`, this.options)
  }
  BranchCustomerExport(id: any) {
    return this.http.get(`${this.basePath}${this.branchcustomerget}${id}`, this.options)
  }

  UnblockAdmin(id: any, model: any) {
    return this.http.put(`${this.basePath}${this.unblockadmin}${id}`, model, this.options)
  }
  PaidUnPaidCustomRangeFilter(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.paidcustrangefilter}${id}/${id1}/${id2}/${id3}`, this.options)
  }
  //filter

  CustomerFilterByMso(id: any, id1: any, id2: any, model: any) {
    return this.http.post(`${this.basePath}${this.customermsofilter}${id}/${id1}/${id2}`, model, this.options)

  }
  CustomerFilterBySetTopBox(id: any, id1: any, id2: any, model: any) {
    return this.http.post(`${this.basePath}${this.customersettopboxfilter}${id}/${id1}/${id2}`, model, this.options)

  }
  ChannelsList(id: any) {
    return this.http.get(`${this.basePath}${this.channelslist}${id}`, this.options)

  }
  //Route
  customerrouteAddBulk(id: any, id1: any, formData: any[]) {
    return this.http.post(`${this.basePath}${this.customerrouteAddBulks}${id}/${id1}`, formData, this.options)
  }

  routebulkuploadresponse(id: any) {
    return this.http.get(`${this.basePath}${this.routebulkuploadresponses}${id}`, this.options)
  }
  routebulkuploadById(id: any) {
    return this.http.get(`${this.basePath}${this.routebulkuploadByIds}${id}`, this.options)
  }
  SurveySearch(id: any) {
    return this.http.get(`${this.basePath}${this.surveysearch}${id}`, this.options)
  }
  SurveyQuestionsSearch(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.surveysearch}${id}/${id1}/${id2}/${id3}`, this.options)
  }
  customerhistoryremainders(id: any) {
    return this.http.get(`${this.basePath}${this.customerhistoryremainder}${id}`, this.options)
  }

  customerduestatushistory(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.customerduestatushistorys}${id}/${id1}/${id2}`, this.options)
  }
  BranchSearch(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.branchsearch}${id}/${id1}/${id2}/${id3}`, this.options)
  }
  BranchCustomerSearch(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.branchcustomersearch}${id}/${id1}/${id2}/${id3}`, this.options)
  }
  Damagecustomerview(id: any) {
    return this.http.get(`${this.basePath}${this.damagecustomerview}${id}`, this.options)

  }
  RefundForMerchantView(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.refundformerchant}${id}/${id1}/${id2}`, this.options)

  }
  RefundForMerchantsearch(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.refundsearch}${id}/${id1}/${id2}/${id3}`, this.options)

  }
  RefundForCustomerView(id: any) {
    return this.http.get(`${this.basePath}${this.refundforcustomer}${id}`, this.options)
  }
  RefundForCustomersearch(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.refundcustomersearch}${id}/${id1}`, this.options)
  }

  DueCancelledGetAll(id: any) {
    return this.http.get(`${this.basePath}${this.duecancelled}${id}`, this.options)
  }
  DuecancelCustomrange(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.duecancelcustomrange}${id}/${id1}/${id2}`, this.options)
  }
  RefundMerchantGetAll(id: any) {
    return this.http.get(`${this.basePath}${this.refundmerchantgetall}${id}`, this.options)

  }
  dashboardviewallpendingsExport(id: any) {
    return this.http.get(`${this.basePath}${this.dashboardviewallpendingexport}${id}`, this.options)
  }
  DuePendingdashboardsearch(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.duependingdashboardsearch}${id}/${id1}/${id2}/${id3}`, this.options)

  }
  AdditionalTransSearch(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.additionaltranssearch}${id}/${id1}/${id2}/${id3}`, this.options)

  }
  customerduestatushistorySearch(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.customerduestatushistorysearch}${id}/${id1}/${id2}/${id3}`, this.options)
  }
  SMShistorySearch(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.smshistorysearch}${id}/${id1}/${id2}/${id3}`, this.options)

  }
  ChannelConfigurationSearch(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.channelsearch}${id}/${id1}/${id2}`, this.options)

  }
  CustomerActiveSearch(id: any, id1: any, id2: any, id3: any, id4: any) {
    return this.http.get(`${this.basePath}${this.activeinactivesearch}${id}/${id1}/${id2}/${id3}/${id4}`, this.options)
  }

  SetupBoxHistory(id: any, id1: any, id2: any) {
    return this.http.get(`${this.basePath}${this.Setupboxhistory}${id}/${id1}/${id2}`, this.options)
  }
  dashboardactiveinactiveexport(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.activeinactiveexport}${id}/${id1}`, this.options)
  }
  DueStatusHistoryexport(id: any) {
    return this.http.get(`${this.basePath}${this.duestatushistoryexport}${id}`, this.options)
  }
  Additionaltransexport(id: any) {
    return this.http.get(`${this.basePath}${this.additionaltransexport}${id}`, this.options)
  }
  Customerduessearch(id: any, id1: any, id2: any, id3: any) {
    return this.http.get(`${this.basePath}${this.customerduesearch}${id}/${id1}/${id2}/${id3}`, this.options)
  }
  CustomerActiveInactiveStatusHIstory(id: any) {
    return this.http.get(`${this.basePath}${this.customeractivestatushistory}${id}`, this.options)
  }
  OnlineRfundsDateFilter(id: any, id1: any, id2: any, id3: any, id4: any) {
    return this.http.get(`${this.basePath}${this.onlinerefunddatefilter}${id}/${id1}/${id2}/${id3}/${id4}`, this.options)
  }
  viewlcopid(id: any) {
    return this.http.get(
      `${this.basePath}${this.viewlcopids}${id}`,
      this.options
    );
  }

  CustomerQtsAnsSearch(id: any, id1: any) {
    return this.http.get(`${this.basePath}${this.surveyqtAnssearch}${id}/${id1}`, this.options)
  }

  CustomerMSOSearch(id: any, model: any) {
    return this.http.post(`${this.basePath}${this.customersearchmso}${id}`, model, this.options)
  }
  CustomerMerchantSearch(id: any, model: any) {
    return this.http.post(`${this.basePath}${this.customermerchantsearch}${id}`, model, this.options)
  }
  SetupboxDashboardSearch(id: any, id1: any, id2: any, id3: any, id4: any) {
    return this.http.get(`${this.basePath}${this.dashboardsetupboxsearch}${id}/${id1}/${id2}/${id3}/${id4}`, this.options)
  }
  paidipaddres() {
    return this.http.get(`${this.paidipaddress}`)
  }
  abstarctipadd() {
    return this.http.get(`${this.abstarctipaddress}`)
  }

}

