import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, map, observable } from 'rxjs';
import { SessionServiceService } from '../Session service/session-service.service';

@Injectable({
  providedIn: 'root'
})
export class FarginServiceService {

  constructor(private http: HttpClient,
    private router: Router, private timerService: SessionServiceService) { }

  private readonly basePath = 'http://64.227.149.125:8085/'; //Basepath

  // login
  private readonly adminlogin = 'adminUser/adminlogin';



  // Entityonboard

  private readonly Entityviewall = 'merchant/getall';
  private readonly Entityadd = 'merchant/create';
  private readonly EntityBankcreation = 'merchantbank/create';
  private readonly Entitybyid = 'merchant/getmerchants/'





  // BussinessCategory

  private readonly GetactiveBussiness = 'businesscategory/getallactive'






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

        location.href = '/dashboard';
      }
      else {
        this.loginError.next(res.responseMessage);

      }

    });
  }


  EntityViewall() {
    return this.http.get(`${this.basePath}${this.Entityviewall}`, this.options)
  }

  EntityAdd(model:any){
    return this.http.post(`${this.basePath}${this.Entityadd}`,model,this.options)
  }

  EntityBank(model:any){
    return this.http.post(`${this.basePath}${this.EntityBankcreation}`,model,this.options)
  }

  EntityByid(id:any){
    return this.http.get(`${this.basePath}${this.Entitybyid}${id}`,this.options)
  }




  Bussinesscategoryactivelist() {
    return this.http.get(`${this.basePath}${this.GetactiveBussiness}`, this.options)
  }




}
