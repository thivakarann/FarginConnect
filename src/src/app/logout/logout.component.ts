import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Logout } from '../fargin-model/fargin-model.module';
import { FarginServiceService } from '../service/fargin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private router:Router,private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) {

  }

  AdminId = JSON.parse(localStorage.getItem('adminid') || '')
  logout() {

    let submitModel: Logout = {
      adminUserId: this.AdminId,
      logout: '1'
    }
    this.service.Logout(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        this.router.navigateByUrl('/login-page')
      }
    })

  }

}
