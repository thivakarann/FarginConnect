import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { announceAdd } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-campagin',
  templateUrl: './create-campagin.component.html',
  styleUrl: './create-campagin.component.css'
})
export class CreateCampaginComponent {
 announcementform: any = FormGroup;
  createdBy = JSON.parse(localStorage.getItem('adminname') || '');
  categoryvalue: any;
  minDate: any = Date;
  uploadidentityfront: any;

 @ViewChild('select') select: any = MatSelect;
 allSelected = false;
  activeemail: any;
  campagin: any;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }


  ngOnInit(): void {

    

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]

  

    this.announcementform = this.formBuilder.group(
      {
        subject: ['', Validators.required],
        email:['', Validators.required],
        contents: ['', Validators.required],  
        document: ['', Validators.required]  
      },
    
    );

    this.service.activemerchantemails().subscribe((res: any) => {
      this.activeemail = res.response;

    })
  }

 
  
  get subject() {
    return this.announcementform.get('subject');
  }

  get contents() {
    return this.announcementform.get('contents');
  }

  get email() {
    return this.announcementform.get('email');
  }
  


  get startDate() {
    return this.announcementform.get('startDate');
  }

  get document() {
    return this.announcementform.get('document')
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
    toggleAllSelection() {
      if (this.allSelected) {
        this.select.options.forEach((item: MatOption) => item.select());
      } else {
        this.select.options.forEach((item: MatOption) => item.deselect());
      }
    }


  save() {
    const formData = new FormData();
    formData.append('image', this.uploadidentityfront);
    formData.append('emailContent', this.contents?.value);
    formData.append('subject', this.subject?.value);
    const selectedEmails = this.announcementform.get('email')?.value;
    if (selectedEmails && selectedEmails.length > 0) {
        const emailArrayString = JSON.stringify(selectedEmails);
        formData.append('emailId', emailArrayString);
    }
    formData.append('flag', '1');
    
    this.service.addcampagin(formData).subscribe((res: any) => {
      this.campagin = res.response;
      
      if (res.flag == 1) {
        this.dialog.closeAll();
        Swal.fire({
            title: "Success!",
            text: `Response Message: ${res.responseMessage}
                   Merchant Active Total Count: ${res.response.MerchantActiveTotalCount}
                   Merchant Failed Count: ${res.response.MerchantFailedCount}
                   Merchant Success Count: ${res.response.MerchantSuccessCount}`,
            icon: "success",
        });
    } else {
        this.toastr.error(res.responseMessage);
    }

    });
  }

}
