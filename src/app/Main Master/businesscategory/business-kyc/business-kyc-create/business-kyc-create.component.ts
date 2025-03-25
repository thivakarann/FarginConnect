import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Businesskycadd } from '../../../../fargin-model/fargin-model.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-business-kyc-create',
  templateUrl: './business-kyc-create.component.html',
  styleUrl: './business-kyc-create.component.css'
})
export class BusinessKycCreateComponent implements OnInit {

  @ViewChild('select') select: any = MatSelect;
  allSelected = false;
  addbusinesskyc: any = FormGroup;
  createdBy = JSON.parse(sessionStorage.getItem('adminname') || '');
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  dataSource: any;
  categoryName: any;
  kycValue: any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
 
  constructor(private fb: FormBuilder, private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }
 
 
  ngOnInit(): void {
 
    this.service.activeViewall().subscribe((res: any) => {
      this.kycValue = res.response;
      
    })
 
 
    this.addbusinesskyc = this.fb.group({
      kycCategoryId: new FormControl('', [Validators.required]),
      businessCategoryId: new FormControl('', [Validators.required]),
      createdBy: new FormControl(''),
 
    });
 
    this.service.BusinesscategoryKycactive().subscribe((res: any) => {
      if (res.flag == 1) {
        this.categoryName = res.response;
        this.categoryName.reverse();
        this.dataSource = new MatTableDataSource(this.categoryName);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.showcategoryData = false;
        // 
      }
      else {
        this.errorMsg = res.responseMessage;
        this.showcategoryData = true;
      }
    });
 
 
  }
 
 
  get kycCategoryId() {
    return this.addbusinesskyc.get('kycCategoryId');
  }
 
  get businessCategoryId() {
    return this.addbusinesskyc.get('businessCategoryId');
  }
 
 
 
  submit() {
    let submitModel: Businesskycadd = {
      kycCategoryId: this.kycCategoryId.value,
      businessCategoryId: this.businessCategoryId.value,
      createdBy: this.createdBy,
    
    };
    this.service.BusinesskycCreate(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.dialog.closeAll()
        setTimeout(() => {
          window.location.reload()
        },500);
 
      }
      else {
        this.toastr.error(res.responseMessage);
 
      }
 
    });
 
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