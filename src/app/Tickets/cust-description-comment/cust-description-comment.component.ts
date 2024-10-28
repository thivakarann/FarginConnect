import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-cust-description-comment',
  templateUrl: './cust-description-comment.component.html',
  styleUrl: './cust-description-comment.component.css'
})
export class CustDescriptionCommentComponent implements OnInit{
  content: any;
  title: any;

  constructor(private service: FarginServiceService, private toastr: ToastrService,
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
