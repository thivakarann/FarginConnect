import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-alcart-logo-view',
  templateUrl: './alcart-logo-view.component.html',
  styleUrl: './alcart-logo-view.component.css'
})
export class AlcartLogoViewComponent implements OnInit {
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  file1!: File;
  id: any;
  images!: string;
  errorMessage: any;
  uploadidentityfront: any;
  identityFrontPath: any;

  constructor(
    public Viewlogoimage: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.id = this.data.value;
    

    this.Viewlogoimage.AlcartImageview(this.id).subscribe({
      next: (data: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
          this.images = reader.result as string;
        };
      },
      error: (error: any) => { },
    });

    this.myForm = new FormGroup({
      logo: new FormControl(null, [Validators.required]),
    });
  }

  get logo() {
    return this.myForm.get('logo')

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


  submit(event: Event) {
    const formData = new FormData();
    formData.append('logo', this.uploadidentityfront);
    formData.append('modifiedBy', this.getadminname);
    formData.append('alcotId', this.id);

    this.Viewlogoimage.AlcartImageUpdate(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
      
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })


  }
}
