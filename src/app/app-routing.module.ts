import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { UploadProductComponent } from './components/pages/upload-product/upload-product.component';
import { AuthGuard } from './_helpers/auth.guard';
import { ScrapDelarRegisterComponent } from './components/pages/scrap-delar-register/scrap-delar-register.component';
import { BidInfoComponent } from './components/pages/bid-info/bid-info.component';
import { ProductListComponent } from './components/pages/product-list/product-list.component';
import { BidItemsComponent } from './components/pages/bid-items/bid-items.component';
import { DealerDetailsPageComponent } from './components/pages/dealer-details-page/dealer-details-page.component';
import { ScrapDealerListComponent } from './components/pages/scrap-dealer-list/scrap-dealer-list.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'uploadProduct',
    component: UploadProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'productList/updateProduct/:id',
    component: UploadProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dealerRegister',
    component: ScrapDelarRegisterComponent,
    canActivate: [AuthGuard],
  },
  { path: 'bidInfo', component: BidInfoComponent, canActivate: [AuthGuard] },
  {
    path: 'productList',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bidItems/updateBid/:id',
    component: BidInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bidItems',
    component: BidItemsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'dealerList/dealerDetails/:id',
    component: DealerDetailsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dealerList/dealerUpdate/:id',
    component: ScrapDelarRegisterComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'productList/productDetails/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dealerList',
    component: ScrapDealerListComponent,
    canActivate: [AuthGuard],
  },

  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./components/main/main.module').then((m) => m.MainModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
