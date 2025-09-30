import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-branch-individualview',
  templateUrl: './branch-individualview.component.html',
  styleUrl: './branch-individualview.component.css'
})
export class BranchIndividualviewComponent {
  id: any;
  detaislone: any;
  copySuccess: boolean = false;
  copySuccesss: boolean = false;
  valueonboardadd: any;
  getdashboard: any[] = [];
  apikey: any;
  actions: any;
  errorMessage: any;
  secretkey: any;
  accountid: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.id = this.data.value
    this.apikey = this.data.value.apiKey
    this.secretkey = this.data.value.secretKey
    this.accountid = this.data.value.accountId
  }

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