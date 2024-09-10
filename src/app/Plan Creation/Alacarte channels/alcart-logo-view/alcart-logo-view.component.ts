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
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  file1!: File;
  id: any;
  images!: string;
  errorMessage: any;

  constructor(
    public Viewlogoimage: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.id = this.data.value;
    console.log(this.id)

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
      console.log(this.file1);

      console.log(' file 1 id success' + files);

    }


  }

  submit(event: Event) {
    const formData = new FormData();
    formData.append('logo', this.file1);
    formData.append('modifiedBy', this.getadminname);
    formData.append('alcotId', this.id);

    this.Viewlogoimage.AlcartImageUpdate(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })


  }
}
