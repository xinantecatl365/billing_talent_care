import { Injectable } from '@angular/core';
import { enviroments } from '../../../envitoments/enviroment';
import { HttpClient } from '@angular/common/http';
import { ICliente } from '../interfaces/ICliente';
import { IBill } from '../interfaces/IBill';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  private URL: string = enviroments.backUrl;

  constructor(private http: HttpClient) { }

  getClientes(): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(`${this.URL}/clients`);
  }

  //crear
  createCliente(cliente: ICliente): Observable<any> {
    return this.http.post<any>(`${this.URL}/clients`, cliente);
  }

  //buscar por id
  getClienteById(id: number): Observable<ICliente> {
    return this.http.get<ICliente>(`${this.URL}/clients/${id}`);
  }

  //eliminar
  deleteCliente(cliente: ICliente): Observable<any> {
    return this.http.delete<any>(`${this.URL}/clients/${cliente.id}`);
  }

  //editar


  // create new bill
  createBill(bill: IBill): Observable<any> {
    return this.http.post<any>(`${this.URL}/bills`, bill);
  }
  // list all bills
  getBills() {
    return this.http.get<Array<IBill>>(`${this.URL}/bills`);
  }

  // delete bill
  deleteBill(bill: IBill) {
    return this.http.delete<any>(`${this.URL}/bills/${bill.id}`);
  }

  // get 1 bill


}
