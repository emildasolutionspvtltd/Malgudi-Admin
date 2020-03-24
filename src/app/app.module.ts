import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AngularFireModule } from '@angular/fire';
import {MatTableModule, MatDialog, MatDialogModule} from '@angular/material'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { CategoriesComponent } from './categories/categories.component';
import { CrmComponent } from './crm/crm.component';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatInputModule} from '@angular/material/input';
import { NewProductComponent } from './new-product/new-product.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SupplierComponent} from './supplier/supplier.component'; 
import {LayoutModule} from '@angular/cdk/layout';
import { CouponsComponent } from './coupons/coupons.component';
import { HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { VeiwDetailsComponent } from './veiw-details/veiw-details.component';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import { Pipe, PipeTransform } from '@angular/core';
import { SampleModule } from 'angular-pdf-generator';
import { TruncatePipePipe } from './truncate-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    OrdersComponent,
    CategoriesComponent,
    CrmComponent,
    LoginComponent,
    DashboardComponent,
    NewProductComponent,
    SupplierComponent,
    CouponsComponent,
    EditProductComponent,
    EditCategoriesComponent,
    VeiwDetailsComponent,
    TruncatePipePipe
    
  ],

  imports: [
    BrowserModule,
    MatSnackBarModule,
    MatDialogModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    LayoutModule,
    MatInputModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatProgressBarModule,
    AngularFireModule.initializeApp(environment.firebaseconfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    HttpClientModule,  
    MatListModule,
    MatPaginatorModule,
    SampleModule,

  ],
  entryComponents: [
    VeiwDetailsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
