import { Component, Inject, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kycdocument-view',
  templateUrl: './kycdocument-view.component.html',
  styleUrl: './kycdocument-view.component.css'
})
export class KycdocumentViewComponent implements OnInit{
  id: any;
  imageSrc: any;
  flag: any;
  documentupload!: FormGroup;
  updatedata: any;
  errorMessage: any;
  file1: any;
  file2:any
  file3: any;
  file4: any;
  file5: any;
  file6: any;
pdfSrc: any;
 
  constructor(private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) { }
 
  ngOnInit(): void {
 
 
    this.id = this.data.value
    
 
    this.flag = this.data.value1
    
 
    this.documentupload = new FormGroup({
      Image: new FormControl('', [Validators.required]),
 
    })
 
    this.service.getImageview(this.id, this.flag).subscribe({
      next: (res: any) => {
        const contentType = res.type; // Get the content type of the response
   
        if (contentType.startsWith('image/')) {
          const reader = new FileReader();
          reader.readAsDataURL(res);
          reader.onloadend = () => {
            this.imageSrc = reader.result as string; // For displaying the image
            this.pdfSrc = null; // Reset PDF source
          };
        } else if (contentType === 'application/pdf') {
          var downloadURL = URL.createObjectURL(res);
          window.open(downloadURL);
        } else {
          console.error('Unsupported file type:', contentType);
        }
      },
      error: (err) => {
        console.error('Error fetching document image:', err);
      }
    })
  }
 
 
  get Image() {
    return this.documentupload.get('Image');
  }
 
  getimageId(event: any) {
    
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
        
        
      }
    }
 
    if(this.flag==3){
      const files = event.target.files[0];
      if (files) {
        const fileName3: string = files.name;
        if (!files.type.startsWith('image/')) {
 
          this.errorMessage = 'Only Images are allowed';
          return;
 
        }
        this.errorMessage = ''
        this.file3 = files;
        
        
      }
    }
    if(this.flag==4){
      const files = event.target.files[0];
      if (files) {
        const fileName4: string = files.name;
        if (!files.type.startsWith('image/')) {
 
          this.errorMessage = 'Only Images are allowed';
          return;
 
        }
        this.errorMessage = ''
        this.file4 = files;
        
        
      }
    }
 
    if(this.flag==5){
      const files = event.target.files[0];
      if (files) {
        const fileName5: string = files.name;
        if (!files.type.startsWith('image/')) {
 
          this.errorMessage = 'Only Images are allowed';
          return;
 
        }
        this.errorMessage = ''
        this.file5 = files;
        
        
      }
    }
 
    if(this.flag==6){
      
     
      const files6 = event.target.files[0];
      if (files6) {
        const fileName6: string = files6.name;
        if (!files6.type.startsWith('image/')) {
 
          this.errorMessage = 'Only Images are allowed';
          return;
 
        }
        this.errorMessage = ''
        this.file6 = files6;
        
        
      }
    }
  }
 
  Update() {
 
    if (this.flag == 1) {
      const formData = new FormData;
      formData.append('identityFrontPath', this.file1);
      formData.append('proofId', this.id);
      this.service.identityFront(formData).subscribe((res: any) => {
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
      formData.append('identityBackPath', this.file2);
      formData.append('proofId', this.id);
      this.service.identityBack(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.updatedata = res.response;
          this.dialog.closeAll();
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
      })
    }
    if (this.flag == 3) {
      const formData = new FormData;
      formData.append('addressFrontPath', this.file3);
      formData.append('proofId', this.id);
      this.service.addressFront(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.updatedata = res.response;
          this.dialog.closeAll();
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
      })
    }
 
     
    if (this.flag == 4) {
      const formData = new FormData;
      formData.append('addressBackPath', this.file4);
      formData.append('proofId', this.id);
      this.service.addressBack(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.updatedata = res.response;
          this.dialog.closeAll();
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
      })
    }
 
    if (this.flag == 5) {
      const formData = new FormData;
      formData.append('signatureFrontPath', this.file5);
      formData.append('proofId', this.id);
      this.service.signatureFront(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.updatedata = res.response;
          this.dialog.closeAll();
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
      })
    }
 
     
    if (this.flag == 6) {
      const formData = new FormData;
      formData.append('signatureBackPath', this.file6);
      formData.append('proofId', this.id);
      this.service.signatureBack(formData).subscribe((res: any) => {
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
