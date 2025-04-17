import { Component, Inject } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-merchant-logo',
  templateUrl: './merchant-logo.component.html',
  styleUrl: './merchant-logo.component.css'
})
export class MerchantLogoComponent {
  id: any;
  imageSrc: any;
  flag: any;
  logoUpdate!:FormGroup;
  modifiedBy = JSON.parse(sessionStorage.getItem('adminname') || '');
  imageFile1!: string | Blob;
  updatedata: any;
  errorMessage!: string;
  file1: any;
  logoLink: any;
  logoLink1: any;
  upload: any;
  DocView: boolean = false;

  constructor(private service:FarginServiceService ,@Inject(MAT_DIALOG_DATA) public data:any,private dialog:MatDialog, private toastr:ToastrService)  {}

  ngOnInit(): void {

    // this.id = this.data.value
    
    // this.logoLink=this.data.value1
    // console.log("logo"+ this.logoLink )
    
    
    //   this.logoLink1 = this.converttohhttps(this.logoLink);

    //   console.log("ConvertImage" + this.logoLink1)
        

    // this.logoUpdate = new FormGroup({
    //   merchantlogo: new FormControl('', [Validators.required]),
    // })
    
   
    this.id = this.data.value;
    this.logoLink = this.data.value1;
  
    console.log('Logo Link:', this.logoLink);
  
    // Set DocView to false if logoLink or logoLink1 is "NA" or invalid
    this.logoLink1 =   this.logoLink !== "NA" ? this.converttohhttps(this.logoLink) : null;
    this.DocView = !!this.logoLink1; // DocView is true if logoLink1 is valid
  
    console.log('Converted Image URL:', this.logoLink1);
  
    this.logoUpdate = new FormGroup({
      merchantlogo: new FormControl('', [Validators.required]),
    });
  }


  get merchantlogo() {
    return this.logoUpdate.get('merchantlogo');
  }


  

converttohhttps(Url: string): string {
  return Url.replace('https:/', 'https://')
  }

  getlogoId(event: any) {
    this.upload = event.target.files[0];

    // Ensure this.uploadImage is not null
    if (this.upload) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'application/pdf'];

      if (acceptableTypes.includes(this.upload.type)) {
        if (this.upload.size <= 20 * 1024 * 1024) {
          this.toastr.success("Image uploaded successfully");
        }
        else {
          this.toastr.error("Max Image size exceeded");
          this.merchantlogo?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {

        this.toastr.error("File type not acceptable");
        this.merchantlogo?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
    }


  }
  Update(){
    const formData = new FormData;
    formData.append('merchantId ', this.id);
    formData.append('modifiedBy', this.modifiedBy);
    formData.append('merchantLogo ', this.upload);

    
    this.service.EntitylogoUpdate(formData).subscribe((res:any)=>{
      if(res.flag==1){
        this.updatedata=res.response;
        this.toastr.success(res.responseMessage);
      this.dialog.closeAll();

      }
    })

  }
}

