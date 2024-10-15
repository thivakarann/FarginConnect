import { Component, Inject } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-merchant-logo',
  templateUrl: './merchant-logo.component.html',
  styleUrl: './merchant-logo.component.css'
})
export class MerchantLogoComponent {
  id: any;
  imageSrc: any;
  flag: any;
  logoUpdate!:FormGroup;
  modifiedBy = JSON.parse(localStorage.getItem('adminname') || '');
  imageFile1!: string | Blob;
  updatedata: any;
  errorMessage!: string;
  file1: any;
  logoLink: any;
  logoLink1: any;

  constructor(private service:FarginServiceService ,@Inject(MAT_DIALOG_DATA) public data:any,private dialog:MatDialog)  {}

  ngOnInit(): void {

    this.id = this.data.value
    console.log(this.id);
    this.logoLink=this.data.value1
    console.log( this.logoLink)
    
      this.logoLink1 = this.converttohhttps(this.logoLink);
      console.log(this.logoLink1);



  

    this.logoUpdate = new FormGroup({
      merchantlogo: new FormControl('', [Validators.required]),
    })
    
   
  }


  get merchantlogo() {
    return this.logoUpdate.get('merchantlogo');
  }


  

converttohhttps(Url: string): string {
  return Url.replace('http:/', 'http://')
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
      console.log(this.file1);

      console.log(' file 1 id success' + files);

    }

    
  }
  Update(){
    const formData = new FormData;
    formData.append('merchantId ', this.id);
    formData.append('modifiedBy', this.modifiedBy);
    formData.append('merchantLogo ', this.file1);

    
    this.service.EntitylogoUpdate(formData).subscribe((res:any)=>{
      if(res.flag==1){
        this.updatedata=res.response;
      this.dialog.closeAll();
      setTimeout(() => {
        window.location.reload()
      }, 1000);
      }
    })

  }
}

