import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alcart-add',
  templateUrl: './alcart-add.component.html',
  styleUrl: './alcart-add.component.css',
})
export class AlcartAddComponent implements OnInit {
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  emptyBlob = new Blob([], { type: 'image/jpeg' });
  placeholderImage!: File;
  myForm!: FormGroup;
  regiondetails: any;
  file1!: File;
  errorMessage: any;
  Broadcasters: any;
  broadcastersid: any;
  msoactive: any;
  msoregion: any;
  msroregion: any;
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
    });
    this.AddAlcart.RegionGetAll().subscribe((res: any) => {
      this.regiondetails = res.response.reverse();
    });

    this.AddAlcart.MSOActive().subscribe((res: any) => {
      this.msoactive = res.response.reverse();
    });

    this.myForm = new FormGroup({
      regionId: new FormControl('', Validators.required),
      serviceId: new FormControl('', Validators.required),
      channelName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(100),
      ]),
      price: new FormControl('', [
        Validators.pattern('^(?!0+(\\.0{1,2})?$)\\d+(\\.\\d{1,2})?$'),
      ]),
      type: new FormControl('', Validators.required),
      bundleChannelId: new FormControl('', Validators.required),
      generic: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]{1,50}$'),
      ]),
      language: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]{1,50}$'),
      ]),
      channelNo: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{1,10}$/),
      ]),
      logo: new FormControl(''),
    });

    this.loadPlaceholderImage().then(file => {
      this.placeholderImage = file;
    });




  }

  get regionId() {
    return this.myForm.get('regionId');
  }
  get channelName() {
    return this.myForm.get('channelName');
  }

  get price() {
    return this.myForm.get('price');
  }
  get type() {
    return this.myForm.get('type');
  }
  get serviceId() {
    return this.myForm.get('serviceId');
  }

  get bundleChannelId() {
    return this.myForm.get('bundleChannelId');
  }
  get generic() {
    return this.myForm.get('generic');
  }

  get language() {
    return this.myForm.get('language');
  }

  get channelNo() {
    return this.myForm.get('channelNo');
  }

  get logo() {
    return this.myForm.get('logo');
  }

  typechange(event: any) {
    this.myForm.get('price')?.setValue('');
  };

  async loadPlaceholderImage(): Promise<File> {
    const res = await fetch('assets/empty-Image.jpeg');
    const blob = await res.blob();
    return new File([blob], 'placeholder.jpg', { type: blob.type });
  }

  onFileSelected(event: any) {
    this.uploadidentityfront = event.target.files[0];
    // Ensure this.uploadImage is not null
    if (this.uploadidentityfront) {
      const acceptableTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
      ];
      if (acceptableTypes.includes(this.uploadidentityfront.type)) {
        if (this.uploadidentityfront.size <= 20 * 1024 * 1024) {
          this.toastr.success('Image uploaded successfully');
        } else {
          this.toastr.error('Max Image size exceeded');
          this.logo?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        this.toastr.error('File type not acceptable');
        this.logo?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error('No file selected');
    }
  }

  mso(event: any) {
    this.msoregion = event?.target?.value;
    this.AddAlcart.MSORegions(this.msoregion).subscribe((res: any) => {
      this.msroregion = res.response;
    });
  }

  submit(event: Event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('regionId', this.regionId?.value);
    formData.append('serviceId', this.serviceId?.value);
    formData.append('channelName', this.channelName?.value.trim());
    formData.append('price', this.price?.value || '0');
    formData.append('bundleChannelId', this.bundleChannelId?.value);
    formData.append('generic', this.generic?.value.trim());
    formData.append('language', this.language?.value.trim());
    formData.append('createdBy', this.getadminname);
    formData.append('type', this.type?.value);
    formData.append('channelNo', this.channelNo?.value.trim());
    formData.append('logo', this.uploadidentityfront || this.placeholderImage);
    this.AddAlcart.AlcardAdd(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.router.navigateByUrl('dashboard/alacarte-viewall');
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }

  close() {
    this.router.navigateByUrl('dashboard/alacarte-viewall');
  }
}
