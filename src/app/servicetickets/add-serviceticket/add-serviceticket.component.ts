import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) { }
}
@Component({
  selector: 'app-add-serviceticket',
  templateUrl: './add-serviceticket.component.html',
  styleUrl: './add-serviceticket.component.css',
})
export class AddServiceticketComponent implements OnInit {
  ticketFormGroup: any = FormGroup;
  selectedFile: any = ImageSnippet;

  ticket: any;
  merchantId: any = localStorage.getItem('merchantId');
  uploadidentityfront: any;

  constructor(
    private service: FarginServiceService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
     private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.ticketFormGroup = this.formBuilder.group({
      subject: new FormControl('', [Validators.required]),
      ticketStatus: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  numbers(event: any) {
    const charcode = event.which ? event.which : event.keycode;
    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
      return false;
    }
    return true;
  }

  get subject() {
    return this.ticketFormGroup.get('subject');
  }
  get ticketStatus() {
    return this.ticketFormGroup.get('ticketStatus');
  }
  get document() {
    return this.ticketFormGroup.get('document');
  }
  get description() {
    return this.ticketFormGroup.get('description');
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
          this.document?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        
        this.toastr.error("File type not acceptable");
        this.document?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      this.toastr.error("No file selected");
    }


  }
  save() {
    const formData = new FormData();
    formData.append('merchantId', this.merchantId);
    formData.append('subject', this.subject?.value);
    formData.append('description', this.description?.value);
    formData.append('fileImage', this.uploadidentityfront);
    formData.append('ticketStatus', this.ticketStatus?.value);
    
    this.service.addserviceTicket(formData).subscribe((res: any) => {
      this.ticket = res.response;
      
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }

  cancel() {
    this.router.navigateByUrl('dashboard/view-serviceticket');
  }
}
