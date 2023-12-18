import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AddBannerComponent } from './add-banner/add-banner.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NavComponentComponent } from './nav-component/nav-component.component';
import { WelcomeCompComponent } from './welcome-comp/welcome-comp.component';
import { HomePageComponent } from './home-page/home-page.component';
import { WineriesComponent } from './wineries/wineries.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    AddBannerComponent,
    NavComponentComponent,
    WelcomeCompComponent,
    HomePageComponent,
    WineriesComponent,
    AboutUsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
