import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith, pairwise, filter } from 'rxjs/operators';
import { UpdateWhatappService } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-updatewhatsapp-service',
  templateUrl: './updatewhatsapp-service.component.html',
  styleUrl: './updatewhatsapp-service.component.css'
})
export class UpdatewhatsappServiceComponent implements OnInit {
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Vendors: any;
  myForm!: FormGroup;
  TemplateDetails: any;
  noDataFound = false;

  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {

    this.service.WhatAPPVendors().subscribe((res: any) => {
      this.Vendors = res.response;
    });

    console.log("data?.value?.whatsappTemplateId" + this.data?.value?.whatsappTemplateId)

    this.myForm = new FormGroup({
      vendorId: new FormControl(null, [Validators.required]),
      smsCharge: new FormControl(null, [Validators.required]),
      templateType: new FormControl(null, [Validators.required]),
      tempLanguage: new FormControl(null, [Validators.required]),
      whatsappTemplateId: new FormControl(this.data?.value?.whatsappTemplateId || null, [Validators.required]),
    });

    this.myForm.valueChanges.pipe(
      map(val => ({
        vendorId: val.vendorId,
        templateType: val.templateType,
        tempLanguage: val.tempLanguage
      })),
      startWith({ vendorId: null, templateType: null, tempLanguage: null }),
      pairwise(),
      filter(([prev, curr]) =>
      (prev.vendorId !== curr.vendorId ||
        prev.templateType !== curr.templateType ||
        prev.tempLanguage !== curr.tempLanguage)
      ),
      filter(([_, curr]) =>
        curr.vendorId && curr.templateType && curr.tempLanguage
      )
    ).subscribe(() => {
      const { vendorId, templateType, tempLanguage } = this.myForm.value;
      this.GetMessageTemplate(vendorId, templateType, tempLanguage);
    });
  }

  get vendorId() {
    return this.myForm.get('vendorId');
  }
  get smsCharge() {
    return this.myForm.get('smsCharge');
  }
  get templateType() {
    return this.myForm.get('templateType');
  }
  get tempLanguage() {
    return this.myForm.get('tempLanguage');
  }
  get whatsappTemplateId() {
    return this.myForm.get('whatsappTemplateId');
  };

  GetMessageTemplate(vendorId: any, templateType: string, tempLanguage: string) {
    this.service.MerchantwiseWhatappTemplates(this.data.value2, vendorId, templateType, tempLanguage)
      .subscribe((res: any) => {
        if (res.flag === 1 && res.response?.length > 0) {
          this.TemplateDetails = res.response;

          // Only clear selection if the current value is not in the new list
          const currentId = this.myForm.value.whatsappTemplateId;
          const exists = this.TemplateDetails.some((t: { whatsappTemplateId: any; }) => t.whatsappTemplateId === currentId);

          if (!exists) {
            this.myForm.patchValue({ whatsappTemplateId: null });
          }

          this.noDataFound = false;
        } else {
          this.TemplateDetails = [];
          this.myForm.patchValue({ whatsappTemplateId: null });
          this.noDataFound = true;
        }
      });
  }


  Update() {
    const selectedId = this.myForm.get('whatsappTemplateId')?.value;
    const selectedTemplate = this.TemplateDetails.find((t: { whatsappTemplateId: any; }) => t.whatsappTemplateId === selectedId);

    let submitModel: UpdateWhatappService = {
      merchantWhatsAppId: this.data?.value?.merchantWhatsAppId,
      vendorId: this.vendorId?.value,
      smsCharge: this.smsCharge?.value,
      whatsappTemplateId: selectedId,
      templateDescription: selectedTemplate?.templateDescription,
      templateLanguage: this.tempLanguage?.value,
      smsEnableStatus: this.data?.value?.smsEnableStatus,
      modifiedBy: this.getadminname
    }

    this.service.UpdateMerchatWhatappService(submitModel).subscribe((res: any) => {
      if (res.flag === 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
      }
    })

  }
}
