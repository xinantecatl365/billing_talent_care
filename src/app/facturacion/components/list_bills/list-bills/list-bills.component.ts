import { Component, OnInit } from '@angular/core';
import { IBill } from '../../../interfaces/IBill';
import { FacturacionService } from '../../../services/facturacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-bills',
  templateUrl: './list-bills.component.html',
  styleUrl: './list-bills.component.scss'
})
export class ListBillsComponent implements OnInit {
  bills: IBill[] = [];

  constructor(
    private facturacionService: FacturacionService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this._getAllBills();
  }

  private _getAllBills() {
    //ir a consultar los clientes en el backend
    this.facturacionService.getBills().subscribe((data: any) => {
      //'Mapear la infomracion dle objeto
      this.bills = data.map((item: IBill) => ({
        id: item.id,
        amount: item.amount,
        date: item.date,
        details: item.details,
        clientId: item.clientId
      }));
    });
  }

  deleteBill(bill: IBill){
    this.facturacionService.deleteBill(bill).subscribe((data:any)=>{
      console.log('deleted succesfully');
      this._getAllBills();
    });
  }

  updateBill(bill: IBill){
    this.router.navigate(['/home/billing/create/', bill.id])
  }
}
