import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-image-bussinessdocument',
  templateUrl: './image-bussinessdocument.component.html',
  styleUrl: './image-bussinessdocument.component.css'
})
export class ImageBussinessdocumentComponent {
  imageSrc: any;
  id: any;
  flag: any;
  documentupload!: FormGroup;
  errorMessage: any;
  file1: any;
  file2:any
  updatedata: any;

  constructor(private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) { }

  ngOnInit(): void {


    this.id = this.data.value
    console.log(this.id);

    this.flag = this.data.value1
    console.log(this.flag);

    this.documentupload = new FormGroup({
      Image: new FormControl('', [Validators.required]),

    })

    this.service.getdocumentImage(this.id, this.flag).subscribe({
      next: (res: any) => {
        console.log(this.id, this.flag);

        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onloadend = () => {
          this.imageSrc = reader.result as string;
        }
      },

    })
  }

  getimageId(event: any) {
    console.log(event);
    if(this.flag==1){
      const files = event.target.files[0];
      if (files) {
        const fileName1: string = files.name;
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

    if(this.flag==2){
      const files = event.target.files[0];
      if (files) {
        const fileName2: string = files.name;
        if (!files.type.startsWith('image/')) {
  
          this.errorMessage = 'Only Images are allowed';
          return;
  
        }
        this.errorMessage = ''
        this.file2 = files;
        console.log(this.file2);
        console.log(' file 1 id success' + files);
      }
    }
  }

   
  Update() {

    if (this.flag == 1) {
      const formData = new FormData;
      
      formData.append('merchantDocumentId',this.id)
      formData.append('docFrontPath', this.file1);
      formData.append('modifiedBy', this.id);
      this.service.documentFrontedit(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.updatedata = res.response;
          this.dialog.closeAll();
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
      })
    }
    if (this.flag == 2) {
      const formData = new FormData;
      formData.append('merchantDocumentId',this.id)
      formData.append('docBackPath', this.file2);
      formData.append('modifiedBy', this.id);
      this.service.documentBackedit(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.updatedata = res.response;
          this.dialog.closeAll();
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
      })
    }
  }
}
