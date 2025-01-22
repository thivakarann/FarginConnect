import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { route } from '../fargin-model/fargin-model.module';
import { FarginServiceService } from '../service/fargin-service.service';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrl: './testpage.component.css'
})
export class TestpageComponent {
  
}
