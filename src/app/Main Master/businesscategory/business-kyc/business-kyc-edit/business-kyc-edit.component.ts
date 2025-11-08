import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Businesskycedit, kycactivestatus } from '../../../../fargin-model/fargin-model.module';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { EncyDecySericeService } from '../../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-business-kyc-edit',
  templateUrl: './business-kyc-edit.component.html',
  styleUrl: './business-kyc-edit.component.css'
})
export class BusinessKycEditComponent implements OnInit {

  editbusinesskyc: any = FormGroup;
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  adminId: any = this.cryptoService.decrypt(sessionStorage.getItem('Two') || '');

  categorys: any;
  mccCodes: any;
  businessCreationId: any;
  kycDocNames: any;
  categoryName: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('select') select: any = MatSelect;
  allSelected = false;
  errorMsg: any;
  categoryNames: any;
  businessCategoryIds: any;
  kycValue: any;
  kycCategoryIds: any;
  businessCategorydocumentId: any
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  businesscat: any;
  businessType: any[] = [];
  businesscatId: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private cryptoService: EncyDecySericeService,
    private service: FarginServiceService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) {


    for (let index = 0; index < this.data.value.businessDocumentTypeEntities.length; index++) {
      const element = this.data.value.businessDocumentTypeEntities[index];
      this.businessType.push(element.businessDocumentTypeId);
    }

    this.businesscatId = this.data.value.businessCategoryDocumentId;

    console.log(this.businesscatId)
    console.log(this.businessType)
  }



  ngOnInit(): void {


    this.editbusinesskyc = this.fb.group({
      businessCategoryId: new FormControl('', [Validators.required]),
      kycCategoryId: new FormControl([], [Validators.required]),
    });

    this.statusactive();
    this.onchangebussine();

  }

  // get active business category
  statusactive() {
    this.businesscat = this.data.value.businessCategoryEntity.businessCategoryId;
    this.editbusinesskyc.controls['businessCategoryId'].value = this.businesscat

    let submitmodal: kycactivestatus = {
      status: 1
    }

    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitmodal))
    }
    this.service.Businessactivestatus(datamodal).subscribe((res: any) => {
      this.categoryName = JSON.parse(this.cryptoService.decrypt(res.data));


      this.categoryName.find((items: any) => {

        if (items?.businessCategoryId == this.editbusinesskyc.controls['businessCategoryId'].value) {
          this.editbusinesskyc.controls['businessCategoryId'].value = items?.businessCategoryId;
          // get active documents
          let submitmodal: kycactivestatus = {
            status: this.editbusinesskyc.controls['businessCategoryId'].value
          }

          let datamodal = {
            data: this.cryptoService.encrypt(JSON.stringify(submitmodal))
          }
          this.service.Businessactivedocument(datamodal).subscribe((res: any) => {
            this.kycValue = JSON.parse(this.cryptoService.decrypt(res.data));
            // this.kycValue.find((docitems: any) => {
            //   if (docitems?.businessDocumentTypeId == this.editbusinesskyc.controls['kycCategoryId'].value) {
            //     this.editbusinesskyc.controls['kycCategoryId'].value = docitems?.businessDocumentTypeId;
            //   }
            // })
            // console.log(this.kycValue);
            this.editbusinesskyc.controls['kycCategoryId'].value = this.businessType;
          })

        }
      })
    });
  }



  get kycCategoryId() {
    return this.editbusinesskyc.get('kycCategoryId');
  }

  get businessCategoryId() {
    return this.editbusinesskyc.get('businessCategoryId');
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  Editsubmit() {
    let submitModel: Businesskycedit = {
      businessCategoryDocumentId: this.businesscatId,
      businessCategoryId: this.businessCategoryId.value,
      documentTypeIds: this.kycCategoryId.value,
      modifiedBy: this.adminName,
      modifierRole: this.adminName
    }

    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }


    this.service.Businesskycupdate(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.messageDescription)
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll()

      } else {
        this.toastr.error(res.messageDescription)
      }
    })
  }




  onchangebussine() {
    this.kycCategoryId.value = '';
    this.kycValue = [];

    let submitmodal: kycactivestatus = {
      status: 1
    }

    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitmodal))
    }
    this.service.Businessactivedocument(datamodal).subscribe((res: any) => {
      this.kycValue = JSON.parse(this.cryptoService.decrypt(res.data));
      console.log(this.kycValue)
    })
  }

}
