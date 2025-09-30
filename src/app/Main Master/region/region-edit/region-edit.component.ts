import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { RegionEdit } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-region-edit',
  templateUrl: './region-edit.component.html',
  styleUrl: './region-edit.component.css',
})
export class RegionEditComponent implements OnInit {
  regionedit: any = FormGroup;
  regionId: any;
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  categorys: any;
  mccCodes: any;
  regiongetactive: any;
  dataSource: any;
  sort: any;
  paginator: any;
  showcategoryData: boolean = false;
  errorMsg: any;
  stateNames: any;
  activeservice: any;
  details: any;
  serviceid: any;
  Regionid: any;
  statename: any;
  Serviceid: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private service: FarginServiceService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.details = this.data.value;
    this.Serviceid = this.data.value.service.serviceId;
    this.Regionid = this.data.value.regionId;
    this.statename = this.data.value.stateName;

    this.service.activeprovider().subscribe((res: any) => {
      this.activeservice = res.response;
    });

    this.regionedit = new FormGroup({
      stateName: new FormControl('', Validators.required),
      serviceId: new FormControl('', Validators.required),
    });
  }

  get serviceId() {
    return this.regionedit.get('serviceId');
  }

  get stateName() {
    return this.regionedit.get('stateName');
  }

  Editsubmit() {
    let submitModel: RegionEdit = {
      serviceId: this.serviceId?.value,
      regionId: this.Regionid,
      stateName: this.stateName?.value,
      modifiedBy: this.getadminname,
    };
    this.service.RegionEdit(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
}
