import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ExportReportCreate } from '../../fargin-model/fargin-model.module';
import { NgSelectComponent } from '@ng-select/ng-select';

interface Option {
  entityName: string;
  merchantId: number;}
  
@Component({
  selector: 'app-export-report-add',
  templateUrl: './export-report-add.component.html',
  styleUrl: './export-report-add.component.css'
})

export class ExportReportAddComponent implements OnInit {

  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  myForm!: FormGroup;
  merchantId: any = sessionStorage.getItem('merchantId')
  Daterange!: string;
  exportTypes: any;
  roleName = sessionStorage.getItem('roleName')
  roleId: any = sessionStorage.getItem('roleId')
  getdashboard: any[] = [];
  actions: any;
  valueDownload:any;
  maxDate:any;
  selectedOption: any;
  options: Option[]=[];
  userInput: string = '';
  search1:any;

  customerInput: any;
  isNoDataFound: boolean=false;
  showSuggestions: boolean = false;
  errorShow!:boolean
  activemerchant:any;

  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
     
    const today = new Date();
    this.maxDate = moment(today).format('yyyy-MM-DD').toString()


    this.myForm = new FormGroup({
      exportDataName: new FormControl('', [Validators.required]),
      exportType: new FormControl(''),
      exportStartDate: new FormControl('', [Validators.required]),
      exportEndDate: new FormControl('', [Validators.required]),
      paymentStatus: new FormControl(''),
      createdBy: new FormControl(''),
      merchantId: new FormControl(''),
      selectedOption: new FormControl(''),
      search1: new FormControl('')
    });

    this.service.actvemerchant().subscribe((res: any) => {
      this.options = res.response.map((merchant: any) => ({
        entityName: merchant.entityName,
        merchantId: merchant.merchantId
      }));
    });
    
  }

  get exportDataName() {
    return this.myForm.get('exportDataName')
  }

  get exportStartDate() {
    return this.myForm.get('exportStartDate')
  }

  get exportEndDate() {
    return this.myForm.get('exportEndDate')
  }

  get exportType() {
    return this.myForm.get('exportType')
  }

  get paymentStatus() {
    return this.myForm.get('paymentStatus')
  }



  submitForm() {
    const selectedValue = this.myForm.get('exportDataName')?.value;
    const startDate = this.myForm.get('exportStartDate')?.value;
    const endDate = this.myForm.get('exportEndDate')?.value;
    const paymentStatus = this.myForm.get('paymentStatus')?.value;

 
    if ((selectedValue == '7' || selectedValue == '13' || selectedValue == '14' || selectedValue == '19') && startDate && endDate && !paymentStatus) {
        this.exportTypes = 1; // Export type without payment status
        this.submit();
        
    }
    else if ((selectedValue == '7' || selectedValue == '13' || selectedValue == '14' || selectedValue == '19') && startDate && endDate && paymentStatus) {
      this.exportTypes = 0; // Export type without payment status
      this.submit();
    }
    else if ((selectedValue == '7' || selectedValue == '13'  || selectedValue == '14' || selectedValue == '19') && startDate && endDate) {
        this.exportTypes = 1; // Export type without payment status (assuming it should be 1 if exportDataName is 4)
        this.submit();
    }
    else if (startDate && endDate) {
        this.exportTypes = 0; // Export type with payment status
        this.submit();
    }
    else {
        this.exportTypes = 0;
        this.submit();
    }
}

exportpay(event: any) {
  this.myForm.get('paymentStatus')?.setValue('');
  this.myForm.get('selectedOption')?.setValue('');
}
 
  submit() {
    let merchant = 0; // Default to 0 if no match is found

    const inputValue = this.customerInput;

    if (inputValue) {
        const matchedBox = this.options.find(box => box.entityName === inputValue);
        merchant = matchedBox?.merchantId || 0; // Use matched merchantId or 0
    }

    let submitModel: ExportReportCreate = {
      createdBy: this.getadminname,
      exportDataName: this.exportDataName?.value,
      exportStartDate: this.exportStartDate?.value,
      exportEndDate: this.exportEndDate?.value,
      merchantId: merchant,
      exportType: this.exportTypes,
      paymentStatus:this.paymentStatus?.value,
      type:2
    }

    this.service.ExportReportAdd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }


  future(value: any) {
    value.reset()
  }


  
//   onSearchClick(searchSelect: NgSelectComponent): void {
//     this.searchAPI(this.userInput);
    
//     if (!searchSelect.isOpen) {
//       searchSelect.open();
//     }
//   }
  
//   onRemoveClick() {
//     this.selectedOption = null;
//     this.options = [];
//     console.log('No data found');
//   }
  
//   searchAPI(query: string): void {
//       this.service.Customerpaysearchfilter(query).subscribe((res: any) => {
//           if (res.flag === 1) {
//               this.options = res.response.map((item: any) => ({
//                   entityName: item.entityName,
//                   merchantId: item.merchantId
//               })); 
//         } else {
//           this.toastr.error(res.responseMessage);
//         }
//     }, (error) => {
//       console.error('Error fetching data from API', error);
//     });
//   }
  
//   onClear(): void {
//     this.options = []; // Clear dropdown options
//     this.selectedOption = null; // Reset the selected option
//     this.userInput = ''; // Clear the input variable, if any
//     console.log('Clear action triggered!');
//   }
  
//   onDropdownChange(selectedItem: any): void {
//     console.log(selectedItem)
//     if (selectedItem) {
//         this.selectedOption = selectedItem.merchantId;
//         this.search1 = selectedItem.entityName;
//         this.merchantId = this.selectedOption;
//         console.log(this.merchantId);
//     }
//   }

//   onInputChange(event: Event): void {
//     const inputElement = event.target as HTMLInputElement;
//     this.userInput = inputElement.value;
// }
   
loadInitialSetupBoxes() {
  this.service.actvemerchant().subscribe((res: any) => {
    this.activemerchant = res.response;
  });
}


onInputChange() {
  if (!this.customerInput) {
    console.log(this.customerInput)
    this.loadInitialSetupBoxes();
    this.isNoDataFound = false; // Reset the flag
    return;
 
  }
  this.service.actvemerchantsearch(this.customerInput).subscribe((res: any) => {
      if (res.flag==1) {
        this.options = res.response;
        console.log(this.options)
        this.isNoDataFound = false;  
       
      } else {
        this.options = [];  
        this.isNoDataFound = true;    
      }
    },
    (error) => {
      console.error('Error fetching merchant data:', error);
      this.isNoDataFound = true;  
    }
  );
}

// onSearchClick(value: string) {
//   this.customerInput = value;
//   this.showSuggestions = false;
// }

// hideSuggestions() {
//   setTimeout(() => {
//     this.showSuggestions = false;
//   }, 200); // Slight delay to allow click to register
// }

onSearchClick(entityName: string, event: MouseEvent): void {
  event.stopPropagation();
  this.customerInput = entityName;
  this.showSuggestions = false;
}
 
hideSuggestions(): void {
  document.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && !target.closest('.input-group')) {
          this.showSuggestions = false; // Only hide suggestions when clicking outside
      }
  });
}
}
