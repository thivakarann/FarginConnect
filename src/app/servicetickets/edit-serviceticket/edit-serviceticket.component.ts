import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Tickets } from '../../fargin-model/fargin-model.module';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { log } from 'console';

@Component({
  selector: 'app-edit-serviceticket',
  templateUrl: './edit-serviceticket.component.html',
  styleUrl: './edit-serviceticket.component.css'
})
export class EditServiceticketComponent implements OnInit{
  editFormGroup: any = FormGroup;
  editImageForm: any = FormGroup;
  file!: File;
  ticketMemberRaiseId: any;
  image: any;
  FormGroup: any;
  ticketValue: any;
  raiseTicketId: any;
  subjects: any;
  status: any;
  critical: any;
  descriptions: any;
  uploadidentityfront: any;
  stickercounts:any;
  emptyBlob = new Blob([], { type: 'application/pdf' })
  stickerPerAmount: any;
  totalAmount: number = 0;
   totalAmountControl!: FormControl;
viewall:any;
  totalAmounts!: any;
  total:any;
  emptycount:any
  deliveryDays:any;
  Countvalue: any;
 
  constructor(private service: FarginServiceService, private toastr: ToastrService,
    private formBuilder: FormBuilder, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
 
 
  ngOnInit(): void {
 
    this.service.Sticker().subscribe((res: any) => {
      this.viewall = res.response;
      this.stickerPerAmount = res.response[0].stickerPerAmount;
  console.log(this.stickerPerAmount)
  this.deliveryDays = res.response[0].deliveryDays;
  console.log(this.deliveryDays)
      console.log(this.viewall)
 
   this.calculateTotal()
 
 
    });
 
    this.raiseTicketId = this.data.value.raiseTicketId
 
 
    this.totalAmountControl = new FormControl(this.totalAmount, [Validators.required]);
 
    this.editFormGroup = this.formBuilder.group({
      subject: new FormControl('', [Validators.required]),
      ticketStatus: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      stickerCount: new FormControl('', [Validators.pattern('^[0-9]+$')]),
    })
    this.editImageForm = this.formBuilder.group({
      document: new FormControl('')
    })
 
    this.subjects = this.data.value.subject
    this.editFormGroup.controls['subject'].value = this.subjects
 
    this.critical = this.data.value.ticketStatus
    this.editFormGroup.controls['ticketStatus'].value = this.critical
 
 
    this.descriptions = this.data.value.description
    this.editFormGroup.controls['description'].value = this.descriptions
 
   
    this.stickercounts = this.data.value.stickerCount
    this.editFormGroup.controls['stickerCount'].value = this.stickercounts
 
    console.log('stickercount',this.stickercounts)
    console.log('stickerperamount',this.stickerPerAmount)
 
 
    // this.total = Number(this.stickercounts) * Number(this.stickerPerAmount);
   
    // console.log('Total Amount:', this.total);
 
  }
 
  numbers(event: any) {
    const charcode = (event.which) ? event.which : event.keycode;
    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
      return false;
    }
    return true;
  }
 
 
  onFileSelected(event: any) {
    this.uploadidentityfront = event.target.files[0];
 
    // Ensure this.uploadImage is not null
    if (this.uploadidentityfront) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
 
      if (acceptableTypes.includes(this.uploadidentityfront.type)) {
        if (this.uploadidentityfront.size <= 20 * 1024 * 1024) {
          this.toastr.success("uploaded successfully");
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
 
  calculateTotal() {
 
    // console.log(this.stickercounts)
    // console.log(this.stickerPerAmount)
 
    // console.log(typeof(this.stickercounts))
    // console.log(typeof(this.stickerPerAmount))
   
    if (this.stickercounts && this.stickerPerAmount) {
      this.total = Number(this.stickercounts) * Number(this.stickerPerAmount);
    console.log('Total Amount1:', this.total);  // Log to check the calculation
 
    }
 
    // Get the current sticker count value directly from the form control
    const stickerCount = this.editFormGroup.get('stickerCount')?.value;
 
      this.totalAmount = Number(stickerCount) * Number(this.stickerPerAmount);
      console.log('Total Amount2:', this.totalAmount);  // Log to check the calculation
 
  }
 
 
 
 
  get subject() {
    return this.editFormGroup.get('subject')
  }
  get ticketStatus() {
    return this.editFormGroup.get('ticketStatus')
  }
  get description() {
    return this.editFormGroup.get('description')
  }
  get document() {
    return this.editImageForm.get('document')
  }
 
  get stickerCount() {
    return this.editFormGroup.get('stickerCount')
  }
 
 
  onsubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData()
    formData.append('fileImage',this.uploadidentityfront || this.emptyBlob);
    formData.append('ticketId', this.raiseTicketId)
    this.service.editTicketImage(formData).subscribe((res: any) => {
      this.image = res.response;
 
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
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
    
    let submitModel: Tickets = {
      description: this.description?.value,
      subject: this.subject?.value,
      ticketStatus: this.ticketStatus?.value,
      // stickerCount: this.stickerCount?.value,
      stickerCount: this.Countvalue,
      raiseTicketId: this.raiseTicketId
    }
    this.service.updateTickets(submitModel).subscribe((res: any) => {
      this.ticketValue = res.response;
 
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()
     
      }
      else {
        this.toastr.error(res.response)
      }
      
    })

  }
  cancel() {
    this.dialog.closeAll()
  }
}
 