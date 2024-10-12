import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturacionComponent } from './facturacion.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { CreateBillComponent } from './components/create_bill/create-bill/create-bill.component';
import { ListBillsComponent } from './components/list_bills/list-bills/list-bills.component';

const routes: Routes = [
  { path: 'lista-clientes', component: ListaClientesComponent },
  { path: 'crear-cliente', component: CrearClienteComponent },
  { path: 'editar-cliente/:id', component: CrearClienteComponent },
  { path: 'billing/create', component: CreateBillComponent },
  { path: 'billing/create/:id', component: CreateBillComponent },
  { path: 'billing/list', component: ListBillsComponent },
  {
    path: '',
    component: FacturacionComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturacionRoutingModule { }
