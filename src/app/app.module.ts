import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UtilityHomeComponent } from './utility-home/utility-home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { LocationService } from './location.service';
import { WINDOW_PROVIDERS } from './window.providers';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResourceInstancesComponent } from './resource-instances/resource-instances.component';
import { ResourceInstanceComponent } from './resource-instance/resource-instance.component';

@NgModule({
  declarations: [
    AppComponent,
    UtilityHomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    ResourceInstancesComponent,
    ResourceInstanceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [WINDOW_PROVIDERS, AuthService, LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
