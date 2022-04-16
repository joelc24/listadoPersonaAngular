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
import { FooterComponent } from './shared/components/footer/footer.component';
import { FooterModule } from './shared/components/footer/footer.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DepartamentosComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    HttpClientModule,
    ReactiveFormsModule,
    DepartamentosModule,
    FooterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
