import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-extendsigners',
  templateUrl: './extendsigners.component.html',
  styleUrl: './extendsigners.component.css'
})
export class ExtendsignersComponent {
  addextendsigners: any = FormGroup;

  docName: any;
  fromupload: any;
  UploadPdf: any;
  Pdfid: any;
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }


  ngOnInit(): void {


    this.addextendsigners = new FormGroup({
      categoryName: new FormControl('', [Validators.required]),
    });

  }


  get categoryName() {
    return this.addextendsigners.get('categoryName');
  }


}
