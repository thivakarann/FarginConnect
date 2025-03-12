import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustServiceService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  // private readonly basePath = 'https://staging-api.farginconnect.com/';  // Staging Basepath

  // private readonly basePath ='https://api.fargin.in/';    // production Build Api

  private readonly basePath = 'https://dev-api.farginconnect.com/';    // Dev Server    
  
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

  //Terms & Policy
  private readonly viewterms = 'policy/getpolicybymerchant/';

  //tickets
  private readonly customerTicket = 'customerTickets/create';
  private readonly customerTicketget = 'customerTickets/viewTicket/';
  private readonly customerticketdrop = 'customer/viewmobileMerchants/';
  private readonly customermerchantedit = 'customerTickets/updateticket';

  //policies 
  private readonly customerpolicies = 'policy/getAllPolicy';

  //mobile verify
  private readonly mobile = 'customer/getcustomer/';
  private readonly MobileOTP = 'customer/verifyotp';
  private readonly MobileresendOTP = 'customer/resendotp'

  private readonly customerreceipt = 'customerpay/viewReceipt/';//receipt

  //ticket customer
  private readonly custmerchantticket = 'customerTickets/getall/';

  //customer logo
  private readonly customerlogo = 'customerTickets/updatedocument';
  private readonly customerlogoview = 'customerTickets/viewimage/';

  //customer survey
  private readonly customersurvey = 'customerResponse/customerResponse/';


//additional payment
private readonly CustomerPaymentDetailAd = 'customerotherpayment/customermobilepay/';
private readonly CustomerPaymentDetailsview = 'customerotherpayment/customerTransactions/';
private readonly Additionalpaymentmakepay = 'customerotherpayment/makepayment';
private readonly AdditionalpayCreateOrder = 'customerotherpayment/createorder/';
private readonly AdditionalpayInitiate = 'customerotherpayment/checkrequest/';
private readonly Additionalpayviewinfo = 'customerotherpayment/viewbyid/';
private readonly Additionalpaysuccess = 'customerotherpayment/viewbytrackid/';
private readonly Additionalpayreceipt = 'customerotherpayment/viewinvoice/';//receipt


  loginError = new Subject();

  gettoken = localStorage.getItem('tokens');

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    X_ACCESS_TOKEN: `Bearer ${this.gettoken ? JSON.parse(localStorage.getItem('tokens') || '') : null
      }`,
  });

  headersMultipart = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    X_ACCESS_TOKEN: `Bearer ${this.gettoken ? JSON.parse(localStorage.getItem('tokens') || '') : null
      }`,
  });
  options = { headers: this.headers };
  optionsMultipart = { headers: this.headersMultipart };




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

  CustomerAPIKeys() {
    return this.http.get(`${this.basePath}${this.PaymentKeys}`, this.options)
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
  //tickets
  CustomerTicket(FormData: FormData) {
    return this.http.post(`${this.basePath}${this.customerTicket}`, FormData, this.optionsMultipart)
  }

  CustomerTicketget(id: any) {
    return this.http.get(`${this.basePath}${this.customerTicketget}${id}`, this.options)
  }

  CustomerPolicies() {
    return this.http.get(`${this.basePath}${this.customerpolicies}`)
  }

  Mobileverify(id: any) {
    return this.http.get(`${this.basePath}${this.mobile}${id}`)
  }

  mobileotp(Model: any) {
    return this.http.post(`${this.basePath}${this.MobileOTP}`, Model, this.options)
  }

  mobileresendotp(model: any) {
    return this.http.post(`${this, this.basePath}${this.MobileresendOTP}`, model, this.options)
  }

  //Terms and policy method
  viewterm(id: any) {
    return this.http.get(
      `${this.basePath}${this.viewterms}${id}`,
      this.options
    );
  }

  CustomerReceipt(id: any) {
    return this.http.get(`${this.basePath}${this.customerreceipt}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    });
  }

  //ticketdropdown
  ticketcustomerdrop(id: any) {
    return this.http.get(
      `${this.basePath}${this.customerticketdrop}${id}`,
      this.options
    );
  }

  Customermerchanttickets(id: any) {
    return this.http.get(`${this.basePath}${this.custmerchantticket}${id}`, this.options)
  }


  editcustomerticket(model: any) {
    return this.http.put(
      `${this.basePath}${this.customermerchantedit}`,
      model,
      this.options
    );
  }

  EntitylogoUpdate(data: FormData) {
    return this.http.put(`${this.basePath}${this.customerlogo}`, data, this.optionsMultipart);
  }

  Entitylogoview(id: string) {
    return this.http.get(`${this.basePath}${this.customerlogoview}${id}`, {
      ...this.options,
      ...{ responseType: 'blob' },
    });
  }

  Customersurvey(id: any) {
    return this.http.get(`${this.basePath}${this.customersurvey}${id}`, this.options)
  }


    //Additional payment
    CustomerPaymentsdetail(id: any) {
      return this.http.get(`${this.basePath}${this.CustomerPaymentDetailAd}${id}`, this.options)
    }
   
    CustomerPaymentsDetailView(id: any) {
      return this.http.get(`${this.basePath}${this.CustomerPaymentDetailsview}${id}`, this.options)
    }
   
    AdditionalPaymentMakepayment(model: any) {
      return this.http.post(`${this.basePath}${this.Additionalpaymentmakepay}`,model, this.options)
    }
   
    AdditionalPaymentCreateOrder(id: any) {
      return this.http.get(`${this.basePath}${this.AdditionalpayCreateOrder}${id}`, this.options)
    }
   
    AdditionalPaymentInitiate(id: any) {
      return this.http.get(`${this.basePath}${this.AdditionalpayInitiate}${id}`, this.options)
    }
   
    AdditionalPaymentcustomerview(id: any) {
      return this.http.get(`${this.basePath}${this.Additionalpayviewinfo}${id}`, this.options)
    }
   
    AdditionalPaymentsuccessfail(id: any) {
      return this.http.get(`${this.basePath}${this.Additionalpaysuccess}${id}`, this.options)
    }
   
    AdditionalPaymentReciept(id: any) {
      return this.http.get(`${this.basePath}${this.Additionalpayreceipt}${id}`, {
        ...this.options,
        ...{ responseType: 'blob' },
      });
    }
   
    //Additional payment  --

}
