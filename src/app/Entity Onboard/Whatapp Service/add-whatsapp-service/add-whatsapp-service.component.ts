import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CraeteWhatappService } from '../../../fargin-model/fargin-model.module';
import { map, startWith, pairwise, filter } from 'rxjs/operators';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';


@Component({
  selector: 'app-add-whatsapp-service',
  templateUrl: './add-whatsapp-service.component.html',
  styleUrl: './add-whatsapp-service.component.css'
})
export class AddWhatsappServiceComponent implements OnInit {

  @Output() bankDetailsUpdated = new EventEmitter<void>();
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  myForm!: FormGroup;
  Vendors: any;
  TemplateDetails: any;
  TempId: any;
  TEMPDiscription: any;
  noDataFound = false;


  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService:EncyDecySericeService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {

    this.service.WhatAPPVendors().subscribe((res: any) => {
      this.Vendors = res.response;
    });

    this.myForm = new FormGroup({
      vendorId: new FormControl('', [Validators.required]),
      smsCharge: new FormControl('', [Validators.required]),
      templateType: new FormControl('', [Validators.required]),
      tempLanguage: new FormControl('', [Validators.required]),
      whatsappTemplateId: new FormControl('', [Validators.required]),
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
  }

  GetMessageTemplate(vendorId: any, templateType: string, tempLanguage: string) {
    this.service.MerchantwiseWhatappTemplates(this.data.value, vendorId, templateType, tempLanguage)
      .subscribe((res: any) => {
        if (res.flag == 1) {
          this.TemplateDetails = res.response;
        }
        else {
          // Clear previous data and optionally show a message
          this.TemplateDetails = [];
          // Optionally set a flag to show "No data found" in the UI
          this.noDataFound = true;
        }
      });
  }


  Submit() {

    const selectedId = this.myForm.get('whatsappTemplateId')?.value;
    const selectedTemplate = this.TemplateDetails.find((t: { whatsappTemplateId: any; }) => t.whatsappTemplateId === selectedId);

    let submitModel: CraeteWhatappService = {
      merchantId: this.data?.value,
      vendorId: this.vendorId?.value,
      smsCharge: this.smsCharge?.value,
      whatsappTemplateId: selectedId,
      // templateCode: selectedTemplate?.templateCode,
      templateLanguage: this.tempLanguage?.value,
      createdBy: this.adminName
    };
    this.service.CreateMerchatWhatappService(submitModel).subscribe((res: any) => {
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
