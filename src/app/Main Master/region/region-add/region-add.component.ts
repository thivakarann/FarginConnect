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

@Component({
  selector: 'app-region-add',
  templateUrl: './region-add.component.html',
  styleUrl: './region-add.component.css'
})
export class RegionAddComponent implements OnInit {

  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');

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
    let submitModel: RegionAdd = {
      serviceId: this.serviceId.value,
      stateName: this.stateName.value
    };

    this.service.RegionCreate(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {

        this.toastr.success(res.responseMessage)
        window.location.reload()

      }
      else {
        this.toastr.warning(res.responseMessage);
        this.dialog.closeAll()
      }

    });
  }
}