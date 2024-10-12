import { Component, OnInit } from '@angular/core';
import { FacturacionService } from '../../services/facturacion.service';
import { ICliente } from '../../interfaces/ICliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.scss'
})
export class ListaClientesComponent implements OnInit {
  clientes: ICliente[] = [];

  constructor(
    private facturacionServive: FacturacionService,
    private router: Router
  ) {

  }


  ngOnInit(): void {
    //OBTENER LOS CLIENTES
    this._obtenerClientes();
  }

  private _obtenerClientes() {
    //ir a consultar los clientes en el backend
    this.facturacionServive.getClientes().subscribe((data: any) => {
      //'Mapear la infomracion dle objeto
      this.clientes = data.map((item: ICliente) => ({
        id: item.id,
        name: item.name,
        phoneNumber: item.phoneNumber,
        creationDate: item.creationDate,
      }));
    });
  }

  regresarHome() {
    this.router.navigateByUrl('/home');
  }

  eliminarCliente(cliente: ICliente) {
    //ejecutar la eliminacion.
    this.facturacionServive.deleteCliente(cliente).subscribe((data: any) => {
      this._obtenerClientes();
    });
  }

  editarCliente(cliente: ICliente) {
    //ejecutar la ruta de acceso al formulario con el dato del cliente
    this.router.navigate(['/home/editar-cliente', cliente.id]);
  }


}
