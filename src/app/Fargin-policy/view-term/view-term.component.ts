import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-view-term',
  templateUrl: './view-term.component.html',
  styleUrl: './view-term.component.css'
})
export class ViewTermComponent implements OnInit {
  termAndConditionValue: any;
  constructor(private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any,) { }
  ngOnInit(): void {
    this.termAndConditionValue = this.data.value.termAndCondition
  }

}
