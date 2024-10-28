import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-addsigners',
  templateUrl: './addsigners.component.html',
  styleUrl: './addsigners.component.css'
})
export class AddsignersComponent {
  addsigners: any = FormGroup;
  selectedFile: any = ImageSnippet;
  docName: any;
  fromupload: any;
  UploadPdf: any;
  Pdfid: any;
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }


  ngOnInit(): void {


    this.addsigners = new FormGroup({
      categoryName: new FormControl('', [Validators.required]),
      mccCode: new FormControl('', [Validators.required]),

    });

  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFile.pending = true;

      this.toastr.info('you Uploaded ' + this.selectedFile.file.name);
      this.docName = this.selectedFile.file.name;
      
    });

    this.toastr.show('Click upload For Next Process');

    reader.readAsDataURL(file);
  }

  get categoryName() {
    return this.addsigners.get('categoryName');
  }

  get mccCode() {
    return this.addsigners.get('mccCode');
  }
  get mccCodes() {
    return this.addsigners.get('mccCode');
  }

  // submit() {
  //   const formData = new FormData();
  //   formData.append('adminId', this.localname);
  //   formData.append('pdfDocument', this.selectedFile.file);
  //   formData.append('documentTitle', this.fromupload.docname);
  //   formData.append('description', this.fromupload.Docdesc);

  //   this.UploadPdf.uploadDocument(formData).subscribe((res: any) => {
  //     this.Pdfid = res.data.merchantId;
  //     

  //     if (res.flag == 1) {
  //       this.toastr.success(res.message);

  //  window.location.reload();
       

  //       // window.location.reload();
  //     } else {
  //       this.toastr.error(res.message);
  //     }
  //   });
  // }
 

}
