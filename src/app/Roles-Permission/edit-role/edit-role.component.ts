import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css'
})
export class EditRoleComponent implements OnInit {
 
  addcategory:any=FormGroup;
  createdBy = JSON.parse(localStorage.getItem('adminname') || '');
  categoryName:any;
  subPermission:any;
  permission:any;
  @ViewChild('select') select:any= MatSelect;
  @ViewChild('selects') selects:any= MatSelect;
  allSelected=false;
  allSelected1=false;
  constructor(private service: FarginServiceService, private toastr: ToastrService,
    private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
 ) { }

  ngOnInit(): void {
console.log(this.data.value);

  }
  submit(){
    
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  toggleAllSelection1() {
    if (this.allSelected1) {
      this.selects.options.forEach((item: MatOption) => item.select());
    } else {
      this.selects.options.forEach((item: MatOption) => item.deselect());
    }
  }
}
