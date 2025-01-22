import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatOption, MatSelect } from '@angular/material/select';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CustomerCreate } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrl: './addcustomer.component.css'
})
export class AddcustomerComponent implements OnInit {
  myForm!: FormGroup;
  getadminname = localStorage.getItem('fullname');
  merchantId: any = localStorage.getItem('merchantId');
  merchantemail: any = localStorage.getItem('email');

  Channels: any;
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
  dataNeedToPush: any[] = [];
  emptyalcot: any[] = [];
  EmptyBouquet: any[] = [];
  Email = "nomail@gmail.com";
  branchviews:any;
  branchstatus:boolean = false;
  
  // ipAddress!: string;
  // geoDetails: any;
  // LocationCountry: any;
  // LocationCountrycode: any;
  // LocationRegion: any;
  // LocationCity: any
  // Locationlatitude: any;
  // Locationlongitude: any;
  constructor(private service: FarginServiceService, private location: Location, private toaster: ToastrService, private router: Router) {
  }

  ngOnInit(): void {


    // this.service.getIpAddress().subscribe((res: any) => {
    //   this.ipAddress = res.ip;

    // })

    // this.service.getIpLocation().subscribe((res: any) => {
    //   this.geoDetails = res;
    //   this.LocationCountry = this.geoDetails.country;
    //   this.LocationCountrycode = res.country_phone;
    //   this.LocationRegion = this.geoDetails.region;
    //   this.LocationCity = this.geoDetails.city;
    //   this.Locationlatitude = this.geoDetails.latitude;
    //   this.Locationlongitude = this.geoDetails.longitude;
    //   // const [latitude, longitude] = res.loc.split(','); this.Locationlatitude = latitude; this.Locationlongitude = longitude;

    //   console.log("this.geoDetails" + this.geoDetails)
    //   console.log("this.LocationCountry" + this.LocationCountry)
    //   console.log("this.LocationCountrycode" + this.LocationCountrycode)
    //   console.log("this.LocationRegion" + this.LocationRegion)
    //   console.log("this.LocationCity" + this.LocationCity)
    //   console.log("this.Locationlatitude" + this.Locationlatitude)
    //   console.log("this.Locationlongitude" + this.Locationlongitude)



    // })


    this.myForm = new FormGroup({
      Name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),

      mobilenumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$')
      ]),
      alternativemobilenumber: new FormControl('', [
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$')
      ]),

      contactEmail: new FormControl('', [
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')
      ]),
      oldDoorNo: new FormControl('', Validators.required),
      NewDoorNo: new FormControl(''),

      FlatNo: new FormControl(''),
      housename: new FormControl(''),
      Apartment: new FormControl(''),
      Streetname: new FormControl('', Validators.required),

      area: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      landmark: new FormControl(''),

      country: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),


      state: new FormControl('', Validators.required),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      pincode: new FormControl('', [
        Validators.required,
        Validators.pattern("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$")

      ]),

      lineType: new FormControl('', Validators.required),
      customerMsoId: new FormControl('', Validators.pattern('^[a-zA-Z0-9 ]*$')),
      advance: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.pattern('^[1-9][0-9]*(\.[0-9]{1,2})?$')]),
      customerReferenceId: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]),

      age: new FormControl('', [Validators.pattern('^[1-9][0-9]*(\.[0-9]+)?$')]),

      branchStatus: new FormControl('', Validators.required),

      branchId: new FormControl('',),



    });

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

    })

    this.service.BranchView(this.merchantId).subscribe((res: any) => {
      if(res.flag==1){
        this.branchviews = res.response;
        this.branchstatus = true;
      }
      else if (res.flag==2){
        this.branchstatus = false;
      }
    })

  }


  // First Form

  get Name() {
    return this.myForm.get('Name')

  }
  get mobilenumber() {
    return this.myForm.get('mobilenumber')

  }

  get alternativemobilenumber() {
    return this.myForm.get('alternativemobilenumber')

  }

  get contactEmail() {
    return this.myForm.get('contactEmail')

  }
  get oldDoorNo() {
    return this.myForm.get('oldDoorNo')

  }
  get NewDoorNo() {
    return this.myForm.get('NewDoorNo')

  }


  get FlatNo() {
    return this.myForm.get('FlatNo')

  }
  get Apartment() {
    return this.myForm.get('Apartment')

  }
  get housename() {
    return this.myForm.get('housename')

  }
  get Streetname() {
    return this.myForm.get('Streetname')

  }


  get area() {
    return this.myForm.get('area')

  }
  get landmark() {
    return this.myForm.get('landmark')

  }
  get country() {
    return this.myForm.get('country')

  }

  get lineType() {
    return this.myForm.get('lineType')
  }

  get state() {
    return this.myForm.get('state')

  }
  get city() {
    return this.myForm.get('city')

  }
  get pincode() {
    return this.myForm.get('pincode')

  }
  get age() {
    return this.myForm.get('age')

  }
  get customerReferenceId() {
    return this.myForm.get('customerReferenceId')

  }

  get branchStatus() {
    return this.myForm.get('branchStatus')

  }

  get branchId() {
    return this.myForm.get('branchId')

  }

  // get setupbox() {
  //   return this.myForm.get('setupbox')

  // }
  // get mso() {
  //   return this.myForm.get('mso')
  // }

  // get paidChannel() {
  //   return this.myForm.get('paidChannel')

  // }
  // get broadcaster() {
  //   return this.myForm.get('broadcaster')

  // }
  // get lcop() {
  //   return this.myForm.get('lcop')
  // }
  get advance() {
    return this.myForm.get('advance')
  }
  get amount() {
    return this.myForm.get('amount')
  }


  get customerMsoId() {
    return this.myForm.get('customerMsoId')
  }


  getServiceId(event: any,) {
    this.ActiveSetupbox = [];
    this.serviceId = event.target.value;

    this.service.ActiveSetupBoxByMerchantId(this.merchantId, this.serviceId).subscribe((res: any) => {
      this.ActiveSetupbox = res.response;
    });
  }

  toggleAllSelection1() {
    if (this.allSelected1) {
      this.select1.options.forEach((item: MatOption) => item.select());
    } else {
      this.select1.options.forEach((item: MatOption) => item.deselect());
    }
  }
  toggleAllSelection2() {
    if (this.allSelected2) {
      this.select2.options.forEach((item: MatOption) => item.select());
    } else {
      this.select2.options.forEach((item: MatOption) => item.deselect());
    }
  }
  toggleAllSelection3() {
    if (this.allSelected3) {
      this.select3.options.forEach((item: MatOption) => item.select());
    } else {
      this.select3.options.forEach((item: MatOption) => item.deselect());
    }
  }

  submit() {
    let submitModel: CustomerCreate = {
      area: this.area?.value.trim(),
      customerName: this.Name?.value.trim(),
      countryName: this.country?.value.trim(),
      stateName: this.state?.value.trim(),
      pincodeName: this.pincode?.value.trim(),
      freeLine: this.lineType?.value,
      emailAddress: this.contactEmail?.value.trim(),
      alterMobileNumber: this.alternativemobilenumber?.value.trim() || "",
      apartmentName: this.Apartment?.value.trim() || "-",
      doorNumber: this.oldDoorNo?.value.trim() || "-",
      flatNumber: this.FlatNo?.value.trim() || "-",
      blockNumber: this.NewDoorNo?.value.trim() || "-",
      landmark: this.landmark?.value.trim() || "-",
      customerReferenceId: this.customerReferenceId?.value.trim(),
      age: this.age?.value.trim(),
      streetName: this.Streetname?.value.trim(),
      mobileNumber: this.mobilenumber?.value.trim(),
      houseName: this.housename?.value.trim() || "-",
      customerMsoId: this.customerMsoId?.value.trim() || "",
      merchantId: this.merchantId,
      branchStatus: this.branchStatus?.value,
      branchId: this.branchId?.value || null,

      // alcotId: this.paidChannel?.value || this.emptyalcot,
      // bouquetId: this.broadcaster?.value || this.EmptyBouquet,
      // lcopId: this.lcop?.value,
      // stbId: this.setupbox?.value,
      cityName: this.city?.value.trim(),
      advanceStatus: this.advance?.value,
      advanceAmount: this.amount?.value.trim(),
      createdBy: this.getadminname
    }
    this.service.OnboardCustomer(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.customerdetails = res.response;
        this.toaster.success(res.responseMessage);
        this.router.navigateByUrl('dashboard/view-customer')
      
      }
      else {
        this.toaster.error(res.responseMessage)
      }
    })
  }

  close() {
    this.location.back()
  }
}
