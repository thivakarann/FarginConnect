import { Component, Inject } from '@angular/core';
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
export class EditServiceticketComponent {
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
  constructor(private service: FarginServiceService, private toastr: ToastrService,
    private formBuilder: FormBuilder, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit(): void {


    this.raiseTicketId = this.data.value.raiseTicketId


    this.editFormGroup = this.formBuilder.group({
      subject: new FormControl('', [Validators.required]),
      ticketStatus: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    })
    this.editImageForm = this.formBuilder.group({
      document: new FormControl('', [Validators.required])
    })

    this.subjects = this.data.value.subject
    this.editFormGroup.controls['subject'].value = this.subjects

    this.critical = this.data.value.ticketStatus
    this.editFormGroup.controls['ticketStatus'].value = this.critical


    this.descriptions = this.data.value.description
    this.editFormGroup.controls['description'].value = this.descriptions

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

  onsubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData()
    formData.append('fileImage',this.uploadidentityfront);
    formData.append('ticketId', this.raiseTicketId)
    this.service.editTicketImage(formData).subscribe((res: any) => {
      this.image = res.response;

      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
      
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }

  save() {
    let submitModel: Tickets = {
      description: this.description?.value,
      subject: this.subject?.value,
      ticketStatus: this.ticketStatus?.value,
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
