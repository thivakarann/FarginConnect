import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './Loading Interceptor/loading.interceptor.spec';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatMenuModule } from '@angular/material/menu';
import { TestpageComponent } from './testpage/testpage.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatCommonModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { ViewcategoryComponent } from './Main Master/businesscategory/viewcategory/viewcategory.component';
import { AddcategoryComponent } from './Main Master/businesscategory/addcategory/addcategory.component';
import { EditcategoryComponent } from './Main Master/businesscategory/editcategory/editcategory.component';
import { ViewticketComponent } from './Tickets/viewticket/viewticket.component';
import { AddticketComponent } from './Tickets/addticket/addticket.component';
import { EditticketComponent } from './Tickets/editticket/editticket.component';
import { ViewCommentComponent } from './Tickets/view-comment/view-comment.component';
import { ViewDescriptionComponent } from './Tickets/view-description/view-description.component';
import { TicketImageComponent } from './Tickets/ticket-image/ticket-image.component';
import { AddRoleComponent } from './Roles-Permission/add-role/add-role.component';
import { ViewRoleComponent } from './Roles-Permission/view-role/view-role.component';
import { EditRoleComponent } from './Roles-Permission/edit-role/edit-role.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BusinessKycComponent } from './Main Master/businesscategory/business-kyc/business-kyc.component';
import { BusinessKycCreateComponent } from './Main Master/businesscategory/business-kyc/business-kyc-create/business-kyc-create.component';
import { BusinessKycEditComponent } from './Main Master/businesscategory/business-kyc/business-kyc-edit/business-kyc-edit.component';
import { EntityViewallComponent } from './Entity Onboard/entity-viewall/entity-viewall.component';
import { EntityAddComponent } from './Entity Onboard/entity-add/entity-add.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { EntityViewComponent } from './Entity Onboard/entity-view/entity-view.component';
import { ChangePasswordComponent } from './change-password/change-password.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SpinnerComponent,
    DashboardComponent,
    TestpageComponent,
    ViewcategoryComponent,
    AddcategoryComponent,
    EditcategoryComponent,
    ViewticketComponent,
    AddticketComponent,
    EditticketComponent,
    BusinessKycComponent,
    BusinessKycCreateComponent,
    BusinessKycEditComponent,
    ViewCommentComponent,
    ViewDescriptionComponent,
    TicketImageComponent,
    AddRoleComponent,
    ViewRoleComponent,
    EditRoleComponent,
    EntityViewallComponent,
    EntityAddComponent,
    DashboardContentComponent,
    EntityViewComponent,
    ForgotPasswordComponent,
    OtpVerificationComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatCommonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatPaginatorModule,
    MatInputModule,
    MatToolbarModule,
    MatStepperModule,
    MatGridListModule,
    MatSlideToggleModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
