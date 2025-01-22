import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { updatesetupbox } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-edit-setupbox',
  templateUrl: './edit-setupbox.component.html',
  styleUrl: './edit-setupbox.component.css'
})
export class EditSetupboxComponent {
  setupformGroup: any = FormGroup;
  viewData: any;
  entityname: any = localStorage.getItem('entityname')
  boxnumber: any;
  setupid: any;
  regionactive: any;
  regionValue: any;
  serviceIds: any;
  serviceValue: any;

  constructor(private dialog: MatDialog, private service: FarginServiceService,
    private toastr: ToastrService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {


    this.viewData = this.data.value
    

    this.setupid = this.data.value.stbId

    


    this.setupformGroup = this.fb.group({
      setupBoxNumber: ['', Validators.required],
      serviceId: ['', Validators.required],
      regionId: ['', Validators.required]
    })
    this.service.serviceactive().subscribe((res: any) => {
      this.serviceValue = res.response;
      
    });

  }

  viewserviceID(id: any) {
    this.serviceIds = id;
    
    this.service.regionViewByid(this.serviceIds).subscribe((res: any) => {
      this.regionValue = res.response;
      
    })
  }

  get setupBoxNumber() {
    return this.setupformGroup.get('setupBoxNumber')
  }

  get serviceId() {
    return this.setupformGroup.get('serviceId')
  }

  get regionId() {
    return this.setupformGroup.get('regionId')
  }

  submit() {
    let submitModel: updatesetupbox = {
      setupBoxNumber: this.setupBoxNumber.value.trim(),
      modifiedBy: this.entityname,
      stbId: this.setupid,
      regionId: this.regionId.value,
      serviceId: this.serviceId.value
    }
    this.service.setupboxEdit(submitModel).subscribe((res: any) => {
      this.boxnumber = res.response;
      
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()
     
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }

  close(){
    this.dialog.closeAll()
  }
}
