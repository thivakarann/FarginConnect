import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { postsetupbox, remainderstatus } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-remainderstatus',
  templateUrl: './remainderstatus.component.html',
  styleUrl: './remainderstatus.component.css'
})
export class RemainderstatusComponent {
  remainderformGroup: any = FormGroup;
  boxnumber: any;
  entityname: any = localStorage.getItem('entityname')
  serviceValue: any;
  regionValue: any;
  serviceIds: any;
  merchantId: any = localStorage.getItem('merchantId')
  stdid: any;
  datecheck: any


  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.stdid = this.data.value

    this.remainderformGroup = this.fb.group({
      method: ['', Validators.required],
      description: ['', Validators.required],
      activateddate: [''],
      inactivateddate: [''],
    });

  


  }
  reaminders(value:any)
  {
    this.datecheck=value.target.value;
  }
  viewserviceID(id: any) {
    this.serviceIds = id;

    this.service.regionViewByid(this.serviceIds).subscribe((res: any) => {
      this.regionValue = res.response;

    })
  }

  get method() {
    return this.remainderformGroup.get('method')
  }

  get description() {
    return this.remainderformGroup.get('description')
  }

  get activateddate() {
    return this.remainderformGroup.get('activateddate')
  }
  get inactivateddate() {
    return this.remainderformGroup.get('inactivateddate')
  }

  submit() {
    let submitModel: remainderstatus = {
      dueMethod: this.method?.value,
      activatedDate: this.activateddate?.value,
      inactivatedDate: this.inactivateddate?.value,
      description: this.description?.value,
      // merchantId: this.merchantId

    }
    this.service.createremainders(this.stdid ,submitModel).subscribe((res: any) => {
      this.boxnumber = res.response;

      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()

      }
      else {
        this.toastr.error(res.responseMessage)
        this.dialog.closeAll()
  
      }
    })
  }
}
