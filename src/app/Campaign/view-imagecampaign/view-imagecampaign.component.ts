import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustServiceService } from '../../Customer-service/cust-service.service';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-imagecampaign',
  templateUrl: './view-imagecampaign.component.html',
  styleUrl: './view-imagecampaign.component.css'
})
export class ViewImagecampaignComponent {
  raiseTicketId: any;
  imageUrl: any;
  logoUpdate!:FormGroup;
  DocView: boolean = false;
  showcard: boolean = true;

  id: any;
  imageSrc: any;
  flag: any;
  imageFile1!: string | Blob;
  updatedata: any;
  errorMessage!: string;
  file1: any;
  logoLink: any;
  logoLink1: any;
  raiseTicket:any;
  uploadidentityfront: any;

  constructor(private router: Router, private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,private toastr: ToastrService) { 
    this.raiseTicketId = this.data.value.broadcasterId
        
  }
  ngOnInit(): void {
    this.raiseTicket = this.data.value
    this.service.campaignimageview(this.raiseTicketId).subscribe({
      next: (res: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onloadend = () => {
          this.imageUrl = reader.result as string;
          
          this.DocView = true;
        }
      },

    });


    this.logoUpdate = new FormGroup({
      raiseTicketId : new FormControl(''),
      fileImage  : new FormControl('', [Validators.required]),

    })
  }

  get fileImage() {
    return this.logoUpdate.get('fileImage');
  }




  onFileSelected(event: any) {
    this.uploadidentityfront = event.target.files[0];
 
    // Ensure this.uploadImage is not null
    if (this.uploadidentityfront) {
      const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
 
      if (acceptableTypes.includes(this.uploadidentityfront.type)) {
        if (this.uploadidentityfront.size <= 20 * 1024 * 1024) {
 
        } else {
          window.alert("Max Image size exceeded");
          this.fileImage?.reset(); // Optional chaining to prevent error if this.logo is null
        }
      } else {
        
        window.alert("File type not acceptable");
        this.fileImage?.reset(); // Optional chaining to prevent error if this.logo is null
      }
    } else {
      window.alert("No file selected");
    }
 
 
  }

  Update(){
    const formData = new FormData;
    formData.append('broadcasterId ', this.raiseTicketId);
    formData.append('image ', this.uploadidentityfront);
 
    this.service.campaignimageUpdate(formData).subscribe((res:any)=>{
      this.updatedata=res.response;
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
      }
    })  
  }

  converttohhttps(Url: string): string {
    return Url.replace('http:/', 'http://')
    }
  

  close() {
    this.dialog.closeAll()
  }

}
