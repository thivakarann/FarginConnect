import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { tickets } from '../../../fargin-model/fargin-model.module';
import { CustServiceService } from '../../../Customer-service/cust-service.service';
class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
 
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-cus-tickete-create',
  templateUrl: './cus-tickete-create.component.html',
  styleUrl: './cus-tickete-create.component.css'
})
export class CusTicketeCreateComponent {
 
 
  ticketcreate!:FormGroup;
  MerchantName: any;
  dataSource: any;
  errorMsg: any;
  emptyimage:any [] = [];
  ticketdetail:any;
  customerid:any;
  mobile:any;
  ticket:any;
  entity:any;
  MobileNumber: any;
  customerId: any;
  // merchantId = localStorage.getItem('merchantId') || '';
  ticketmerchants: any;
  customerIds: any;
  merchantIds: any;
idsss: any;
merchants: any;
selectedFile: any = ImageSnippet;
emptyBlob = new Blob([], { type: 'application/pdf' })
file1!: File;
errorMessage: any;
  uploadidentityfront: any;


  constructor(private dialog: MatDialog, private service: CustServiceService, private toastr: ToastrService, private fb: FormBuilder, private router: Router,private ActivateRoute: ActivatedRoute) { }
 
 
  ngOnInit(): void {

    this.ticketcreate = new FormGroup({
      customerId: new FormControl(''),
      merchantId: new FormControl('', Validators.required),
      mobileNumber: new FormControl(''),
      categoryName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      fileImage: new FormControl('',),
    });

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.MobileNumber = param.Alldata;
      
    });

  
    this.service.ticketcustomerdrop(this.MobileNumber).subscribe((res: any) => {
      this.entity = res.response;
      
      this.customerIds = this.entity[0].customerId
      
    })



  }
 
  get categoryName() {
    return this.ticketcreate.get('categoryName');
  }
  get merchantId() {
    return this.ticketcreate.get('merchantId');
  }
  get description() {
    return this.ticketcreate.get('description');
  }
  get fileImage() {
    return this.ticketcreate.get('fileImage');
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

  customer(id:any){
    this.merchantIds=id
    
    this.service.Customermerchanttickets(this.merchantIds).subscribe((res: any) => {
      if (res.flag == 1) {
        this.ticketmerchants = res.response;
        
        // this.customerIds = res.response[0].customer.customerId;
        
      }
    });
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFile.pending = true;
      
    });
    reader.readAsDataURL(file);
  }

  create(){
    const formData = new FormData();
    formData.append('customerId', this.customerIds);
    formData.append('merchantId', this.merchantIds);
    formData.append('mobileNumber', this.MobileNumber);
    formData.append('categoryName', this.categoryName?.value);
    formData.append('description', this.description?.value);
    formData.append('fileImage', this.uploadidentityfront || this.emptyBlob);
 
    
    this.service.CustomerTicket(formData).subscribe((res: any) => {
      this.ticket = res.response;
      
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()
        // setTimeout(() => {
        //   window.location.reload();
        // }, 500);
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
 
  }
}
 

