import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RegionAdd } from '../../../fargin-model/fargin-model.module';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-region-add',
  templateUrl: './region-add.component.html',
  styleUrl: './region-add.component.css'
})
export class RegionAddComponent implements OnInit {

  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  @ViewChild('select') select: any = MatSelect;
  allSelected = false;
 
  regioncreate: any = FormGroup;
  regiongetactive: any;
  responseDataListnew: any = [];
  response: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: any;
  dataSource: any;
  showcategoryData: boolean = false;
  errorMsg: any;
  activeservice: any;
  selectedStates: string[] = [];
  states: any = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
    'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttarakhand',
    'Uttar Pradesh', 'West Bengal'
  ];
 
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder, private router: Router) { }
 
 
  ngOnInit(): void {
 
    this.service.activeprovider().subscribe((res: any) => {
      this.activeservice = res.response;
    });
 
 
 
    this.regioncreate = new FormGroup({
      serviceId: new FormControl('', [Validators.required]),
      stateName: new FormControl('', [Validators.required]),
    });
 
   
 
  }
 
 
  get serviceId() {
    return this.regioncreate.get('serviceId');
  }
 
  get stateName() {
    return this.regioncreate.get('stateName');
  }
 
 
  close() {
    this.router.navigateByUrl('dashboard/Region');
  }
 
 
  RegionCreate() {
    const submitModel = this.selectedStates.map(stateName => ({
      stateName: stateName, // Use the state name directly
      createdBy: this.getadminname, // Keep createdBy as is
      serviceId: this.serviceId.value // Adjust if you have different logic for serviceId
  }));
 
    this.service.RegionCreate(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
 
        this.toastr.success(res.responseMessage)
        window.location.reload()
 
      }
      else {
        this.toastr.error(res.responseMessage);
        this.dialog.closeAll()
      }
 
    });
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }
}
