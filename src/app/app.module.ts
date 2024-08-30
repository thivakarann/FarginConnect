import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginPageComponent } from './login-page/login-page.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './Loading Interceptor/loading.interceptor.spec';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatMenuModule} from '@angular/material/menu';
import { TestpageComponent } from './testpage/testpage.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatCommonModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatGridListModule} from '@angular/material/grid-list';
import { ViewcategoryComponent } from './Main Master/businesscategory/viewcategory/viewcategory.component';
import { AddcategoryComponent } from './Main Master/businesscategory/addcategory/addcategory.component';
import { EditcategoryComponent } from './Main Master/businesscategory/editcategory/editcategory.component';
import { ViewticketComponent } from './Tickets/viewticket/viewticket.component';
import { AddticketComponent } from './Tickets/addticket/addticket.component';
import { EditticketComponent } from './Tickets/editticket/editticket.component';
import { EntityViewallComponent } from './Entity Onboard/entity-viewall/entity-viewall.component';
import { EntityAddComponent } from './Entity Onboard/entity-add/entity-add.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { EntityViewComponent } from './Entity Onboard/entity-view/entity-view.component';
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
    EntityViewallComponent,
    EntityAddComponent,
    DashboardContentComponent,
    EntityViewComponent,
    
    
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
