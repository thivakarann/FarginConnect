import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { CustomerUpdate } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editcustomer',
  templateUrl: './editcustomer.component.html',
  styleUrl: './editcustomer.component.css'
})
export class EditcustomerComponent {
  myForm!: FormGroup;

  getadminname = localStorage.getItem('fullname');
  merchantId: any = localStorage.getItem('merchantId');
  PaidChannels: any;
  @ViewChild('select1') select1: any = MatSelect;
  @ViewChild('select2') select2: any = MatSelect;
  @ViewChild('select3') select3: any = MatSelect;
  allSelected3 = false;
  allSelected2 = false;
  allSelected1 = false;
  ActivePlans: any;
  ActiveSetupbox: any;
  Activeserviceprovider: any;
  serviceId: any;
  ActiveLCOP: any;
  customerdetails: any;
  CustomerId: any;
  viewcustomer: any;
  Channels: any;
  channe: any;
  alcotchannel: any;
  Activesetup: any;
  stbbox: any;
  alcot: any[] = [];
  andssss: any[] = [];
  lcops: any[] = [];
  lcp: any[] = [];
  bouquet: any[] = [];
  bouquets: any;
  stb: any;
  aloctss: any;
  merchantemail: any = localStorage.getItem('email');
  Email = "nomail@gmail.com"
  myForm1!: FormGroup;
  customerplandetails: any;
  branchviews: any;
  branchstatus: boolean = false;


  constructor(
    private service: FarginServiceService,
    private location: Location,
    private toaster: ToastrService,
    private activaterouter: ActivatedRoute, private router: Router
  ) { }

  ngOnInit(): void {
    this.activaterouter.queryParams.subscribe((param: any) => {
      this.CustomerId = param.Alldata;
    });
    this.myForm = new FormGroup({
      Name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$'),
      ]),

      mobilenumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$'),
      ]),
      alternativemobilenumber: new FormControl('', [
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$'),
      ]),

      contactEmail: new FormControl('', [
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
      ]),
      oldDoorNo: new FormControl('', Validators.required),
      NewDoorNo: new FormControl(''),

      FlatNo: new FormControl(''),
      housename: new FormControl(''),
      Apartment: new FormControl(''),
      Streetname: new FormControl('', Validators.required),

      area: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$'),
      ]),
      landmark: new FormControl(''),
      country: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$'),
      ]),

      state: new FormControl('', Validators.required),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$'),
      ]),
      pincode: new FormControl('', [
        Validators.required,
        Validators.pattern('^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$'),
      ]),

      // setupbox: new FormControl('', [
      //   Validators.required,
      //   Validators.pattern('^[a-zA-Z0-9 ]*$'),
      // ]),
      // mso: new FormControl('', [
      //   Validators.required,
      //   Validators.pattern('^[a-zA-Z0-9 ]*$'),
      // ]),

      advance: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.pattern('^[1-9][0-9]*(\.[0-9]{1,2})?$')]),
      lineType: new FormControl('', Validators.required),
      customerReferenceId: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]),

      age: new FormControl('', [Validators.pattern('^[1-9][0-9]*(\.[0-9]+)?$')]),

      customerMsoId: new FormControl('', Validators.pattern('^[a-zA-Z0-9 ]*$')),

      branchStatus: new FormControl('', Validators.required),

      branchId: new FormControl('',),


      // paidChannel: new FormControl(''),
      // broadcaster: new FormControl(''),
      // lcop: new FormControl('', Validators.required),
    });
    // this.myForm1 = new FormGroup({

    //     paidChannel: new FormControl(''),
    //   broadcaster: new FormControl(''),
    //   lcop: new FormControl('', Validators.required),
    // });

    this.service.PaidChannels().subscribe((res: any) => {
      this.Channels = res.response;

    });
    this.service.ActiveBouquetePlans().subscribe((res: any) => {
      this.ActivePlans = res.response;
    });
    this.service.ActiveLcop(this.merchantId).subscribe((res: any) => {
      this.ActiveLCOP = res.response;
    });

    this.service.ActiveServiceProvider().subscribe((res: any) => {
      this.Activeserviceprovider = res.response;
    });


    // this.service.setupboxbyid(this.merchantId).subscribe((res: any) => {
    //   this.Activesetup = res.response;
    // });
    this.service.ViewCustomerBasicInfo(this.CustomerId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewcustomer = res.response;




        // this.andssss = [];
        // for (let index = 0; index < this.alcot.length; index++) {
        //   const element = this.alcot[index];
        //   this.andssss.push(element.alcotId);
        //   
        // }

        // this.lcp = [];
        // for (let index = 0; index < this.lcops.length; index++) {
        //   const lcopelement = this.lcops[index];
        //   this.lcp.push(lcopelement.lcopId);

        //   
        // }
        // this.bouquet = [];
        // for (let index = 0; index < this.bouquets.length; index++) {
        //   const bouquetslement = this.bouquets[index];
        //   this.bouquet.push(bouquetslement.bouquetId);

        //   
        // }

        // this.stbbox = res.response.customerdetail.stbId.service.serviceId;
        // this.stb = res.response.customerdetail.stbId.stbId
        // 
        // 

        this.service.ActiveSetupBoxByMerchantId(this.merchantId, this.stbbox).subscribe((res: any) => {
          this.ActiveSetupbox = res.response;
        });
      }


    });

    this.service.BranchView(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.branchviews = res.response;
        this.branchstatus = true;
      }
      else if (res.flag == 2) {
        this.branchstatus = false;
      }
    })
  }

  // First Form

  get Name() {
    return this.myForm.get('Name');
  }
  get mobilenumber() {
    return this.myForm.get('mobilenumber');
  }

  get alternativemobilenumber() {
    return this.myForm.get('alternativemobilenumber');
  }

  get contactEmail() {
    return this.myForm.get('contactEmail');
  }
  get oldDoorNo() {
    return this.myForm.get('oldDoorNo');
  }
  get NewDoorNo() {
    return this.myForm.get('NewDoorNo');
  }
  get customerReferenceId() {
    return this.myForm.get('customerReferenceId')

  }
  get age() {
    return this.myForm.get('age')

  }
  get FlatNo() {
    return this.myForm.get('FlatNo');
  }
  get Apartment() {
    return this.myForm.get('Apartment');
  }
  get housename() {
    return this.myForm.get('housename');
  }
  get Streetname() {
    return this.myForm.get('Streetname');
  }

  get area() {
    return this.myForm.get('area');
  }
  get landmark() {
    return this.myForm.get('landmark');
  }
  get country() {
    return this.myForm.get('country');
  }

  get state() {
    return this.myForm.get('state');
  }
  get city() {
    return this.myForm.get('city');
  }
  get pincode() {
    return this.myForm.get('pincode');
  }

  // get setupbox() {
  //   return this.myForm.get('setupbox');
  // }
  // get mso() {
  //   return this.myForm.get('mso');
  // }

  get advance() {
    return this.myForm.get('advance')
  }
  get amount() {
    return this.myForm.get('amount')
  }
  get lineType() {
    return this.myForm.get('lineType')
  }

  get customerMsoId() {
    return this.myForm.get('customerMsoId')
  }

  get branchStatus() {
    return this.myForm.get('branchStatus')

  }

  get branchId() {
    return this.myForm.get('branchId')

  }
  // get paidChannel() {
  //   return this.myForm1.get('paidChannel');
  // }
  // get broadcaster() {
  //   return this.myForm1.get('broadcaster');
  // }
  // get lcop() {
  //   return this.myForm1.get('lcop');
  // }
  getServiceId(event: any) {
    this.serviceId = event.target.value;

    this.service.ActiveSetupBoxByMerchantId(this.merchantId, this.serviceId).subscribe((res: any) => {
      this.ActiveSetupbox = res.response;
    });

    // this.service.setupboxbyid(this.merchantId).subscribe((res: any) => {
    //   this.Activesetup = res.response;
    // });
  }

  toggleAllSelection1() {
    if (this.allSelected1) {
      this.select1.options.forEach((item: MatOption) => item.select());
    } else {
      this.select1.options.forEach((item: MatOption) => item.deselect());
    }
    this.updatePaidChannelSelection();
  }
  updatePaidChannelSelection() {
    this.andssss = this.select1.options
      .filter((item: MatOption) => item.selected)
      .map((item: MatOption) => item.value);

    // Remove duplicates
    this.andssss = Array.from(new Set(this.andssss));
  }
  toggleAllSelection2() {
    if (this.allSelected2) {
      this.select2.options.forEach((item: MatOption) => item.select());
    } else {
      this.select2.options.forEach((item: MatOption) => item.deselect());
    }
    this.updatePaidSelection();
  }
  updatePaidSelection() {
    this.bouquet = this.select2.options
      .filter((item: MatOption) => item.selected)
      .map((item: MatOption) => item.value);

    // Remove duplicates
    this.bouquet = Array.from(new Set(this.bouquet));
  }
  toggleAllSelection3() {
    if (this.allSelected3) {
      this.select3.options.forEach((item: MatOption) => item.select());
    } else {
      this.select3.options.forEach((item: MatOption) => item.deselect());
    }
    this.updatelcopSelection();
  }
  updatelcopSelection() {
    this.lcp = this.select3.options
      .filter((item: MatOption) => item.selected)
      .map((item: MatOption) => item.value);

    // Remove duplicates
    this.lcp = Array.from(new Set(this.lcp));
  }
  submit() {
    if (this.viewcustomer?.routeAssignedStatus != 0) {
      if (this.viewcustomer?.area != this.area?.value || this.viewcustomer?.streetName != this.Streetname?.value || this.viewcustomer?.pincodeName != this.pincode?.value) {
        const result = window.confirm(" Alert: Route Already Assigned for this Customer,if you Change anyone of (Area,Street,Pincode)Route Status  are InActive Automattically, Again You Need to Assign For this Customer  ");
        if (result) {
          const value = "OK value";
          console.log(value)
          if (value == "OK value") {
            let advanceAmount = this.advance?.value.trim() === 'Yes' ? parseFloat(this.amount?.value.trim()) : 0.0;
            let submitModel: CustomerUpdate = {
              area: this.area?.value.trim(),
              customerName: this.Name?.value.trim(),
              countryName: this.country?.value.trim(),
              stateName: this.state?.value.trim(),
              pincodeName: this.pincode?.value.trim(),
              emailAddress: this.contactEmail?.value.trim(),
              alterMobileNumber: this.alternativemobilenumber?.value.trim() || "",
              apartmentName: this.Apartment?.value.trim() || "-",
              doorNumber: this.oldDoorNo?.value.trim() || "-",
              flatNumber: this.FlatNo?.value.trim() || "-",
              blockNumber: this.NewDoorNo?.value.trim() || "-",
              landmark: this.landmark?.value.trim() || "-",
              age: this.age?.value.trim(),
              streetName: this.Streetname?.value.trim(),
              mobileNumber: this.mobilenumber?.value.trim(),
              houseName: this.housename?.value.trim() || "-",
              merchantId: this.merchantId,
              customerReferenceId: this.customerReferenceId?.value.trim(),
              // stbId: this.setupbox?.value,
              cityName: this.city?.value.trim(),
              advanceStatus: this.advance?.value.trim(),
              advanceAmount: advanceAmount,
              modifiedBy: this.getadminname,
              freeLine: this.lineType?.value,
              customerMsoId: this.customerMsoId?.value.trim() || "",
              branchStatus: this.branchStatus?.value,
              branchId: this.branchId?.value || null,
            };
            this.service.UpdateCustomer(this.CustomerId, submitModel).subscribe((res: any) => {
              if (res.flag === 1) {
                this.customerdetails = res.response;
                this.toaster.success(res.responseMessage);
                this.router.navigateByUrl('dashboard/view-customer');
              } else {
                this.toaster.error(res.responseMessage);
              }
            });
          }
        }
         else {
          // The user clicked "Cancel"
          console.log("User clicked Cancel");
          // Assign a different value here if needed
          const value = "Cancel value";
          console.log("Value:", value);
        }
      }

      else {
        let advanceAmount = this.advance?.value.trim() === 'Yes' ? parseFloat(this.amount?.value.trim()) : 0.0;
        let submitModel: CustomerUpdate = {
          area: this.area?.value.trim(),
          customerName: this.Name?.value.trim(),
          countryName: this.country?.value.trim(),
          stateName: this.state?.value.trim(),
          pincodeName: this.pincode?.value.trim(),
          emailAddress: this.contactEmail?.value.trim(),
          alterMobileNumber: this.alternativemobilenumber?.value.trim() || "",
          apartmentName: this.Apartment?.value.trim() || "-",
          doorNumber: this.oldDoorNo?.value.trim() || "-",
          flatNumber: this.FlatNo?.value.trim() || "-",
          blockNumber: this.NewDoorNo?.value.trim() || "-",
          landmark: this.landmark?.value.trim() || "-",
          age: this.age?.value.trim(),
          streetName: this.Streetname?.value.trim(),
          mobileNumber: this.mobilenumber?.value.trim(),
          houseName: this.housename?.value.trim() || "-",
          merchantId: this.merchantId,
          customerReferenceId: this.customerReferenceId?.value.trim(),
          // stbId: this.setupbox?.value,
          cityName: this.city?.value.trim(),
          advanceStatus: this.advance?.value.trim(),
          advanceAmount: advanceAmount,
          modifiedBy: this.getadminname,
          freeLine: this.lineType?.value,
          customerMsoId: this.customerMsoId?.value.trim() || "",
          branchStatus: this.branchStatus?.value,
          branchId: this.branchId?.value || null,
        };
        this.service.UpdateCustomer(this.CustomerId, submitModel).subscribe((res: any) => {
            if (res.flag === 1) {
              this.customerdetails = res.response;
              this.toaster.success(res.responseMessage);
              this.router.navigateByUrl('dashboard/view-customer');

            } else {
              this.toaster.error(res.responseMessage);
            }
          });
      }
     }
    else {
       let advanceAmount = this.advance?.value.trim() === 'Yes' ? parseFloat(this.amount?.value.trim()) : 0.0;
      let submitModel: CustomerUpdate = {
        area: this.area?.value.trim(),
        customerName: this.Name?.value.trim(),
        countryName: this.country?.value.trim(),
        stateName: this.state?.value.trim(),
        pincodeName: this.pincode?.value.trim(),
        emailAddress: this.contactEmail?.value.trim(),
        alterMobileNumber: this.alternativemobilenumber?.value.trim() || "",
        apartmentName: this.Apartment?.value.trim() || "-",
        doorNumber: this.oldDoorNo?.value.trim() || "-",
        flatNumber: this.FlatNo?.value.trim() || "-",
        blockNumber: this.NewDoorNo?.value.trim() || "-",
        landmark: this.landmark?.value.trim() || "-",
        age: this.age?.value.trim(),
        streetName: this.Streetname?.value.trim(),
        mobileNumber: this.mobilenumber?.value.trim(),
        houseName: this.housename?.value.trim() || "-",
        merchantId: this.merchantId,
        customerReferenceId: this.customerReferenceId?.value.trim(),
        // stbId: this.setupbox?.value,
        cityName: this.city?.value.trim(),
        advanceStatus: this.advance?.value.trim(),
        advanceAmount: advanceAmount,
        modifiedBy: this.getadminname,
        freeLine: this.lineType?.value,
        customerMsoId: this.customerMsoId?.value.trim() || "",
        branchStatus: this.branchStatus?.value,
        branchId: this.branchId?.value || null,
      };
      this.service .UpdateCustomer(this.CustomerId, submitModel).subscribe((res: any) => {
          if (res.flag === 1) {
            this.customerdetails = res.response;
            this.toaster.success(res.responseMessage);
            this.router.navigateByUrl('dashboard/view-customer');

          } else {
            this.toaster.error(res.responseMessage);
          }
        });
    }


  }

  close() {
    this.location.back();
  }
}
