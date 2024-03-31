import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductInputComponent } from './product-input/product-input.component';
import { StoredDataComponent } from './stored-data/stored-data.component';
import { StatusCheckComponent } from './status-check/status-check.component';



const routes: Routes = [
 {path:'',component:ProductInputComponent},
 {path:'data', component:StoredDataComponent},
 {path:'status', component:StatusCheckComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
