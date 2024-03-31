import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModel } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductInputComponent } from './product-input/product-input.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoredDataComponent } from './stored-data/stored-data.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NavbarComponent } from './navbar/navbar.component';
import { StatusCheckComponent } from './status-check/status-check.component';




@NgModule({
  declarations: [
    AppComponent,
    ProductInputComponent,
  
    StoredDataComponent,
       NavbarComponent,
       StatusCheckComponent,

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule
  
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
