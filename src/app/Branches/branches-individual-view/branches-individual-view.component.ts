import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-branches-individual-view',
  templateUrl: './branches-individual-view.component.html',
  styleUrl: './branches-individual-view.component.css'
})
export class BranchesIndividualViewComponent {
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

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private service: FarginServiceService) {

  }
  ngOnInit(): void {


    this.id = this.data.value
  console.log(this.id)    
  this.apikey=this.data.value.apiKey
  this.secretkey=this.data.value.secretKey
  this.accountid=this.data.value.accountId

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
