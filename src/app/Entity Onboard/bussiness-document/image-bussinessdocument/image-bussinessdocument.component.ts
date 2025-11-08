import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-image-bussinessdocument',
  templateUrl: './image-bussinessdocument.component.html',
  styleUrl: './image-bussinessdocument.component.css',
})
export class ImageBussinessdocumentComponent {
  imageSrc: any;
  pdfSrc: any;
  id: any;
  flag: any;
  documentupload!: FormGroup;
  errorMessage: any;
  file1: any;
  file2: any;
  updatedata: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');

  constructor(
    private service: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private cryptoService: EncyDecySericeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.data.value;
    this.flag = this.data.value1;

    this.documentupload = new FormGroup({
      Image: new FormControl('', [Validators.required]),
    });

    this.service.getdocumentImage(this.id, this.flag).subscribe({
      next: (res: Blob) => {
        const contentType = res.type;

        if (contentType.startsWith('image/')) {
          const reader = new FileReader();
          reader.readAsDataURL(res);
          reader.onloadend = () => {
            this.imageSrc = reader.result as string;
            this.pdfSrc = null;
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
      },
    });
  }

  getimageId(event: any) {
    console.log(event);
    const files = event.target.files[0];
    if (files) {
      const fileName = files.name;
      const fileType = files.type;
      if (this.flag === 1) {
        this.errorMessage = '';
        if (fileType.startsWith('image/')) {
          this.file1 = files;
          const reader = new FileReader();
          reader.readAsDataURL(files);
          reader.onloadend = () => {
            this.imageSrc = reader.result as string;
            this.pdfSrc = null;
          };
          console.log('Image file uploaded successfully: ' + fileName);
        } else if (fileType === 'application/pdf') {
          this.file1 = files;
          const reader = new FileReader();
          reader.readAsDataURL(files);
          reader.onloadend = () => {
            this.pdfSrc = reader.result as string;
            this.imageSrc = null;
          };
          console.log('PDF file uploaded successfully: ' + fileName);
        } else {
          this.errorMessage = 'Only Images or PDFs are allowed';
        }
      } else if (this.flag === 2) {
        this.errorMessage = '';
        if (fileType.startsWith('image/')) {
          this.file2 = files;
          const reader = new FileReader();
          reader.readAsDataURL(files);
          reader.onloadend = () => {
            this.imageSrc = reader.result as string;
            this.pdfSrc = null;
          };
          console.log('Image file uploaded successfully: ' + fileName);
        } else if (fileType === 'application/pdf') {
          this.file2 = files;
          const reader = new FileReader();
          reader.readAsDataURL(files);
          reader.onloadend = () => {
            this.pdfSrc = reader.result as string;
            this.imageSrc = null;
          };
          console.log('PDF file uploaded successfully: ' + fileName);
        } else {
          this.errorMessage = 'Only Images or PDFs are allowed ';
        }
      }
    }
  }

  Update() {
    const formData = new FormData();
    formData.append('merchantDocumentId', this.id);
    formData.append('modifiedBy', "");

    if (this.flag === 1 && this.file1) {
      formData.append('docFrontPath', this.file1);
      this.service.documentFrontedit(formData).subscribe((res: any) => {
        if (res.flag === 1) {
          this.updatedata = res.response;
          this.toastr.success(res.responseMessage);
          this.dialog.closeAll();
        }
      });
    }

    if (this.flag === 2 && this.file2) {
      formData.append('docBackPath', this.file2);
      this.service.documentBackedit(formData).subscribe((res: any) => {
        if (res.flag === 1) {
          this.updatedata = res.response;
          this.toastr.success(res.responseMessage);
          this.bankDetailsUpdated.emit();
          this.dialog.closeAll();
        }
      });
    }
  }
}
