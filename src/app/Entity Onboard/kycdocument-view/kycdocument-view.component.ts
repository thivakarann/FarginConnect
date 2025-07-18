import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kycdocument-view',
  templateUrl: './kycdocument-view.component.html',
  styleUrl: './kycdocument-view.component.css',
})
export class KycdocumentViewComponent implements OnInit {
  id: any;
  imageSrc: any;
  flag: any;
  documentupload!: FormGroup;
  updatedata: any;
  errorMessage: any;
  file1: any;
  file2: any;
  file3: any;
  file4: any;
  file5: any;
  file6: any;
  pdfSrc: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private service: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.id = this.data.value;
    this.flag = this.data.value1;

    this.documentupload = new FormGroup({
      Image: new FormControl('', [Validators.required]),
    });

    this.service.getImageview(this.id, this.flag).subscribe({
      next: (res: any) => {
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

  get Image() {
    return this.documentupload.get('Image');
  }

  getimageId(event: any) {
    const files = event.target.files[0];
    if (files) {
      const fileName = files.name;
      const fileType = files.type;
      this.errorMessage = '';

      // Allowed file formats (JPEG, PNG, PDF)
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      const fileExtension = fileName.split('.').pop()?.toLowerCase();
      const blockedExtensions = ['vbs', 'js', 'webp'];

      // Reject unsupported formats **before processing**
      if (
        !allowedTypes.includes(fileType) ||
        blockedExtensions.includes(fileExtension)
      ) {
        this.toastr.error(
          'File format not supported. Upload JPEG, PNG, or PDF'
        );
        event.target.value = ''; // Clears the file input field immediately
        return;
      }

      // Assign files based on flag
      if (this.flag === 1) this.file1 = files;
      else if (this.flag === 2) this.file2 = files;
      else if (this.flag === 3) this.file3 = files;
      else if (this.flag === 4) this.file4 = files;
      else if (this.flag === 5) this.file5 = files;
      else if (this.flag === 6) this.file6 = files;
      else {
        this.toastr.error('Invalid flag selection.', 'Error');
        return;
      }

      // Process file upload
      const reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onloadend = () => {
        if (fileType.startsWith('image/')) {
          this.imageSrc = reader.result as string;
          this.pdfSrc = null;
        } else {
          this.pdfSrc = reader.result as string;
          this.imageSrc = null;
        }
      };
    }
  }

  Update() {
    if (this.flag == 1) {
      const formData = new FormData();
      formData.append('identityFrontPath', this.file1);
      formData.append('proofId', this.id);
      this.service.identityFront(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.updatedata = res.response;
          this.toastr.success(res.responseMessage);
          this.bankDetailsUpdated.emit();
          this.dialog.closeAll();
        }
      });
    }
    if (this.flag == 2) {
      const formData = new FormData();
      formData.append('identityBackPath', this.file2);
      formData.append('proofId', this.id);
      this.service.identityBack(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.updatedata = res.response;
          this.toastr.success(res.responseMessage);
          this.bankDetailsUpdated.emit();
          this.dialog.closeAll();
        }
      });
    }
    if (this.flag == 3) {
      const formData = new FormData();
      formData.append('addressFrontPath', this.file3);
      formData.append('proofId', this.id);
      this.service.addressFront(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.updatedata = res.response;
          this.toastr.success(res.responseMessage);
          this.bankDetailsUpdated.emit();
          this.dialog.closeAll();
        }
      });
    }

    if (this.flag == 4) {
      const formData = new FormData();
      formData.append('addressBackPath', this.file4);
      formData.append('proofId', this.id);
      this.service.addressBack(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.updatedata = res.response;
          this.toastr.success(res.responseMessage);
          this.bankDetailsUpdated.emit();
          this.dialog.closeAll();
        }
      });
    }

    if (this.flag == 5) {
      const formData = new FormData();
      formData.append('signatureFrontPath', this.file5);
      formData.append('proofId', this.id);
      this.service.signatureFront(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.updatedata = res.response;
          this.toastr.success(res.responseMessage);
          this.bankDetailsUpdated.emit();
          this.dialog.closeAll();
        }
      });
    }

    if (this.flag == 6) {
      const formData = new FormData();
      formData.append('signatureBackPath', this.file6);
      formData.append('proofId', this.id);
      this.service.signatureBack(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.updatedata = res.response;
          this.toastr.success(res.responseMessage);
          this.bankDetailsUpdated.emit();
          this.dialog.closeAll();
        }
      });
    }
  }
}
