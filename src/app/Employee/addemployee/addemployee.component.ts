import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Addadmins, Addemployees } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrl: './addemployee.component.css'
})
export class AddemployeeComponent {
  employeeFormGroup: any = FormGroup;
  integerRegex = /^\d+$/;
  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  merchantid:any=localStorage.getItem('merchantid')
  constructor(
    private service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.employeeFormGroup = this.formBuilder.group({
      employeeName: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern(this.integerRegex),
      ]),
      emailAddress:new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailRegex),
      ]),
      area: new FormControl('', [Validators.required]),
      city:new FormControl('', [Validators.required]),
      pincode:new FormControl('', [Validators.required]),
      merchantId:new FormControl(''),

    });
  }

  get employeeName() {
    return this.employeeFormGroup.get('employeeName');
  }

  get mobileNumber() {
    return this.employeeFormGroup.get('mobileNumber');
  }
  
  get emailAddress() {
    return this.employeeFormGroup.get('emailAddress');
  }
 
  get area() {
    return this.employeeFormGroup.get('area');
  }
  
  get city() {
    return this.employeeFormGroup.get('city');
  }

  get pincode() {
    return this.employeeFormGroup.get('pincode');
  }




  OnSubmit()
  {
    let submitModel: Addemployees = {

      employeeName:this.employeeName?.value,
      mobileNumber:this.mobileNumber?.value,
      emailAddress:this.emailAddress?.value,
      area:this.area?.value,
      city:this.city?.value,
      pincode:this.pincode?.value,
      merchantId:this.merchantid,
     
      
    };

 
      this.service.addemployees(submitModel).subscribe((res: any) => {
        if(res.flag==1){
          // this.previlegememberCreate= res.response;
          this.toastr.success(res.responseMessage)  
          window.location.reload()
   
        }
        else{
          this.toastr.warning(res.responseMessage);
          this.dialog.closeAll()
        }  
       
    });
  }
  close() {
    this.router.navigateByUrl('dashboard/view-employee');
  }
  
  
}
