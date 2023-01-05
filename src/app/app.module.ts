import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// ReactiveFormsModule servirá para trabalharmos com as validações
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AppRoutingComponent } from './app-routing.module';
import { NewMomentComponent } from './components/pages/new-moment/new-moment.component';
import { FormComponent } from './components/layout/form/form.component';
import { MessagesComponent } from './components/messages/messages.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MomentComponent } from './components/pages/moment/moment.component';
import { EditMomentComponent } from './components/pages/edit-moment/edit-moment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    FooterComponent,
    HomeComponent,
    NewMomentComponent,
    FormComponent,
    MessagesComponent,
    MomentComponent,
    EditMomentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingComponent,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
