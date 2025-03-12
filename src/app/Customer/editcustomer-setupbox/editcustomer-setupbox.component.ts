import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { EditSetUpbox } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-editcustomer-setupbox',
  templateUrl: './editcustomer-setupbox.component.html',
  styleUrl: './editcustomer-setupbox.component.css'
})
export class EditcustomerSetupboxComponent {
  myForm!: FormGroup;
  getadminname = localStorage.getItem('fullname');
  merchantId: any = localStorage.getItem('merchantId');
  ActivePlans: any;
  ActiveSetupbox: any;
  Activeserviceprovider: any;
  serviceId: any;
  ActiveLCOP: any;
  customerdetails: any;
  customerStbId: any;
  stbIdval: any;
  customerStbres: any;
  stbId: any;
  Serviceid: any;
  customerstbId: any;
  Activemsostbproviders: any;
  areaNames: any;
  streetNames: any;
  doorNumbers: any;
  primarydetails:any;
  checked:boolean=false;

  ActivesetupId:any;


  constructor(private service: FarginServiceService, private toaster: ToastrService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.customerStbres = this.data.value;
    this.areaNames = this.data.value.areaName;
    this.streetNames = this.data.value.streetName;
    this.doorNumbers = this.data.value.doorNumber;
    console.log("this.customerStbres" +this.customerStbres);
    this.primarydetails = this.data.value2

    

    // this.Serviceid = this.data.value.stbId.service.serviceId;
    // console.log(this.Serviceid)


    this.stbId = this.data.value.stbId.stbId;
    console.log(this.stbId)

    this.customerstbId = this.data.value.customerStbId;

    this.myForm = new FormGroup({
      // setupbox: new FormControl('',),
      setupboxInput:new FormControl(''),
      mso: new FormControl('', [Validators.required]),
      streetName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      areaName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      doorNumber: new FormControl('',Validators.required,),
    });
    this.service.ActiveServiceProvider().subscribe((res: any) => {
      this.Activeserviceprovider = res.response;

    })
    this.service.ActiveMsobySTB(this.merchantId).subscribe((res: any) => {
      this.Activemsostbproviders = res.response;
      console.log("nsdbksd" + this.Activemsostbproviders)
    });

    
    this.loadInitialSetupBoxes()

  }




  Primarydetails(event:any){
    this.checked=event.target.checked;
    if(this.checked == true) {
      this.areaNames=this.primarydetails.area;
      this.streetNames=this.primarydetails.streetName;
      this.doorNumbers= this.primarydetails.doorNumber;
      
    }
    else {
      this.areaNames=  this.data.value.areaName;
      this.streetNames= this.data.value.streetName;
      this.doorNumbers=  this.data.value.doorNumber;
    }
  }

  loadInitialSetupBoxes() {
    this.service.ActiveSetupBoxByMerchantId(this.merchantId,this.customerStbres.stbId.service.serviceId).subscribe((res: any) => {
      
      this.ActiveSetupbox = res.response;
      this.ActivesetupId =''
    });
  }

  fetchSetupBoxData() {
    const input = this.myForm.get('setupboxInput')?.value;
    if (!input) {
      this.loadInitialSetupBoxes(); // Reset to initial options if input is empty
      return;
    }
  
    this.service.Setupboxsearch(this.merchantId, this.customerStbres?.stbId?.service?.serviceId, input).subscribe((res: any) => {
      this.ActiveSetupbox = res.response; // Update with filtered results
  
      if (this.ActiveSetupbox && this.ActiveSetupbox.length > 0 && this.setupbox) {
        this.setupbox.setValue(this.ActiveSetupbox[0]?.stbId || null);
      }
      console.log(this.ActiveSetupbox);
    });
  }


  // First Form
  get setupbox() {
    return this.myForm.get('setupbox')
  }
  get setupboxInput() {
    return this.myForm.get('setupboxInput')
  }

  get mso() {
    return this.myForm.get('mso')
  }

  get streetName() {
    return this.myForm.get('streetName')
  }

  get areaName() {
    return this.myForm.get('areaName')
  }

  get doorNumber() {
    return this.myForm.get('doorNumber')
  }


  getServiceId(event: any,) {
    this.ActiveSetupbox=[];
    this.serviceId = event.target.value;

    this.service.ActiveSetupBoxByMerchantId(this.merchantId, this.serviceId).subscribe((res: any) => {
      this.ActiveSetupbox = res.response;
    });
  }

   getIdvalue(event:any){
    console.log('test');
    console.log(this.ActiveSetupbox);
    console.log(event.target.value);
    
    for (let index = 0; index < this.ActiveSetupbox.length; index++) {
      const element = this.ActiveSetupbox[index];
      if (element.setupBoxNumber == event.target.value) {
        this.ActivesetupId = element.stbId;
        console.log(this.ActivesetupId);
        
      }
    }
  }


  transformSetupbox(selectedSetupbox: any): number {
    return selectedSetupbox ? selectedSetupbox.stbId : null;
  }

  onInputChange() {
    const input = this.myForm.get('setupboxInput')?.value;
    if (!input) {
      this.loadInitialSetupBoxes(); // Reset to initial options if input is empty
    }
  }
  

  submit() {
    let submitModel: EditSetUpbox = {
      // stbId: this.setupbox?.value  ||this.setupboxInput?.value || this.customerStbres?.stbId?.stbId ,
      stbId: this.ActivesetupId || this.customerStbres?.stbId?.stbId,
      modifiedBy: this.getadminname,
      setupBoxAreaName:this.areaName?.value,
      setupBoxStreetName: this.streetName?.value,
      setupBoxDoorNumber: this.doorNumber?.value
    }

    this.service.EditSetUpboxonly(this.customerstbId, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.responseMessage);
        this.dialog.closeAll()
       }
      else {
        this.toaster.error(res.responseMessage)
      }
    })
  }



}
