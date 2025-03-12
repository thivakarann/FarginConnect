import { Component, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { routeupdate, updatesetupbox } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrl: './edit-route.component.css'
})
export class EditRouteComponent {
  routeformGroup: any = FormGroup;
  viewData: any;
  entityname: any = localStorage.getItem('entityname')
  boxnumber: any;
  routeId: any;
  updatevalue: any;
  employee: any;
  merchantId: any = localStorage.getItem('merchantId');
  @ViewChild('select') select: any = MatSelect;
  @ViewChild('selects') selects: any = MatSelect;
  allSelected = false;
  allSelected1 = false;
  streetname: any[] = [];
  areaname: any[] = [];
  filteredProviders: any[] = this.streetname;
  filteredProviders1: any[] = this.areaname;
  showstreet: any;
  showarea: any;
  streetData: any;
  areaData: any;
  fullname: any = localStorage.getItem('fullname');
  selectedStates: string[] = [];
  beat: any = [
    'Money Collector', 'Service Person'
  ];
  beatRoles: any;
  constructor(private dialog: MatDialog, private service: FarginServiceService,
    private toastr: ToastrService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {


    this.viewData = this.data.value
    
    
    this.streetData=this.data.value.streetName
    

    this.areaData=this.data.value.area
    
    
    
    this.routeId = this.data.value.routeId;
    this.beatRoles = this.viewData.beatRole;
    this.selectedStates = [...this.viewData.beatRole];  

    this.service.activeEmployees(this.merchantId).subscribe((res: any) => {
      this.employee = res.response;
      
    })


    this.routeformGroup = this.fb.group({
      beatRole: ['', Validators.required],
    })

    this.service.viewstreetName(this.merchantId).subscribe((res: any) => {
      this.streetname = res.response;
      
    });

    this.service.viewareaName(this.merchantId).subscribe((res: any) => {
      this.areaname = res.response;
      
    })


  }

  get merchantAdminId() {
    return this.routeformGroup.get('merchantAdminId')
  }


  get streetName() {
    return this.routeformGroup.get('streetName')
  }

  get area() {
    return this.routeformGroup.get('area')
  }

  get beatRole() {
    return this.routeformGroup.get('beatRole')
  }


  streetId(id: any) {
    
    this.showstreet = id
  }

  areaId(id: any) {
    
    this.showarea = id
  }



 

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  toggleAllSelection1() {
    if (this.allSelected1) {
      this.selects.options.forEach((item: MatOption) => item.select());
    } else {
      this.selects.options.forEach((item: MatOption) => item.deselect());
    }
  }

  submit() {
    let submitModel: routeupdate = {
   
      beatRole: this.beatRole.value,
      modifiedBy:this.fullname
    }
    this.service.routeedit(this.routeId, submitModel).subscribe((res: any) => {
      this.updatevalue = res.response;
      
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
