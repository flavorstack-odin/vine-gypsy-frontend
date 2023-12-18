import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { WineriesComponent } from './wineries/wineries.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  {
    path: 'wineries',
    component: WineriesComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'aboutus',
    component: AboutUsComponent,
    // canActivate: [AuthGuard],
  },
  // {
  //   path: 'productList/updateProduct/:id',
  //   component: UploadProductComponent,
  //   // canActivate: [AuthGuard],
  // },
  // {
  //   path: 'dealerRegister',
  //   component: ScrapDelarRegisterComponent,
  //   // canActivate: [AuthGuard],
  // },
  // { path: 'bidInfo', component: BidInfoComponent },
  // {
  //   path: 'productList',
  //   component: ProductListComponent,
  //   // canActivate: [AuthGuard],
  // },
  // {
  //   path: 'bidItems/updateBid/:id',
  //   component: BidInfoComponent,
  //   // canActivate: [AuthGuard],
  // },
  // {
  //   path: 'bidItems',
  //   component: BidItemsComponent,
  //   // canActivate: [AuthGuard],
  // },

  // {
  //   path: 'dealerList/dealerDetails/:id',
  //   component: DealerDetailsPageComponent,
  //   // canActivate: [AuthGuard],
  // },
  // {
  //   path: 'dealerList/dealerUpdate/:id',
  //   component: ScrapDelarRegisterComponent,
  //   // canActivate: [AuthGuard],
  // },

  // {
  //   path: 'productList/productDetails/:id',
  //   component: ProductDetailsComponent,
  //   // canActivate: [AuthGuard],
  // },
  // {
  //   path: 'dealerList',
  //   component: ScrapDealerListComponent,
  //   // canActivate: [AuthGuard],
  // },

  // {
  //   path: 'userList',
  //   component: UserListComponent,
  //   // canActivate: [AuthGuard],
  // },

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
