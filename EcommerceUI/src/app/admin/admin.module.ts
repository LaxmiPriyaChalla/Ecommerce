import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductComponent } from './product/product.component';
import { NbCardModule, NbSpinnerModule, NbButtonModule, NbIconModule, NbWindowModule, NbInputModule } from '@nebular/theme'
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NbCardModule,
    NbSpinnerModule,
    NbButtonModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbWindowModule.forChild(),
    ReactiveFormsModule,
    NbInputModule
  ]
})
export class AdminModule { }
