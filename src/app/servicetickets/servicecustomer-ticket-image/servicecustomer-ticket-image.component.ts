import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-servicecustomer-ticket-image',
  templateUrl: './servicecustomer-ticket-image.component.html',
  styleUrl: './servicecustomer-ticket-image.component.css'
})
export class ServicecustomerTicketImageComponent {
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
 
  constructor(private router: Router, private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {
    this.raiseTicketId = this.data.value
        
  }
  ngOnInit(): void {
    
    this.raiseTicket = this.data.value
    
 
 
 
    this.service.Entitylogoview(this.raiseTicketId).subscribe({
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
 
 
  getlogoId(event:any){
    const files = event.target.files[0];
    if (files) {
      const fileName: string = files.name;
      if (!files.type.startsWith('image/')) {
 
        this.errorMessage = 'Only Images are allowed';
        return;
 
      }
 
 
      this.errorMessage = ''
      this.file1 = files;
      
 
      
 
    }
 
   
  }
 
  Update(){
    const formData = new FormData;
    formData.append('raiseTicketId ', this.raiseTicketId);
    formData.append('fileImage ', this.file1);
 
    this.service.EntitylogoUpdatescustomer(formData).subscribe((res:any)=>{
      if(res.flag==1){
        this.updatedata=res.response;
      this.dialog.closeAll();
      setTimeout(() => {
        window.location.reload()
      }, 1000);
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
 