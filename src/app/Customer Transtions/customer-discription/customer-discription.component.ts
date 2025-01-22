import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-discription',
  templateUrl: './customer-discription.component.html',
  styleUrl: './customer-discription.component.css'
})
export class CustomerDiscriptionComponent implements OnInit{
  content: any;
  title: any;
 
  constructor( private toastr: ToastrService,
     private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
 
  ngOnInit(): void {
 
    this.content=this.data.value
    
   
    this.title=this.data.Title
    
 
  }
 
  back(){
    this.dialog.closeAll()
  }
 
}


