import { Component, Inject } from '@angular/core';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-branchkyc-commets',
  templateUrl: './branchkyc-commets.component.html',
  styleUrl: './branchkyc-commets.component.css'
})
export class BranchkycCommetsComponent {
  remarks: any;
 
 
  constructor(private service:FarginServiceService,@Inject(MAT_DIALOG_DATA) public data:any){
 
  }
  ngOnInit(): void {
    this.remarks = this.data.value
    
  }
}
