import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HeaderModule } from './shared/components/header/header.module';

import {HttpClientModule} from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { DepartamentosComponent } from './shared/components/departamentos/departamentos.component';
import { DepartamentosModule } from './shared/components/departamentos/departamentos.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DepartamentosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    HttpClientModule,
    ReactiveFormsModule,
    DepartamentosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
