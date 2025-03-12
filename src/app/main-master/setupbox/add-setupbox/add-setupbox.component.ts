import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { postsetupbox, roles } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { LanguageService } from '../../../Language service/language-service.service';

@Component({
  selector: 'app-add-setupbox',
  templateUrl: './add-setupbox.component.html',
  styleUrl: './add-setupbox.component.css'
})
export class AddSetupboxComponent implements OnInit {
  setupformGroup: any = FormGroup;
  boxnumber: any;
  entityname: any = localStorage.getItem('entityname')
  serviceValue: any;
  regionValue: any;
  serviceIds: any;
  merchantId: any = localStorage.getItem('merchantId')
  currentLanguageSubscription!: Subscription; 
  currentLanguage!: string;


  constructor(private languageService: LanguageService, private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder,) { }
  ngOnInit(): void {
    this.setupformGroup = this.fb.group({
      setupBoxNumber: ['', [Validators.required]],
      serviceId: ['', Validators.required],
      regionId: ['', Validators.required]
    });

    this.service.serviceactive().subscribe((res: any) => {
      this.serviceValue = res.response;

    });

    this.currentLanguageSubscription = this.languageService.language.subscribe(lang => { this.currentLanguage = lang; 
      console.log("sdnbdc"+ this.currentLanguageSubscription)
    });
    


  }

  ngOnDestroy() { this.currentLanguageSubscription.unsubscribe(); }

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
    let submitModel: postsetupbox = {
      setupBoxNumber: this.setupBoxNumber.value.trim(),
      createdBy: this.entityname,
      regionId: this.regionId.value,
      serviceId: this.serviceId.value,
      merchantId: this.merchantId

    }
    this.service.setupboxCreate(submitModel).subscribe((res: any) => {
      this.boxnumber = res.response;

      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }

}
