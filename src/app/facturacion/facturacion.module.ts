import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturacionRoutingModule } from './facturacion-routing.module';
import { FacturacionComponent } from './facturacion.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateBillComponent } from './components/create_bill/create-bill/create-bill.component';
import { ListBillsComponent } from './components/list_bills/list-bills/list-bills.component';


@NgModule({
  declarations: [
    FacturacionComponent,
    ListaClientesComponent,
    CrearClienteComponent,
    CreateBillComponent,
    ListBillsComponent
  ],
  imports: [
    CommonModule,
    FacturacionRoutingModule,
    ReactiveFormsModule,
  ]
})
export class FacturacionModule { }
