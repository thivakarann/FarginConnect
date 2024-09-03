import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { RegionEdit } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-region-edit',
  templateUrl: './region-edit.component.html',
  styleUrl: './region-edit.component.css'
})
export class RegionEditComponent implements OnInit {

  regionedit: any = FormGroup;
  regionId: any;
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  categorys: any;
  mccCodes: any;
  regiongetactive: any;
  dataSource: any;
  sort: any;
  paginator: any;
  showcategoryData: boolean = false;
  errorMsg: any;
  stateNames: any;
  serviceIds: any;


  constructor(private fb: FormBuilder, private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.regionId = data.value.regionId;
    console.log(this.regionId)
  }



  ngOnInit(): void {

    this.regionedit = new FormGroup({
      serviceId: new FormControl('', [Validators.required]),
      stateName: new FormControl('', [Validators.required]),
      regionId: new FormControl(''),
    });


    this.service.RegionGetAllActive().subscribe((res: any) => {
      if (res.flag == 1) {
        this.regiongetactive = res.response;
        this.regiongetactive.reverse();
        this.dataSource = new MatTableDataSource(this.regiongetactive);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.showcategoryData = false;
        // console.log(this.businesscategory) 
      }
      else {
        this.errorMsg = res.responseMessage;
        this.showcategoryData = true;
      }
    });




    this.serviceIds = this.data.value.service.serviceId
    this.regionedit.controls['serviceId'].value = this.serviceIds

    this.stateNames = this.data.value.stateName
    this.regionedit.controls['stateName'].value = this.stateNames

  }




  get serviceId() {
    return this.regionedit.get('serviceId');
  }

  get stateName() {
    return this.regionedit.get('stateName');
  }

  Editsubmit() {

    let submitModel: RegionEdit = {
      serviceId: this.serviceId.value,
      regionId: this.regionId,
      stateName: this.stateName.value
    }

    this.service.RegionEdit(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        window.location.reload()
      } else {
        this.toastr.warning(res.responseMessage)
      }
    })
  }

}



