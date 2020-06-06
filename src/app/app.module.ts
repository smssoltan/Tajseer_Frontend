import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { Route } from '@angular/compiler/src/core';
import { HomeComponent } from './auth/components/home/home.component';
import { Page404Component } from './auth/components/page404/page404.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { MyRequestsComponent } from './my-requests/my-requests.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    Page404Component,
    MyRequestsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([ 
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'myRequests', component: MyRequestsComponent},
    {path: '**', component: Page404Component},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
