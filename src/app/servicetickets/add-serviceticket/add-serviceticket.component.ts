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
  viewall:any
  ticket: any;
  merchantId: any = localStorage.getItem('merchantId');
  uploadidentityfront: any;
  emptyBlob = new Blob([], { type: 'application/pdf' })
  stickerPerAmount!: number;
  totalAmount: number = 0;
   totalAmountControl!: FormControl;
   deliveryDays:any
   Countvalue:any;
  constructor(
    private service: FarginServiceService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
     private dialog: MatDialog
  ) { }
 
  ngOnInit(): void {
 
   
    this.service.Sticker().subscribe((res: any) => {
      this.viewall = res.response;
      this.stickerPerAmount = res.response[0].stickerPerAmount;
      this.deliveryDays = res.response[0].deliveryDays;
      console.log(this.deliveryDays)
  console.log(this.stickerPerAmount)
      console.log(this.viewall)
    });
   
 
    this.totalAmountControl = new FormControl(this.totalAmount, [Validators.required]);
 
    this.ticketFormGroup = this.formBuilder.group({
      subject: new FormControl('', [Validators.required]),
      stickerCount: new FormControl('', [Validators.pattern('^[0-9]+$')]),
      ticketStatus: new FormControl('', [Validators.required]),
      document: new FormControl(''),
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
  get stickerCount() {
    return this.ticketFormGroup.get('stickerCount');
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
 
  calculateTotal(stickerCount: number): void {
    if (stickerCount && this.stickerPerAmount) {
      this.totalAmount = stickerCount * this.stickerPerAmount;
      this.totalAmountControl.setValue(this.totalAmount);
    }
  }
 
  save() {

    if(this.subject.value !='Sticker Request'){
      this.Countvalue = 0;
console.log(this.Countvalue)
  }

  else {
    this.Countvalue = Number(this.stickerCount.value)
console.log(this.Countvalue)

  }
    
    const formData = new FormData();
    formData.append('merchantId', this.merchantId);
    formData.append('subject', this.subject?.value);
    formData.append('description', this.description?.value);
    formData.append('fileImage', this.uploadidentityfront  || this.emptyBlob);
    formData.append('ticketStatus', this.ticketStatus?.value);
    formData.append('stickerCount', this.Countvalue);
 
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