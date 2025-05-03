import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alcart-add',
  templateUrl: './alcart-add.component.html',
  styleUrl: './alcart-add.component.css'
})
export class AlcartAddComponent implements OnInit {
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  regiondetails: any;
  file1!: File;
  errorMessage: any;
  Broadcasters: any;
  broadcastersid: any;
  msoactive: any;
  msoregion: any;
  msroregion: any
  uploadidentityfront: any;
  identityFrontPath: any;
  constructor(
    public AddAlcart: FarginServiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {



    this.AddAlcart.BroadCasterGetAllActive().subscribe((res: any) => {
      this.Broadcasters = res.response.reverse();
    })
    this.AddAlcart.RegionGetAll().subscribe((res: any) => {
      this.regiondetails = res.response.reverse();
    })

    this.AddAlcart.MSOActive().subscribe((res: any) => {
      this.msoactive = res.response.reverse();
    })


    this.myForm = new FormGroup({
      regionId: new FormControl('', Validators.required),
      serviceId: new FormControl('', Validators.required),
      channelName: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9 ]{1,50}$/)]),
      price: new FormControl('', [Validators.pattern("^[1-9][0-9]*(\.[0-9]{1,2})?$")]),
      type: new FormControl('',Validators.required),
      bundleChannelId: new FormControl('', Validators.required),
      generic: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z ]{1,50}$")]),
      language: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z ]{1,50}$")]),
      channelNo: new FormControl('',[Validators.required,Validators.pattern(/^\d{1,10}$/)]),
      logo: new FormControl('', Validators.required),

    });

    // this.myForm.get('type')?.valueChanges.subscribe(value => {
    //   if (value !== '1') {
    //     this.myForm.get('price')?.reset();
    //   }
    // });


  }

  get regionId() {
    return this.myForm.get('regionId')

  }
  get channelName() {
    return this.myForm.get('channelName')

  }

  get price() {
    return this.myForm.get('price')

  }
  get type() {
    return this.myForm.get('type')

  }
  get serviceId() {
    return this.myForm.get('serviceId')

  }

  get bundleChannelId() {
    return this.myForm.get('bundleChannelId')

  }
  get generic() {
    return this.myForm.get('generic')

  }

  get language() {
    return this.myForm.get('language')

  }

  get channelNo() {
    return this.myForm.get('channelNo')

  }

  get logo() {
    return this.myForm.get('logo')

  }

  // getbuddlechanneld(id: any) {
  //   this.AddAlcart.ActiveRegionsbyserviceprovider(id).subscribe((res: any) => {
  //     this.regiondetails = res.response;
  //   });
  // }

  typechange(event: any) {
    this.myForm.get('price')?.setValue('');
  }

  onFileSelectedidproof(event: any) {
    const files = event.target.files[0];
    if (files) {
      const fileName: string = files.name;
      const fileextension: any = fileName.split('.').pop()?.toLowerCase();
      const dotcount = fileName.split('.').length - 1;
      // if (dotcount > 1) {

      //   this.errorMessage = 'Files with multiple extensions are not allowed';
      //   return;


      // }
      if (!files.type.startsWith('image/')) {

        this.errorMessage = 'Only Images are allowed';
        return;

      }


      this.errorMessage = ''
      this.file1 = files;




    }


  }



  onFileSelected(event: any) {
    this.uploadidentityfront = event.target.files[0];

    // Ensure this.uploadImage is not null
    if (this.uploadidentityfront) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

      if (acceptableTypes.includes(this.uploadidentityfront.type)) {
        if (this.uploadidentityfront.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        } else {
          this.toastr.error("Max Image size exceeded");
          this.logo?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {

        this.toastr.error("File type not acceptable");
        this.logo?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
    }


  }

  mso(event: any) {
    this.msoregion = event?.target?.value
    this.AddAlcart.MSORegions(this.msoregion).subscribe((res: any) => {
      this.msroregion = res.response;
    })
  }

  submit(event: Event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('regionId', this.regionId?.value);
    formData.append('channelName', this.channelName?.value.trim());
    formData.append('price', this.price?.value || "0");
    formData.append('bundleChannelId', this.bundleChannelId?.value);
    formData.append('generic', this.generic?.value.trim());
    formData.append('language', this.language?.value.trim());
    formData.append('createdBy', this.getadminname);
    formData.append('type', this.type?.value);
    formData.append('channelNo', this.channelNo?.value.trim())
    formData.append('logo', this.uploadidentityfront);
    this.AddAlcart.AlcardAdd(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);

        this.router.navigateByUrl('dashboard/alacarte-viewall');
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })




  }


  // submit() {
  //   let submitModel: AddAlcarrt = {

  //     regionId: this.regionId?.value,
  //     channelName: this.channelName?.value,
  //     price: this.price?.value == null ? '0' : this.price?.value,
  //     broadCaster: this.broadCaster?.value,
  //     generic: this.generic?.value,
  //     language: this.language?.value,
  //     createdBy: this.getadminname,
  //     type: this.type?.value

  //   }
  //  
  //   this.AddAlcart.AlcardAdd(submitModel).subscribe((res: any) => {
  //     if (res.flag == 1) {
  //       this.toastr.success(res.responseMessage);
  //       this.router.navigateByUrl('dashboard/alacarte-viewall');
  //     }
  //     else {
  //       this.toastr.error(res.responseMessage);
  //     }
  //   })
  // }


  close() {
    this.router.navigateByUrl('dashboard/alacarte-viewall');
  }

}
