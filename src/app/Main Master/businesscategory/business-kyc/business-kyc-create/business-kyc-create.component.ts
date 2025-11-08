import { Component, EventEmitter, OnInit, Output, ViewChild, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { Businesskycadd, kycactivestatus } from '../../../../fargin-model/fargin-model.module';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { EncyDecySericeService } from '../../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-business-kyc-create',
  templateUrl: './business-kyc-create.component.html',
  styleUrl: './business-kyc-create.component.css',
})
export class BusinessKycCreateComponent implements OnInit {
  @ViewChild('select') select: any = MatSelect;
  allSelected = false;
  addbusinesskyc: any = FormGroup;
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  dataSource: any;
  categoryName: any;
  kycValue: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private service: FarginServiceService,
    private cryptoService: EncyDecySericeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.service.activeViewall().subscribe((res: any) => {
      this.kycValue = res.response;
    });

    this.statusactive();
    this.businessdocument();

    this.addbusinesskyc = this.fb.group({
      kycCategoryId: new FormControl('', [Validators.required]),
      businessCategoryId: new FormControl('', [Validators.required]),
      createdBy: new FormControl(''),
    });
  };

  get kycCategoryId() {
    return this.addbusinesskyc.get('kycCategoryId');
  }

  get businessCategoryId() {
    return this.addbusinesskyc.get('businessCategoryId');
  };

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  statusactive() {
    let submitmodal: kycactivestatus = {
      status: 1
    }

    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitmodal))
    }

    this.service.Businessactivestatus(datamodal).subscribe((res: any) => {
      this.categoryName = JSON.parse(this.cryptoService.decrypt(res.data));
    });
  }

  submit() {
    let submitModel: Businesskycadd = {
      documentTypeIds: this.kycCategoryId.value,
      businessCategoryId: this.businessCategoryId.value,
      createdby: this.adminName,
      creatorRole: this.adminName
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.BusinesskycCreate(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.messageDescription);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.messageDescription);
      }
    });
  }



  businessdocument() {
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
