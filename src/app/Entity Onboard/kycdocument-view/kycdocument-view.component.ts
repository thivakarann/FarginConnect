import { Component, Inject, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kycdocument-view',
  templateUrl: './kycdocument-view.component.html',
  styleUrl: './kycdocument-view.component.css'
})
export class KycdocumentViewComponent implements OnInit{
  id: any;
  imageSrc: any;
  flag: any;
  documentupload!:FormGroup;

  constructor(private service:FarginServiceService ,@Inject(MAT_DIALOG_DATA) public data:any)  {}

  ngOnInit(): void {

    this.id = this.data.value
    console.log(this.id);

    this.flag=this.data.value1
    console.log(this.flag);

    this.documentupload = new FormGroup({
      documentfront: new FormControl('', [Validators.required]),
     
    })
    
    this.service.getImageview(this.id,this.flag).subscribe({
      next:(res:any)=>{

        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onloadend = () => {
          this.imageSrc = reader.result as string;
      }
    },
   
    })
  }


  get documentfront() {
    return this.documentupload.get('documentfront');
  }
  Update(){

    

  }
}
