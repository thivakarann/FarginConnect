import { Component, Inject, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-kyc-comments',
  templateUrl: './kyc-comments.component.html',
  styleUrl: './kyc-comments.component.css'
})
export class KycCommentsComponent implements OnInit {
  remarks: any;


  constructor(private service:FarginServiceService,@Inject(MAT_DIALOG_DATA) public data:any){

  }
  ngOnInit(): void {
    this.remarks = this.data.value
    console.log(this.remarks);
  }

}
