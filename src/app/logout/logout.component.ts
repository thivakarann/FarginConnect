import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Logout,Payload } from '../fargin-model/fargin-model.module';
import { FarginServiceService } from '../service/fargin-service.service';
import { Router } from '@angular/router';
import { EncyDecySericeService } from '../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,
  ) { }

  adminId: any = this.cryptoService.decrypt(sessionStorage.getItem('Two') || '');


  logout() {
    let submitModel: Logout = {
      userId: this.adminId,
      // logout: '1',
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.Logout(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.dialog.closeAll();
        sessionStorage.removeItem('token');
        this.router.navigateByUrl('/login-page');
      }
    });
  }
}
