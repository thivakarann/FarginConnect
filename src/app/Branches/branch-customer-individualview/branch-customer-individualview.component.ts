import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-branch-customer-individualview',
  templateUrl: './branch-customer-individualview.component.html',
  styleUrl: './branch-customer-individualview.component.css'
})
export class BranchCustomerIndividualviewComponent {
  id: any;
  detaislone: any;
  copySuccess: boolean = false;
  copySuccesss: boolean = false;
  valueonboardadd: any;
  getdashboard: any[] = [];
  apikey:any;
  actions: any;
  errorMessage: any;
  secretkey:any;
  accountid:any;
  id1:any;

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private service: FarginServiceService) {

  }
  ngOnInit(): void {


    this.id = this.data.value
    this.id1 = this.data.value1
    console.log(this.id1)
  console.log(this.id)    


  console.log(this.apikey)
  this.secretkey=this.data.value.secretKey
  this.accountid=this.data.value.accountId
  console.log(this.accountid)

  }
  // editKeys(id: any) {
  //   this.dialog.open(KeysUpdateComponent, {
  //     enterAnimationDuration: "1000ms",
  //     exitAnimationDuration: "1000ms",

  //     disableClose: true,
  //     data: {
  //       value: id,
  //     }
  //   })

  // }

  copyText(text: string) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copySuccess = true;
    setTimeout(() => this.copySuccess = false, 2000);
  }

  copyText1(text: string) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copySuccesss = true;
    setTimeout(() => this.copySuccess = false, 2000);
  }
}
