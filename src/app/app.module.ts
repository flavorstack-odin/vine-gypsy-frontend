import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadProductComponent } from './components/pages/upload-product/upload-product.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
// import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
// import { SideBarComponent } from './shared/side-bar/side-bar.component';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from './_services/auth/authentication.service';
import { ScrapDelarRegisterComponent } from './components/pages/scrap-delar-register/scrap-delar-register.component';
import { BidInfoComponent } from './components/pages/bid-info/bid-info.component';
// import { MatSelectModule } from '@angular/material/select';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ProductListComponent } from './components/pages/product-list/product-list.component';
import { BidItemsComponent } from './components/pages/bid-items/bid-items.component';
import { DealerDetailsPageComponent } from './components/pages/dealer-details-page/dealer-details-page.component';
import { ScrapDealerListComponent } from './components/pages/scrap-dealer-list/scrap-dealer-list.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { UserListComponent } from './components/pages/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UploadProductComponent,
    DashboardComponent,
    ScrapDelarRegisterComponent,
    BidInfoComponent,
    ProductListComponent,
    BidItemsComponent,
    DealerDetailsPageComponent,
    ScrapDealerListComponent,
    ProductDetailsComponent,
    UserListComponent,

    // NavBarComponent,
    // SideBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(),

    // provideFirebaseApp(() => initializeApp({environment.firebase})),
    // provideFirestore(() => getFirestore()),
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
