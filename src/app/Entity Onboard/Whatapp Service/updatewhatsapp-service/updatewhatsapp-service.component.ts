import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { UpdateWhatappService } from '../../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-updatewhatsapp-service',
  templateUrl: './updatewhatsapp-service.component.html',
  styleUrl: './updatewhatsapp-service.component.css'
})
export class UpdatewhatsappServiceComponent implements OnInit {
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  Vendors: any;
  myForm!: FormGroup;
  TemplateDetails: any;
  noDataFound = false;
  lanuguage: any;

  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {

    this.service.WhatAPPVendors().subscribe((res: any) => {
      this.Vendors = res.response;
    });

    if (this.data.value.templateLanguage == 'ta') {
      this.lanuguage = 'Tamil';
    }

    else if (this.data.value.templateLanguage == 'en') {
      this.lanuguage = 'English';
    }



    this.myForm = new FormGroup({
      vendorId: new FormControl(null, [Validators.required]),
      smsCharge: new FormControl(null, [Validators.required]),
      templateType: new FormControl(null, [Validators.required]),
      tempLanguage: new FormControl(null, [Validators.required]),
      whatsappTemplateId: new FormControl(this.data?.value?.whatsappTemplateId || null, [Validators.required]),
    });

    this.myForm.patchValue({
      vendorId: this.data?.value?.vendorId,
      smsCharge: this.data?.value?.smsCharge,
      templateType: this.data?.value?.templateType,
      tempLanguage: this.lanuguage,

    });

    const vendorId = this.myForm.get('vendorId')?.value;
    const templateType = this.myForm.get('templateType')?.value;
    const tempLanguage = this.data.value.templateLanguage;

    if (vendorId && templateType && tempLanguage) {
      this.GetMessageTemplate(vendorId, templateType, tempLanguage);
    }

    this.listenToVendorChanges();


    // this.myForm.valueChanges.pipe(
    //   map(val => ({
    //     vendorId: val.vendorId,
    //     templateType: val.templateType,
    //     tempLanguage: val.tempLanguage
    //   })),
    //   startWith({ vendorId: null, templateType: null, tempLanguage: null }),
    //   pairwise(),
    //   filter(([prev, curr]) =>
    //   (prev.vendorId !== curr.vendorId ||
    //     prev.templateType !== curr.templateType ||
    //     prev.tempLanguage !== curr.tempLanguage)
    //   ),
    //   filter(([_, curr]) =>
    //     curr.vendorId && curr.templateType && curr.tempLanguage
    //   )
    // ).subscribe(() => {
    //   const { vendorId, templateType, tempLanguage } = this.myForm.value;
    //   this.GetMessageTemplate(vendorId, templateType, tempLanguage);
    // });
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

  listenToVendorChanges(): void {

    this.myForm.get('vendorId')?.valueChanges
      .pipe(filter(vendorId => !!vendorId))
      .subscribe(vendorId => {

        const templateType = this.myForm.get('templateType')?.value;
        const tempLanguage = this.data.value.templateLanguage;

        if (templateType && tempLanguage) {
          this.TemplateDetails = [];
          this.whatsappTemplateId?.reset();
          this.GetMessageTemplate(vendorId, templateType, tempLanguage);
        }
      });
  }



  GetMessageTemplate(vendorId: any, templateType: any, tempLanguage: any): void {

    this.service.MerchantwiseWhatappTemplates(this.data.value2, vendorId, templateType, tempLanguage)
      .subscribe((res: any) => {
        const currentId = this.myForm.get('whatsappTemplateId')?.value;

        // res.flag === 1 && res.response?.length > 0

        if (res.flag === 1) {
          let templates = res.response;

          const exists = templates.some((t: { whatsappTemplateId: any }) => t.whatsappTemplateId === currentId);

          // ✅ If selected template is missing, prepend it
          if (!exists && currentId) {
            templates = [
              {
                whatsappTemplateId: currentId,
                templateTitle: this.data?.value?.templateTitle || 'Previously selected',
                smsSample: this.data?.value?.smsSample || ''
              },
              ...templates
            ];
          }

          this.TemplateDetails = templates;
          console.log(templates);
          console.log(this.TemplateDetails);


          this.noDataFound = false;
        } else {
          // ✅ No templates returned — show only selected one if exists
          const currentId = this.myForm.get('whatsappTemplateId')?.value;

          this.TemplateDetails = currentId ? [{
            whatsappTemplateId: currentId,
            templateTitle: this.data?.value?.templateTitle || 'Previously selected',
            smsSample: this.data?.value?.smsSample || ''
          }] : [];

          this.noDataFound = true;
        }

        // ✅ Ensure selected value remains
        this.myForm.get('whatsappTemplateId')?.updateValueAndValidity();
      });
  }





  // GetMessageTemplate(vendorId: any, templateType: any, tempLanguage: any) {
  //   this.service.MerchantwiseWhatappTemplates(this.data.value2, vendorId, this.data?.value?.templateType, this.data?.value?.tempLanguage)
  //     .subscribe((res: any) => {
  //       if (res.flag === 1 && res.response?.length > 0) {
  //         this.TemplateDetails = res.response;

  //         // Only clear selection if the current value is not in the new list
  //         const currentId = this.myForm.value.whatsappTemplateId;
  //         const exists = this.TemplateDetails.some((t: { whatsappTemplateId: any; }) => t.whatsappTemplateId === currentId);

  //         if (!exists) {
  //           this.myForm.patchValue({ whatsappTemplateId: null });
  //         }

  //         this.noDataFound = false;
  //       } else {
  //         this.TemplateDetails = [];
  //         this.myForm.patchValue({ whatsappTemplateId: null });
  //         this.noDataFound = true;
  //       }
  //     });
  // }


  Update() {
    const selectedId = this.myForm.get('whatsappTemplateId')?.value;
    const selectedTemplate = this.TemplateDetails.find((t: { whatsappTemplateId: any; }) => t.whatsappTemplateId === selectedId);

    let submitModel: UpdateWhatappService = {
      merchantWhatsAppId: this.data?.value?.merchantWhatsAppId,
      vendorId: this.vendorId?.value,
      smsCharge: this.smsCharge?.value,
      whatsappTemplateId: selectedId,
      templateCode: selectedTemplate?.templateCode,
      templateLanguage: this.data.value.templateLanguage,
      smsEnableStatus: this.data?.value?.smsEnableStatus,
      modifedBy: this.adminName
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


  getValue() {
    console.log(this.whatsappTemplateId?.value);
  }

}
