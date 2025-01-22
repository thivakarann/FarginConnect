import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { retry } from 'rxjs';
import {
  area,
  pincode,
  route,
  street,
} from '../../../fargin-model/fargin-model.module';
import { log } from 'console';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrl: './add-route.component.css',
})
export class AddRouteComponent implements OnInit {
  areaname: any[] = [];
  routeformGroup: any = FormGroup;
  setupBoxNumber: any;
  employee: any;
  routeValues: any;
  fullname: any = localStorage.getItem('fullname');
  @ViewChild('select') select: any = MatSelect;
  @ViewChild('selects') selects: any = MatSelect;
  @ViewChild('select1') select1: any = MatSelect;
  @ViewChild('select2') select2: any = MatSelect;

  allSelected = false;
  allSelected1 = false;
  allSelected2 = false;

  streetvalue: any;
  showstreet: any;
  showarea: any;
  merchantId: any = localStorage.getItem('merchantId');
  pincodevalue: any[] = [];
  pincodedata: any;
  pincodeid: any;
  areaids: any;
  areavalue: any;
  customerdetails: any;
  allSelected3: any;
  streets: any;
  streetsvalue: any;
  testData: any = [];
  dataPush: any = [];
  final: any;
  perValueObject: any;
  perValueArray: any[] = [];
  max: any;
  realpincode: any;
  customervalue: any;
  pincodename: any;
  areabystreet: any;
  pincodestreet: any;
  selectedStates: string[] = [];
  beat: any = [
    'Money Collector', 'Service Person'
  ];
 
  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.routeformGroup = this.fb.group({
      beatRole: ['', Validators.required],
      merchantAdminId: ['', Validators.required],
      pincode: ['', Validators.required],
      area: ['', Validators.required],
      streetNames: ['', Validators.required],
      customerList: ['', Validators.required],
    });

    this.service.activeEmployees(this.merchantId).subscribe((res: any) => {
      this.employee = res.response;
    });

    this.service.pincodeViewall(this.merchantId).subscribe((res: any) => {
      this.pincodevalue = res.response;
    });



    this.service.viewareaName(this.merchantId).subscribe((res: any) => {
      this.areaname = res.response;
    });
    this.service
      .ViewCustomerByMerchantDetail(this.merchantId)
      .subscribe((res: any) => {
        this.customerdetails = res.response;
      });
  }

  get merchantAdminId() {
    return this.routeformGroup.get('merchantAdminId');
  }

  get pincode() {
    return this.routeformGroup.get('pincode');
  }

  get area() {
    return this.routeformGroup.get('area');
  }

  get beatRole() {
    return this.routeformGroup.get('beatRole');
  }
  get streetNames() {
    return this.routeformGroup.get('streetNames');
  }
  get customerList() {
    return this.routeformGroup.get('customerList');
  }
  getarea(id:any)
  {
    this.areavalue=[];
    this.area.reset()
    this.service.areaViewall(this.merchantId,id).subscribe((res: any) => {
      this.areavalue = res.response.areaName;
      this.pincodename=res.response.pincodeName
      this.resetSelections();
    })
  }
  getstreet(id:any)
  {
    this.streetvalue=[]
    this.streetNames.reset()
    this.service.streetViewall(this.merchantId,this.pincodename,id).subscribe((res: any) => {
      this.streetvalue = res.response.streetName;
      this.areabystreet=res.response.areaName;
      this.pincodestreet=res.response.pincodeName
      this.resetSelections();
    })
  }
  getcustomer(id:any)
  {
    this.customervalue=[]
    this.customerList.reset()
 
    this.service.customerViewall(this.merchantId,this.pincodestreet,this.areabystreet,id,).subscribe((res: any) => {
      this.customervalue = res.response.customers;
      this.resetSelections();
    })
  }
  resetSelections() { this.allSelected3 = false; setTimeout(() => this.toggleAllSelection3(), 0);  }

  toggleAllSelection3() {
    if (this.allSelected3) {
      this.select2.options.forEach((item: MatOption) => item.select());
    } else {
      this.select2.options.forEach((item: MatOption) => item.deselect());
    }
  }

  submit() {
  
    let submitModel: route = {
      pincodeName: this.pincode.value,
      merchantAdminId: this.merchantAdminId.value,
      beatRole: this.beatRole.value,
      areaName:this.area.value,
      streetName:this.streetNames.value,
      customerList:this.customerList.value,
      merchantId: this.merchantId,
      createdBy:this.fullname
    };
    this.service.routecreate(submitModel).subscribe((res: any) => {
      this.routeValues = res.response;

      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
  close() {
    this.dialog.closeAll();
  }
}
