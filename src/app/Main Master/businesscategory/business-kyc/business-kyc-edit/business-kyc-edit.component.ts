import { Component, EventEmitter, Inject, inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Businesskycedit } from '../../../../fargin-model/fargin-model.module';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-business-kyc-edit',
  templateUrl: './business-kyc-edit.component.html',
  styleUrl: './business-kyc-edit.component.css'
})
export class BusinessKycEditComponent implements OnInit {

  editbusinesskyc: any = FormGroup;

  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
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
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {


  }



  ngOnInit(): void {

    this.service.activeViewall().subscribe((res: any) => {
      this.kycValue = res.response;

    })


    this.editbusinesskyc = this.fb.group({
      kycCategoryId: new FormControl('', [Validators.required]),
      modifiedBy: new FormControl(''),
      businessCategoryId: new FormControl('', [Validators.required])
    });

    this.businessCreationId = this.data.value.businessCreationId


    this.businessCategoryIds = this.data.value.businessCategoryId.businessCategoryId
    this.editbusinesskyc.controls['businessCategoryId'].value = this.businessCategoryIds

    this.kycCategoryIds = this.data.value.entityKycCategory.kycCategoryId
    this.editbusinesskyc.controls['kycCategoryId'].value = this.kycCategoryIds


    this.service.BusinesscategoryKycactive().subscribe((res: any) => {
      if (res.flag == 1) {
        this.categoryName = res.response;
        this.categoryName.reverse();
        this.dataSource = new MatTableDataSource(this.categoryName);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else {
        this.errorMsg = res.responseMessage;

      }
    });

  }

  get kycCategoryId() {
    return this.editbusinesskyc.get('kycCategoryId');
  }

  get businessCategoryId() {
    return this.editbusinesskyc.get('businessCategoryId');
  }




  Editsubmit() {
    let submitModel: Businesskycedit = {
      categoryKycId: this.kycCategoryId.value,
      businessCreationId: this.businessCategoryId.value,
      modifiedBy: this.getadminname
    }

    this.service.Businesskycupdate(this.businessCreationId, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll()

      } else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  kycId(id: any) {

  }
}
