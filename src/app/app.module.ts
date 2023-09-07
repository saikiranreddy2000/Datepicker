import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule } from '@angular/material/datepicker'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatInputModule,
    HttpClientModule 


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
